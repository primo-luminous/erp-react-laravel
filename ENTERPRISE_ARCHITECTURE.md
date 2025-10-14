# 🏗️ Enterprise Architecture Design

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
├─────────────────────────────────────────────────────────────┤
│  React + TypeScript + Tailwind CSS                         │
│  ├── Shared Components Library                             │
│  ├── Module-Specific Components                            │
│  └── Design System (UI Kit)                               │
├─────────────────────────────────────────────────────────────┤
│                    API Gateway Layer                        │
├─────────────────────────────────────────────────────────────┤
│  Laravel API Gateway                                       │
│  ├── Authentication Middleware                             │
│  ├── Rate Limiting                                         │
│  ├── Request/Response Logging                              │
│  └── Cross-System Routing                                  │
├─────────────────────────────────────────────────────────────┤
│                 Shared Services Layer                       │
├─────────────────────────────────────────────────────────────┤
│  ├── Auth Service          ├── User Management            │
│  ├── Notification Service  ├── File Management            │
│  ├── Audit Service         ├── Configuration Service      │
│  └── Workflow Engine       └── Integration Service        │
├─────────────────────────────────────────────────────────────┤
│                  Business Logic Layer                       │
├─────────────────────────────────────────────────────────────┤
│  ├── ERP Module            ├── Car Rental Module          │
│  ├── Smart Classroom Module ├── Future Modules            │
│  └── Cross-Module Services └── Business Rules Engine      │
├─────────────────────────────────────────────────────────────┤
│                   Data Access Layer                         │
├─────────────────────────────────────────────────────────────┤
│  ├── Repository Pattern    ├── Database Abstraction       │
│  ├── Cache Layer (Redis)   ├── Queue System               │
│  └── File Storage System   └── Search Engine              │
├─────────────────────────────────────────────────────────────┤
│                     Database Layer                          │
├─────────────────────────────────────────────────────────────┤
│  ├── Shared Database (Users, Roles, etc.)                 │
│  ├── Module-Specific Databases                             │
│  └── Data Warehouse (Analytics)                           │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Module Structure

### 📁 Project Structure
```
apps/
├── web/                          # Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── shared/          # Shared Components
│   │   │   ├── erp/            # ERP Module Components
│   │   │   ├── car-rental/     # Car Rental Components
│   │   │   └── smart-classroom/ # Smart Classroom Components
│   │   ├── modules/            # Module Definitions
│   │   ├── services/           # API Services
│   │   ├── hooks/              # Custom Hooks
│   │   └── utils/              # Utility Functions
│   └── package.json
├── api/                         # Backend Application
│   ├── app/
│   │   ├── Modules/            # Laravel Modules
│   │   │   ├── Shared/        # Shared Services
│   │   │   ├── ERP/           # ERP Module
│   │   │   ├── CarRental/     # Car Rental Module
│   │   │   └── SmartClassroom/ # Smart Classroom Module
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Middleware/
│   │   └── Models/
│   └── composer.json
└── shared/                      # Shared Resources
    ├── types/                   # TypeScript Types
    ├── config/                  # Configuration Files
    └── docs/                    # Documentation
```

## 🔐 User Roles & Permissions Architecture

### 🏛️ Hierarchical Permission System
```
Super Admin
├── System Admins
│   ├── ERP Admin
│   ├── Car Rental Admin
│   └── Smart Classroom Admin
├── Department Managers
│   ├── HR Manager
│   ├── Accounting Manager
│   └── Sales Manager
├── Regular Users
│   ├── HR Staff
│   ├── Accountant
│   └── Sales Staff
└── External Users
    ├── Customers
    ├── Students
    └── Partners
```

### 🔑 Permission Structure
```php
// Permission Format: {module}.{resource}.{action}
'permissions' => [
    // Shared Permissions
    'shared.users.view',
    'shared.users.create',
    'shared.users.edit',
    'shared.users.delete',
    
    // ERP Permissions
    'erp.hr.employees.view',
    'erp.hr.employees.create',
    'erp.accounting.reports.view',
    'erp.sales.orders.create',
    
    // Car Rental Permissions
    'carrental.fleet.view',
    'carrental.bookings.create',
    'carrental.payments.process',
    
    // Smart Classroom Permissions
    'smartclassroom.classrooms.view',
    'smartclassroom.equipment.control',
    'smartclassroom.recordings.create',
]
```

## 🔄 Data Flow Architecture

### 📊 Cross-System Data Flow
```
User Action → Frontend → API Gateway → Module Service → Database
     ↓
Shared Services (Auth, Notification, Audit)
     ↓
Cross-Module Integration (if needed)
     ↓
Response → Frontend → User Interface
```

