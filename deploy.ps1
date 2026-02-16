# Deployment Script for JEMS Demo
# This script helps you deploy your website to the server

Write-Host "=== JEMS Demo Deployment Script ===" -ForegroundColor Cyan
Write-Host ""

# Server connection details
$SERVER_IP = "216.10.245.89"
$SERVER_USER = "root"
$SERVER_PASSWORD = "hgHnjbhk@45#"
$REMOTE_PATH = "/var/www/vhosts/cool-lamport.216-10-245-89.plesk.page/httpdocs/ecommerce-node-microservice/apps/frontend"

Write-Host "Server: $SERVER_USER@$SERVER_IP" -ForegroundColor Yellow
Write-Host "Remote Path: $REMOTE_PATH" -ForegroundColor Yellow
Write-Host ""

# Check if SSH is available
if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: SSH is not available. Please install OpenSSH or use PuTTY." -ForegroundColor Red
    Write-Host ""
    Write-Host "Option 1: Install OpenSSH Client (Windows 10/11)" -ForegroundColor Yellow
    Write-Host "  Run as Administrator: Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 2: Use PuTTY or WinSCP for file transfer" -ForegroundColor Yellow
    exit 1
}

Write-Host "Choose deployment method:" -ForegroundColor Cyan
Write-Host "1. SSH and run commands interactively" -ForegroundColor White
Write-Host "2. Generate deployment commands (copy-paste)" -ForegroundColor White
Write-Host "3. Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Connecting to server..." -ForegroundColor Green
        Write-Host "Note: You'll need to enter the password when prompted" -ForegroundColor Yellow
        Write-Host ""
        
        # Create a temporary script file with commands
        $tempScript = [System.IO.Path]::GetTempFileName()
        $commands = @"
cd $REMOTE_PATH
pwd
ls -la
echo ""
echo "Current directory contents listed above."
echo "To start the dev server, run: npm run dev"
echo "To exit, type: exit"
"@
        Set-Content -Path $tempScript -Value $commands
        
        # Use sshpass if available, otherwise manual password entry
        Write-Host "If you have sshpass installed, you can use:" -ForegroundColor Yellow
        Write-Host "  sshpass -p '$SERVER_PASSWORD' ssh $SERVER_USER@$SERVER_IP" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Otherwise, you'll be prompted for the password: $SERVER_PASSWORD" -ForegroundColor Yellow
        Write-Host ""
        
        # Connect via SSH
        ssh "$SERVER_USER@$SERVER_IP"
    }
    "2" {
        Write-Host ""
        Write-Host "=== Deployment Commands ===" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Copy and paste these commands into your terminal:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "# 1. Connect to server" -ForegroundColor Gray
        Write-Host "ssh $SERVER_USER@$SERVER_IP" -ForegroundColor White
        Write-Host ""
        Write-Host "# 2. Navigate to frontend directory" -ForegroundColor Gray
        Write-Host "cd $REMOTE_PATH" -ForegroundColor White
        Write-Host ""
        Write-Host "# 3. Check current files" -ForegroundColor Gray
        Write-Host "ls -la" -ForegroundColor White
        Write-Host ""
        Write-Host "# 4. If you need to upload files, use SCP or SFTP:" -ForegroundColor Gray
        Write-Host "# From your local machine (in PowerShell):" -ForegroundColor Gray
        Write-Host "scp -r * $SERVER_USER@$SERVER_IP`:$REMOTE_PATH" -ForegroundColor White
        Write-Host ""
        Write-Host "# 5. Install dependencies (if package.json exists)" -ForegroundColor Gray
        Write-Host "npm install" -ForegroundColor White
        Write-Host ""
        Write-Host "# 6. Start development server" -ForegroundColor Gray
        Write-Host "npm run dev" -ForegroundColor White
        Write-Host ""
        Write-Host "# OR for production build:" -ForegroundColor Gray
        Write-Host "npm run build" -ForegroundColor White
        Write-Host "npm start" -ForegroundColor White
        Write-Host ""
    }
    "3" {
        Write-Host "Exiting..." -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "Invalid choice. Exiting..." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "=== Security Note ===" -ForegroundColor Yellow
Write-Host "Remember to:" -ForegroundColor Yellow
Write-Host "- Change the default password after first login" -ForegroundColor White
Write-Host "- Use SSH keys instead of passwords for better security" -ForegroundColor White
Write-Host "- Never commit passwords to version control" -ForegroundColor White
Write-Host ""


