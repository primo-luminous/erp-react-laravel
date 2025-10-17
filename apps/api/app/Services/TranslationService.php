<?php

namespace App\Services;

use App\Models\Translation;
use App\Services\AutoTranslationService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;

class TranslationService
{
    protected $cachePrefix = 'translations';
    protected $cacheTtl = 3600; // 1 hour
    protected $autoTranslationService;

    public function __construct(AutoTranslationService $autoTranslationService)
    {
        $this->autoTranslationService = $autoTranslationService;
    }

    /**
     * Get translation for a model field
     */
    public function getTranslation(Model $model, string $field, string $locale = null): ?string
    {
        $locale = $locale ?: App::getLocale();
        
        $cacheKey = $this->getCacheKey($model, $field, $locale);
        
        return Cache::remember($cacheKey, $this->cacheTtl, function () use ($model, $field, $locale) {
            return $model->getTranslation($field, $locale);
        });
    }

    /**
     * Set translation for a model field
     */
    public function setTranslation(Model $model, string $field, string $locale, string $value): void
    {
        $model->setTranslation($field, $locale, $value);
        
        // Clear cache
        $this->clearCacheForModel($model);
    }

    /**
     * Set multiple translations for a model field
     */
    public function setTranslations(Model $model, string $field, array $translations): void
    {
        $model->setTranslations($field, $translations);
        
        // Clear cache
        $this->clearCacheForModel($model);
    }

    /**
     * Get all translations for a model
     */
    public function getModelTranslations(Model $model, string $locale = null): array
    {
        $locale = $locale ?: App::getLocale();
        
        $cacheKey = $this->getModelCacheKey($model, $locale);
        
        return Cache::remember($cacheKey, $this->cacheTtl, function () use ($model, $locale) {
            $translations = [];
            
            foreach ($model->getTranslatableFields() as $field) {
                $translations[$field] = $model->getTranslatedField($field, $locale);
            }
            
            return $translations;
        });
    }

    /**
     * Bulk translate multiple models
     */
    public function bulkTranslate(array $models, string $locale = null): array
    {
        $locale = $locale ?: App::getLocale();
        $results = [];
        
        foreach ($models as $model) {
            $results[] = [
                'model' => $model,
                'translations' => $this->getModelTranslations($model, $locale)
            ];
        }
        
        return $results;
    }

    /**
     * Get all available locales for a model field
     */
    public function getAvailableLocales(Model $model, string $field): array
    {
        return $model->translations()
            ->where('field_name', $field)
            ->pluck('locale')
            ->unique()
            ->toArray();
    }

    /**
     * Get translation statistics
     */
    public function getTranslationStats(Model $model): array
    {
        $stats = [];
        
        foreach ($model->getTranslatableFields() as $field) {
            $translations = $model->translations()->where('field_name', $field)->get();
            
            $stats[$field] = [
                'total_translations' => $translations->count(),
                'locales' => $translations->pluck('locale')->unique()->toArray(),
                'missing_locales' => array_diff(
                    ['th', 'en', 'zh'], // Default supported locales
                    $translations->pluck('locale')->unique()->toArray()
                )
            ];
        }
        
        return $stats;
    }

    /**
     * Auto-translate text to all supported languages
     */
    public function autoTranslateToAllLanguages(string $text, string $sourceLocale = null): array
    {
        if (!$sourceLocale) {
            $sourceLocale = $this->autoTranslationService->detectLanguage($text);
        }

        return $this->autoTranslationService->translateToAllLanguages($text, $sourceLocale);
    }

    /**
     * Auto-translate and save for a model field
     */
    public function autoTranslateAndSave(Model $model, string $field, string $text, string $sourceLocale = null): void
    {
        if (!$sourceLocale) {
            $sourceLocale = $this->autoTranslationService->detectLanguage($text);
        }

        $translations = $this->autoTranslateToAllLanguages($text, $sourceLocale);
        
        // Save all translations
        foreach ($translations as $locale => $translatedText) {
            if ($locale !== $sourceLocale) {
                $this->setTranslation($model, $field, $locale, $translatedText);
            }
        }
    }

    /**
     * Auto-translate using external service (placeholder)
     */
    public function autoTranslate(string $text, string $fromLocale, string $toLocale): string
    {
        return $this->autoTranslationService->translate($text, $fromLocale, $toLocale);
    }

    /**
     * Get cache key for a specific translation
     */
    protected function getCacheKey(Model $model, string $field, string $locale): string
    {
        return "{$this->cachePrefix}:{$model->getMorphClass()}:{$model->id}:{$field}:{$locale}";
    }

    /**
     * Get cache key for model translations
     */
    protected function getModelCacheKey(Model $model, string $locale): string
    {
        return "{$this->cachePrefix}:{$model->getMorphClass()}:{$model->id}:all:{$locale}";
    }

    /**
     * Clear cache for a specific model
     */
    public function clearCacheForModel(Model $model): void
    {
        $pattern = "{$this->cachePrefix}:{$model->getMorphClass()}:{$model->id}:*";
        
        // Clear cache using Laravel's cache system
        try {
            if (Cache::getStore() instanceof \Illuminate\Cache\RedisStore) {
                $redis = Cache::getStore()->getRedis();
                $keys = $redis->keys($pattern);
                if (!empty($keys)) {
                    $redis->del($keys);
                }
            } else {
                // For other cache stores, clear by pattern manually
                $this->clearCacheByPattern($pattern);
            }
        } catch (\Exception $e) {
            // If cache clearing fails, just log it
            \Log::warning('Failed to clear cache: ' . $e->getMessage());
        }
    }

    /**
     * Clear all translation cache
     */
    public function clearAllCache(): void
    {
        $pattern = "{$this->cachePrefix}:*";
        
        try {
            if (Cache::getStore() instanceof \Illuminate\Cache\RedisStore) {
                $redis = Cache::getStore()->getRedis();
                $keys = $redis->keys($pattern);
                if (!empty($keys)) {
                    $redis->del($keys);
                }
            } else {
                // For other cache stores, clear by pattern manually
                $this->clearCacheByPattern($pattern);
            }
        } catch (\Exception $e) {
            // If cache clearing fails, just log it
            \Log::warning('Failed to clear cache: ' . $e->getMessage());
        }
    }

    /**
     * Clear cache by pattern for non-Redis stores
     */
    protected function clearCacheByPattern(string $pattern): void
    {
        // For non-Redis stores, we can't easily clear by pattern
        // So we'll just clear the entire cache
        Cache::flush();
    }

    /**
     * Get supported locales
     */
    public function getSupportedLocales(): array
    {
        return ['th', 'en', 'zh'];
    }

    /**
     * Check if locale is supported
     */
    public function isLocaleSupported(string $locale): bool
    {
        return in_array($locale, $this->getSupportedLocales());
    }
}
