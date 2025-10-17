<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AutoTranslationService
{
    protected $supportedLocales = ['th', 'en', 'zh'];
    protected $defaultLocale = 'th';

    /**
     * Auto translate text to all supported languages
     */
    public function translateToAllLanguages(string $text, string $sourceLocale = 'th'): array
    {
        $translations = [];
        
        foreach ($this->supportedLocales as $targetLocale) {
            if ($targetLocale === $sourceLocale) {
                $translations[$targetLocale] = $text;
                continue;
            }

            try {
                $translatedText = $this->translate($text, $sourceLocale, $targetLocale);
                $translations[$targetLocale] = $translatedText;
            } catch (\Exception $e) {
                Log::warning("Translation failed for {$sourceLocale} to {$targetLocale}: " . $e->getMessage());
                // Fallback to original text
                $translations[$targetLocale] = $text;
            }
        }

        return $translations;
    }

    /**
     * Translate text from source to target language
     */
    public function translate(string $text, string $fromLocale, string $toLocale): string
    {
        if ($fromLocale === $toLocale) {
            return $text;
        }

        // For now, we'll use a simple mapping approach
        // In production, you would integrate with Google Translate, Azure Translator, etc.
        return $this->translateWithMapping($text, $fromLocale, $toLocale);
    }

    /**
     * Simple translation mapping (for demo purposes)
     * In production, replace with real translation service
     */
    protected function translateWithMapping(string $text, string $fromLocale, string $toLocale): string
    {
        $mappings = $this->getTranslationMappings();
        
        $key = strtolower(trim($text));
        
        if (isset($mappings[$fromLocale][$key][$toLocale])) {
            return $mappings[$fromLocale][$key][$toLocale];
        }

        // If no mapping found, return original text with language prefix
        return "[{$toLocale}] {$text}";
    }

    /**
     * Get translation mappings
     */
    protected function getTranslationMappings(): array
    {
        return [
            'th' => [
                'ผู้ดูแลระบบ' => [
                    'en' => 'System Administrator',
                    'zh' => '系统管理员',
                ],
                'ผู้ใช้' => [
                    'en' => 'User',
                    'zh' => '用户',
                ],
                'ผู้จัดการ' => [
                    'en' => 'Manager',
                    'zh' => '经理',
                ],
                'พนักงาน' => [
                    'en' => 'Employee',
                    'zh' => '员工',
                ],
                'บัญชี' => [
                    'en' => 'Account',
                    'zh' => '账户',
                ],
                'การเงิน' => [
                    'en' => 'Finance',
                    'zh' => '财务',
                ],
                'ขาย' => [
                    'en' => 'Sales',
                    'zh' => '销售',
                ],
                'การตลาด' => [
                    'en' => 'Marketing',
                    'zh' => '营销',
                ],
                'ทรัพยากรบุคคล' => [
                    'en' => 'Human Resources',
                    'zh' => '人力资源',
                ],
                'ไอที' => [
                    'en' => 'IT',
                    'zh' => '信息技术',
                ],
            ],
            'en' => [
                'system administrator' => [
                    'th' => 'ผู้ดูแลระบบ',
                    'zh' => '系统管理员',
                ],
                'user' => [
                    'th' => 'ผู้ใช้',
                    'zh' => '用户',
                ],
                'manager' => [
                    'th' => 'ผู้จัดการ',
                    'zh' => '经理',
                ],
                'employee' => [
                    'th' => 'พนักงาน',
                    'zh' => '员工',
                ],
                'account' => [
                    'th' => 'บัญชี',
                    'zh' => '账户',
                ],
                'finance' => [
                    'th' => 'การเงิน',
                    'zh' => '财务',
                ],
                'sales' => [
                    'th' => 'ขาย',
                    'zh' => '销售',
                ],
                'marketing' => [
                    'th' => 'การตลาด',
                    'zh' => '营销',
                ],
                'human resources' => [
                    'th' => 'ทรัพยากรบุคคล',
                    'zh' => '人力资源',
                ],
                'it' => [
                    'th' => 'ไอที',
                    'zh' => '信息技术',
                ],
            ],
            'zh' => [
                '系统管理员' => [
                    'th' => 'ผู้ดูแลระบบ',
                    'en' => 'System Administrator',
                ],
                '用户' => [
                    'th' => 'ผู้ใช้',
                    'en' => 'User',
                ],
                '经理' => [
                    'th' => 'ผู้จัดการ',
                    'en' => 'Manager',
                ],
                '员工' => [
                    'th' => 'พนักงาน',
                    'en' => 'Employee',
                ],
                '账户' => [
                    'th' => 'บัญชี',
                    'en' => 'Account',
                ],
                '财务' => [
                    'th' => 'การเงิน',
                    'en' => 'Finance',
                ],
                '销售' => [
                    'th' => 'ขาย',
                    'en' => 'Sales',
                ],
                '营销' => [
                    'th' => 'การตลาด',
                    'en' => 'Marketing',
                ],
                '人力资源' => [
                    'th' => 'ทรัพยากรบุคคล',
                    'en' => 'Human Resources',
                ],
                '信息技术' => [
                    'th' => 'ไอที',
                    'en' => 'IT',
                ],
            ],
        ];
    }

    /**
     * Detect language of text
     */
    public function detectLanguage(string $text): string
    {
        // Simple language detection based on character patterns
        if (preg_match('/[\x{0E00}-\x{0E7F}]/u', $text)) {
            return 'th'; // Thai
        } elseif (preg_match('/[\x{4E00}-\x{9FFF}]/u', $text)) {
            return 'zh'; // Chinese
        } else {
            return 'en'; // English (default)
        }
    }

    /**
     * Get supported locales
     */
    public function getSupportedLocales(): array
    {
        return $this->supportedLocales;
    }

    /**
     * Check if locale is supported
     */
    public function isLocaleSupported(string $locale): bool
    {
        return in_array($locale, $this->supportedLocales);
    }

    /**
     * Translate using external service (placeholder for future implementation)
     */
    protected function translateWithExternalService(string $text, string $fromLocale, string $toLocale): string
    {
        // This is where you would integrate with external translation services
        // Examples:
        // - Google Translate API
        // - Azure Translator
        // - AWS Translate
        // - DeepL API
        
        // For now, return a placeholder
        return "[{$toLocale}] {$text}";
    }
}
