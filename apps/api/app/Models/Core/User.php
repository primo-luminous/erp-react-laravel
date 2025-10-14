<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'department_id',
        'name',
        'email',
        'password',
        'avatar',
        'phone',
        'position',
        'employee_id',
        'hire_date',
        'last_login_at',
        'last_login_ip',
        'is_active',
        'is_super_admin',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'hire_date' => 'date',
        'last_login_at' => 'datetime',
        'is_active' => 'boolean',
        'is_super_admin' => 'boolean',
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the company that owns the user
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the department that owns the user
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    /**
     * Get the roles for the user
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    /**
     * Get the permissions for the user
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'user_permissions');
    }

    /**
     * Get all permissions for the user (direct + through roles)
     */
    public function getAllPermissions(): BelongsToMany
    {
        $directPermissions = $this->permissions();
        $rolePermissions = Permission::whereIn('id', function($query) {
            $query->select('permission_id')
                  ->from('role_permissions')
                  ->whereIn('role_id', function($subQuery) {
                      $subQuery->select('role_id')
                               ->from('user_roles')
                               ->where('user_id', $this->id);
                  });
        });

        return $directPermissions->union($rolePermissions);
    }

    /**
     * Get user sessions
     */
    public function sessions(): HasMany
    {
        return $this->hasMany(UserSession::class);
    }

    /**
     * Get audit logs created by this user
     */
    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class);
    }

    /**
     * Check if user has specific permission
     */
    public function hasPermission(string $permission): bool
    {
        if ($this->is_super_admin) {
            return true;
        }

        return $this->permissions()->where('name', $permission)->exists() ||
               $this->roles()->whereHas('permissions', function($query) use ($permission) {
                   $query->where('name', $permission);
               })->exists();
    }

    /**
     * Check if user has specific role
     */
    public function hasRole(string $role): bool
    {
        return $this->roles()->where('name', $role)->exists();
    }

    /**
     * Scope for active users
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Mutator for password hashing
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}