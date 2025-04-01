#!/bin/bash
# Startup script for Azure App Service
# Added for deployment trigger
cd /home/site/wwwroot
pnpm install --frozen-lockfile
pnpm run build
pnpm start 