# Stock Import Database Schema

## Overview
This document describes the database schema for storing stock import details in the JEMS system. The schema supports importing stock entries for different item types: METAL, DIAMOND, STONE, and ALLOY.

## Main Tables

### 1. stock_lots
Stores individual stock lot entries imported from Excel files.

```sql
CREATE TABLE stock_lots (
    lot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    lot_no VARCHAR(100) NOT NULL,
    item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('METAL', 'DIAMOND', 'STONE', 'ALLOY')),
    
    -- Item-specific foreign keys (only one will be populated based on item_type)
    raw_material_id UUID REFERENCES raw_materials(material_id),
    diamond_master_id UUID REFERENCES diamond_master(diamond_master_id),
    stone_master_id UUID REFERENCES stone_master(stone_master_id),
    recipe_id UUID REFERENCES alloy_recipes(recipe_id),
    
    -- Stock quantities
    current_weight DECIMAL(15, 3) NOT NULL DEFAULT 0,
    current_pieces INTEGER NOT NULL DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(user_id),
    updated_by UUID REFERENCES users(user_id),
    
    -- Constraints
    CONSTRAINT unique_lot_no_per_tenant UNIQUE (tenant_id, lot_no),
    CONSTRAINT check_item_type_reference CHECK (
        (item_type = 'METAL' AND raw_material_id IS NOT NULL AND diamond_master_id IS NULL AND stone_master_id IS NULL AND recipe_id IS NULL) OR
        (item_type = 'DIAMOND' AND diamond_master_id IS NOT NULL AND raw_material_id IS NULL AND stone_master_id IS NULL AND recipe_id IS NULL) OR
        (item_type = 'STONE' AND stone_master_id IS NOT NULL AND raw_material_id IS NULL AND diamond_master_id IS NULL AND recipe_id IS NULL) OR
        (item_type = 'ALLOY' AND recipe_id IS NOT NULL AND raw_material_id IS NULL AND diamond_master_id IS NULL AND stone_master_id IS NULL)
    )
);

-- Indexes
CREATE INDEX idx_stock_lots_tenant_id ON stock_lots(tenant_id);
CREATE INDEX idx_stock_lots_item_type ON stock_lots(item_type);
CREATE INDEX idx_stock_lots_lot_no ON stock_lots(lot_no);
CREATE INDEX idx_stock_lots_raw_material_id ON stock_lots(raw_material_id) WHERE raw_material_id IS NOT NULL;
CREATE INDEX idx_stock_lots_diamond_master_id ON stock_lots(diamond_master_id) WHERE diamond_master_id IS NOT NULL;
CREATE INDEX idx_stock_lots_stone_master_id ON stock_lots(stone_master_id) WHERE stone_master_id IS NOT NULL;
CREATE INDEX idx_stock_lots_recipe_id ON stock_lots(recipe_id) WHERE recipe_id IS NOT NULL;
CREATE INDEX idx_stock_lots_created_at ON stock_lots(created_at);
```

### 2. stock_import_logs
Tracks each Excel import operation for audit and error tracking.

```sql
CREATE TABLE stock_import_logs (
    import_log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT,
    total_rows INTEGER NOT NULL,
    successful_rows INTEGER NOT NULL DEFAULT 0,
    failed_rows INTEGER NOT NULL DEFAULT 0,
    duplicate_rows INTEGER NOT NULL DEFAULT 0,
    
    -- Import metadata
    imported_by UUID REFERENCES users(user_id) NOT NULL,
    imported_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'PARTIAL')),
    
    -- Error details (JSON format for flexibility)
    error_summary JSONB,
    
    -- File hash for duplicate detection
    file_hash VARCHAR(64)
);

-- Indexes
CREATE INDEX idx_stock_import_logs_tenant_id ON stock_import_logs(tenant_id);
CREATE INDEX idx_stock_import_logs_imported_by ON stock_import_logs(imported_by);
CREATE INDEX idx_stock_import_logs_imported_at ON stock_import_logs(imported_at);
CREATE INDEX idx_stock_import_logs_status ON stock_import_logs(status);
```

### 3. stock_import_details
Stores individual row-level import details for each Excel row processed.

