# 🏢 Core Platform - Enterprise Authentication & Management System

## 📋 Overview

Core Platform เป็นระบบศูนย์กลางสำหรับการจัดการผู้ใช้ บทบาท สิทธิ์ และระบบต่างๆ ในแพลตฟอร์ม Enterprise ที่รองรับการขยายระบบได้อย่างไม่จำกัด

## 🎯 Key Features

### 🔐 Centralized Authentication
- **Single Sign-On (SSO)** - ล็อกอินครั้งเดียวเข้าถึงทุกระบบ
- **JWT/Sanctum Token** - ระบบ Token ที่ปลอดภัย
- **Session Management** - จัดการ Session หลายเครื่อง
- **Device Tracking** - ติดตามอุปกรณ์ที่เข้าสู่ระบบ

### 👥 User Management
- **Multi-Company Support** - รองรับหลายบริษัท
- **Department Hierarchy** - โครงสร้างแผนกแบบลำดับชั้น
- **Employee Management** - จัดการข้อมูลพนักงาน
- **Profile Management** - จัดการโปรไฟล์ผู้ใช้

### 🛡️ Role-Based Access Control (RBAC)
- **Namespace Permissions** - สิทธิ์แบบ namespace (เช่น `erp.users.view`)
- **Module-Based Roles** - บทบาทแยกตาม Module
- **Hierarchical Permissions** - สิทธิ์แบบลำดับชั้น
- **Dynamic Permission Checking** - ตรวจสอบสิทธิ์แบบ Real-time

### 📊 System Registry
- **System Registration** - ลงทะเบียนระบบใหม่
- **Dynamic Navigation** - เมนูนำทางแบบ Dynamic
- **Permission Mapping** - แผนที่สิทธิ์ของแต่ละระบบ
- **Configuration Management** - จัดการการตั้งค่าระบบ

### 📝 Audit & Logging
- **Comprehensive Logging** - บันทึกการใช้งานครบถ้วน
- **Cross-System Tracking** - ติดตามข้ามระบบ
- **User Activity Monitoring** - ติดตามกิจกรรมผู้ใช้
- **Security Audit Trail** - ตรวจสอบความปลอดภัย

## 🏗️ Architecture

### 📁 Backend Structure
```
apps/api/
├── app/
│   ├── Models/Core/
│   │   ├── User.php
│   │   ├── Role.php
│   │   ├── Permission.php
│   │   ├── Company.php
│   │   ├── Department.php
│   │   ├── SystemRegistry.php
│   │   ├── AuditLog.php
│   │   └── UserSession.php
│   └── Http/Controllers/Api/Core/
│       ├── AuthController.php
│       ├── UserController.php
│       └── SystemRegistryController.php
├── database/
│   ├── migrations/
│   │   └── 2024_01_01_000001_create_core_platform_tables.php
│   └── seeders/
│       └── CorePlatformSeeder.php
└── routes/
    └── api/
        └── core.php
```

### 📁 Frontend Structure
```
apps/web/src/
├── services/core/
│   ├── AuthService.ts
│   └── SystemRegistryService.ts
├── context/
│   └── CoreAuthContext.tsx
├── components/core/
│   ├── SystemNavigator.tsx
│   ├── ProtectedRoute.tsx
│   └── PermissionGate.tsx
└── pages/core/
    ├── LoginPage.tsx
    └── DashboardPage.tsx
```

## 🚀 Quick Start

### 1. Database Setup
```bash
cd apps/api
php artisan migrate
php artisan db:seed --class=CorePlatformSeeder
```

### 2. Start Development Servers
```bash
# Backend
cd apps/api
php artisan serve

# Frontend
cd apps/web
npm run dev
```

### 3. Access the System
- **URL**: http://localhost:3000/login
- **Demo Credentials**:
  - Super Admin: `admin@enterprise-platform.com` / `admin1234`
  - ERP Admin: `erp.admin@enterprise-platform.com` / `admin1234`
  - Car Rental Manager: `rental.manager@enterprise-platform.com` / `admin1234`
  - Classroom Manager: `classroom.manager@enterprise-platform.com` / `admin1234`

## 📚 API Documentation

### Authentication Endpoints
```http
POST /api/core/auth/login
POST /api/core/auth/logout
POST /api/core/auth/refresh
GET  /api/core/auth/me
GET  /api/core/auth/sessions
GET  /api/core/auth/check-system/{systemKey}
```

### User Management Endpoints
```http
GET    /api/core/users
POST   /api/core/users
GET    /api/core/users/{id}
PUT    /api/core/users/{id}
DELETE /api/core/users/{id}
POST   /api/core/users/{id}/roles
GET    /api/core/users/{id}/permissions
```

### System Registry Endpoints
```http
GET  /api/core/systems
POST /api/core/systems
GET  /api/core/systems/{systemKey}
PUT  /api/core/systems/{systemKey}
DELETE /api/core/systems/{systemKey}
GET  /api/core/systems/navigation
```

