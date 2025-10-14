<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Core\AuthController;
use App\Http\Controllers\Api\Core\UserController;
use App\Http\Controllers\Api\Core\SystemRegistryController;

/*
|--------------------------------------------------------------------------
| Core Platform API Routes
|--------------------------------------------------------------------------
|
| These routes handle the core platform functionality including
| authentication, user management, and system registry.
|
*/

// Public routes (no authentication required)
Route::prefix('core')->group(function () {
    // Test route
    Route::get('/test', function() {
        return response()->json(['message' => 'Core API is working']);
    });
    
    // Authentication routes
    Route::post('/auth/login', [AuthController::class, 'login']);
    
    // System registry public routes
    Route::get('/systems/navigation', [SystemRegistryController::class, 'getNavigation']);
});

// Protected routes (authentication required)
Route::middleware(['auth:sanctum'])->prefix('core')->group(function () {
    // Authentication routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::get('/auth/sessions', [AuthController::class, 'getSessions']);
    Route::post('/auth/sessions/{sessionId}/revoke', [AuthController::class, 'revokeSession']);
    Route::post('/auth/sessions/revoke-all', [AuthController::class, 'revokeAllSessions']);
    
    // System access check
    Route::get('/auth/check-system/{systemKey}', [AuthController::class, 'checkSystemAccess']);
    
    // User management routes
    Route::apiResource('users', UserController::class);
    Route::post('/users/{user}/roles', [UserController::class, 'assignRoles']);
    Route::get('/users/{user}/permissions', [UserController::class, 'getPermissions']);
    Route::put('/users/{user}/preferences', [UserController::class, 'updatePreferences']);
    Route::get('/users/{user}/audit-logs', [UserController::class, 'getAuditLogs']);
    
    // Dropdown data routes
    Route::get('/users/companies', [UserController::class, 'getCompanies']);
    Route::get('/users/departments', [UserController::class, 'getDepartments']);
    Route::get('/users/roles', [UserController::class, 'getRoles']);
    
    // System registry routes
    Route::apiResource('systems', SystemRegistryController::class);
    Route::post('/systems/{systemKey}/toggle-status', [SystemRegistryController::class, 'toggleStatus']);
    Route::get('/systems/{systemKey}/config', [SystemRegistryController::class, 'getConfig']);
    Route::put('/systems/{systemKey}/config', [SystemRegistryController::class, 'updateConfig']);
    Route::get('/systems/{systemKey}/permissions', [SystemRegistryController::class, 'getPermissions']);
    Route::put('/systems/{systemKey}/permissions', [SystemRegistryController::class, 'updatePermissions']);
});
