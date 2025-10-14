<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CompleteSeeder extends Seeder
{
    public function run(): void
    {
        DB::beginTransaction();

        try {
            // Check if we need to create additional users
            $existingUsers = DB::table('users')->count();
            
            if ($existingUsers < 4) {
                // Create additional users
                $additionalUsers = [
                    [
                        'name' => 'John Doe',
                        'email' => 'john.doe@example.com',
                        'password' => Hash::make('password'),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'name' => 'Jane Smith',
                        'email' => 'jane.smith@example.com',
                        'password' => Hash::make('password'),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'name' => 'Mike Johnson',
                        'email' => 'mike.johnson@example.com',
                        'password' => Hash::make('password'),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                ];

                foreach ($additionalUsers as $user) {
                    // Check if user already exists
                    if (!DB::table('users')->where('email', $user['email'])->exists()) {
                        DB::table('users')->insert($user);
                    }
                }
            }

            // Create departments if they don't exist
            $existingDepartments = DB::table('departments')->count();
            
            if ($existingDepartments < 4) {
                $departments = [
                    [
                        'code' => 'IT001',
                        'name' => 'IT Department',
                        'parent_id' => null,
                        'created_by' => 1,
                        'updated_by' => 1,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'code' => 'HR001',
                        'name' => 'HR Department',
                        'parent_id' => null,
                        'created_by' => 1,
                        'updated_by' => 1,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'code' => 'FIN001',
                        'name' => 'Finance Department',
                        'parent_id' => null,
                        'created_by' => 1,
                        'updated_by' => 1,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'code' => 'SALES001',
                        'name' => 'Sales Department',
                        'parent_id' => null,
                        'created_by' => 1,
                        'updated_by' => 1,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                ];

                foreach ($departments as $dept) {
                    if (!DB::table('departments')->where('code', $dept['code'])->exists()) {
                        DB::table('departments')->insert($dept);
                    }
                }
            }

            // Create roles if they don't exist
            $existingRoles = DB::table('roles')->count();
            
            if ($existingRoles < 6) {
                $roles = [
                    [
                        'name' => 'super_admin',
                        'display_name' => 'Super Administrator',
                        'description' => 'Full access to all systems and modules',
                        'module' => 'core',
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'name' => 'core.admin',
                        'display_name' => 'Core Administrator',
                        'description' => 'Administrator for Core Platform',
                        'module' => 'core',
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'name' => 'erp.manager',
                        'display_name' => 'ERP Manager',
                        'description' => 'Manager for ERP system',
                        'module' => 'erp',
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'name' => 'hr.manager',
                        'display_name' => 'HR Manager',
                        'description' => 'Human Resources Manager',
                        'module' => 'erp',
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'name' => 'sales.manager',
                        'display_name' => 'Sales Manager',
                        'description' => 'Sales Manager',
                        'module' => 'erp',
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'name' => 'accountant',
                        'display_name' => 'Accountant',
                        'description' => 'Accounting professional',
                        'module' => 'erp',
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                ];

                foreach ($roles as $role) {
                    if (!DB::table('roles')->where('name', $role['name'])->exists()) {
                        DB::table('roles')->insert($role);
                    }
                }
            }

            // Create permissions if they don't exist
            $existingPermissions = DB::table('permissions')->count();
            
            if ($existingPermissions < 50) {
                $permissions = [
                    // Core Platform Permissions
                    ['name' => 'core.users.view', 'display_name' => 'View Users', 'module' => 'core', 'action' => 'view', 'resource' => 'users', 'is_active' => true],
                    ['name' => 'core.users.create', 'display_name' => 'Create Users', 'module' => 'core', 'action' => 'create', 'resource' => 'users', 'is_active' => true],
                    ['name' => 'core.users.edit', 'display_name' => 'Edit Users', 'module' => 'core', 'action' => 'edit', 'resource' => 'users', 'is_active' => true],
                    ['name' => 'core.users.delete', 'display_name' => 'Delete Users', 'module' => 'core', 'action' => 'delete', 'resource' => 'users', 'is_active' => true],
                    ['name' => 'core.roles.view', 'display_name' => 'View Roles', 'module' => 'core', 'action' => 'view', 'resource' => 'roles', 'is_active' => true],
                    ['name' => 'core.roles.create', 'display_name' => 'Create Roles', 'module' => 'core', 'action' => 'create', 'resource' => 'roles', 'is_active' => true],
                    ['name' => 'core.roles.edit', 'display_name' => 'Edit Roles', 'module' => 'core', 'action' => 'edit', 'resource' => 'roles', 'is_active' => true],
                    ['name' => 'core.roles.delete', 'display_name' => 'Delete Roles', 'module' => 'core', 'action' => 'delete', 'resource' => 'roles', 'is_active' => true],
                    ['name' => 'core.companies.view', 'display_name' => 'View Companies', 'module' => 'core', 'action' => 'view', 'resource' => 'companies', 'is_active' => true],
                    ['name' => 'core.companies.edit', 'display_name' => 'Edit Companies', 'module' => 'core', 'action' => 'edit', 'resource' => 'companies', 'is_active' => true],
                    ['name' => 'core.departments.view', 'display_name' => 'View Departments', 'module' => 'core', 'action' => 'view', 'resource' => 'departments', 'is_active' => true],
                    ['name' => 'core.departments.create', 'display_name' => 'Create Departments', 'module' => 'core', 'action' => 'create', 'resource' => 'departments', 'is_active' => true],
                    ['name' => 'core.departments.edit', 'display_name' => 'Edit Departments', 'module' => 'core', 'action' => 'edit', 'resource' => 'departments', 'is_active' => true],
                    ['name' => 'core.departments.delete', 'display_name' => 'Delete Departments', 'module' => 'core', 'action' => 'delete', 'resource' => 'departments', 'is_active' => true],
                    ['name' => 'core.systems.view', 'display_name' => 'View Systems', 'module' => 'core', 'action' => 'view', 'resource' => 'systems', 'is_active' => true],
                    ['name' => 'core.systems.edit', 'display_name' => 'Edit Systems', 'module' => 'core', 'action' => 'edit', 'resource' => 'systems', 'is_active' => true],
                    ['name' => 'core.audit.view', 'display_name' => 'View Audit Logs', 'module' => 'core', 'action' => 'view', 'resource' => 'audit', 'is_active' => true],

                    // ERP Module Permissions
                    ['name' => 'erp.access', 'display_name' => 'Access ERP System', 'module' => 'erp', 'action' => 'access', 'resource' => 'erp', 'is_active' => true],
                    ['name' => 'erp.hr.view', 'display_name' => 'View HR Module', 'module' => 'erp', 'action' => 'view', 'resource' => 'hr', 'is_active' => true],
                    ['name' => 'erp.hr.employees.view', 'display_name' => 'View Employees', 'module' => 'erp', 'action' => 'view', 'resource' => 'employees', 'is_active' => true],
                    ['name' => 'erp.hr.employees.create', 'display_name' => 'Create Employees', 'module' => 'erp', 'action' => 'create', 'resource' => 'employees', 'is_active' => true],
                    ['name' => 'erp.hr.employees.edit', 'display_name' => 'Edit Employees', 'module' => 'erp', 'action' => 'edit', 'resource' => 'employees', 'is_active' => true],
                    ['name' => 'erp.hr.leave.view', 'display_name' => 'View Leave Requests', 'module' => 'erp', 'action' => 'view', 'resource' => 'leave', 'is_active' => true],
                    ['name' => 'erp.hr.leave.approve', 'display_name' => 'Approve Leave Requests', 'module' => 'erp', 'action' => 'approve', 'resource' => 'leave', 'is_active' => true],

                    // Inventory Module
                    ['name' => 'erp.inventory.view', 'display_name' => 'View Inventory', 'module' => 'erp', 'action' => 'view', 'resource' => 'inventory', 'is_active' => true],
                    ['name' => 'erp.inventory.products.view', 'display_name' => 'View Products', 'module' => 'erp', 'action' => 'view', 'resource' => 'products', 'is_active' => true],
                    ['name' => 'erp.inventory.products.create', 'display_name' => 'Create Products', 'module' => 'erp', 'action' => 'create', 'resource' => 'products', 'is_active' => true],
                    ['name' => 'erp.inventory.products.edit', 'display_name' => 'Edit Products', 'module' => 'erp', 'action' => 'edit', 'resource' => 'products', 'is_active' => true],
                    ['name' => 'erp.inventory.stock.view', 'display_name' => 'View Stock', 'module' => 'erp', 'action' => 'view', 'resource' => 'stock', 'is_active' => true],
                    ['name' => 'erp.inventory.stock.adjust', 'display_name' => 'Adjust Stock', 'module' => 'erp', 'action' => 'adjust', 'resource' => 'stock', 'is_active' => true],

                    // Sales Module
                    ['name' => 'erp.sales.view', 'display_name' => 'View Sales', 'module' => 'erp', 'action' => 'view', 'resource' => 'sales', 'is_active' => true],
                    ['name' => 'erp.sales.customers.view', 'display_name' => 'View Customers', 'module' => 'erp', 'action' => 'view', 'resource' => 'customers', 'is_active' => true],
                    ['name' => 'erp.sales.customers.create', 'display_name' => 'Create Customers', 'module' => 'erp', 'action' => 'create', 'resource' => 'customers', 'is_active' => true],
                    ['name' => 'erp.sales.orders.view', 'display_name' => 'View Sales Orders', 'module' => 'erp', 'action' => 'view', 'resource' => 'sales_orders', 'is_active' => true],
                    ['name' => 'erp.sales.orders.create', 'display_name' => 'Create Sales Orders', 'module' => 'erp', 'action' => 'create', 'resource' => 'sales_orders', 'is_active' => true],
                    ['name' => 'erp.sales.orders.edit', 'display_name' => 'Edit Sales Orders', 'module' => 'erp', 'action' => 'edit', 'resource' => 'sales_orders', 'is_active' => true],

                    // Purchase Module
                    ['name' => 'erp.purchase.view', 'display_name' => 'View Purchase', 'module' => 'erp', 'action' => 'view', 'resource' => 'purchase', 'is_active' => true],
                    ['name' => 'erp.purchase.suppliers.view', 'display_name' => 'View Suppliers', 'module' => 'erp', 'action' => 'view', 'resource' => 'suppliers', 'is_active' => true],
                    ['name' => 'erp.purchase.suppliers.create', 'display_name' => 'Create Suppliers', 'module' => 'erp', 'action' => 'create', 'resource' => 'suppliers', 'is_active' => true],
                    ['name' => 'erp.purchase.orders.view', 'display_name' => 'View Purchase Orders', 'module' => 'erp', 'action' => 'view', 'resource' => 'purchase_orders', 'is_active' => true],
                    ['name' => 'erp.purchase.orders.create', 'display_name' => 'Create Purchase Orders', 'module' => 'erp', 'action' => 'create', 'resource' => 'purchase_orders', 'is_active' => true],
                    ['name' => 'erp.purchase.orders.edit', 'display_name' => 'Edit Purchase Orders', 'module' => 'erp', 'action' => 'edit', 'resource' => 'purchase_orders', 'is_active' => true],

                    // Accounting Module
                    ['name' => 'erp.accounting.view', 'display_name' => 'View Accounting', 'module' => 'erp', 'action' => 'view', 'resource' => 'accounting', 'is_active' => true],
                    ['name' => 'erp.accounting.journal.view', 'display_name' => 'View Journal Entries', 'module' => 'erp', 'action' => 'view', 'resource' => 'journal_entries', 'is_active' => true],
                    ['name' => 'erp.accounting.journal.create', 'display_name' => 'Create Journal Entries', 'module' => 'erp', 'action' => 'create', 'resource' => 'journal_entries', 'is_active' => true],
                    ['name' => 'erp.accounting.reports.view', 'display_name' => 'View Accounting Reports', 'module' => 'erp', 'action' => 'view', 'resource' => 'reports', 'is_active' => true],

                    // Finance Module
                    ['name' => 'erp.finance.view', 'display_name' => 'View Finance', 'module' => 'erp', 'action' => 'view', 'resource' => 'finance', 'is_active' => true],
                    ['name' => 'erp.finance.bank.view', 'display_name' => 'View Bank Accounts', 'module' => 'erp', 'action' => 'view', 'resource' => 'bank_accounts', 'is_active' => true],
                    ['name' => 'erp.finance.cashflow.view', 'display_name' => 'View Cash Flow', 'module' => 'erp', 'action' => 'view', 'resource' => 'cash_flow', 'is_active' => true],
                ];

                foreach ($permissions as $perm) {
                    if (!DB::table('permissions')->where('name', $perm['name'])->exists()) {
                        $perm['created_at'] = now();
                        $perm['updated_at'] = now();
                        DB::table('permissions')->insert($perm);
                    }
                }
            }

            // Create system registry entries if they don't exist
            $existingSystems = DB::table('system_registry')->count();
            
            if ($existingSystems < 4) {
                $systems = [
                    [
                        'system_key' => 'core',
                        'name' => 'Core Platform',
                        'display_name' => 'Core Platform',
                        'version' => '1.0.0',
                        'url_prefix' => '/core',
                        'api_base_url' => '/api/core',
                        'description' => 'Central platform for user management, authentication, and system registry',
                        'icon' => 'cog',
                        'color' => 'blue',
                        'order' => 1,
                        'permissions' => json_encode([]),
                        'config' => json_encode([
                            'theme' => 'default',
                            'features' => ['auth', 'users', 'rbac', 'audit'],
                        ]),
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'system_key' => 'erp',
                        'name' => 'ERP System',
                        'display_name' => 'ERP System',
                        'version' => '1.0.0',
                        'url_prefix' => '/erp',
                        'api_base_url' => '/api/erp',
                        'description' => 'Enterprise Resource Planning system for business operations',
                        'icon' => 'chart-bar',
                        'color' => 'green',
                        'order' => 2,
                        'permissions' => json_encode(['erp.access']),
                        'config' => json_encode([
                            'theme' => 'default',
                            'features' => ['hr', 'inventory', 'sales', 'purchase', 'accounting', 'finance'],
                        ]),
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'system_key' => 'rental',
                        'name' => 'Car Rental',
                        'display_name' => 'Car Rental System',
                        'version' => '1.0.0',
                        'url_prefix' => '/rental',
                        'api_base_url' => '/api/rental',
                        'description' => 'Car rental management system',
                        'icon' => 'truck',
                        'color' => 'orange',
                        'order' => 3,
                        'permissions' => json_encode(['rental.access']),
                        'config' => json_encode([
                            'theme' => 'default',
                            'features' => ['booking', 'fleet', 'maintenance'],
                        ]),
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'system_key' => 'classroom',
                        'name' => 'Smart Classroom',
                        'display_name' => 'Smart Classroom System',
                        'version' => '1.0.0',
                        'url_prefix' => '/classroom',
                        'api_base_url' => '/api/classroom',
                        'description' => 'Smart classroom management system',
                        'icon' => 'academic-cap',
                        'color' => 'purple',
                        'order' => 4,
                        'permissions' => json_encode(['classroom.access']),
                        'config' => json_encode([
                            'theme' => 'default',
                            'features' => ['scheduling', 'attendance', 'resources'],
                        ]),
                        'is_active' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                ];

                foreach ($systems as $system) {
                    if (!DB::table('system_registry')->where('system_key', $system['system_key'])->exists()) {
                        DB::table('system_registry')->insert($system);
                    }
                }
            }

            DB::commit();
            $this->command->info('Complete Seeder finished successfully!');
            
        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('Error in Complete Seeder: ' . $e->getMessage());
            throw $e;
        }
    }
}
