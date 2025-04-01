#!/bin/bash
# Startup script for Azure App Service
set -e

# Change to the app directory
cd /home/site/wwwroot

# Clean install dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building the application..."
npm run build

# Start the application
echo "Starting the application..."
npm start 