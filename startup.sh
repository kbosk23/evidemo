#!/bin/bash
# Startup script for Azure App Service
# Added for deployment trigger
cd /home/site/wwwroot

# Install dependencies
npm install
npm install -D typescript @types/node

# Build and start the application
npm run build
npm start 