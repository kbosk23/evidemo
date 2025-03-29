# Set variables
$resourceGroup = "RRSandbox"
$webAppName = "reading-road-voice-demo"
$location = "eastus"
$sku = "B1"
$nodeVersion = "18.17"

# Function to check if command was successful
function Test-CommandSuccess {
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Command failed with exit code $LASTEXITCODE"
        exit $LASTEXITCODE
    }
}

# Ensure we're logged in
Write-Host "Checking Azure login status..."
$account = az account show --query name -o tsv
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please log in to Azure first using 'az login'"
    exit 1
}
Write-Host "Logged in as: $account"

# Delete existing resources if they exist
Write-Host "Removing existing resources if they exist..."
az webapp delete --name $webAppName --resource-group $resourceGroup
az appservice plan delete --name "$webAppName-plan" --resource-group $resourceGroup --yes
Start-Sleep -Seconds 30  # Wait for the deletion to complete

# Create App Service Plan
Write-Host "Creating App Service Plan..."
$planName = "$webAppName-plan"
az appservice plan create `
    --name $planName `
    --resource-group $resourceGroup `
    --sku $sku `
    --is-linux
Test-CommandSuccess

# Create Web App
Write-Host "Creating Web App..."
az webapp create `
    --resource-group $resourceGroup `
    --plan $planName `
    --name $webAppName `
    --runtime "NODE:18-lts"
Test-CommandSuccess

# Configure Web App
Write-Host "Configuring Web App settings..."
az webapp config set `
    --resource-group $resourceGroup `
    --name $webAppName `
    --linux-fx-version "NODE:18-lts" `
    --number-of-workers 1 `
    --use-32bit-worker-process false
Test-CommandSuccess

# Set environment variables
Write-Host "Setting environment variables..."
az webapp config appsettings set `
    --resource-group $resourceGroup `
    --name $webAppName `
    --settings `
        WEBSITE_RUN_FROM_PACKAGE=0 `
        SCM_DO_BUILD_DURING_DEPLOYMENT=true `
        ENABLE_ORYX_BUILD=true `
        WEBSITE_NODE_DEFAULT_VERSION="18-lts" `
        NODE_ENV="production" `
        BUILD_FLAGS="--platform nodejs --platform-version 18-lts" `
        HUME_API_KEY=$env:HUME_API_KEY `
        HUME_SECRET_KEY=$env:HUME_SECRET_KEY `
        NEXT_PUBLIC_HUME_CONFIG_ID=$env:NEXT_PUBLIC_HUME_CONFIG_ID `
        SCM_DO_BUILD_DURING_DEPLOYMENT=true `
        WEBSITE_RUN_FROM_PACKAGE=0 `
        PORT=8080 `
        STARTUP_COMMAND="npm run start"
Test-CommandSuccess

# Configure deployment source
Write-Host "Configuring deployment source..."
az webapp deployment source config-local-git `
    --name $webAppName `
    --resource-group $resourceGroup
Test-CommandSuccess

# Get the deployment URL
$deploymentUrl = az webapp deployment source show `
    --name $webAppName `
    --resource-group $resourceGroup `
    --query url `
    --output tsv
Test-CommandSuccess

Write-Host "Deployment URL: $deploymentUrl"

# Initialize git repository
Write-Host "Initializing git repository..."
if (Test-Path ".git") {
    Remove-Item -Path ".git" -Recurse -Force
}
git init
git config --global user.email "deploy@azure.com"
git config --global user.name "Azure Deploy"
git add .
git commit -m "Initial commit"

# Add Azure remote
Write-Host "Adding Azure remote..."
git remote add azure $deploymentUrl

# Push to Azure
Write-Host "Pushing to Azure..."
git push azure main --force
Test-CommandSuccess

Write-Host "`nDeployment completed!`n"
Write-Host "Your application will be available at: https://$webAppName.azurewebsites.net"
Write-Host "You can check the deployment logs at: https://$webAppName.scm.azurewebsites.net/api/deployments" 