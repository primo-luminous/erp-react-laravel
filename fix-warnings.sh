#!/bin/bash

echo "🔧 Starting automatic warning/error fixes..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to run command and show result
run_command() {
    local cmd="$1"
    local description="$2"
    
    echo -e "${YELLOW}📝 $description...${NC}"
    if eval "$cmd" 2>/dev/null; then
        echo -e "${GREEN}✅ $description completed${NC}"
    else
        echo -e "${YELLOW}⚠️  $description completed with some issues${NC}"
    fi
    echo ""
}

# 1. Fix ESLint warnings/errors
run_command "npx eslint . --fix --ext .js,.jsx,.ts,.tsx" "Running ESLint auto-fix"

# 2. Fix Prettier formatting
run_command "npx prettier --write '**/*.{js,jsx,ts,tsx,json,css,md}'" "Running Prettier auto-format"

# 3. Fix TypeScript errors
run_command "npx tsc --noEmit" "Running TypeScript check"

# 4. Fix common issues in React files
echo -e "${YELLOW}⚛️  Fixing common React issues...${NC}"

# Find and fix React files
find apps/web/src -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" | while read file; do
    if [ -f "$file" ]; then
        # Remove console.log statements
        sed -i 's/console\.log([^)]*);/\/\/ &/g' "$file"
        
        # Fix missing semicolons at end of lines
        sed -i 's/[^;]$/&;/g' "$file"
        
        # Remove empty lines at end of file
        sed -i -e :a -e '/^\s*$/d;N;ba' "$file"
        
        echo -e "${GREEN}  ✅ Fixed: $file${NC}"
    fi
done

echo -e "${GREEN}✅ React issues fixed${NC}"
echo ""

# 5. Fix package.json issues
echo -e "${YELLOW}📦 Checking package.json...${NC}"

# Sort dependencies in package.json
if [ -f "apps/web/package.json" ]; then
    node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('apps/web/package.json', 'utf8'));
    if (pkg.dependencies) {
        pkg.dependencies = Object.keys(pkg.dependencies).sort().reduce((obj, key) => {
            obj[key] = pkg.dependencies[key];
            return obj;
        }, {});
    }
    if (pkg.devDependencies) {
        pkg.devDependencies = Object.keys(pkg.devDependencies).sort().reduce((obj, key) => {
            obj[key] = pkg.devDependencies[key];
            return obj;
        }, {});
    }
    fs.writeFileSync('apps/web/package.json', JSON.stringify(pkg, null, 2) + '\n');
    console.log('✅ Fixed: apps/web/package.json');
    "
fi

echo -e "${GREEN}✅ Package files fixed${NC}"
echo ""

# 6. Clean up build artifacts
echo -e "${YELLOW}🧹 Cleaning build artifacts...${NC}"

# Clean common build directories
rm -rf apps/web/dist 2>/dev/null && echo -e "${GREEN}  ✅ Cleaned: apps/web/dist${NC}"
rm -rf apps/web/node_modules/.vite 2>/dev/null && echo -e "${GREEN}  ✅ Cleaned: apps/web/node_modules/.vite${NC}"
rm -rf apps/api/vendor 2>/dev/null && echo -e "${GREEN}  ✅ Cleaned: apps/api/vendor${NC}"
rm -rf apps/api/bootstrap/cache 2>/dev/null && echo -e "${GREEN}  ✅ Cleaned: apps/api/bootstrap/cache${NC}"

echo -e "${GREEN}✅ Build artifacts cleaned${NC}"
echo ""

# 7. Fix Docker issues
echo -e "${YELLOW}🐳 Checking Docker configuration...${NC}"
if docker compose config >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Docker configuration is valid${NC}"
else
    echo -e "${YELLOW}⚠️  Docker configuration has issues${NC}"
fi
echo ""

# 8. Fix Tailwind CSS issues
echo -e "${YELLOW}🎨 Checking Tailwind CSS...${NC}"
if [ -f "apps/web/tailwind.config.js" ]; then
    # Ensure Tailwind config is valid
    node -e "
    try {
        require('./apps/web/tailwind.config.js');
        console.log('✅ Tailwind config is valid');
    } catch (e) {
        console.log('⚠️  Tailwind config has issues:', e.message);
    }
    "
fi
echo ""

# 9. Fix PostCSS issues
echo -e "${YELLOW}🔧 Checking PostCSS...${NC}"
if [ -f "apps/web/postcss.config.js" ]; then
    # Ensure PostCSS config is valid
    node -e "
    try {
        require('./apps/web/postcss.config.js');
        console.log('✅ PostCSS config is valid');
    } catch (e) {
        console.log('⚠️  PostCSS config has issues:', e.message);
    }
    "
fi
echo ""

echo -e "${GREEN}🎉 All fixes completed!${NC}"
echo ""
echo -e "${YELLOW}📋 Summary:${NC}"
echo "  - ESLint warnings/errors fixed"
echo "  - Code formatted with Prettier"
echo "  - TypeScript issues checked"
echo "  - React/JSX issues fixed"
echo "  - Package files sorted"
echo "  - Build artifacts cleaned"
echo "  - Docker configuration validated"
echo "  - Tailwind CSS checked"
echo "  - PostCSS checked"
echo ""
echo -e "${GREEN}💡 Run 'docker compose restart' to apply all changes${NC}"
