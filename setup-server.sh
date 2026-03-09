#!/bin/bash

# ============================================
# LEXA Website - Quick Setup Script
# Run this on a fresh Ubuntu 22.04/24.04 server
# ============================================

set -e  # Exit on error

echo "========================================"
echo "  LEXA Website - Server Setup Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1/8: Updating system packages...${NC}"
apt update && apt upgrade -y

echo -e "${YELLOW}Step 2/8: Installing Node.js 20.x...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g yarn pm2

echo -e "${YELLOW}Step 3/8: Installing Python 3...${NC}"
apt install -y python3 python3-pip python3-venv

echo -e "${YELLOW}Step 4/8: Installing MongoDB 6.0...${NC}"
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | \
   tee /etc/apt/sources.list.d/mongodb-org-6.0.list

apt update
apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod

echo -e "${YELLOW}Step 5/8: Installing Nginx...${NC}"
apt install -y nginx
systemctl start nginx
systemctl enable nginx

echo -e "${YELLOW}Step 6/8: Installing additional tools...${NC}"
apt install -y git curl build-essential certbot python3-certbot-nginx htop

echo -e "${YELLOW}Step 7/8: Creating project directory...${NC}"
mkdir -p /var/www/lexa
mkdir -p /var/log/pm2

echo -e "${YELLOW}Step 8/8: Setting up firewall...${NC}"
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

echo ""
echo -e "${GREEN}========================================"
echo "  Base Setup Complete!"
echo "========================================${NC}"
echo ""
echo "Installed versions:"
echo "  - Node.js: $(node --version)"
echo "  - npm: $(npm --version)"
echo "  - Yarn: $(yarn --version)"
echo "  - Python: $(python3 --version)"
echo "  - MongoDB: $(mongod --version | head -1)"
echo "  - Nginx: $(nginx -v 2>&1)"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Upload your project files to /var/www/lexa/"
echo "2. Configure backend/.env and frontend/.env"
echo "3. Run the project setup:"
echo "   cd /var/www/lexa/backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
echo "   cd /var/www/lexa/frontend && yarn install && yarn build"
echo "4. Configure Nginx (see DEPLOYMENT_GUIDE.md)"
echo "5. Start with PM2: pm2 start ecosystem.config.js"
echo "6. Setup SSL: sudo certbot --nginx -d yourdomain.com"
echo ""
echo "See DEPLOYMENT_GUIDE.md for detailed instructions."
