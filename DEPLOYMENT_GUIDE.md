# JEMS Demo Deployment Guide

This guide will help you deploy your JEMS demo website to the server.

## Prerequisites

1. **SSH Client**: 
   - Windows 10/11: OpenSSH is usually pre-installed
   - If not available, install it: `Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0` (run as Administrator)
   - Alternative: Use PuTTY or WinSCP

2. **Server Access**:
   - IP: `216.10.245.89`
   - User: `root`
   - Password: `hgHnjbhk@45#`

## Quick Start

### Option 1: Using the PowerShell Script

Run the deployment script:
```powershell
.\deploy.ps1
```

### Option 2: Manual Deployment

#### Step 1: Connect to Server
```bash
ssh root@216.10.245.89
```
When prompted, enter the password: `hgHnjbhk@45#`

#### Step 2: Navigate to Frontend Directory
```bash
cd /var/www/vhosts/cool-lamport.216-10-245-89.plesk.page/httpdocs/ecommerce-node-microservice/apps/frontend
```

#### Step 3: Check Current Files
```bash
ls -la
```

#### Step 4: Upload Your Files

**From your local machine (in a new PowerShell window):**

Navigate to your project directory:
```powershell
cd C:\Users\HP\Documents\GitHub\JEMS-demo
```

Upload files using SCP:
```powershell
scp -r * root@216.10.245.89:/var/www/vhosts/cool-lamport.216-10-245-89.plesk.page/httpdocs/ecommerce-node-microservice/apps/frontend
```

**Or use SFTP:**
```powershell
sftp root@216.10.245.89
cd /var/www/vhosts/cool-lamport.216-10-245-89.plesk.page/httpdocs/ecommerce-node-microservice/apps/frontend
put -r *
exit
```

#### Step 5: Install Dependencies (if needed)

If there's a `package.json` file:
```bash
npm install
```

#### Step 6: Start the Server

**For Development:**
```bash
npm run dev
```

**For Production:**
```bash
npm run build
npm start
```

Or if using a process manager like PM2:
```bash
pm2 start npm --name "jems-frontend" -- run dev
pm2 save
pm2 startup
```

## Important Notes

### Development vs Production

- **`npm run dev`**: Starts a development server (usually with hot-reload)
  - Good for testing and development
  - May not be suitable for production use
  
- **Production Deployment**: 
  - Build the project: `npm run build`
  - Serve static files with a web server (nginx, Apache, or Node.js server)
  - Use a process manager like PM2 to keep it running

### Static HTML Files

Since your project contains static HTML files, you might not need Node.js at all. You can:

1. **Copy files directly** to the web server directory
2. **Configure the web server** (nginx/Apache) to serve static files
3. **No npm commands needed** if it's just static HTML

### Security Recommendations

1. **Change the default password** after first login
2. **Set up SSH keys** instead of using passwords:
   ```bash
   # On your local machine
   ssh-keygen -t rsa -b 4096
   ssh-copy-id root@216.10.245.89
   ```
3. **Never commit passwords** to version control
4. **Use environment variables** for sensitive data

### Troubleshooting

#### Connection Issues
- Check if SSH port (22) is open
- Verify the IP address and credentials
- Try using `-v` flag for verbose output: `ssh -v root@216.10.245.89`

#### Permission Issues
- Check file permissions: `ls -la`
- May need to change ownership: `chown -R root:root .`

#### Port Already in Use
- Check what's running on the port: `lsof -i :3000` or `netstat -tulpn`
- Kill the process or use a different port

#### Node.js Not Found
- Install Node.js on the server: 
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  apt-get install -y nodejs
  ```

## File Structure

Your project structure:
```
JEMS-demo/
├── menu-demo/
│   ├── stock-report.html
│   ├── menu.js
│   └── ...
├── AlloyCreation.html
├── customer.html
└── ...
```

The server expects files at:
```
/var/www/vhosts/cool-lamport.216-10-245-89.plesk.page/httpdocs/ecommerce-node-microservice/apps/frontend/
```

## Next Steps

1. Upload your files to the server
2. Verify files are in the correct location
3. Start the development server or configure web server
4. Access your website via the domain/IP address
5. Set up proper production deployment if needed

## Support

If you encounter issues:
1. Check server logs
2. Verify file permissions
3. Ensure Node.js and npm are installed (if needed)
4. Check firewall settings


