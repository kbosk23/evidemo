#!/bin/bash

# Create resource group
az group create --name reading-road-rg --location eastus

# Create App Service plan
az appservice plan create \
  --name reading-road-plan \
  --resource-group reading-road-rg \
  --sku B1 \
  --is-linux

# Create Web App
az webapp create \
  --resource-group reading-road-rg \
  --plan reading-road-plan \
  --name reading-road-app \
  --runtime "NODE|18-lts"

# Set environment variables
az webapp config appsettings set \
  --resource-group reading-road-rg \
  --name reading-road-app \
  --settings \
    NODE_ENV="production" \
    HUME_API_KEY="$HUME_API_KEY" \
    HUME_SECRET_KEY="$HUME_SECRET_KEY" \
    NEXT_PUBLIC_HUME_CONFIG_ID="$NEXT_PUBLIC_HUME_CONFIG_ID"

# Enable logging
az webapp log config \
  --resource-group reading-road-rg \
  --name reading-road-app \
  --web-server-logging filesystem 