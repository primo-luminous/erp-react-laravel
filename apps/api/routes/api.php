<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

// Include Core Platform routes
require_once __DIR__ . '/api/core.php';

// Include ERP routes
require_once __DIR__ . '/api/erp.php';

Route::prefix('v1')->group(function () {
    // Test endpoint
    Route::get('/test', function () {
        return response()->json(['message' => 'API is working', 'timestamp' => now()]);
    });
    
    // User management routes
    Route::apiResource('users', App\Http\Controllers\Api\UserController::class);
    Route::get('/companies', [App\Http\Controllers\Api\UserController::class, 'getCompanies']);
    Route::get('/departments', [App\Http\Controllers\Api\UserController::class, 'getDepartments']);
    Route::get('/roles', [App\Http\Controllers\Api\UserController::class, 'getRoles']);
    Route::post('/users/{user}/roles', [App\Http\Controllers\Api\UserController::class, 'assignRoles']);
    Route::get('/users/{user}/roles', [App\Http\Controllers\Api\UserController::class, 'getUserRoles']);
    
    Route::post('/login', function (Request $request) {
        $credentials = $request->validate([
            'email' => ['required','email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        /** @var User $user */
        $user = User::where('email', $credentials['email'])->first();
        $token = $user->createToken('web')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ],
        ]);
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', function (Request $request) {
            /** @var User $user */
            $user = $request->user();
            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ]);
        });

        Route::post('/logout', function (Request $request) {
            /** @var User $user */
            $user = $request->user();
            $user->currentAccessToken()?->delete();
            return response()->json(['message' => 'Logged out']);
        });

        // Profile routes
        Route::prefix('profile')->group(function () {
            Route::get('/', [App\Http\Controllers\ProfileController::class, 'show']);
            Route::put('/', [App\Http\Controllers\ProfileController::class, 'update']);
            Route::post('/change-password', [App\Http\Controllers\ProfileController::class, 'changePassword']);
        });

        // Translation routes
        Route::prefix('translations')->group(function () {
            Route::get('/locales', [App\Http\Controllers\Api\TranslationController::class, 'getSupportedLocales']);
            Route::get('/', [App\Http\Controllers\Api\TranslationController::class, 'getTranslation']);
            Route::post('/', [App\Http\Controllers\Api\TranslationController::class, 'setTranslation']);
            Route::post('/bulk', [App\Http\Controllers\Api\TranslationController::class, 'setTranslations']);
            Route::get('/model', [App\Http\Controllers\Api\TranslationController::class, 'getModelTranslations']);
            Route::get('/stats', [App\Http\Controllers\Api\TranslationController::class, 'getTranslationStats']);
            Route::delete('/cache', [App\Http\Controllers\Api\TranslationController::class, 'clearCache']);
        });

        // Example RBAC protected routes
        Route::get('/admin-only', function () {
            return response()->json(['ok' => true]);
        })->middleware('role:admin');

        Route::post('/users', function () {
            return response()->json(['ok' => true]);
        })->middleware('permission:users.create');
    });
});


