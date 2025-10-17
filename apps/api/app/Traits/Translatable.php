<?php

namespace App\Traits;

use App\Models\Translation;
use App\Services\TranslationService;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\App;

trait Translatable
{
    /**
     * Get all translations for this model
     */
    public function translations(): MorphMany
    {
        return $this->morphMany(Translation::class, 'translatable');
    }

    /**
     * Get translation for a specific field and locale
     */
    public function getTranslation(string $field, string $locale = null): ?string
    {
        $locale = $locale ?: App::getLocale();
        
        $translation = $this->translations()
            ->where('field_name', $field)
            ->where('locale', $locale)
            ->first();

        return $translation ? $translation->value : null;
    }

    /**
     * Set translation for a specific field and locale
     */
    public function setTranslation(string $field, string $locale, string $value): void
    {
        $this->translations()->updateOrCreate(
            [
                'field_name' => $field,
                'locale' => $locale,
            ],
            [
                'value' => $value,
            ]
        );
    }

    /**
     * Get all translations for a specific field
     */
    public function getTranslations(string $field): array
    {
        return $this->translations()
            ->where('field_name', $field)
            ->pluck('value', 'locale')
            ->toArray();
    }

    /**
     * Set multiple translations for a field
     */
    public function setTranslations(string $field, array $translations): void
    {
        foreach ($translations as $locale => $value) {
            $this->setTranslation($field, $locale, $value);
        }
    }

    /**
     * Get translated field value with fallback
     */
    public function getTranslatedField(string $field, string $locale = null): string
    {
        $locale = $locale ?: App::getLocale();
        
        // Try to get translation
        $translation = $this->getTranslation($field, $locale);
        
        if ($translation) {
            return $translation;
        }

        // Fallback to original field value
        return $this->getAttribute($field) ?: '';
    }

    /**
     * Get all translatable fields for this model
     */
    public function getTranslatableFields(): array
    {
        return $this->translatableFields ?? [];
    }

    /**
     * Check if a field is translatable
     */
    public function isTranslatableField(string $field): bool
    {
        return in_array($field, $this->getTranslatableFields());
    }

    /**
     * Get all translations for current locale
     */
    public function getTranslationsForCurrentLocale(): array
    {
        $locale = App::getLocale();
        $translations = [];
        
        foreach ($this->getTranslatableFields() as $field) {
            $translations[$field] = $this->getTranslatedField($field, $locale);
        }
        
        return $translations;
    }

    /**
     * Delete all translations for this model
     */
    public function deleteTranslations(): void
    {
        $this->translations()->delete();
    }

    /**
     * Delete translations for a specific field
     */
    public function deleteTranslationsForField(string $field): void
    {
        $this->translations()->where('field_name', $field)->delete();
    }

    /**
     * Delete translations for a specific locale
     */
    public function deleteTranslationsForLocale(string $locale): void
    {
        $this->translations()->where('locale', $locale)->delete();
    }

    /**
     * Auto-translate field when saving
     */
    public function autoTranslateField(string $field, string $text, string $sourceLocale = null): void
    {
        if (!$this->isTranslatableField($field)) {
            return;
        }

        $translationService = app(TranslationService::class);
        $translationService->autoTranslateAndSave($this, $field, $text, $sourceLocale);
    }

    /**
     * Boot the trait and add model events
     */
    protected static function bootTranslatable()
    {
        // Auto-translate on model saving
        static::saving(function ($model) {
            foreach ($model->getTranslatableFields() as $field) {
                if ($model->isDirty($field) && $model->getAttribute($field)) {
                    $model->autoTranslateField($field, $model->getAttribute($field));
                }
            }
        });
    }
}
