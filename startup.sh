#!/bin/bash
# Startup script for Azure App Service
# Added for deployment trigger
cd /home/site/wwwroot

# Install pnpm if not already installed
if ! command -v pnpm &> /dev/null; then
    npm install -g pnpm
fi

# Install dependencies
pnpm install --frozen-lockfile
pnpm add -D typescript @types/node

# Build and start the application
pnpm run build
pnpm start 