## 🔧 Configuration

### System Registration Example
```php
SystemRegistry::create([
    'system_key' => 'new_system',
    'name' => 'New System',
    'display_name' => 'New System',
    'description' => 'Description of new system',
    'version' => '1.0.0',
    'icon' => 'NewIcon',
    'color' => '#FF6B6B',
    'url_prefix' => '/new-system',
    'api_base_url' => '/api/new-system',
    'config' => [
        'features' => ['feature1', 'feature2'],
    ],
    'permissions' => [
        'new_system.users.view',
        'new_system.users.create',
    ],
    'is_enabled' => true,
    'requires_auth' => true,
    'sort_order' => 4,
]);
```

### Permission Structure
```
{module}.{resource}.{action}

Examples:
- core.users.view
- erp.employees.create
- carrental.bookings.edit
- smartclassroom.equipment.control
```

## 🔒 Security Features

### Authentication Security
- **Password Hashing** - ใช้ bcrypt สำหรับเข้ารหัสรหัสผ่าน
- **Token Expiration** - Token หมดอายุอัตโนมัติ
- **Session Management** - จัดการ Session หลายเครื่อง
- **Device Tracking** - ติดตามอุปกรณ์ที่เข้าสู่ระบบ

### Authorization Security
- **Permission Validation** - ตรวจสอบสิทธิ์ทุก API call
- **Role-Based Access** - เข้าถึงตามบทบาท
- **Module Isolation** - แยกสิทธิ์ตาม Module
- **Audit Logging** - บันทึกการเข้าถึงทั้งหมด

### Data Security
- **Input Validation** - ตรวจสอบข้อมูล Input
- **SQL Injection Protection** - ป้องกัน SQL Injection
- **XSS Protection** - ป้องกัน Cross-Site Scripting
- **CSRF Protection** - ป้องกัน Cross-Site Request Forgery

## 📊 Database Schema

### Core Tables
- **companies** - ข้อมูลบริษัท
- **departments** - ข้อมูลแผนก
- **users** - ข้อมูลผู้ใช้
- **roles** - ข้อมูลบทบาท
- **permissions** - ข้อมูลสิทธิ์
- **role_permissions** - ความสัมพันธ์บทบาท-สิทธิ์
- **user_roles** - ความสัมพันธ์ผู้ใช้-บทบาท
- **system_registry** - ข้อมูลระบบ
- **audit_logs** - บันทึกการใช้งาน
- **user_sessions** - ข้อมูล Session
- **system_settings** - การตั้งค่าระบบ

## 🔄 Integration Guide

### Adding New System

1. **Register System**
```php
SystemRegistry::create([...]);
```

2. **Create Permissions**
```php
Permission::createPermission('newsystem', 'users', 'view', 'View Users');
Permission::createPermission('newsystem', 'users', 'create', 'Create Users');
```

3. **Create Roles**
```php
Role::create([
    'name' => 'newsystem_admin',
    'display_name' => 'New System Administrator',
    'module' => 'newsystem',
    'company_id' => $companyId,
]);
```

4. **Assign Permissions to Role**
```php
$role->syncPermissions(['newsystem.users.view', 'newsystem.users.create']);
```

5. **Frontend Integration**
```tsx
// Add to SystemNavigator
<Link to="/new-system">New System</Link>

// Use PermissionGate
<PermissionGate permissions={['newsystem.users.view']}>
  <NewSystemComponent />
</PermissionGate>
```

## 🧪 Testing

### Backend Tests
```bash
cd apps/api
php artisan test --filter=Core
```

### Frontend Tests
```bash
cd apps/web
npm test
```

## 📈 Performance Optimization

### Database Optimization
- **Indexing Strategy** - สร้าง Index ที่เหมาะสม
- **Query Optimization** - ปรับปรุง Query ให้เร็วขึ้น
- **Connection Pooling** - ใช้ Connection Pool
- **Caching** - ใช้ Redis Cache

### Frontend Optimization
- **Code Splitting** - แบ่งโค้ดตาม Module
- **Lazy Loading** - โหลด Component แบบ Lazy
- **State Management** - จัดการ State อย่างมีประสิทธิภาพ
- **Bundle Optimization** - ปรับปรุง Bundle Size

## 🔧 Troubleshooting

### Common Issues

1. **Token Expired**
   - Solution: Implement automatic token refresh

2. **Permission Denied**
   - Solution: Check user roles and permissions

3. **System Not Found**
   - Solution: Verify system registration in SystemRegistry

4. **Session Invalid**
   - Solution: Clear localStorage and re-login

### Debug Mode
```bash
# Enable debug mode
APP_DEBUG=true
LOG_LEVEL=debug
```

## 📞 Support

สำหรับคำถามหรือปัญหาการใช้งาน:
- **Documentation**: [Core Platform Docs](./docs/)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Email**: support@enterprise-platform.com

---

*Core Platform - The foundation of your enterprise ecosystem*
