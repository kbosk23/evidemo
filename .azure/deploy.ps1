# Set variables
$resourceGroup = "RRSandbox"
$webAppName = "reading-road-voice-demo"
$location = "canadacentral"
$sku = "B1"

# Function to check if command was successful
function Test-CommandSuccess {
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Command failed with exit code $LASTEXITCODE"
        exit $LASTEXITCODE
    }
}

# Function to log status
function Write-Status {
    param(
        [string]$Message,
        [string]$Status = "INFO"
    )
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] [$Status] $Message"
}

# Ensure we're logged in
Write-Status "Checking Azure login status..."
$account = az account show --query name -o tsv
if ($LASTEXITCODE -ne 0) {
    Write-Status "Please log in to Azure first using 'az login'" -Status "ERROR"
    exit 1
}
Write-Status "Logged in as: $account" -Status "SUCCESS"

# Create App Service Plan
Write-Status "Creating App Service Plan..."
$planName = "$webAppName-plan"
az appservice plan create `
    --name $planName `
    --resource-group $resourceGroup `
    --sku $sku `
    --is-linux
Test-CommandSuccess
Write-Status "App Service Plan created successfully" -Status "SUCCESS"

# Create Web App
Write-Status "Creating Web App..."
az webapp create `
    --resource-group $resourceGroup `
    --plan $planName `
    --name $webAppName `
    --runtime "NODE:18-lts"
Test-CommandSuccess
Write-Status "Web App created successfully" -Status "SUCCESS"

# Configure Web App
Write-Status "Configuring Web App settings..."
az webapp config set `
    --resource-group $resourceGroup `
    --name $webAppName `
    --linux-fx-version "NODE:18-lts" `
    --number-of-workers 1 `
    --use-32bit-worker-process false
Test-CommandSuccess
Write-Status "Web App configuration completed" -Status "SUCCESS"

# Set environment variables
Write-Status "Setting environment variables..."
az webapp config appsettings set `
    --resource-group $resourceGroup `
    --name $webAppName `
    --settings `
        WEBSITE_NODE_DEFAULT_VERSION="18-lts" `
        NODE_ENV="production" `
        PORT=8080 `
        STARTUP_COMMAND="npm run build && npm start" `
        SCM_DO_BUILD_DURING_DEPLOYMENT=true `
        WEBSITE_RUN_FROM_PACKAGE=0 `
        HUME_API_KEY=$env:HUME_API_KEY `
        HUME_SECRET_KEY=$env:HUME_SECRET_KEY `
        NEXT_PUBLIC_HUME_CONFIG_ID=$env:NEXT_PUBLIC_HUME_CONFIG_ID
Test-CommandSuccess
Write-Status "Environment variables set successfully" -Status "SUCCESS"

# Deploy using Azure CLI's built-in deployment
Write-Status "Deploying application to Azure..."
az webapp up `
    --name $webAppName `
    --resource-group $resourceGroup `
    --runtime "NODE:18-lts" `
    --sku $sku `
    --location $location `
    --plan $planName
Test-CommandSuccess
Write-Status "Deployment completed successfully" -Status "SUCCESS"

Write-Host "`nDeployment Summary:"
Write-Host "-----------------"
Write-Host "Application URL: https://$webAppName.azurewebsites.net"
Write-Host "Deployment Logs: https://$webAppName.scm.azurewebsites.net/api/deployments"
Write-Host "Resource Group: $resourceGroup"
Write-Host "App Service Plan: $planName"
Write-Host "Web App Name: $webAppName" 