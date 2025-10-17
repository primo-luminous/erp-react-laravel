<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Translation extends Model
{
    protected $fillable = [
        'translatable_type',
        'translatable_id',
        'field_name',
        'locale',
        'value',
    ];

    protected $casts = [
        'translatable_id' => 'integer',
    ];

    /**
     * Get the parent translatable model.
     */
    public function translatable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Scope for specific locale
     */
    public function scopeForLocale($query, string $locale)
    {
        return $query->where('locale', $locale);
    }

    /**
     * Scope for specific field
     */
    public function scopeForField($query, string $fieldName)
    {
        return $query->where('field_name', $fieldName);
    }
}
