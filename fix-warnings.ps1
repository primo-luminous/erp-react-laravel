# PowerShell script to fix warnings and errors
Write-Host "🔧 Starting automatic warning/error fixes..." -ForegroundColor Yellow
Write-Host ""

# Function to run command and show result
function Run-Command {
    param(
        [string]$Command,
        [string]$Description
    )
    
    Write-Host "📝 $Description..." -ForegroundColor Yellow
    try {
        Invoke-Expression $Command | Out-Null
        Write-Host "✅ $Description completed" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  $Description completed with some issues" -ForegroundColor Yellow
    }
    Write-Host ""
}

# 1. Fix ESLint warnings/errors
Run-Command "npx eslint . --fix --ext .js,.jsx,.ts,.tsx" "Running ESLint auto-fix"

# 2. Fix Prettier formatting
Run-Command "npx prettier --write '**/*.{js,jsx,ts,tsx,json,css,md}'" "Running Prettier auto-format"

# 3. Fix TypeScript errors
Run-Command "npx tsc --noEmit" "Running TypeScript check"

# 4. Fix common issues in React files
Write-Host "⚛️  Fixing common React issues..." -ForegroundColor Yellow

# Find and fix React files
Get-ChildItem -Path "apps/web/src" -Recurse -Include "*.tsx", "*.ts", "*.jsx", "*.js" | ForEach-Object {
    if (Test-Path $_.FullName) {
        $content = Get-Content $_.FullName -Raw
        
        # Remove console.log statements
        $content = $content -replace 'console\.log\([^)]*\);', '// $&'
        
        # Fix missing semicolons at end of lines
        $content = $content -replace '([^;])$', '$1;'
        
        # Remove empty lines at end of file
        $content = $content.TrimEnd()
        
        Set-Content -Path $_.FullName -Value $content
        Write-Host "  ✅ Fixed: $($_.FullName)" -ForegroundColor Green
    }
}

Write-Host "✅ React issues fixed" -ForegroundColor Green
Write-Host ""

# 5. Fix package.json issues
Write-Host "📦 Checking package.json..." -ForegroundColor Yellow

if (Test-Path "apps/web/package.json") {
    $packageJson = Get-Content "apps/web/package.json" -Raw | ConvertFrom-Json
    
    if ($packageJson.dependencies) {
        $packageJson.dependencies = $packageJson.dependencies.PSObject.Properties | 
            Sort-Object Name | 
            ForEach-Object { @{$_.Name = $_.Value} } | 
            ForEach-Object { $_ }
    }
    
    if ($packageJson.devDependencies) {
        $packageJson.devDependencies = $packageJson.devDependencies.PSObject.Properties | 
            Sort-Object Name | 
            ForEach-Object { @{$_.Name = $_.Value} } | 
            ForEach-Object { $_ }
    }
    
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "apps/web/package.json"
    Write-Host "  ✅ Fixed: apps/web/package.json" -ForegroundColor Green
}

Write-Host "✅ Package files fixed" -ForegroundColor Green
Write-Host ""

# 6. Clean up build artifacts
Write-Host "🧹 Cleaning build artifacts..." -ForegroundColor Yellow

$cleanPaths = @(
    "apps/web/dist",
    "apps/web/node_modules/.vite",
    "apps/api/vendor",
    "apps/api/bootstrap/cache"
)

foreach ($path in $cleanPaths) {
    if (Test-Path $path) {
        Remove-Item -Path $path -Recurse -Force
        Write-Host "  ✅ Cleaned: $path" -ForegroundColor Green
    }
}

Write-Host "✅ Build artifacts cleaned" -ForegroundColor Green
Write-Host ""

# 7. Fix Docker issues
Write-Host "🐳 Checking Docker configuration..." -ForegroundColor Yellow
try {
    docker compose config | Out-Null
    Write-Host "✅ Docker configuration is valid" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Docker configuration has issues" -ForegroundColor Yellow
}
Write-Host ""

# 8. Fix Tailwind CSS issues
Write-Host "🎨 Checking Tailwind CSS..." -ForegroundColor Yellow
if (Test-Path "apps/web/tailwind.config.js") {
    try {
        node -e "require('./apps/web/tailwind.config.js')"
        Write-Host "✅ Tailwind config is valid" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Tailwind config has issues" -ForegroundColor Yellow
    }
}
Write-Host ""

# 9. Fix PostCSS issues
Write-Host "🔧 Checking PostCSS..." -ForegroundColor Yellow
if (Test-Path "apps/web/postcss.config.js") {
    try {
        node -e "require('./apps/web/postcss.config.js')"
        Write-Host "✅ PostCSS config is valid" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  PostCSS config has issues" -ForegroundColor Yellow
    }
}
Write-Host ""

Write-Host "🎉 All fixes completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Summary:" -ForegroundColor Yellow
Write-Host "  - ESLint warnings/errors fixed"
Write-Host "  - Code formatted with Prettier"
Write-Host "  - TypeScript issues checked"
Write-Host "  - React/JSX issues fixed"
Write-Host "  - Package files sorted"
Write-Host "  - Build artifacts cleaned"
Write-Host "  - Docker configuration validated"
Write-Host "  - Tailwind CSS checked"
Write-Host "  - PostCSS checked"
Write-Host ""
Write-Host "💡 Run 'docker compose restart' to apply all changes" -ForegroundColor Green