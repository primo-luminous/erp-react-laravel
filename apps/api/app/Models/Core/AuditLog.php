<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditLog extends Model
{
    use HasFactory;

    protected $table = 'audit_logs';

    protected $fillable = [
        'user_id',
        'system_key',
        'action',
        'resource_type',
        'resource_id',
        'old_values',
        'new_values',
        'description',
        'ip_address',
        'user_agent',
        'session_id',
        'metadata',
    ];

    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
        'metadata' => 'array',
        'created_at' => 'datetime',
    ];

    public $timestamps = false;

    /**
     * Get the user that performed this action
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Log a user action
     */
    public static function logAction(array $data): self
    {
        return self::create(array_merge($data, [
            'created_at' => now(),
        ]));
    }

    /**
     * Log user login
     */
    public static function logLogin(User $user, string $ipAddress, ?string $userAgent = null): self
    {
        return self::logAction([
            'user_id' => $user->id,
            'action' => 'login',
            'resource_type' => 'User',
            'resource_id' => $user->id,
            'description' => 'User logged in',
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
        ]);
    }

    /**
     * Log user logout
     */
    public static function logLogout(User $user, string $ipAddress, ?string $userAgent = null): self
    {
        return self::logAction([
            'user_id' => $user->id,
            'action' => 'logout',
            'resource_type' => 'User',
            'resource_id' => $user->id,
            'description' => 'User logged out',
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
        ]);
    }

    /**
     * Log resource creation
     */
    public static function logCreate(
        User $user,
        string $resourceType,
        string $resourceId,
        array $newValues,
        ?string $systemKey = null,
        ?string $description = null
    ): self {
        return self::logAction([
            'user_id' => $user->id,
            'system_key' => $systemKey,
            'action' => 'create',
            'resource_type' => $resourceType,
            'resource_id' => $resourceId,
            'new_values' => $newValues,
            'description' => $description ?: "Created {$resourceType}",
        ]);
    }

    /**
     * Log resource update
     */
    public static function logUpdate(
        User $user,
        string $resourceType,
        string $resourceId,
        array $oldValues,
        array $newValues,
        ?string $systemKey = null,
        ?string $description = null
    ): self {
        return self::logAction([
            'user_id' => $user->id,
            'system_key' => $systemKey,
            'action' => 'update',
            'resource_type' => $resourceType,
            'resource_id' => $resourceId,
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'description' => $description ?: "Updated {$resourceType}",
        ]);
    }

    /**
     * Log resource deletion
     */
    public static function logDelete(
        User $user,
        string $resourceType,
        string $resourceId,
        array $oldValues,
        ?string $systemKey = null,
        ?string $description = null
    ): self {
        return self::logAction([
            'user_id' => $user->id,
            'system_key' => $systemKey,
            'action' => 'delete',
            'resource_type' => $resourceType,
            'resource_id' => $resourceId,
            'old_values' => $oldValues,
            'description' => $description ?: "Deleted {$resourceType}",
        ]);
    }

    /**
     * Scope for specific user
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope for specific system
     */
    public function scopeForSystem($query, string $systemKey)
    {
        return $query->where('system_key', $systemKey);
    }

    /**
     * Scope for specific action
     */
    public function scopeForAction($query, string $action)
    {
        return $query->where('action', $action);
    }

    /**
     * Scope for specific resource type
     */
    public function scopeForResourceType($query, string $resourceType)
    {
        return $query->where('resource_type', $resourceType);
    }

    /**
     * Scope for date range
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    /**
     * Get the formatted action description
     */
    public function getFormattedActionAttribute(): string
    {
        return ucfirst($this->action) . ' ' . $this->resource_type;
    }

    /**
     * Get the changes made (for updates)
     */
    public function getChangesAttribute(): array
    {
        if ($this->action !== 'update' || !$this->old_values || !$this->new_values) {
            return [];
        }

        $changes = [];
        foreach ($this->new_values as $key => $newValue) {
            $oldValue = data_get($this->old_values, $key);
            if ($oldValue !== $newValue) {
                $changes[$key] = [
                    'old' => $oldValue,
                    'new' => $newValue,
                ];
            }
        }

        return $changes;
    }
}
