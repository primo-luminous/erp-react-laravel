<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'display_name',
        'description',
        'module',
        'resource',
        'action',
        'category',
        'is_system_permission',
        'metadata',
        'is_active',
    ];

    protected $casts = [
        'metadata' => 'array',
        'is_system_permission' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Get all roles that have this permission
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_permissions');
    }

    /**
     * Scope for active permissions
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for system permissions
     */
    public function scopeSystemPermissions($query)
    {
        return $query->where('is_system_permission', true);
    }

    /**
     * Scope for permissions in a specific module
     */
    public function scopeInModule($query, string $module)
    {
        return $query->where('module', $module);
    }

    /**
     * Scope for permissions in a specific resource
     */
    public function scopeInResource($query, string $resource)
    {
        return $query->where('resource', $resource);
    }

    /**
     * Scope for permissions with a specific action
     */
    public function scopeWithAction($query, string $action)
    {
        return $query->where('action', $action);
    }

    /**
     * Scope for permissions in a specific category
     */
    public function scopeInCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Get permission metadata
     */
    public function getMetadata(string $key, $default = null)
    {
        return data_get($this->metadata, $key, $default);
    }

    /**
     * Set permission metadata
     */
    public function setMetadata(string $key, $value): void
    {
        $metadata = $this->metadata ?? [];
        data_set($metadata, $key, $value);
        $this->update(['metadata' => $metadata]);
    }

    /**
     * Create a new permission with standard naming convention
     */
    public static function createPermission(
        string $module,
        string $resource,
        string $action,
        string $displayName,
        ?string $description = null,
        ?string $category = null
    ): self {
        $name = "{$module}.{$resource}.{$action}";
        
        return self::create([
            'name' => $name,
            'display_name' => $displayName,
            'description' => $description,
            'module' => $module,
            'resource' => $resource,
            'action' => $action,
            'category' => $category,
        ]);
    }

    /**
     * Get all permissions grouped by module
     */
    public static function getPermissionsByModule(): array
    {
        return self::active()
            ->orderBy('module')
            ->orderBy('resource')
            ->orderBy('action')
            ->get()
            ->groupBy('module')
            ->toArray();
    }

    /**
     * Get all permissions grouped by resource
     */
    public static function getPermissionsByResource(string $module): array
    {
        return self::active()
            ->where('module', $module)
            ->orderBy('resource')
            ->orderBy('action')
            ->get()
            ->groupBy('resource')
            ->toArray();
    }
}
