<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class FinalSeeder extends Seeder
{
    public function run(): void
    {
        // Insert company data using existing table structure
        DB::table('companies')->insertOrIgnore([
            'id' => 1,
            'name' => 'Enterprise Platform Company',
            'legal_name' => 'Enterprise Platform Company Limited',
            'tax_id' => '1234567890123',
            'email' => 'admin@enterprise-platform.com',
            'phone' => '+66-2-123-4567',
            'address' => '123 Enterprise Street, Bangkok, Thailand',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Insert department data using existing table structure
        DB::table('departments')->insertOrIgnore([
            'id' => 1,
            'code' => 'IT001',
            'name' => 'IT Department',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Insert demo user
        DB::table('users')->insertOrIgnore([
            'id' => 1,
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Insert system settings using existing table structure
        DB::table('system_settings')->insertOrIgnore([
            'id' => 1,
            'key' => 'core_platform',
            'value' => json_encode([
                'name' => 'Core Platform',
                'version' => '1.0.0',
                'url_prefix' => '/core',
                'api_base_url' => '/api/core',
                'features' => ['auth', 'users', 'rbac', 'audit'],
            ]),
            'type' => 'json',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->command->info('Final seeder completed successfully!');
    }
}
