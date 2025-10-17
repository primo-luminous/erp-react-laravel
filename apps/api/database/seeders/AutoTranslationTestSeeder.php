<?php

namespace Database\Seeders;

use App\Models\User;
use App\Services\TranslationService;
use Illuminate\Database\Seeder;

class AutoTranslationTestSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        
        if (!$user) {
            $this->command->warn('No user found. Please run user seeder first.');
            return;
        }

        $this->command->info('Testing auto translation...');

        // Test with Thai text
        $user->name = 'ผู้จัดการระบบ';
        $user->save();

        $this->command->info('User updated with Thai name: ' . $user->name);

        // Check if translations were created
        $translations = $user->translations()->get();
        $this->command->info('Translations created: ' . $translations->count());

        foreach ($translations as $translation) {
            $this->command->info("  - {$translation->locale}: {$translation->value}");
        }

        // Test with English text
        $user->name = 'System Manager';
        $user->save();

        $this->command->info('User updated with English name: ' . $user->name);

        // Check translations again
        $translations = $user->translations()->get();
        $this->command->info('Total translations: ' . $translations->count());

        foreach ($translations as $translation) {
            $this->command->info("  - {$translation->locale}: {$translation->value}");
        }

        $this->command->info('Auto translation test completed!');
    }
}
