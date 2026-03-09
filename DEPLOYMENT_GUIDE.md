# LEXA Website - DigitalOcean Deployment Guide

Complete step-by-step guide to deploy this full-stack application on a DigitalOcean Ubuntu server.

## Table of Contents
1. [Server Requirements](#1-server-requirements)
2. [Initial Server Setup](#2-initial-server-setup)
3. [Install Dependencies](#3-install-dependencies)
4. [Clone & Setup Project](#4-clone--setup-project)
5. [Configure Environment](#5-configure-environment)
6. [Build & Run Application](#6-build--run-application)
7. [Setup Nginx Reverse Proxy](#7-setup-nginx-reverse-proxy)
8. [SSL Certificate (HTTPS)](#8-ssl-certificate-https)
9. [Process Management with PM2](#9-process-management-with-pm2)
10. [Firewall Configuration](#10-firewall-configuration)
11. [Maintenance & Updates](#11-maintenance--updates)

---

## 1. Server Requirements

### Minimum Specifications
- **OS:** Ubuntu 22.04 LTS or 24.04 LTS
- **RAM:** 2GB minimum (4GB recommended)
- **CPU:** 1 vCPU minimum (2 vCPU recommended)
- **Storage:** 25GB SSD minimum
- **DigitalOcean Droplet:** Basic $12/month or higher

### Required Software
- Node.js 18.x or 20.x
- Python 3.10+
- MongoDB 6.0+
- Nginx
- PM2 (Process Manager)
- Git

---

## 2. Initial Server Setup

### 2.1 Connect to your server
```bash
ssh root@your_server_ip
```

### 2.2 Update system packages
```bash
apt update && apt upgrade -y
```

### 2.3 Create a non-root user (recommended)
```bash
adduser lexa
usermod -aG sudo lexa
su - lexa
```

### 2.4 Set timezone
```bash
sudo timedatectl set-timezone Asia/Dubai
```

---

## 3. Install Dependencies

### 3.1 Install Node.js 20.x
```bash
# Install Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version

# Install Yarn globally
sudo npm install -g yarn
```

### 3.2 Install Python 3.10+ and pip
```bash
sudo apt install -y python3 python3-pip python3-venv

# Verify installation
python3 --version  # Should show 3.10+
pip3 --version
```

### 3.3 Install MongoDB 6.0
```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
mongo --eval "db.version()"
```

### 3.4 Install Nginx
```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3.5 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 3.6 Install additional dependencies
```bash
sudo apt install -y git curl build-essential
```

---

## 4. Clone & Setup Project

### 4.1 Create project directory
```bash
sudo mkdir -p /var/www/lexa
sudo chown -R $USER:$USER /var/www/lexa
cd /var/www/lexa
```

### 4.2 Clone the repository
```bash
# Option 1: From GitHub (if you pushed to GitHub)
git clone https://github.com/YOUR_USERNAME/lexa-website.git .

# Option 2: Upload via SFTP/SCP
# Use FileZilla or scp to upload the /app/frontend and /app/backend folders
```

### 4.3 Setup Backend
```bash
cd /var/www/lexa/backend

# Create Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Install emergent integrations (if used)
pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/

# Deactivate virtual environment
deactivate
```

### 4.4 Setup Frontend
```bash
cd /var/www/lexa/frontend

# Install Node.js dependencies
yarn install

# Build the production version
yarn build
```

---

## 5. Configure Environment

### 5.1 Backend Environment (.env)
```bash
cd /var/www/lexa/backend
nano .env
```

Add the following content:
```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=lexa_db

# Server Configuration
HOST=0.0.0.0
PORT=8001

# SFTP Storage (for file uploads) - Update with your credentials
SFTP_HOST=your_sftp_host
SFTP_USER=your_sftp_user
SFTP_PASSWORD=your_sftp_password
SFTP_REMOTE_PATH=/path/to/uploads
SFTP_BASE_URL=https://files.yourdomain.com

# Optional: API Keys (if using AI features)
# OPENAI_API_KEY=your_key
# EMERGENT_API_KEY=your_key
```

### 5.2 Frontend Environment (.env)
```bash
cd /var/www/lexa/frontend
nano .env
```

Add the following content:
```env
# Backend API URL (your domain with /api prefix)
REACT_APP_BACKEND_URL=https://yourdomain.com

# Or if using a subdomain for API:
# REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

### 5.3 Rebuild frontend after env changes
```bash
cd /var/www/lexa/frontend
yarn build
```

---

## 6. Build & Run Application

### 6.1 Test Backend manually
```bash
cd /var/www/lexa/backend
source venv/bin/activate
python server.py
# Press Ctrl+C to stop after verifying it works
deactivate
```

### 6.2 Test Frontend manually
```bash
cd /var/www/lexa/frontend
yarn start
# Press Ctrl+C to stop after verifying it works
```

---

## 7. Setup Nginx Reverse Proxy

### 7.1 Create Nginx configuration
```bash
sudo nano /etc/nginx/sites-available/lexa
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend - Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Backend API - FastAPI
    location /api {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Increase timeout for long-running requests
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        
        # Increase body size for file uploads
        client_max_body_size 50M;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

### 7.2 Enable the site
```bash
sudo ln -s /etc/nginx/sites-available/lexa /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 8. SSL Certificate (HTTPS)

### 8.1 Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 8.2 Obtain SSL certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts:
- Enter your email address
- Agree to terms of service
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### 8.3 Auto-renewal (automatic)
Certbot automatically sets up a cron job. Verify with:
```bash
sudo certbot renew --dry-run
```

---

## 9. Process Management with PM2

### 9.1 Create PM2 ecosystem file
```bash
cd /var/www/lexa
nano ecosystem.config.js
```

Add the following content:
```javascript
module.exports = {
  apps: [
    {
      name: 'lexa-backend',
      cwd: '/var/www/lexa/backend',
      script: 'venv/bin/python',
      args: 'server.py',
      interpreter: 'none',
      env: {
        HOST: '0.0.0.0',
        PORT: 8001
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      error_file: '/var/log/pm2/lexa-backend-error.log',
      out_file: '/var/log/pm2/lexa-backend-out.log',
      log_file: '/var/log/pm2/lexa-backend.log',
      time: true
    },
    {
      name: 'lexa-frontend',
      cwd: '/var/www/lexa/frontend',
      script: 'yarn',
      args: 'start',
      interpreter: 'none',
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: '/var/log/pm2/lexa-frontend-error.log',
      out_file: '/var/log/pm2/lexa-frontend-out.log',
      log_file: '/var/log/pm2/lexa-frontend.log',
      time: true
    }
  ]
};
```

### 9.2 Create log directory
```bash
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2
```

### 9.3 Start applications with PM2
```bash
cd /var/www/lexa
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs
```

### 9.4 Save PM2 configuration and setup startup
```bash
pm2 save
pm2 startup
# Run the command it outputs (will look like: sudo env PATH=... pm2 startup ...)
```

### 9.5 Useful PM2 commands
```bash
pm2 status              # Check status of all processes
pm2 logs                # View all logs
pm2 logs lexa-backend   # View backend logs only
pm2 restart all         # Restart all processes
pm2 restart lexa-backend # Restart backend only
pm2 stop all            # Stop all processes
pm2 delete all          # Remove all processes
pm2 monit               # Real-time monitoring dashboard
```

---

## 10. Firewall Configuration

### 10.1 Setup UFW (Uncomplicated Firewall)
```bash
# Allow SSH
sudo ufw allow ssh

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## 11. Maintenance & Updates

### 11.1 Update the application
```bash
cd /var/www/lexa

# Pull latest changes (if using Git)
git pull origin main

# Update backend dependencies
cd backend
source venv/bin/activate
pip install -r requirements.txt
deactivate

# Update frontend dependencies and rebuild
cd ../frontend
yarn install
yarn build

# Restart services
pm2 restart all
```

### 11.2 Database backup
```bash
# Create backup directory
mkdir -p /var/backups/mongodb

# Backup database
mongodump --db lexa_db --out /var/backups/mongodb/$(date +%Y%m%d)

# Restore database (if needed)
mongorestore --db lexa_db /var/backups/mongodb/20260309/lexa_db
```

### 11.3 Automated backups (cron job)
```bash
crontab -e
```
Add:
```
# Daily MongoDB backup at 2 AM
0 2 * * * mongodump --db lexa_db --out /var/backups/mongodb/$(date +\%Y\%m\%d) 2>&1 | logger -t mongodb-backup
```

### 11.4 Monitor server resources
```bash
# Install htop for better monitoring
sudo apt install -y htop

# View resource usage
htop

# Check disk space
df -h

# Check memory
free -m
```

---

## Quick Reference - Common Commands

```bash
# Start/Stop/Restart services
pm2 restart all
pm2 stop all
pm2 start all

# View logs
pm2 logs
tail -f /var/log/pm2/lexa-backend.log
tail -f /var/log/pm2/lexa-frontend.log

# Nginx
sudo systemctl restart nginx
sudo nginx -t

# MongoDB
sudo systemctl restart mongod
mongo lexa_db

# SSL Certificate renewal
sudo certbot renew
```

---

## Troubleshooting

### Backend not starting
```bash
# Check logs
pm2 logs lexa-backend

# Test manually
cd /var/www/lexa/backend
source venv/bin/activate
python server.py
```

### Frontend not building
```bash
# Clear cache and rebuild
cd /var/www/lexa/frontend
rm -rf .next node_modules
yarn install
yarn build
```

### MongoDB connection issues
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Nginx 502 Bad Gateway
```bash
# Check if backend/frontend are running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

---

## File Structure on Server

```
/var/www/lexa/
├── backend/
│   ├── venv/              # Python virtual environment
│   ├── server.py          # Main FastAPI application
│   ├── requirements.txt   # Python dependencies
│   ├── .env               # Backend environment variables
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   └── utils/             # Utility functions
├── frontend/
│   ├── node_modules/      # Node.js dependencies
│   ├── .next/             # Next.js build output
│   ├── app/               # Next.js pages
│   ├── components/        # React components
│   ├── .env               # Frontend environment variables
│   └── package.json       # Node.js dependencies list
└── ecosystem.config.js    # PM2 configuration
```

---

## Support

If you encounter issues:
1. Check the logs: `pm2 logs`
2. Verify all services are running: `pm2 status`
3. Test Nginx config: `sudo nginx -t`
4. Check MongoDB: `sudo systemctl status mongod`

---

**Last Updated:** March 9, 2026
