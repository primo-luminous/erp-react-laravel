# ERP System - Enterprise Resource Planning

A modern ERP system built with React (Frontend) and Laravel (Backend) using Docker.

## 🚀 Quick Start

### Prerequisites

- Docker Desktop
- Node.js (for scripts)
- Git

### Start the Project

**Option 1: Using npm (Recommended)**

```bash
npm start
```

**Option 2: Platform-specific scripts**

```bash
# Windows
npm run start:win

# Linux/Mac
npm run start:unix

# Direct execution
node start-project.js
```

### What happens when you start:

1. 🔧 **Auto-fix warnings/errors** - Runs fix-warnings script
2. 🐳 **Check Docker** - Verifies Docker is running
3. 🏗️ **Build containers** - Builds and starts all services
4. ⏳ **Wait for ready** - Waits for services to initialize
5. 📊 **Show status** - Displays service status and URLs

## 🌐 Access URLs

- **Frontend (React)**: http://localhost:5173
- **Backend API**: http://localhost/api/v1
- **Database (pgAdmin)**: http://localhost:5050
- **MailHog**: http://localhost:8025
- **MinIO**: http://localhost:9001
- **Meilisearch**: http://localhost:7700

## 🔑 Default Credentials

- **ERP Login**: admin@example.com / admin1234
- **pgAdmin**: admin@admin.com / admin

## 📋 Available Scripts

### Project Management

```bash
npm start          # Start project with auto-fix
npm run dev        # Alias for start
npm run start:win  # Windows PowerShell
npm run start:unix # Linux/Mac Bash
```

### Code Quality

```bash
npm run fix        # Fix warnings/errors
npm run fix:win    # Windows PowerShell
npm run fix:unix   # Linux/Mac Bash
npm run lint       # Check linting
npm run lint:fix   # Fix linting issues
npm run format     # Format code with Prettier
npm run type-check # Check TypeScript types
```

### Docker Management

```bash
npm run docker:restart # Restart containers
npm run docker:logs    # View logs
npm run docker:status  # Check status
npm run docker:stop    # Stop containers
npm run docker:build   # Build and start
```

### Maintenance

```bash
npm run clean      # Clean build artifacts
```

## 🏗️ Architecture

### Frontend (React + Vite)

- **Location**: `apps/web/`
- **Port**: 5173
- **Features**: Modern UI with Tailwind CSS, Role-based access

### Backend (Laravel + PHP-FPM)

- **Location**: `apps/api/`
- **Port**: 80 (via nginx)
- **Features**: REST API, Authentication, RBAC

### Database (PostgreSQL)

- **Port**: 5432
- **Database**: erp
- **Admin**: pgAdmin on port 5050

### Additional Services

- **Redis**: Caching and queues
- **MailHog**: Email testing
- **MinIO**: S3-compatible storage
- **Meilisearch**: Full-text search

## 🔧 Development

### Manual Docker Commands

```bash
# Start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Restart specific service
docker compose restart web
```

### Code Structure

```
erp/
├── apps/
│   ├── web/          # React frontend
│   └── api/          # Laravel backend
├── infra/
│   └── docker/       # Docker configurations
├── start-project.js  # Main startup script
├── fix-warnings.js   # Auto-fix script
└── package.json      # NPM scripts
```

## 🐛 Troubleshooting

### Common Issues

1. **Docker not running**
   - Install Docker Desktop
   - Start Docker Desktop
   - Run `docker --version` to verify

2. **Port conflicts**
   - Check if ports 5173, 80, 5432, 5050 are free
   - Stop conflicting services

3. **Build failures**
   - Run `npm run clean` to clean artifacts
   - Run `docker compose down` and restart

4. **Permission issues (Linux/Mac)**
   - Run `chmod +x *.sh` to make scripts executable

### Getting Help

- Check logs: `npm run docker:logs`
- Check status: `npm run docker:status`
- Restart services: `npm run docker:restart`

## 📝 Features

### Core/Admin Module

- ✅ User Management
- ✅ Role & Permission (RBAC)
- ✅ Department Management
- ✅ Company Information
- ✅ System Settings
- ✅ Audit Logs

### UI/UX

- ✅ Modern responsive design
- ✅ Tailwind CSS styling
- ✅ Role-based navigation
- ✅ Professional dashboard
- ✅ Clean sign-in page

## 🚀 Next Steps

1. **HR Module**: Employee management, attendance, payroll
2. **Accounting Module**: Invoicing, expenses, reports
3. **Sales Module**: CRM, leads, opportunities
4. **Inventory Module**: Stock management, suppliers
5. **Project Module**: Task management, time tracking

---

**Happy Coding! 🎉**
# erp-react-laravel
