document.addEventListener('DOMContentLoaded', function () {
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) return;

  // Use a JS template string for the sidebar so pages work without an HTTP server
  // Styled with JEMS design system
  var menuHtml = `
    <aside class="w-64 flex flex-col border-r border-border-light dark:border-border-dark h-full">
      <div class="p-6 flex items-center justify-center border-b border-border-light dark:border-border-dark flex-shrink-0">
        <span class="material-icons text-primary text-3xl mr-2">diamond</span>
        <h1 class="text-xl font-bold">JEMS</h1>
      </div>
      
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden menu-nav-scroll">
        <a href="index.html" class="menu-link flex items-center p-3 rounded-lg hover:bg-primary/10 transition-colors font-medium" data-page="home">
          <span class="material-icons mr-3">home</span>
          <span>Home</span>
        </a>
        
        <!-- Master Settings - Collapsible Menu -->
        <div class="space-y-1">
          <button id="master-toggle" class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/10 transition-colors font-medium">
            <div class="flex items-center">
              <span class="material-icons mr-3">settings</span>
              <span>Master Settings</span>
            </div>
            <span class="material-icons text-lg transition-transform" id="master-chevron">expand_more</span>
          </button>
          
          <!-- Submenu Items -->
          <div class="submenu" id="master-submenu">
            <a href="vendor.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="vendor">
              <span class="material-icons mr-2 text-base">store</span>
              <span>Vendor</span>
            </a>
            <!-- Metal - Nested Collapsible Menu -->
            <div class="space-y-1">
              <button id="metal-toggle" class="w-full flex items-center justify-between pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors font-medium">
                <div class="flex items-center">
                  <span class="material-icons mr-2 text-base">precision_manufacturing</span>
                  <span>Metal</span>
                </div>
                <span class="material-icons text-base transition-transform" id="metal-chevron">expand_more</span>
              </button>
              
              <!-- Metal Submenu -->
              <div class="submenu" id="metal-submenu">
                <a href="raw-materials.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="raw-materials">Raw Materials</a>
                <a href="alloy-recipe.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="alloy-recipe">Alloy Recipe</a>
              </div>
            </div>
            <!-- Product - Nested Collapsible Menu -->
            <div class="space-y-1">
              <button id="product-toggle" class="w-full flex items-center justify-between pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors font-medium">
                <div class="flex items-center">
                  <span class="material-icons mr-2 text-base">inventory</span>
                  <span>Product</span>
                </div>
                <span class="material-icons text-base transition-transform" id="product-chevron">expand_more</span>
              </button>
              
              <!-- Product Submenu -->
              <div class="submenu" id="product-submenu">
                <a href="product-master.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="product-master">Product Master</a>
                <a href="product-import-export.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="product-import-export">Product Import/Export</a>
              </div>
            </div>
            <a href="accounting-preferences.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="accounting-preferences">
              <span class="material-icons mr-2 text-base">account_balance</span>
              <span>Accounting Preferences</span>
            </a>
            <!-- Diamonds - Nested Collapsible Menu -->
            <div class="space-y-1">
              <button id="diamonds-toggle" class="w-full flex items-center justify-between pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors font-medium">
                <div class="flex items-center">
                  <span class="material-icons mr-2 text-base">diamond</span>
                  <span>Diamonds</span>
                </div>
                <span class="material-icons text-base transition-transform" id="diamonds-chevron">expand_more</span>
              </button>
              
              <!-- Diamonds Submenu -->
              <div class="submenu" id="diamonds-submenu">
                <a href="diamond-master.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="diamond-master">Diamond Master</a>
                <a href="diamond-shapes.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="diamond-shapes">Diamond Shapes</a>
                <a href="diamond-clarities.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="diamond-clarities">Diamond Clarities</a>
                <a href="diamond-sizes.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="diamond-sizes">Diamond Sizes</a>
                <a href="diamond-colours.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="diamond-colours">Diamond Colours</a>
                <a href="diamond-cuts.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="diamond-cuts">Diamond Cuts</a>
                <a href="diamond-prices.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="diamond-prices">Diamond Price Updater</a>
                <a href="diamond-certificates.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="diamond-certificates">Diamond Certificates</a>
              </div>
            </div>
            <!-- Stones - Nested Collapsible Menu -->
            <div class="space-y-1">
              <button id="stones-toggle" class="w-full flex items-center justify-between pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors font-medium">
                <div class="flex items-center">
                  <span class="material-icons mr-2 text-base">style</span>
                  <span>Stones</span>
                </div>
                <span class="material-icons text-base transition-transform" id="stones-chevron">expand_more</span>
              </button>
              
              <!-- Stones Submenu -->
              <div class="submenu" id="stones-submenu">
                <a href="stone-master.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="stone-master">Stone Master</a>
                <a href="stone-types.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="stone-types">Stone Types</a>
                <a href="stone-shapes.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="stone-shapes">Stone Shapes</a>
                <a href="stone-colours.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="stone-colours">Stone Colours</a>
                <a href="stone-qualities.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="stone-qualities">Stone Qualities</a>
                <a href="stone-sizes.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="stone-sizes">Stone Sizes</a>
                <a href="stone-prices.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="stone-prices">Stone Price Updater</a>
              </div>
            </div>
            <!-- Order Settings - Nested Collapsible Menu -->
            <div class="space-y-1">
              <button id="order-settings-toggle" class="w-full flex items-center justify-between pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors font-medium">
                <div class="flex items-center">
                  <span class="material-icons mr-2 text-base">inventory_2</span>
                  <span>Order Settings</span>
                </div>
                <span class="material-icons text-base transition-transform" id="order-settings-chevron">expand_more</span>
              </button>
              
              <!-- Order Settings Submenu -->
              <div class="submenu" id="order-settings-submenu">
                <a href="order-type.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors">Order Type</a>
                <a href="category.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors">Category</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Management - Collapsible Menu -->
        <div class="space-y-1">
          <button id="order-management-toggle" class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/10 transition-colors font-medium text-left">
            <div class="flex items-center">
              <span class="material-icons mr-3">shopping_cart</span>
              <span>Order Management</span>
            </div>
            <span class="material-icons text-lg transition-transform" id="order-management-chevron">expand_more</span>
          </button>
          
          <!-- Submenu Items -->
          <div class="submenu" id="order-management-submenu">
            <a href="order-creation.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="order-creation">
              <span class="material-icons mr-2 text-base">add_shopping_cart</span>
              <span>Order Creation</span>
            </a>
            <a href="order-report.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="order-report">
              <span class="material-icons mr-2 text-base">assessment</span>
              <span>Order Report</span>
            </a>
            <a href="order-material-availability.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="order-material-availability">
              <span class="material-icons mr-2 text-base">inventory</span>
              <span>Material Availability</span>
            </a>
          </div>
        </div>

        <!-- Stock Management - Collapsible Menu -->
        <div class="space-y-1">
          <button id="stock-management-toggle" class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/10 transition-colors font-medium text-left">
            <div class="flex items-center">
              <span class="material-icons mr-3">inventory_2</span>
              <span>Stock Management</span>
            </div>
            <span class="material-icons text-lg transition-transform" id="stock-management-chevron">expand_more</span>
          </button>
          
          <!-- Submenu Items -->
          <div class="submenu" id="stock-management-submenu">
            <a href="stock-entry.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="stock-entry">
              <span class="material-icons mr-2 text-base">add_box</span>
              <span>Stock Entry</span>
            </a>
            <a href="alloy-creation.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="alloy-creation">
              <span class="material-icons mr-2 text-base">science</span>
              <span>Alloy Creation</span>
            </a>
            <a href="stock-adjustment.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="stock-adjustment">
              <span class="material-icons mr-2 text-base">tune</span>
              <span>Stock Adjustment</span>
            </a>
            <a href="stock-report.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="stock-report">
              <span class="material-icons mr-2 text-base">assessment</span>
              <span>Stock Report</span>
            </a>
            <a href="stock-import.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="stock-import">
              <span class="material-icons mr-2 text-base">upload_file</span>
              <span>Stock Import</span>
            </a>
          </div>
        </div>

        <!-- Bag Management - Collapsible Menu -->
        <div class="space-y-1">
          <button id="bag-management-toggle" class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/10 transition-colors font-medium text-left">
            <div class="flex items-center">
              <span class="material-icons mr-3">shopping_bag</span>
              <span>Bag Management</span>
            </div>
            <span class="material-icons text-lg transition-transform" id="bag-management-chevron">expand_more</span>
          </button>
          
          <!-- Submenu Items -->
          <div class="submenu" id="bag-management-submenu">
            <!-- Bag Creation & Overview - Nested Collapsible Menu -->
            <div class="space-y-1">
              <button id="bag-creation-overview-toggle" class="w-full flex items-center justify-between pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors font-medium">
                <div class="flex items-center">
                  <span class="material-icons mr-2 text-base">shopping_bag</span>
                  <span>Bag Creation & Overview</span>
                </div>
                <span class="material-icons text-base transition-transform" id="bag-creation-overview-chevron">expand_more</span>
              </button>
              
              <!-- Bag Creation & Overview Submenu -->
              <div class="submenu" id="bag-creation-overview-submenu">
                <a href="bag-creation.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="bag-creation">Create Bag</a>
                <a href="bag-management.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="bag-management">Bag Overview</a>
              </div>
            </div>
            <a href="material-issue-to-bag.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="material-issue-to-bag">
              <span class="material-icons mr-2 text-base">inventory</span>
              <span>Material Issue to Bag</span>
            </a>
            <a href="bag-movement.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="bag-movement">
              <span class="material-icons mr-2 text-base">swap_horiz</span>
              <span>Move Bag</span>
            </a>
            <a href="bag-receive.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="bag-receive">
              <span class="material-icons mr-2 text-base">inbox</span>
              <span>Receive Bag</span>
            </a>
            <a href="bag-qc.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="bag-qc">
              <span class="material-icons mr-2 text-base">fact_check</span>
              <span>Bag QC</span>
            </a>
            <a href="bag-adjustment.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="bag-adjustment">
              <span class="material-icons mr-2 text-base">tune</span>
              <span>Bag Item Adjustment</span>
            </a>
            <a href="loss-damage-report.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="loss-damage-report">
              <span class="material-icons mr-2 text-base">assessment</span>
              <span>Loss / Damage Report</span>
            </a>
          </div>
        </div>

        <!-- Catalogue - Collapsible Menu -->
        <div class="space-y-1">
          <button id="catalogue-toggle" class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/10 transition-colors font-medium text-left">
            <div class="flex items-center">
              <span class="material-icons mr-3">collections</span>
              <span>Catalogue</span>
            </div>
            <span class="material-icons text-lg transition-transform" id="catalogue-chevron">expand_more</span>
          </button>
          
          <!-- Submenu Items -->
          <div class="submenu" id="catalogue-submenu">
            <a href="products.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="products">
              <span class="material-icons mr-2 text-base">inventory</span>
              <span>Products</span>
            </a>
          </div>
        </div>

        <!-- POS - Collapsible Menu -->
        <div class="space-y-1">
          <button id="pos-toggle" class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/10 transition-colors font-medium text-left">
            <div class="flex items-center">
              <span class="material-icons mr-3">point_of_sale</span>
              <span>POS</span>
            </div>
            <span class="material-icons text-lg transition-transform" id="pos-chevron">expand_more</span>
          </button>
          
          <!-- Submenu Items -->
          <div class="submenu" id="pos-submenu">
            <a href="pos-dashboard.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="pos-dashboard">
              <span class="material-icons mr-2 text-base">dashboard</span>
              <span>POS Dashboard</span>
            </a>
            <a href="pos-stock-report.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="pos-stock-report">
              <span class="material-icons mr-2 text-base">inventory_2</span>
              <span>Product Stock Report</span>
            </a>
            <a href="pos-stock-adjustment.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="pos-stock-adjustment">
              <span class="material-icons mr-2 text-base">tune</span>
              <span>Stock Adjustment</span>
            </a>
            <a href="pos-billing.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="pos-billing">
              <span class="material-icons mr-2 text-base">receipt_long</span>
              <span>Billing</span>
            </a>
            <a href="pos-sales-report.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="pos-sales-report">
              <span class="material-icons mr-2 text-base">assessment</span>
              <span>Sales Report</span>
            </a>
            <a href="price-updater.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="price-updater">
              <span class="material-icons mr-2 text-base">currency_rupee</span>
              <span>Price Updater</span>
            </a>
            <a href="pos-rate-history.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="pos-rate-history">
              <span class="material-icons mr-2 text-base">history</span>
              <span>Rate History</span>
            </a>
            <a href="pos-purchase-entry.html" class="menu-link flex items-center pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="pos-purchase-entry">
              <span class="material-icons mr-2 text-base">shopping_cart</span>
              <span>Purchase Entry</span>
            </a>
            <!-- Gold Scheme - Nested Collapsible Menu -->
            <div class="space-y-1">
              <button id="gold-scheme-toggle" class="w-full flex items-center justify-between pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors font-medium">
                <div class="flex items-center">
                  <span class="material-icons mr-2 text-base">savings</span>
                  <span>Gold Scheme</span>
                </div>
                <span class="material-icons text-base transition-transform" id="gold-scheme-chevron">expand_more</span>
              </button>
              
              <!-- Gold Scheme Submenu -->
              <div class="submenu" id="gold-scheme-submenu">
                <a href="gold-scheme-master.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="gold-scheme-master">Gold Scheme Master</a>
                <a href="scheme-enrollment.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="scheme-enrollment">Scheme Enrollment</a>
                <a href="scheme-installment-collection.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="scheme-installment-collection">Installment Collection</a>
                <a href="scheme-redemption.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="scheme-redemption">Scheme Redemption</a>
                <a href="scheme-reports-dashboard.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="scheme-reports-dashboard">Reports Dashboard</a>
                <a href="liability-report.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="liability-report">Liability Report</a>
              </div>
            </div>
            <!-- Old Gold Purchase - Nested Collapsible Menu -->
            <div class="space-y-1">
              <button id="old-gold-purchase-toggle" class="w-full flex items-center justify-between pl-12 pr-4 py-2.5 text-sm rounded-lg hover:bg-primary/10 transition-colors font-medium">
                <div class="flex items-center">
                  <span class="material-icons mr-2 text-base">price_check</span>
                  <span>Old Gold Purchase</span>
                </div>
                <span class="material-icons text-base transition-transform" id="old-gold-purchase-chevron">expand_more</span>
              </button>
              
              <!-- Old Gold Purchase Submenu -->
              <div class="submenu" id="old-gold-purchase-submenu">
                <a href="old-gold-purchase.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="old-gold-purchase">Purchase Entry</a>
                <a href="old-gold-invoice.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="old-gold-invoice">View Invoice</a>
                <a href="old-gold-voucher.html" class="menu-link block pl-16 pr-4 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors" data-page="old-gold-voucher">View Voucher</a>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </aside>
  `;

  menuContainer.innerHTML = menuHtml;

  // Decide current page: prefer body data-page then fallback to filename
  var page = document.body && document.body.dataset && document.body.dataset.page;
  if (!page) {
    var file = (location.pathname.split('/').pop() || 'index.html');
    page = file.replace('.html', '') === 'index' ? 'home' : file.replace('.html', '');
  }

  // Set active state using JEMS styling
  var selector = '.menu-link[data-page="' + page + '"]';
  var active = menuContainer.querySelector(selector);
  if (active) {
    active.classList.add('bg-primary/20', 'text-primary', 'font-semibold');
    active.classList.remove('font-medium');
  }

  // Add click handler to set active state immediately on click
  menuContainer.querySelectorAll('.menu-link').forEach(function (a) {
    a.addEventListener('click', function () {
      // Remove active state from all links
      menuContainer.querySelectorAll('.menu-link').forEach(function (el) {
        el.classList.remove('bg-primary/20', 'text-primary', 'font-semibold');
        el.classList.add('font-medium');
      });
      // Add active state to clicked link
      a.classList.add('bg-primary/20', 'text-primary', 'font-semibold');
      a.classList.remove('font-medium');
    });
  });

  // Collapsible Master Settings Menu
  const masterToggle = menuContainer.querySelector('#master-toggle');
  if (masterToggle) {
    masterToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#master-submenu');
      const chevron = menuContainer.querySelector('#master-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Metal Menu
  const metalToggle = menuContainer.querySelector('#metal-toggle');
  if (metalToggle) {
    metalToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#metal-submenu');
      const chevron = menuContainer.querySelector('#metal-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Diamonds Menu
  const diamondsToggle = menuContainer.querySelector('#diamonds-toggle');
  if (diamondsToggle) {
    diamondsToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#diamonds-submenu');
      const chevron = menuContainer.querySelector('#diamonds-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Stones Menu
  const stonesToggle = menuContainer.querySelector('#stones-toggle');
  if (stonesToggle) {
    stonesToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#stones-submenu');
      const chevron = menuContainer.querySelector('#stones-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Product Menu
  const productToggle = menuContainer.querySelector('#product-toggle');
  if (productToggle) {
    productToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#product-submenu');
      const chevron = menuContainer.querySelector('#product-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Order Settings Menu
  const orderSettingsToggle = menuContainer.querySelector('#order-settings-toggle');
  if (orderSettingsToggle) {
    orderSettingsToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#order-settings-submenu');
      const chevron = menuContainer.querySelector('#order-settings-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Order Management Menu
  const orderManagementToggle = menuContainer.querySelector('#order-management-toggle');
  if (orderManagementToggle) {
    orderManagementToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#order-management-submenu');
      const chevron = menuContainer.querySelector('#order-management-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Stock Management Menu
  const stockManagementToggle = menuContainer.querySelector('#stock-management-toggle');
  if (stockManagementToggle) {
    stockManagementToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#stock-management-submenu');
      const chevron = menuContainer.querySelector('#stock-management-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Bag Management Menu
  const bagManagementToggle = menuContainer.querySelector('#bag-management-toggle');
  if (bagManagementToggle) {
    bagManagementToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#bag-management-submenu');
      const chevron = menuContainer.querySelector('#bag-management-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Catalogue Menu
  const catalogueToggle = menuContainer.querySelector('#catalogue-toggle');
  if (catalogueToggle) {
    catalogueToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#catalogue-submenu');
      const chevron = menuContainer.querySelector('#catalogue-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible POS Menu
  const posToggle = menuContainer.querySelector('#pos-toggle');
  if (posToggle) {
    posToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#pos-submenu');
      const chevron = menuContainer.querySelector('#pos-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Bag Creation & Overview Menu
  const bagCreationOverviewToggle = menuContainer.querySelector('#bag-creation-overview-toggle');
  if (bagCreationOverviewToggle) {
    bagCreationOverviewToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#bag-creation-overview-submenu');
      const chevron = menuContainer.querySelector('#bag-creation-overview-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Gold Scheme Menu
  const goldSchemeToggle = menuContainer.querySelector('#gold-scheme-toggle');
  if (goldSchemeToggle) {
    goldSchemeToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#gold-scheme-submenu');
      const chevron = menuContainer.querySelector('#gold-scheme-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }

  // Collapsible Old Gold Purchase Menu
  const oldGoldPurchaseToggle = menuContainer.querySelector('#old-gold-purchase-toggle');
  if (oldGoldPurchaseToggle) {
    oldGoldPurchaseToggle.addEventListener('click', function () {
      const submenu = menuContainer.querySelector('#old-gold-purchase-submenu');
      const chevron = menuContainer.querySelector('#old-gold-purchase-chevron');

      if (submenu && chevron) {
        submenu.classList.toggle('open');
        chevron.style.transform = submenu.classList.contains('open')
          ? 'rotate(180deg)'
          : 'rotate(0deg)';
      }
    });
  }
});
