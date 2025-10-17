<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Translation;
use Illuminate\Database\Seeder;

class TranslationSeeder extends Seeder
{
    public function run(): void
    {
        // Get the first user
        $user = User::first();
        
        if (!$user) {
            $this->command->warn('No user found. Please run user seeder first.');
            return;
        }

        // Create translations for user name
        $translations = [
            'th' => 'ผู้ดูแลระบบ',
            'en' => 'System Administrator', 
            'zh' => '系统管理员',
        ];

        foreach ($translations as $locale => $value) {
            Translation::updateOrCreate(
                [
                    'translatable_type' => User::class,
                    'translatable_id' => $user->id,
                    'field_name' => 'name',
                    'locale' => $locale,
                ],
                [
                    'value' => $value,
                ]
            );
        }

        $this->command->info('Translation data created successfully!');
    }
}
