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

        // Example RBAC protected routes
        Route::get('/admin-only', function () {
            return response()->json(['ok' => true]);
        })->middleware('role:admin');

        Route::post('/users', function () {
            return response()->json(['ok' => true]);
        })->middleware('permission:users.create');
    });
});


