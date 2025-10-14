<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSession extends Model
{
    use HasFactory;

    protected $table = 'user_sessions';

    protected $fillable = [
        'user_id',
        'session_id',
        'token_hash',
        'device_info',
        'ip_address',
        'last_activity_at',
        'expires_at',
        'is_active',
    ];

    protected $casts = [
        'device_info' => 'array',
        'last_activity_at' => 'datetime',
        'expires_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Get the user that owns this session
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Create a new session for user
     */
    public static function createSession(
        User $user,
        string $sessionId,
        string $tokenHash,
        array $deviceInfo = [],
        ?string $ipAddress = null,
        int $expiresInHours = 24
    ): self {
        return self::create([
            'user_id' => $user->id,
            'session_id' => $sessionId,
            'token_hash' => $tokenHash,
            'device_info' => $deviceInfo,
            'ip_address' => $ipAddress,
            'last_activity_at' => now(),
            'expires_at' => now()->addHours($expiresInHours),
            'is_active' => true,
        ]);
    }

    /**
     * Update last activity for session
     */
    public function updateLastActivity(): void
    {
        $this->update([
            'last_activity_at' => now(),
        ]);
    }

    /**
     * Deactivate session
     */
    public function deactivate(): void
    {
        $this->update(['is_active' => false]);
    }

    /**
     * Check if session is expired
     */
    public function isExpired(): bool
    {
        return $this->expires_at < now();
    }

    /**
     * Check if session is valid
     */
    public function isValid(): bool
    {
        return $this->is_active && !$this->isExpired();
    }

    /**
     * Scope for active sessions
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for valid sessions (active and not expired)
     */
    public function scopeValid($query)
    {
        return $query->where('is_active', true)
            ->where('expires_at', '>', now());
    }

    /**
     * Scope for expired sessions
     */
    public function scopeExpired($query)
    {
        return $query->where('expires_at', '<=', now());
    }

    /**
     * Scope for sessions for specific user
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Get device information
     */
    public function getDeviceInfo(string $key, $default = null)
    {
        return data_get($this->device_info, $key, $default);
    }

    /**
     * Set device information
     */
    public function setDeviceInfo(string $key, $value): void
    {
        $deviceInfo = $this->device_info ?? [];
        data_set($deviceInfo, $key, $value);
        $this->update(['device_info' => $deviceInfo]);
    }

    /**
     * Clean up expired sessions
     */
    public static function cleanupExpiredSessions(): int
    {
        return self::expired()->update(['is_active' => false]);
    }

    /**
     * Get session by session ID
     */
    public static function getBySessionId(string $sessionId): ?self
    {
        return self::where('session_id', $sessionId)->first();
    }

    /**
     * Get all active sessions for user
     */
    public static function getActiveSessionsForUser(User $user)
    {
        return self::valid()->forUser($user->id)->get();
    }

    /**
     * Revoke all sessions for user
     */
    public static function revokeAllSessionsForUser(User $user): int
    {
        return self::forUser($user->id)->update(['is_active' => false]);
    }

    /**
     * Get session duration in minutes
     */
    public function getDurationInMinutes(): int
    {
        return $this->created_at->diffInMinutes($this->last_activity_at);
    }

    /**
     * Get time until expiration in minutes
     */
    public function getTimeUntilExpirationInMinutes(): int
    {
        return max(0, now()->diffInMinutes($this->expires_at));
    }
}