```sql
CREATE TABLE stock_import_details (
    import_detail_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    import_log_id UUID NOT NULL REFERENCES stock_import_logs(import_log_id) ON DELETE CASCADE,
    
    -- Row information
    row_number INTEGER NOT NULL,
    lot_no VARCHAR(100),
    item_type VARCHAR(20),
    
    -- Import status
    status VARCHAR(20) NOT NULL CHECK (status IN ('SUCCESS', 'FAILED', 'DUPLICATE', 'SKIPPED')),
    
    -- Original Excel data (stored as JSON for reference)
    excel_data JSONB NOT NULL,
    
    -- Validation errors (if any)
    validation_errors JSONB,
    
    -- Resulting lot_id if successfully imported
    lot_id UUID REFERENCES stock_lots(lot_id) ON DELETE SET NULL,
    
    -- Error message if failed
    error_message TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_stock_import_details_import_log_id ON stock_import_details(import_log_id);
CREATE INDEX idx_stock_import_details_status ON stock_import_details(status);
CREATE INDEX idx_stock_import_details_lot_id ON stock_import_details(lot_id) WHERE lot_id IS NOT NULL;
```

## Related Tables (Referenced)

### raw_materials
```sql
CREATE TABLE raw_materials (
    material_id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100),
    -- other fields...
    is_active BOOLEAN DEFAULT true
);
```

### diamond_master
```sql
CREATE TABLE diamond_master (
    diamond_master_id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    diamond_code VARCHAR(100),
    -- other fields...
    is_active BOOLEAN DEFAULT true
);
```

### stone_master
```sql
CREATE TABLE stone_master (
    stone_master_id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    stone_code VARCHAR(100),
    -- other fields...
    is_active BOOLEAN DEFAULT true
);
```

### alloy_recipes
```sql
CREATE TABLE alloy_recipes (
    recipe_id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    recipe_name VARCHAR(255),
    recipe_code VARCHAR(100),
    -- other fields...
    is_active BOOLEAN DEFAULT true
);
```

## Excel Import Template Schema

The Excel file should contain the following columns:

| Column Name | Required | Type | Description |
|------------|----------|------|-------------|
| Lot No | Yes | String | Unique lot number for the stock entry |
| Item Type | Yes | Enum | One of: METAL, DIAMOND, STONE, ALLOY |
| Raw Material ID | Conditional | UUID | Required if Item Type = METAL |
| Diamond Master ID | Conditional | UUID | Required if Item Type = DIAMOND |
| Stone Master ID | Conditional | UUID | Required if Item Type = STONE |
| Recipe ID | Conditional | UUID | Required if Item Type = ALLOY |
| Current Weight (g) | Yes | Decimal | Current weight in grams |
| Current Pieces | Yes | Integer | Number of pieces |
| Created Date | No | Date | Creation date (defaults to current date if not provided) |

## Import Process Flow

1. **File Upload**: User uploads Excel file
2. **Validation**: System validates each row against business rules
3. **Import Log Creation**: Create entry in `stock_import_logs`
4. **Row Processing**: For each row:
   - Create entry in `stock_import_details`
   - Validate data
   - Check for duplicates (by lot_no)
   - If valid and not duplicate: Create entry in `stock_lots`
   - Update counters in `stock_import_logs`
5. **Completion**: Update `stock_import_logs` with final status

## Sample Queries

### Get import history
```sql
SELECT 
    sil.import_log_id,
    sil.file_name,
    sil.total_rows,
    sil.successful_rows,
    sil.failed_rows,
    sil.duplicate_rows,
    sil.imported_at,
    u.username as imported_by
FROM stock_import_logs sil
LEFT JOIN users u ON sil.imported_by = u.user_id
WHERE sil.tenant_id = :tenant_id
ORDER BY sil.imported_at DESC;
```

### Get failed rows from an import
```sql
SELECT 
    sid.row_number,
    sid.lot_no,
    sid.item_type,
    sid.error_message,
    sid.validation_errors,
    sid.excel_data
FROM stock_import_details sid
WHERE sid.import_log_id = :import_log_id
  AND sid.status = 'FAILED'
ORDER BY sid.row_number;
```

### Get imported lots from an import
```sql
SELECT 
    sl.*,
    sid.row_number,
    sid.excel_data
FROM stock_lots sl
INNER JOIN stock_import_details sid ON sl.lot_id = sid.lot_id
WHERE sid.import_log_id = :import_log_id
ORDER BY sid.row_number;
```

## Notes

1. **Tenant Isolation**: All tables include `tenant_id` for multi-tenant support
2. **Audit Trail**: `created_by`, `updated_by`, and timestamps track all changes
3. **Data Integrity**: Constraints ensure data consistency based on item_type
4. **Error Tracking**: Detailed error information stored in JSONB for flexible error reporting
5. **Duplicate Prevention**: Unique constraint on `(tenant_id, lot_no)` prevents duplicate imports
6. **Soft Deletes**: Consider adding `is_deleted` and `deleted_at` columns if soft deletes are needed

