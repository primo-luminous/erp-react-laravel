<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Traits\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasRoles, HasFactory, Notifiable, Translatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Fields that can be translated
     */
    protected $translatableFields = [
        'name',
    ];

    /**
     * Get translated name
     */
    public function getTranslatedNameAttribute(): string
    {
        return $this->getTranslatedField('name');
    }

    /**
     * Override the name attribute to return translated value
     */
    public function getNameAttribute($value): string
    {
        // If we're in an API context and have a locale, return translated value
        if (request()->hasHeader('Accept-Language') || app()->getLocale() !== 'en') {
            $translated = $this->getTranslatedField('name');
            return $translated ?: $value;
        }
        
        return $value;
    }

    /**
     * Get the model's attributes in array format with translations
     */
    public function toArray(): array
    {
        $attributes = parent::toArray();
        
        // Add translated fields
        foreach ($this->getTranslatableFields() as $field) {
            $attributes["translated_{$field}"] = $this->getTranslatedField($field);
        }
        
        return $attributes;
    }

    /**
     * Get the company that the user belongs to
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the department that the user belongs to
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}
