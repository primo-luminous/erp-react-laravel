<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class FinalWorkingSeeder extends Seeder
{
    public function run(): void
    {
        DB::beginTransaction();

        try {
            // Create additional users if needed
            $users = [
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

            foreach ($users as $user) {
                if (!DB::table('users')->where('email', $user['email'])->exists()) {
                    DB::table('users')->insert($user);
                }
            }

            // Create additional departments if needed
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

            // Create additional roles using Spatie Permission schema
            $roles = [
                [
                    'name' => 'erp.manager',
                    'guard_name' => 'web',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'hr.manager',
                    'guard_name' => 'web',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'sales.manager',
                    'guard_name' => 'web',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'accountant',
                    'guard_name' => 'web',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ];

            foreach ($roles as $role) {
                if (!DB::table('roles')->where('name', $role['name'])->exists()) {
                    DB::table('roles')->insert($role);
                }
            }

            // Create additional permissions using Spatie Permission schema
            $permissions = [
                // Core Platform Permissions
                ['name' => 'core.users.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.users.create', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.users.edit', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.users.delete', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.roles.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.roles.create', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.roles.edit', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.roles.delete', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.companies.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.companies.edit', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.departments.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.departments.create', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.departments.edit', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.departments.delete', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.systems.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.systems.edit', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'core.audit.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],

                // ERP Module Permissions
                ['name' => 'erp.access', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.hr.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.hr.employees.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.hr.employees.create', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.hr.employees.edit', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.hr.leave.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.hr.leave.approve', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],

                // Inventory Module
                ['name' => 'erp.inventory.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.inventory.products.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.inventory.products.create', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.inventory.products.edit', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.inventory.stock.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.inventory.stock.adjust', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],

                // Sales Module
                ['name' => 'erp.sales.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.sales.customers.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.sales.customers.create', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.sales.orders.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.sales.orders.create', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.sales.orders.edit', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],

                // Purchase Module
                ['name' => 'erp.purchase.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.purchase.suppliers.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.purchase.suppliers.create', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.purchase.orders.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.purchase.orders.create', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.purchase.orders.edit', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],

                // Accounting Module
                ['name' => 'erp.accounting.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.accounting.journal.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.accounting.journal.create', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.accounting.reports.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],

                // Finance Module
                ['name' => 'erp.finance.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.finance.bank.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'erp.finance.cashflow.view', 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()],
            ];

            foreach ($permissions as $perm) {
                if (!DB::table('permissions')->where('name', $perm['name'])->exists()) {
                    DB::table('permissions')->insert($perm);
                }
            }

            DB::commit();
            $this->command->info('Final Working Seeder completed successfully!');
            
        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('Error in Final Working Seeder: ' . $e->getMessage());
            throw $e;
        }
    }
}
