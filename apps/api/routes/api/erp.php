<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Erp\HrController;

/*
|--------------------------------------------------------------------------
| ERP API Routes
|--------------------------------------------------------------------------
|
| These routes handle the ERP system functionality including
| HR, Inventory, Sales, Purchase, Accounting, and Finance modules.
|
*/

// Protected routes (authentication required)
Route::middleware(['auth:sanctum'])->prefix('erp')->group(function () {
    
    // HR Module Routes
    Route::prefix('hr')->group(function () {
        Route::get('/employees', [HrController::class, 'getEmployees']);
        Route::post('/employees', [HrController::class, 'createEmployee']);
        Route::put('/employees/{id}', [HrController::class, 'updateEmployee']);
        
        Route::get('/leave-requests', [HrController::class, 'getLeaveRequests']);
        Route::post('/leave-requests', [HrController::class, 'createLeaveRequest']);
        Route::put('/leave-requests/{id}/status', [HrController::class, 'updateLeaveRequestStatus']);
        
        Route::get('/leave-types', [HrController::class, 'getLeaveTypes']);
        
        Route::get('/dashboard-stats', [HrController::class, 'getDashboardStats']);
    });

    // Inventory Module Routes (placeholder)
    Route::prefix('inventory')->group(function () {
        Route::get('/products', function () {
            return response()->json(['message' => 'Inventory products endpoint - coming soon']);
        });
        Route::get('/stock', function () {
            return response()->json(['message' => 'Inventory stock endpoint - coming soon']);
        });
        Route::get('/warehouses', function () {
            return response()->json(['message' => 'Inventory warehouses endpoint - coming soon']);
        });
    });

    // Sales Module Routes (placeholder)
    Route::prefix('sales')->group(function () {
        Route::get('/customers', function () {
            return response()->json(['message' => 'Sales customers endpoint - coming soon']);
        });
        Route::get('/orders', function () {
            return response()->json(['message' => 'Sales orders endpoint - coming soon']);
        });
    });

    // Purchase Module Routes (placeholder)
    Route::prefix('purchase')->group(function () {
        Route::get('/suppliers', function () {
            return response()->json(['message' => 'Purchase suppliers endpoint - coming soon']);
        });
        Route::get('/orders', function () {
            return response()->json(['message' => 'Purchase orders endpoint - coming soon']);
        });
    });

    // Accounting Module Routes (placeholder)
    Route::prefix('accounting')->group(function () {
        Route::get('/journal-entries', function () {
            return response()->json(['message' => 'Accounting journal entries endpoint - coming soon']);
        });
        Route::get('/chart-of-accounts', function () {
            return response()->json(['message' => 'Accounting chart of accounts endpoint - coming soon']);
        });
    });

    // Finance Module Routes (placeholder)
    Route::prefix('finance')->group(function () {
        Route::get('/bank-accounts', function () {
            return response()->json(['message' => 'Finance bank accounts endpoint - coming soon']);
        });
        Route::get('/cash-flow', function () {
            return response()->json(['message' => 'Finance cash flow endpoint - coming soon']);
        });
    });

    // ERP Dashboard
    Route::get('/dashboard', function () {
        return response()->json([
            'success' => true,
            'data' => [
                'message' => 'ERP Dashboard',
                'modules' => [
                    'hr' => ['name' => 'Human Resources', 'status' => 'active'],
                    'inventory' => ['name' => 'Inventory Management', 'status' => 'development'],
                    'sales' => ['name' => 'Sales Management', 'status' => 'development'],
                    'purchase' => ['name' => 'Purchase Management', 'status' => 'development'],
                    'accounting' => ['name' => 'Accounting', 'status' => 'development'],
                    'finance' => ['name' => 'Finance', 'status' => 'development'],
                ]
            ]
        ]);
    });
});