### 🔗 Integration Points
1. **User Management**: Shared across all modules
2. **Customer Data**: Shared between ERP and Car Rental
3. **Financial Data**: Shared between ERP and all modules
4. **Notification System**: Centralized for all modules
5. **Audit Trail**: Unified logging across all modules

## 🎨 Frontend Architecture

### 🧩 Component Architecture
```typescript
// Shared Components
├── Layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── UI/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   └── Table.tsx
├── Forms/
│   ├── FormField.tsx
│   ├── FormValidation.tsx
│   └── FormSubmission.tsx
└── Charts/
    ├── LineChart.tsx
    ├── BarChart.tsx
    └── PieChart.tsx

// Module-Specific Components
├── ERP/
│   ├── HR/
│   ├── Accounting/
│   └── Sales/
├── CarRental/
│   ├── Fleet/
│   ├── Bookings/
│   └── Payments/
└── SmartClassroom/
    ├── Classrooms/
    ├── Equipment/
    └── Recordings/
```

### 🔧 State Management
```typescript
// Global State (Zustand/Redux)
├── authStore.ts          # Authentication state
├── userStore.ts          # User information
├── notificationStore.ts  # Notifications
└── moduleStore.ts        # Module-specific states

// Module States
├── erpStore.ts           # ERP module state
├── carRentalStore.ts     # Car Rental module state
└── smartClassroomStore.ts # Smart Classroom module state
```

## 🗄️ Database Architecture

### 📋 Database Design Strategy
```
┌─────────────────────────────────────────────────────────────┐
│                  Shared Database                            │
├─────────────────────────────────────────────────────────────┤
│  users, roles, permissions, notifications,                  │
│  audit_logs, system_settings, integrations                  │
├─────────────────────────────────────────────────────────────┤
│                Module-Specific Databases                    │
├─────────────────────────────────────────────────────────────┤
│  ERP DB: hr_employees, accounting_journals,                │
│          sales_orders, inventory_products                   │
├─────────────────────────────────────────────────────────────┤
│  Car Rental DB: fleet_vehicles, bookings,                  │
│                 locations, payments                         │
├─────────────────────────────────────────────────────────────┤
│  Smart Classroom DB: classrooms, equipment,                │
│                      schedules, recordings                  │
└─────────────────────────────────────────────────────────────┘
```

### 🔗 Cross-System Relationships
```sql
-- Example: Customer data shared between ERP and Car Rental
CREATE TABLE shared_customers (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- ERP specific customer data
CREATE TABLE erp_customer_details (
    customer_id BIGINT REFERENCES shared_customers(id),
    credit_limit DECIMAL(10,2),
    payment_terms VARCHAR(50),
    sales_rep_id BIGINT
);

-- Car Rental specific customer data
CREATE TABLE carrental_customer_details (
    customer_id BIGINT REFERENCES shared_customers(id),
    license_number VARCHAR(50),
    insurance_info TEXT,
    rental_history_count INT
);
```

## 🚀 Deployment Architecture

### 🐳 Container Architecture
```yaml
# docker-compose.yml
version: '3.8'
services:
  # Frontend
  web:
    build: ./apps/web
    ports:
      - "3000:3000"
    
  # Backend API
  api:
    build: ./apps/api
    ports:
      - "8000:8000"
    
  # Database
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: enterprise_platform
    
  # Cache
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    
  # Queue Worker
  queue-worker:
    build: ./apps/api
    command: php artisan queue:work
```

## 📈 Scalability Considerations

### 🔄 Horizontal Scaling
- **Load Balancers**: Multiple API instances
- **Database Replication**: Read replicas for heavy queries
- **CDN**: Static assets distribution
- **Microservices**: Module separation for independent scaling

### 📊 Performance Optimization
- **Caching Strategy**: Redis for frequently accessed data
- **Database Indexing**: Optimized queries for large datasets
- **Lazy Loading**: Frontend components and data
- **API Rate Limiting**: Prevent system overload

## 🔒 Security Architecture

### 🛡️ Security Layers
1. **Network Security**: HTTPS, VPN, Firewall
2. **Application Security**: Authentication, Authorization, Input Validation
3. **Data Security**: Encryption, Backup, Audit Trail
4. **Infrastructure Security**: Container Security, OS Hardening

### 🔐 Security Implementation
```php
// Middleware Stack
Route::middleware([
    'auth:sanctum',           // Authentication
    'throttle:60,1',          // Rate Limiting
    'permission.check',       // Permission Validation
    'audit.log',             // Audit Logging
    'cors'                   // Cross-Origin Resource Sharing
]);
```

---

*เอกสารนี้จะได้รับการอัปเดตตามการพัฒนาของระบบ*
