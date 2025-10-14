<?php

namespace App\Http\Controllers\Api\Core;

use App\Http\Controllers\Controller;
use App\Models\Core\User;
use App\Models\Core\UserSession;
use App\Models\Core\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * User login
     */
    public function login(Request $request): JsonResponse
    {
        // Debug: Log the request data
        \Log::info('Login request data:', $request->all());
        \Log::info('Request method:', [$request->method()]);
        \Log::info('Request content type:', [$request->header('Content-Type')]);
        \Log::info('Raw request body:', [$request->getContent()]);
        
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
            'remember' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            // Log failed login attempt
            AuditLog::logAction([
                'user_id' => null,
                'action' => 'login_failed',
                'resource_type' => 'User',
                'resource_id' => null,
                'description' => 'Failed login attempt',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'metadata' => ['email' => $request->email],
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        // Create token
        $token = $user->createToken('auth-token', ['*'], $request->boolean('remember') ? now()->addDays(30) : now()->addDay());
        
        // Create session
        $sessionId = Str::uuid();
        UserSession::createSession(
            $user,
            $sessionId,
            hash('sha256', $token->plainTextToken),
            $this->getDeviceInfo($request),
            $request->ip(),
            $request->boolean('remember') ? 24 * 30 : 24 // 30 days or 1 day
        );

        // Update last login
        $user->updateLastLogin($request->ip());

        // Log successful login
        AuditLog::logLogin($user, $request->ip(), $request->userAgent());

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'company' => $user->company,
                    'department' => $user->department,
                    'permissions' => $user->permissions()->pluck('name')->toArray(),
                    'roles' => $user->roles->map(function ($role) {
                        return [
                            'id' => $role->id,
                            'name' => $role->name,
                            'display_name' => $role->display_name,
                            'module' => $role->module,
                        ];
                    }),
                ],
                'token' => $token->plainTextToken,
                'session_id' => $sessionId,
                'expires_at' => $token->accessToken->expires_at,
            ],
        ]);
    }

    /**
     * User logout
     */
    public function logout(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        if ($user) {
            // Log logout
            AuditLog::logLogout($user, $request->ip(), $request->userAgent());

            // Deactivate current session
            $sessionId = $request->header('X-Session-ID');
            if ($sessionId) {
                $session = UserSession::getBySessionId($sessionId);
                if ($session) {
                    $session->deactivate();
                }
            }

            // Revoke current token
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Logout successful',
        ]);
    }

    /**
     * Refresh token
     */
    public function refresh(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        // Revoke old token
        $request->user()->currentAccessToken()->delete();
        
        // Create new token
        $token = $user->createToken('auth-token', ['*'], now()->addDay());
        
        // Update session
        $sessionId = $request->header('X-Session-ID');
        if ($sessionId) {
            $session = UserSession::getBySessionId($sessionId);
            if ($session) {
                $session->update([
                    'token_hash' => hash('sha256', $token->plainTextToken),
                    'expires_at' => now()->addDay(),
                    'last_activity_at' => now(),
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Token refreshed successfully',
            'data' => [
                'token' => $token->plainTextToken,
                'expires_at' => $token->accessToken->expires_at,
            ],
        ]);
    }

    /**
     * Get current user
     */
    public function me(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'phone' => $user->phone,
                    'company' => $user->company,
                    'department' => $user->department,
                    'position' => $user->position,
                    'employee_id' => $user->employee_id,
                    'hire_date' => $user->hire_date,
                    'last_login_at' => $user->last_login_at,
                    'permissions' => $user->permissions()->pluck('name')->toArray(),
                    'roles' => $user->roles->map(function ($role) {
                        return [
                            'id' => $role->id,
                            'name' => $role->name,
                            'display_name' => $role->display_name,
                            'module' => $role->module,
                        ];
                    }),
                ],
            ],
        ]);
    }

    /**
     * Check system access permission
     */
    public function checkSystemAccess(Request $request, string $systemKey): JsonResponse
    {
        $user = Auth::user();
        
        // Check if system exists and is enabled
        $system = \App\Models\Core\SystemRegistry::getByKey($systemKey);
        if (!$system || !$system->is_enabled) {
            return response()->json([
                'success' => false,
                'message' => 'System not found or disabled',
            ], 404);
        }

        // Check if user has access to this system
        $systemPermissions = $system->getPermissions();
        if (empty($systemPermissions)) {
            // No specific permissions required
            $hasAccess = true;
        } else {
            // Check if user has any of the required permissions
            $hasAccess = $user->hasAnyPermission($systemPermissions);
        }

        if (!$hasAccess) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied to system',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'system' => [
                    'key' => $system->system_key,
                    'name' => $system->name,
                    'display_name' => $system->display_name,
                    'version' => $system->version,
                    'url_prefix' => $system->url_prefix,
                    'api_base_url' => $system->api_base_url,
                    'config' => $system->config,
                ],
                'user_permissions' => $user->getPermissionsByModule($systemKey),
            ],
        ]);
    }

    /**
     * Get user sessions
     */
    public function getSessions(Request $request): JsonResponse
    {
        $user = Auth::user();
        $sessions = UserSession::getActiveSessionsForUser($user);

        return response()->json([
            'success' => true,
            'data' => [
                'sessions' => $sessions->map(function ($session) {
                    return [
                        'id' => $session->id,
                        'session_id' => $session->session_id,
                        'device_info' => $session->device_info,
                        'ip_address' => $session->ip_address,
                        'last_activity_at' => $session->last_activity_at,
                        'expires_at' => $session->expires_at,
                        'is_current' => $session->session_id === request()->header('X-Session-ID'),
                    ];
                }),
            ],
        ]);
    }

    /**
     * Revoke session
     */
    public function revokeSession(Request $request, string $sessionId): JsonResponse
    {
        $user = Auth::user();
        $session = UserSession::getBySessionId($sessionId);

        if (!$session || $session->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Session not found',
            ], 404);
        }

        $session->deactivate();

        return response()->json([
            'success' => true,
            'message' => 'Session revoked successfully',
        ]);
    }

    /**
     * Revoke all sessions
     */
    public function revokeAllSessions(Request $request): JsonResponse
    {
        $user = Auth::user();
        UserSession::revokeAllSessionsForUser($user);

        return response()->json([
            'success' => true,
            'message' => 'All sessions revoked successfully',
        ]);
    }

    /**
     * Get device information from request
     */
    private function getDeviceInfo(Request $request): array
    {
        $userAgent = $request->userAgent();
        
        return [
            'user_agent' => $userAgent,
            'ip_address' => $request->ip(),
            'platform' => $this->getPlatform($userAgent),
            'browser' => $this->getBrowser($userAgent),
            'device_type' => $this->getDeviceType($userAgent),
        ];
    }

    /**
     * Get platform from user agent
     */
    private function getPlatform(string $userAgent): string
    {
        if (strpos($userAgent, 'Windows') !== false) return 'Windows';
        if (strpos($userAgent, 'Mac') !== false) return 'macOS';
        if (strpos($userAgent, 'Linux') !== false) return 'Linux';
        if (strpos($userAgent, 'Android') !== false) return 'Android';
        if (strpos($userAgent, 'iOS') !== false) return 'iOS';
        return 'Unknown';
    }

    /**
     * Get browser from user agent
     */
    private function getBrowser(string $userAgent): string
    {
        if (strpos($userAgent, 'Chrome') !== false) return 'Chrome';
        if (strpos($userAgent, 'Firefox') !== false) return 'Firefox';
        if (strpos($userAgent, 'Safari') !== false) return 'Safari';
        if (strpos($userAgent, 'Edge') !== false) return 'Edge';
        if (strpos($userAgent, 'Opera') !== false) return 'Opera';
        return 'Unknown';
    }

    /**
     * Get device type from user agent
     */
    private function getDeviceType(string $userAgent): string
    {
        if (strpos($userAgent, 'Mobile') !== false) return 'Mobile';
        if (strpos($userAgent, 'Tablet') !== false) return 'Tablet';
        return 'Desktop';
    }
}
