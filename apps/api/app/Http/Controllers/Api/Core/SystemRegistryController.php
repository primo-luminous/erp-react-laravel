<?php

namespace App\Http\Controllers\Api\Core;

use App\Http\Controllers\Controller;
use App\Models\Core\SystemRegistry;
use App\Models\Core\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SystemRegistryController extends Controller
{
    /**
     * Get all systems
     */
    public function index(Request $request): JsonResponse
    {
        $systems = SystemRegistry::when($request->enabled_only, function ($q) {
                return $q->enabled();
            })
            ->when($request->requires_auth, function ($q) {
                return $q->requiresAuth();
            })
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'systems' => $systems->map(function ($system) {
                    return [
                        'id' => $system->id,
                        'system_key' => $system->system_key,
                        'name' => $system->name,
                        'display_name' => $system->display_name,
                        'description' => $system->description,
                        'version' => $system->version,
                        'icon' => $system->icon,
                        'color' => $system->color,
                        'url_prefix' => $system->url_prefix,
                        'api_base_url' => $system->api_base_url,
                        'is_enabled' => $system->is_enabled,
                        'requires_auth' => $system->requires_auth,
                        'sort_order' => $system->sort_order,
                        'created_at' => $system->created_at,
                        'updated_at' => $system->updated_at,
                    ];
                }),
            ],
        ]);
    }

    /**
     * Get system by key
     */
    public function show(string $systemKey): JsonResponse
    {
        $system = SystemRegistry::getByKey($systemKey);

        if (!$system) {
            return response()->json([
                'success' => false,
                'message' => 'System not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'system' => [
                    'id' => $system->id,
                    'system_key' => $system->system_key,
                    'name' => $system->name,
                    'display_name' => $system->display_name,
                    'description' => $system->description,
                    'version' => $system->version,
                    'icon' => $system->icon,
                    'color' => $system->color,
                    'url_prefix' => $system->url_prefix,
                    'api_base_url' => $system->api_base_url,
                    'config' => $system->config,
                    'permissions' => $system->permissions,
                    'is_enabled' => $system->is_enabled,
                    'requires_auth' => $system->requires_auth,
                    'sort_order' => $system->sort_order,
                    'created_at' => $system->created_at,
                    'updated_at' => $system->updated_at,
                ],
            ],
        ]);
    }

    /**
     * Register new system
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'system_key' => 'required|string|unique:system_registry,system_key|max:50',
            'name' => 'required|string|max:255',
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'version' => 'nullable|string|max:20',
            'icon' => 'nullable|string|max:100',
            'color' => 'nullable|string|max:20',
            'url_prefix' => 'nullable|string|max:100',
            'api_base_url' => 'nullable|string|max:255',
            'config' => 'nullable|array',
            'permissions' => 'nullable|array',
            'is_enabled' => 'boolean',
            'requires_auth' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $system = SystemRegistry::registerSystem($request->all());

        // Log system registration
        AuditLog::logCreate(
            Auth::user(),
            'SystemRegistry',
            $system->id,
            $system->toArray(),
            'core',
            'Registered new system'
        );

        return response()->json([
            'success' => true,
            'message' => 'System registered successfully',
            'data' => [
                'system' => $system,
            ],
        ], 201);
    }

    /**
     * Update system
     */
    public function update(Request $request, string $systemKey): JsonResponse
    {
        $system = SystemRegistry::getByKey($systemKey);

        if (!$system) {
            return response()->json([
                'success' => false,
                'message' => 'System not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'display_name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'version' => 'nullable|string|max:20',
            'icon' => 'nullable|string|max:100',
            'color' => 'nullable|string|max:20',
            'url_prefix' => 'nullable|string|max:100',
            'api_base_url' => 'nullable|string|max:255',
            'config' => 'nullable|array',
            'permissions' => 'nullable|array',
            'is_enabled' => 'boolean',
            'requires_auth' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $oldData = $system->toArray();

        $system->update($request->all());

        // Log system update
        AuditLog::logUpdate(
            Auth::user(),
            'SystemRegistry',
            $system->id,
            $oldData,
            $system->fresh()->toArray(),
            'core',
            'Updated system configuration'
        );

        return response()->json([
            'success' => true,
            'message' => 'System updated successfully',
            'data' => [
                'system' => $system,
            ],
        ]);
    }

    /**
     * Delete system
     */
    public function destroy(string $systemKey): JsonResponse
    {
        $system = SystemRegistry::getByKey($systemKey);

        if (!$system) {
            return response()->json([
                'success' => false,
                'message' => 'System not found',
            ], 404);
        }

        $oldData = $system->toArray();

        // Log system deletion
        AuditLog::logDelete(
            Auth::user(),
            'SystemRegistry',
            $system->id,
            $oldData,
            'core',
            'Deleted system'
        );

        $system->delete();

        return response()->json([
            'success' => true,
            'message' => 'System deleted successfully',
        ]);
    }

    /**
     * Enable/disable system
     */
    public function toggleStatus(string $systemKey): JsonResponse
    {
        $system = SystemRegistry::getByKey($systemKey);

        if (!$system) {
            return response()->json([
                'success' => false,
                'message' => 'System not found',
            ], 404);
        }

        $oldData = $system->toArray();
        $system->update(['is_enabled' => !$system->is_enabled]);

        // Log status change
        AuditLog::logUpdate(
            Auth::user(),
            'SystemRegistry',
            $system->id,
            $oldData,
            $system->fresh()->toArray(),
            'core',
            ($system->is_enabled ? 'Enabled' : 'Disabled') . ' system'
        );

        return response()->json([
            'success' => true,
            'message' => 'System status updated successfully',
            'data' => [
                'system' => [
                    'id' => $system->id,
                    'system_key' => $system->system_key,
                    'is_enabled' => $system->is_enabled,
                ],
            ],
        ]);
    }

    /**
     * Get system configuration
     */
    public function getConfig(string $systemKey): JsonResponse
    {
        $system = SystemRegistry::getByKey($systemKey);

        if (!$system) {
            return response()->json([
                'success' => false,
                'message' => 'System not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'config' => $system->config,
            ],
        ]);
    }

    /**
     * Update system configuration
     */
    public function updateConfig(Request $request, string $systemKey): JsonResponse
    {
        $system = SystemRegistry::getByKey($systemKey);

        if (!$system) {
            return response()->json([
                'success' => false,
                'message' => 'System not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'config' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $oldConfig = $system->config;

        $system->update(['config' => $request->config]);

        // Log config update
        AuditLog::logUpdate(
            Auth::user(),
            'SystemRegistry',
            $system->id,
            ['config' => $oldConfig],
            ['config' => $request->config],
            'core',
            'Updated system configuration'
        );

        return response()->json([
            'success' => true,
            'message' => 'Configuration updated successfully',
            'data' => [
                'config' => $system->config,
            ],
        ]);
    }

    /**
     * Get system permissions
     */
    public function getPermissions(string $systemKey): JsonResponse
    {
        $system = SystemRegistry::getByKey($systemKey);

        if (!$system) {
            return response()->json([
                'success' => false,
                'message' => 'System not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'permissions' => $system->getPermissions(),
            ],
        ]);
    }

    /**
     * Update system permissions
     */
    public function updatePermissions(Request $request, string $systemKey): JsonResponse
    {
        $system = SystemRegistry::getByKey($systemKey);

        if (!$system) {
            return response()->json([
                'success' => false,
                'message' => 'System not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'permissions' => 'required|array',
            'permissions.*' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $oldPermissions = $system->getPermissions();

        $system->setPermissions($request->permissions);

        // Log permissions update
        AuditLog::logUpdate(
            Auth::user(),
            'SystemRegistry',
            $system->id,
            ['permissions' => $oldPermissions],
            ['permissions' => $request->permissions],
            'core',
            'Updated system permissions'
        );

        return response()->json([
            'success' => true,
            'message' => 'Permissions updated successfully',
            'data' => [
                'permissions' => $system->getPermissions(),
            ],
        ]);
    }

    /**
     * Get enabled systems for navigation
     */
    public function getNavigation(): JsonResponse
    {
        $systems = SystemRegistry::getEnabledSystems();

        return response()->json([
            'success' => true,
            'data' => [
                'systems' => $systems->map(function ($system) {
                    return [
                        'system_key' => $system->system_key,
                        'name' => $system->name,
                        'display_name' => $system->display_name,
                        'icon' => $system->icon,
                        'color' => $system->color,
                        'url_prefix' => $system->url_prefix,
                        'sort_order' => $system->sort_order,
                    ];
                }),
            ],
        ]);
    }
}
