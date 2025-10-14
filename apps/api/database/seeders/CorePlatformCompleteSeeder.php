<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Core\Company;
use App\Models\Core\Department;
use App\Models\Core\User;
use App\Models\Core\Role;
use App\Models\Core\Permission;
use App\Models\Core\SystemRegistry;

class CorePlatformCompleteSeeder extends Seeder
{
    public function run(): void
    {
        DB::beginTransaction();

        try {
            // Create Company
            $company = Company::create([
                'name' => 'Enterprise Platform Company',
                'code' => 'ENT001',
                'description' => 'Default company for Enterprise Platform',
                'email' => 'admin@enterprise-platform.com',
                'phone' => '+66-2-123-4567',
                'address' => '123 Enterprise Street, Bangkok, Thailand',
                'tax_id' => '1234567890123',
                'settings' => [
                    'timezone' => 'Asia/Bangkok',
                    'currency' => 'THB',
                    'date_format' => 'Y-m-d',
                    'time_format' => 'H:i:s',
                ],
                'is_active' => true,
            ]);

            // Create Departments
            $departments = [
                [
                    'name' => 'IT Department',
                    'code' => 'IT001',
                    'description' => 'Information Technology Department',
                ],
                [
                    'name' => 'HR Department',
                    'code' => 'HR001',
                    'description' => 'Human Resources Department',
                ],
                [
                    'name' => 'Finance Department',
                    'code' => 'FIN001',
                    'description' => 'Finance and Accounting Department',
                ],
                [
                    'name' => 'Sales Department',
                    'code' => 'SALES001',
                    'description' => 'Sales and Marketing Department',
                ],
            ];

            foreach ($departments as $dept) {
                Department::create([
                    'company_id' => $company->id,
                    ...$dept,
                    'is_active' => true,
                ]);
            }

            // Create Permissions
            $permissions = [
                // Core Platform Permissions
                ['name' => 'core.users.view', 'display_name' => 'View Users', 'module' => 'core', 'action' => 'view', 'resource' => 'users'],
                ['name' => 'core.users.create', 'display_name' => 'Create Users', 'module' => 'core', 'action' => 'create', 'resource' => 'users'],
                ['name' => 'core.users.edit', 'display_name' => 'Edit Users', 'module' => 'core', 'action' => 'edit', 'resource' => 'users'],
                ['name' => 'core.users.delete', 'display_name' => 'Delete Users', 'module' => 'core', 'action' => 'delete', 'resource' => 'users'],
                
                ['name' => 'core.roles.view', 'display_name' => 'View Roles', 'module' => 'core', 'action' => 'view', 'resource' => 'roles'],
                ['name' => 'core.roles.create', 'display_name' => 'Create Roles', 'module' => 'core', 'action' => 'create', 'resource' => 'roles'],
                ['name' => 'core.roles.edit', 'display_name' => 'Edit Roles', 'module' => 'core', 'action' => 'edit', 'resource' => 'roles'],
                ['name' => 'core.roles.delete', 'display_name' => 'Delete Roles', 'module' => 'core', 'action' => 'delete', 'resource' => 'roles'],
                
                ['name' => 'core.companies.view', 'display_name' => 'View Companies', 'module' => 'core', 'action' => 'view', 'resource' => 'companies'],
                ['name' => 'core.companies.edit', 'display_name' => 'Edit Companies', 'module' => 'core', 'action' => 'edit', 'resource' => 'companies'],
                
                ['name' => 'core.departments.view', 'display_name' => 'View Departments', 'module' => 'core', 'action' => 'view', 'resource' => 'departments'],
                ['name' => 'core.departments.create', 'display_name' => 'Create Departments', 'module' => 'core', 'action' => 'create', 'resource' => 'departments'],
                ['name' => 'core.departments.edit', 'display_name' => 'Edit Departments', 'module' => 'core', 'action' => 'edit', 'resource' => 'departments'],
                ['name' => 'core.departments.delete', 'display_name' => 'Delete Departments', 'module' => 'core', 'action' => 'delete', 'resource' => 'departments'],
                
                ['name' => 'core.systems.view', 'display_name' => 'View Systems', 'module' => 'core', 'action' => 'view', 'resource' => 'systems'],
                ['name' => 'core.systems.edit', 'display_name' => 'Edit Systems', 'module' => 'core', 'action' => 'edit', 'resource' => 'systems'],
                
                ['name' => 'core.audit.view', 'display_name' => 'View Audit Logs', 'module' => 'core', 'action' => 'view', 'resource' => 'audit'],

                // ERP Module Permissions
                ['name' => 'erp.access', 'display_name' => 'Access ERP System', 'module' => 'erp', 'action' => 'access', 'resource' => 'erp'],
                
                // HR Module
                ['name' => 'erp.hr.view', 'display_name' => 'View HR Module', 'module' => 'erp', 'action' => 'view', 'resource' => 'hr'],
                ['name' => 'erp.hr.employees.view', 'display_name' => 'View Employees', 'module' => 'erp', 'action' => 'view', 'resource' => 'employees'],
                ['name' => 'erp.hr.employees.create', 'display_name' => 'Create Employees', 'module' => 'erp', 'action' => 'create', 'resource' => 'employees'],
                ['name' => 'erp.hr.employees.edit', 'display_name' => 'Edit Employees', 'module' => 'erp', 'action' => 'edit', 'resource' => 'employees'],
                ['name' => 'erp.hr.leave.view', 'display_name' => 'View Leave Requests', 'module' => 'erp', 'action' => 'view', 'resource' => 'leave'],
                ['name' => 'erp.hr.leave.approve', 'display_name' => 'Approve Leave Requests', 'module' => 'erp', 'action' => 'approve', 'resource' => 'leave'],

                // Inventory Module
                ['name' => 'erp.inventory.view', 'display_name' => 'View Inventory', 'module' => 'erp', 'action' => 'view', 'resource' => 'inventory'],
                ['name' => 'erp.inventory.products.view', 'display_name' => 'View Products', 'module' => 'erp', 'action' => 'view', 'resource' => 'products'],
                ['name' => 'erp.inventory.products.create', 'display_name' => 'Create Products', 'module' => 'erp', 'action' => 'create', 'resource' => 'products'],
                ['name' => 'erp.inventory.products.edit', 'display_name' => 'Edit Products', 'module' => 'erp', 'action' => 'edit', 'resource' => 'products'],
                ['name' => 'erp.inventory.stock.view', 'display_name' => 'View Stock', 'module' => 'erp', 'action' => 'view', 'resource' => 'stock'],
                ['name' => 'erp.inventory.stock.adjust', 'display_name' => 'Adjust Stock', 'module' => 'erp', 'action' => 'adjust', 'resource' => 'stock'],

                // Sales Module
                ['name' => 'erp.sales.view', 'display_name' => 'View Sales', 'module' => 'erp', 'action' => 'view', 'resource' => 'sales'],
                ['name' => 'erp.sales.customers.view', 'display_name' => 'View Customers', 'module' => 'erp', 'action' => 'view', 'resource' => 'customers'],
                ['name' => 'erp.sales.customers.create', 'display_name' => 'Create Customers', 'module' => 'erp', 'action' => 'create', 'resource' => 'customers'],
                ['name' => 'erp.sales.orders.view', 'display_name' => 'View Sales Orders', 'module' => 'erp', 'action' => 'view', 'resource' => 'sales_orders'],
                ['name' => 'erp.sales.orders.create', 'display_name' => 'Create Sales Orders', 'module' => 'erp', 'action' => 'create', 'resource' => 'sales_orders'],
                ['name' => 'erp.sales.orders.edit', 'display_name' => 'Edit Sales Orders', 'module' => 'erp', 'action' => 'edit', 'resource' => 'sales_orders'],

                // Purchase Module
                ['name' => 'erp.purchase.view', 'display_name' => 'View Purchase', 'module' => 'erp', 'action' => 'view', 'resource' => 'purchase'],
                ['name' => 'erp.purchase.suppliers.view', 'display_name' => 'View Suppliers', 'module' => 'erp', 'action' => 'view', 'resource' => 'suppliers'],
                ['name' => 'erp.purchase.suppliers.create', 'display_name' => 'Create Suppliers', 'module' => 'erp', 'action' => 'create', 'resource' => 'suppliers'],
                ['name' => 'erp.purchase.orders.view', 'display_name' => 'View Purchase Orders', 'module' => 'erp', 'action' => 'view', 'resource' => 'purchase_orders'],
                ['name' => 'erp.purchase.orders.create', 'display_name' => 'Create Purchase Orders', 'module' => 'erp', 'action' => 'create', 'resource' => 'purchase_orders'],
                ['name' => 'erp.purchase.orders.edit', 'display_name' => 'Edit Purchase Orders', 'module' => 'erp', 'action' => 'edit', 'resource' => 'purchase_orders'],

                // Accounting Module
                ['name' => 'erp.accounting.view', 'display_name' => 'View Accounting', 'module' => 'erp', 'action' => 'view', 'resource' => 'accounting'],
                ['name' => 'erp.accounting.journal.view', 'display_name' => 'View Journal Entries', 'module' => 'erp', 'action' => 'view', 'resource' => 'journal_entries'],
                ['name' => 'erp.accounting.journal.create', 'display_name' => 'Create Journal Entries', 'module' => 'erp', 'action' => 'create', 'resource' => 'journal_entries'],
                ['name' => 'erp.accounting.reports.view', 'display_name' => 'View Accounting Reports', 'module' => 'erp', 'action' => 'view', 'resource' => 'reports'],

                // Finance Module
                ['name' => 'erp.finance.view', 'display_name' => 'View Finance', 'module' => 'erp', 'action' => 'view', 'resource' => 'finance'],
                ['name' => 'erp.finance.bank.view', 'display_name' => 'View Bank Accounts', 'module' => 'erp', 'action' => 'view', 'resource' => 'bank_accounts'],
                ['name' => 'erp.finance.cashflow.view', 'display_name' => 'View Cash Flow', 'module' => 'erp', 'action' => 'view', 'resource' => 'cash_flow'],
            ];

            foreach ($permissions as $perm) {
                Permission::create([
                    ...$perm,
                    'is_active' => true,
                ]);
            }

            // Create Roles
            $roles = [
                [
                    'name' => 'super_admin',
                    'display_name' => 'Super Administrator',
                    'description' => 'Full access to all systems and modules',
                    'module' => 'core',
                ],
                [
                    'name' => 'core.admin',
                    'display_name' => 'Core Administrator',
                    'description' => 'Administrator for Core Platform',
                    'module' => 'core',
                ],
                [
                    'name' => 'erp.manager',
                    'display_name' => 'ERP Manager',
                    'description' => 'Manager for ERP system',
                    'module' => 'erp',
                ],
                [
                    'name' => 'erp.user',
                    'display_name' => 'ERP User',
                    'description' => 'Standard ERP user',
                    'module' => 'erp',
                ],
                [
                    'name' => 'hr.manager',
                    'display_name' => 'HR Manager',
                    'description' => 'Human Resources Manager',
                    'module' => 'erp',
                ],
                [
                    'name' => 'sales.manager',
                    'display_name' => 'Sales Manager',
                    'description' => 'Sales Manager',
                    'module' => 'erp',
                ],
                [
                    'name' => 'accountant',
                    'display_name' => 'Accountant',
                    'description' => 'Accounting professional',
                    'module' => 'erp',
                ],
            ];

            foreach ($roles as $role) {
                Role::create([
                    ...$role,
                    'is_active' => true,
                ]);
            }

            // Assign permissions to roles
            $superAdmin = Role::where('name', 'super_admin')->first();
            $coreAdmin = Role::where('name', 'core.admin')->first();
            $erpManager = Role::where('name', 'erp.manager')->first();
            $hrManager = Role::where('name', 'hr.manager')->first();
            $salesManager = Role::where('name', 'sales.manager')->first();
            $accountant = Role::where('name', 'accountant')->first();

            // Super Admin gets all permissions
            $superAdmin->permissions()->sync(Permission::pluck('id'));

            // Core Admin gets core permissions
            $coreAdmin->permissions()->sync(Permission::where('module', 'core')->pluck('id'));

            // ERP Manager gets all ERP permissions
            $erpManager->permissions()->sync(Permission::where('module', 'erp')->pluck('id'));

            // HR Manager gets HR permissions
            $hrManager->permissions()->sync(Permission::where('resource', 'like', '%hr%')
                ->orWhere('resource', 'like', '%employee%')
                ->orWhere('resource', 'like', '%leave%')
                ->pluck('id'));

            // Sales Manager gets sales permissions
            $salesManager->permissions()->sync(Permission::where('resource', 'like', '%sales%')
                ->orWhere('resource', 'like', '%customer%')
                ->pluck('id'));

            // Accountant gets accounting and finance permissions
            $accountant->permissions()->sync(Permission::where('resource', 'like', '%accounting%')
                ->orWhere('resource', 'like', '%finance%')
                ->orWhere('resource', 'like', '%journal%')
                ->orWhere('resource', 'like', '%bank%')
                ->orWhere('resource', 'like', '%cashflow%')
                ->pluck('id'));

            // Create Users
            $itDept = Department::where('code', 'IT001')->first();
            $hrDept = Department::where('code', 'HR001')->first();
            $financeDept = Department::where('code', 'FIN001')->first();
            $salesDept = Department::where('code', 'SALES001')->first();

            $users = [
                [
                    'name' => 'Super Administrator',
                    'email' => 'admin@example.com',
                    'password' => 'password',
                    'department_id' => $itDept->id,
                    'position' => 'System Administrator',
                    'employee_id' => 'EMP001',
                    'hire_date' => '2024-01-01',
                    'is_super_admin' => true,
                    'role' => 'super_admin',
                ],
                [
                    'name' => 'John Doe',
                    'email' => 'john.doe@example.com',
                    'password' => 'password',
                    'department_id' => $hrDept->id,
                    'position' => 'HR Manager',
                    'employee_id' => 'EMP002',
                    'hire_date' => '2024-01-15',
                    'role' => 'hr.manager',
                ],
                [
                    'name' => 'Jane Smith',
                    'email' => 'jane.smith@example.com',
                    'password' => 'password',
                    'department_id' => $salesDept->id,
                    'position' => 'Sales Manager',
                    'employee_id' => 'EMP003',
                    'hire_date' => '2024-02-01',
                    'role' => 'sales.manager',
                ],
                [
                    'name' => 'Mike Johnson',
                    'email' => 'mike.johnson@example.com',
                    'password' => 'password',
                    'department_id' => $financeDept->id,
                    'position' => 'Senior Accountant',
                    'employee_id' => 'EMP004',
                    'hire_date' => '2024-02-15',
                    'role' => 'accountant',
                ],
            ];

            foreach ($users as $userData) {
                $roleName = $userData['role'];
                unset($userData['role']);
                
                $user = User::create([
                    'company_id' => $company->id,
                    ...$userData,
                    'is_active' => true,
                ]);

                // Assign role
                $role = Role::where('name', $roleName)->first();
                if ($role) {
                    $user->roles()->attach($role->id);
                }
            }

            // Create System Registry
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
                    'permissions' => [],
                    'config' => [
                        'theme' => 'default',
                        'features' => ['auth', 'users', 'rbac', 'audit'],
                    ],
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
                    'permissions' => ['erp.access'],
                    'config' => [
                        'theme' => 'default',
                        'features' => ['hr', 'inventory', 'sales', 'purchase', 'accounting', 'finance'],
                    ],
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
                    'permissions' => ['rental.access'],
                    'config' => [
                        'theme' => 'default',
                        'features' => ['booking', 'fleet', 'maintenance'],
                    ],
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
                    'permissions' => ['classroom.access'],
                    'config' => [
                        'theme' => 'default',
                        'features' => ['scheduling', 'attendance', 'resources'],
                    ],
                ],
            ];

            foreach ($systems as $system) {
                SystemRegistry::create([
                    ...$system,
                    'is_active' => true,
                ]);
            }

            DB::commit();
            $this->command->info('Core Platform Complete Seeder completed successfully!');
            
        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('Error in Core Platform Complete Seeder: ' . $e->getMessage());
            throw $e;
        }
    }
}
