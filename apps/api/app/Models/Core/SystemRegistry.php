<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemRegistry extends Model
{
    use HasFactory;

    protected $table = 'system_registry';

    protected $fillable = [
        'system_key',
        'name',
        'display_name',
        'description',
        'version',
        'icon',
        'color',
        'url_prefix',
        'api_base_url',
        'config',
        'permissions',
        'is_enabled',
        'requires_auth',
        'sort_order',
    ];

    protected $casts = [
        'config' => 'array',
        'permissions' => 'array',
        'is_enabled' => 'boolean',
        'requires_auth' => 'boolean',
    ];

    /**
     * Scope for enabled systems
     */
    public function scopeEnabled($query)
    {
        return $query->where('is_enabled', true);
    }

    /**
     * Scope for systems requiring authentication
     */
    public function scopeRequiresAuth($query)
    {
        return $query->where('requires_auth', true);
    }

    /**
     * Get system configuration
     */
    public function getConfig(string $key, $default = null)
    {
        return data_get($this->config, $key, $default);
    }

    /**
     * Set system configuration
     */
    public function setConfig(string $key, $value): void
    {
        $config = $this->config ?? [];
        data_set($config, $key, $value);
        $this->update(['config' => $config]);
    }

    /**
     * Get system permissions
     */
    public function getPermissions(): array
    {
        return $this->permissions ?? [];
    }

    /**
     * Set system permissions
     */
    public function setPermissions(array $permissions): void
    {
        $this->update(['permissions' => $permissions]);
    }

    /**
     * Check if system has a specific permission
     */
    public function hasPermission(string $permission): bool
    {
        return in_array($permission, $this->getPermissions());
    }

    /**
     * Register a new system
     */
    public static function registerSystem(array $data): self
    {
        return self::create($data);
    }

    /**
     * Get all enabled systems ordered by sort_order
     */
    public static function getEnabledSystems()
    {
        return self::enabled()
            ->orderBy('sort_order')
            ->get();
    }

    /**
     * Get system by key
     */
    public static function getByKey(string $systemKey): ?self
    {
        return self::where('system_key', $systemKey)->first();
    }

    /**
     * Check if system exists and is enabled
     */
    public static function isEnabled(string $systemKey): bool
    {
        return self::where('system_key', $systemKey)
            ->where('is_enabled', true)
            ->exists();
    }

    /**
     * Get system URL
     */
    public function getUrl(): ?string
    {
        return $this->url_prefix ? url($this->url_prefix) : null;
    }

    /**
     * Get API URL
     */
    public function getApiUrl(): ?string
    {
        return $this->api_base_url ?: null;
    }
}
