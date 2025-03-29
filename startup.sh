#!/bin/bash
# Startup script for Azure App Service
# Added for deployment trigger
cd /home/site/wwwroot
npm install
npm run build
npm start 