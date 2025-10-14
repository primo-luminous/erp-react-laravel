<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Core\Company;
use App\Models\Core\Department;
use App\Models\Core\User;
use App\Models\Core\Role;
use App\Models\Core\Permission;
use App\Models\Core\SystemRegistry;
use App\Models\Core\SystemSettings;
use Illuminate\Support\Facades\Hash;

class CorePlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default company
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

        // Create default departments
        $departments = [
            [
                'company_id' => $company->id,
                'name' => 'Information Technology',
                'code' => 'IT',
                'description' => 'IT Department',
                'budget' => 1000000.00,
            ],
            [
                'company_id' => $company->id,
                'name' => 'Human Resources',
                'code' => 'HR',
                'description' => 'HR Department',
                'budget' => 500000.00,
            ],
            [
                'company_id' => $company->id,
                'name' => 'Finance',
                'code' => 'FIN',
                'description' => 'Finance Department',
                'budget' => 800000.00,
            ],
            [
                'company_id' => $company->id,
                'name' => 'Operations',
                'code' => 'OPS',
                'description' => 'Operations Department',
                'budget' => 600000.00,
            ],
        ];

        foreach ($departments as $deptData) {
            Department::create($deptData);
        }

        // Create core permissions
        $permissions = [
            // Core system permissions
            ['name' => 'core.users.view', 'display_name' => 'View Users', 'module' => 'core', 'resource' => 'users', 'action' => 'view', 'category' => 'user_management'],
            ['name' => 'core.users.create', 'display_name' => 'Create Users', 'module' => 'core', 'resource' => 'users', 'action' => 'create', 'category' => 'user_management'],
            ['name' => 'core.users.edit', 'display_name' => 'Edit Users', 'module' => 'core', 'resource' => 'users', 'action' => 'edit', 'category' => 'user_management'],
            ['name' => 'core.users.delete', 'display_name' => 'Delete Users', 'module' => 'core', 'resource' => 'users', 'action' => 'delete', 'category' => 'user_management'],
            
            ['name' => 'core.roles.view', 'display_name' => 'View Roles', 'module' => 'core', 'resource' => 'roles', 'action' => 'view', 'category' => 'role_management'],
            ['name' => 'core.roles.create', 'display_name' => 'Create Roles', 'module' => 'core', 'resource' => 'roles', 'action' => 'create', 'category' => 'role_management'],
            ['name' => 'core.roles.edit', 'display_name' => 'Edit Roles', 'module' => 'core', 'resource' => 'roles', 'action' => 'edit', 'category' => 'role_management'],
            ['name' => 'core.roles.delete', 'display_name' => 'Delete Roles', 'module' => 'core', 'resource' => 'roles', 'action' => 'delete', 'category' => 'role_management'],
            
            ['name' => 'core.companies.view', 'display_name' => 'View Companies', 'module' => 'core', 'resource' => 'companies', 'action' => 'view', 'category' => 'company_management'],
            ['name' => 'core.companies.create', 'display_name' => 'Create Companies', 'module' => 'core', 'resource' => 'companies', 'action' => 'create', 'category' => 'company_management'],
            ['name' => 'core.companies.edit', 'display_name' => 'Edit Companies', 'module' => 'core', 'resource' => 'companies', 'action' => 'edit', 'category' => 'company_management'],
            
            ['name' => 'core.departments.view', 'display_name' => 'View Departments', 'module' => 'core', 'resource' => 'departments', 'action' => 'view', 'category' => 'department_management'],
            ['name' => 'core.departments.create', 'display_name' => 'Create Departments', 'module' => 'core', 'resource' => 'departments', 'action' => 'create', 'category' => 'department_management'],
            ['name' => 'core.departments.edit', 'display_name' => 'Edit Departments', 'module' => 'core', 'resource' => 'departments', 'action' => 'edit', 'category' => 'department_management'],
            
            ['name' => 'core.systems.view', 'display_name' => 'View Systems', 'module' => 'core', 'resource' => 'systems', 'action' => 'view', 'category' => 'system_management'],
            ['name' => 'core.systems.create', 'display_name' => 'Create Systems', 'module' => 'core', 'resource' => 'systems', 'action' => 'create', 'category' => 'system_management'],
            ['name' => 'core.systems.edit', 'display_name' => 'Edit Systems', 'module' => 'core', 'resource' => 'systems', 'action' => 'edit', 'category' => 'system_management'],
            
            ['name' => 'core.audit.view', 'display_name' => 'View Audit Logs', 'module' => 'core', 'resource' => 'audit', 'action' => 'view', 'category' => 'audit'],
            
            // ERP permissions
            ['name' => 'erp.users.view', 'display_name' => 'View ERP Users', 'module' => 'erp', 'resource' => 'users', 'action' => 'view', 'category' => 'user_management'],
            ['name' => 'erp.users.create', 'display_name' => 'Create ERP Users', 'module' => 'erp', 'resource' => 'users', 'action' => 'create', 'category' => 'user_management'],
            ['name' => 'erp.users.edit', 'display_name' => 'Edit ERP Users', 'module' => 'erp', 'resource' => 'users', 'action' => 'edit', 'category' => 'user_management'],
            ['name' => 'erp.users.delete', 'display_name' => 'Delete ERP Users', 'module' => 'erp', 'resource' => 'users', 'action' => 'delete', 'category' => 'user_management'],
            
            ['name' => 'erp.roles.view', 'display_name' => 'View ERP Roles', 'module' => 'erp', 'resource' => 'roles', 'action' => 'view', 'category' => 'role_management'],
            ['name' => 'erp.departments.view', 'display_name' => 'View ERP Departments', 'module' => 'erp', 'resource' => 'departments', 'action' => 'view', 'category' => 'department_management'],
            ['name' => 'erp.settings.view', 'display_name' => 'View ERP Settings', 'module' => 'erp', 'resource' => 'settings', 'action' => 'view', 'category' => 'settings'],
            
            // Car Rental permissions
            ['name' => 'carrental.fleet.view', 'display_name' => 'View Fleet', 'module' => 'carrental', 'resource' => 'fleet', 'action' => 'view', 'category' => 'fleet_management'],
            ['name' => 'carrental.fleet.create', 'display_name' => 'Create Fleet', 'module' => 'carrental', 'resource' => 'fleet', 'action' => 'create', 'category' => 'fleet_management'],
            ['name' => 'carrental.bookings.view', 'display_name' => 'View Bookings', 'module' => 'carrental', 'resource' => 'bookings', 'action' => 'view', 'category' => 'booking_management'],
            ['name' => 'carrental.bookings.create', 'display_name' => 'Create Bookings', 'module' => 'carrental', 'resource' => 'bookings', 'action' => 'create', 'category' => 'booking_management'],
            ['name' => 'carrental.payments.view', 'display_name' => 'View Payments', 'module' => 'carrental', 'resource' => 'payments', 'action' => 'view', 'category' => 'payment_management'],
            ['name' => 'carrental.payments.process', 'display_name' => 'Process Payments', 'module' => 'carrental', 'resource' => 'payments', 'action' => 'process', 'category' => 'payment_management'],
            
            // Smart Classroom permissions
            ['name' => 'smartclassroom.classrooms.view', 'display_name' => 'View Classrooms', 'module' => 'smartclassroom', 'resource' => 'classrooms', 'action' => 'view', 'category' => 'classroom_management'],
            ['name' => 'smartclassroom.classrooms.create', 'display_name' => 'Create Classrooms', 'module' => 'smartclassroom', 'resource' => 'classrooms', 'action' => 'create', 'category' => 'classroom_management'],
            ['name' => 'smartclassroom.equipment.view', 'display_name' => 'View Equipment', 'module' => 'smartclassroom', 'resource' => 'equipment', 'action' => 'view', 'category' => 'equipment_management'],
            ['name' => 'smartclassroom.equipment.control', 'display_name' => 'Control Equipment', 'module' => 'smartclassroom', 'resource' => 'equipment', 'action' => 'control', 'category' => 'equipment_management'],
            ['name' => 'smartclassroom.recordings.view', 'display_name' => 'View Recordings', 'module' => 'smartclassroom', 'resource' => 'recordings', 'action' => 'view', 'category' => 'recording_management'],
            ['name' => 'smartclassroom.recordings.create', 'display_name' => 'Create Recordings', 'module' => 'smartclassroom', 'resource' => 'recordings', 'action' => 'create', 'category' => 'recording_management'],
        ];

        foreach ($permissions as $permData) {
            Permission::create($permData);
        }

        // Create default roles
        $roles = [
            [
                'name' => 'super_admin',
                'display_name' => 'Super Administrator',
                'description' => 'Full system access',
                'module' => 'core',
                'company_id' => $company->id,
                'is_system_role' => true,
            ],
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'System administrator',
                'module' => 'core',
                'company_id' => $company->id,
                'is_system_role' => true,
            ],
            [
                'name' => 'erp_admin',
                'display_name' => 'ERP Administrator',
                'description' => 'ERP system administrator',
                'module' => 'erp',
                'company_id' => $company->id,
                'is_system_role' => false,
            ],
            [
                'name' => 'carrental_manager',
                'display_name' => 'Car Rental Manager',
                'description' => 'Car rental system manager',
                'module' => 'carrental',
                'company_id' => $company->id,
                'is_system_role' => false,
            ],
            [
                'name' => 'classroom_manager',
                'display_name' => 'Classroom Manager',
                'description' => 'Smart classroom manager',
                'module' => 'smartclassroom',
                'company_id' => $company->id,
                'is_system_role' => false,
            ],
            [
                'name' => 'user',
                'display_name' => 'Standard User',
                'description' => 'Standard user with basic permissions',
                'module' => 'core',
                'company_id' => $company->id,
                'is_system_role' => true,
            ],
        ];

        foreach ($roles as $roleData) {
            $role = Role::create($roleData);
            
            // Assign permissions based on role
            switch ($role->name) {
                case 'super_admin':
                    $role->permissions()->attach(Permission::all()->pluck('id'));
                    break;
                    
                case 'admin':
                    $role->permissions()->attach(Permission::where('module', 'core')->pluck('id'));
                    break;
                    
                case 'erp_admin':
                    $role->permissions()->attach(Permission::where('module', 'erp')->pluck('id'));
                    break;
                    
                case 'carrental_manager':
                    $role->permissions()->attach(Permission::where('module', 'carrental')->pluck('id'));
                    break;
                    
                case 'classroom_manager':
                    $role->permissions()->attach(Permission::where('module', 'smartclassroom')->pluck('id'));
                    break;
                    
                case 'user':
                    $role->permissions()->attach(Permission::where('action', 'view')->pluck('id'));
                    break;
            }
        }

        // Create default super admin user
        $superAdminRole = Role::where('name', 'super_admin')->first();
        $itDepartment = Department::where('code', 'IT')->first();

        $superAdmin = User::create([
            'name' => 'Super Administrator',
            'email' => 'admin@enterprise-platform.com',
            'password' => Hash::make('admin1234'),
            'phone' => '+66-81-234-5678',
            'company_id' => $company->id,
            'department_id' => $itDepartment->id,
            'employee_id' => 'EMP001',
            'position' => 'Super Administrator',
            'hire_date' => now()->subYear(),
            'is_active' => true,
            'is_super_admin' => true,
        ]);

        $superAdmin->roles()->attach($superAdminRole->id);

        // Create test users for each system
        $erpAdminRole = Role::where('name', 'erp_admin')->first();
        $carrentalManagerRole = Role::where('name', 'carrental_manager')->first();
        $classroomManagerRole = Role::where('name', 'classroom_manager')->first();

        $erpAdmin = User::create([
            'name' => 'ERP Administrator',
            'email' => 'erp.admin@enterprise-platform.com',
            'password' => Hash::make('admin1234'),
            'phone' => '+66-81-234-5679',
            'company_id' => $company->id,
            'department_id' => $itDepartment->id,
            'employee_id' => 'EMP002',
            'position' => 'ERP Administrator',
            'hire_date' => now()->subMonths(6),
            'is_active' => true,
        ]);
        $erpAdmin->roles()->attach($erpAdminRole->id);

        $carrentalManager = User::create([
            'name' => 'Car Rental Manager',
            'email' => 'rental.manager@enterprise-platform.com',
            'password' => Hash::make('admin1234'),
            'phone' => '+66-81-234-5680',
            'company_id' => $company->id,
            'department_id' => Department::where('code', 'OPS')->first()->id,
            'employee_id' => 'EMP003',
            'position' => 'Car Rental Manager',
            'hire_date' => now()->subMonths(3),
            'is_active' => true,
        ]);
        $carrentalManager->roles()->attach($carrentalManagerRole->id);

        $classroomManager = User::create([
            'name' => 'Classroom Manager',
            'email' => 'classroom.manager@enterprise-platform.com',
            'password' => Hash::make('admin1234'),
            'phone' => '+66-81-234-5681',
            'company_id' => $company->id,
            'department_id' => Department::where('code', 'IT')->first()->id,
            'employee_id' => 'EMP004',
            'position' => 'Classroom Manager',
            'hire_date' => now()->subMonths(2),
            'is_active' => true,
        ]);
        $classroomManager->roles()->attach($classroomManagerRole->id);

        // Register systems
        $systems = [
            [
                'system_key' => 'erp',
                'name' => 'ERP Core System',
                'display_name' => 'ERP Core System',
                'description' => 'Enterprise Resource Planning Core System',
                'version' => '1.0.0',
                'icon' => 'CogIcon',
                'color' => '#3B82F6',
                'url_prefix' => '/erp',
                'api_base_url' => '/api/erp',
                'config' => [
                    'modules' => ['hr', 'accounting', 'sales', 'inventory'],
                    'features' => ['multi_company', 'multi_currency'],
                ],
                'permissions' => ['erp.users.view', 'erp.roles.view', 'erp.departments.view', 'erp.settings.view'],
                'is_enabled' => true,
                'requires_auth' => true,
                'sort_order' => 1,
            ],
            [
                'system_key' => 'carrental',
                'name' => 'Car Rental System',
                'display_name' => 'Car Rental System',
                'description' => 'Car Rental Management System',
                'version' => '1.0.0',
                'icon' => 'TruckIcon',
                'color' => '#10B981',
                'url_prefix' => '/carrental',
                'api_base_url' => '/api/carrental',
                'config' => [
                    'features' => ['online_booking', 'payment_gateway', 'fleet_tracking'],
                ],
                'permissions' => ['carrental.fleet.view', 'carrental.bookings.view', 'carrental.payments.view'],
                'is_enabled' => true,
                'requires_auth' => true,
                'sort_order' => 2,
            ],
            [
                'system_key' => 'smartclassroom',
                'name' => 'Smart Classroom System',
                'display_name' => 'Smart Classroom System',
                'description' => 'Smart Classroom Management System',
                'version' => '1.0.0',
                'icon' => 'AcademicCapIcon',
                'color' => '#8B5CF6',
                'url_prefix' => '/smartclassroom',
                'api_base_url' => '/api/smartclassroom',
                'config' => [
                    'features' => ['equipment_control', 'recording', 'live_streaming'],
                ],
                'permissions' => ['smartclassroom.classrooms.view', 'smartclassroom.equipment.view', 'smartclassroom.recordings.view'],
                'is_enabled' => true,
                'requires_auth' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($systems as $systemData) {
            SystemRegistry::create($systemData);
        }

        // Create system settings
        $settings = [
            ['key' => 'app.name', 'value' => 'Enterprise Platform', 'type' => 'string', 'category' => 'general', 'is_public' => true],
            ['key' => 'app.version', 'value' => '1.0.0', 'type' => 'string', 'category' => 'general', 'is_public' => true],
            ['key' => 'app.timezone', 'value' => 'Asia/Bangkok', 'type' => 'string', 'category' => 'general', 'is_public' => true],
            ['key' => 'app.currency', 'value' => 'THB', 'type' => 'string', 'category' => 'general', 'is_public' => true],
            ['key' => 'auth.session_timeout', 'value' => '1440', 'type' => 'integer', 'category' => 'security', 'is_public' => false],
            ['key' => 'auth.max_login_attempts', 'value' => '5', 'type' => 'integer', 'category' => 'security', 'is_public' => false],
            ['key' => 'audit.retention_days', 'value' => '365', 'type' => 'integer', 'category' => 'audit', 'is_public' => false],
            ['key' => 'backup.schedule', 'value' => 'daily', 'type' => 'string', 'category' => 'backup', 'is_public' => false],
        ];

        foreach ($settings as $settingData) {
            SystemSettings::create($settingData);
        }

        $this->command->info('Core Platform seeded successfully!');
        $this->command->info('Super Admin: admin@enterprise-platform.com / admin1234');
        $this->command->info('ERP Admin: erp.admin@enterprise-platform.com / admin1234');
        $this->command->info('Car Rental Manager: rental.manager@enterprise-platform.com / admin1234');
        $this->command->info('Classroom Manager: classroom.manager@enterprise-platform.com / admin1234');
    }
}
