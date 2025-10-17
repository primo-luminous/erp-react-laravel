<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Department;
use Illuminate\Database\Seeder;

class CompanyDepartmentSeeder extends Seeder
{
    public function run(): void
    {
        // Create companies
        $companies = [
            'Enterprise Platform Company',
            'Subsidiary Company A',
            'Subsidiary Company B',
        ];

        foreach ($companies as $companyName) {
            Company::firstOrCreate(['name' => $companyName]);
        }

        // Create departments
        $departments = [
            ['name' => 'IT Department', 'code' => 'IT001'],
            ['name' => 'HR Department', 'code' => 'HR001'],
            ['name' => 'Sales Department', 'code' => 'SALES001'],
            ['name' => 'Accounting Department', 'code' => 'ACC001'],
            ['name' => 'Marketing Department', 'code' => 'MKT001'],
            ['name' => 'Operations Department', 'code' => 'OPS001'],
        ];

        foreach ($departments as $departmentData) {
            Department::firstOrCreate(
                ['name' => $departmentData['name']],
                $departmentData
            );
        }

        $this->command->info('Companies and departments created successfully!');
    }
}
