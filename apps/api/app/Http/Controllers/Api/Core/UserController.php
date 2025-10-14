<?php

namespace App\Http\Controllers\Api\Core;

use App\Http\Controllers\Controller;
use App\Models\Core\User;
use App\Models\Core\Company;
use App\Models\Core\Department;
use App\Models\Core\Role;
use App\Models\Core\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Get all users with pagination and filters
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::with(['company', 'department', 'roles'])
            ->when($request->company_id, function ($q, $companyId) {
                return $q->where('company_id', $companyId);
            })
            ->when($request->department_id, function ($q, $departmentId) {
                return $q->where('department_id', $departmentId);
            })
            ->when($request->search, function ($q, $search) {
                return $q->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('employee_id', 'like', "%{$search}%");
                });
            })
            ->when($request->has('is_active'), function ($q) use ($request) {
                return $q->where('is_active', $request->boolean('is_active'));
            });

        $users = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => [
                'users' => $users->items(),
                'pagination' => [
                    'current_page' => $users->currentPage(),
                    'last_page' => $users->lastPage(),
                    'per_page' => $users->perPage(),
                    'total' => $users->total(),
                ],
            ],
        ]);
    }

    /**
     * Get user by ID
     */
    public function show(User $user): JsonResponse
    {
        $user->load(['company', 'department', 'roles.permissions']);

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'avatar' => $user->avatar,
                    'company' => $user->company,
                    'department' => $user->department,
                    'employee_id' => $user->employee_id,
                    'position' => $user->position,
                    'hire_date' => $user->hire_date,
                    'profile_data' => $user->profile_data,
                    'preferences' => $user->preferences,
                    'last_login_at' => $user->last_login_at,
                    'last_login_ip' => $user->last_login_ip,
                    'is_active' => $user->is_active,
                    'is_super_admin' => $user->is_super_admin,
                    'roles' => $user->roles->map(function ($role) {
                        return [
                            'id' => $role->id,
                            'name' => $role->name,
                            'display_name' => $role->display_name,
                            'module' => $role->module,
                            'permissions' => $role->permissions->pluck('name'),
                        ];
                    }),
                    'permissions' => $user->permissions()->pluck('name')->toArray(),
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ],
            ],
        ]);
    }

    /**
     * Create new user
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'company_id' => 'required|exists:companies,id',
            'department_id' => 'nullable|exists:departments,id',
            'employee_id' => 'nullable|string|max:50',
            'position' => 'nullable|string|max:100',
            'hire_date' => 'nullable|date',
            'profile_data' => 'nullable|array',
            'preferences' => 'nullable|array',
            'is_active' => 'boolean',
            'roles' => 'nullable|array',
            'roles.*' => 'exists:roles,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $userData = $request->only([
            'name', 'email', 'phone', 'company_id', 'department_id',
            'employee_id', 'position', 'hire_date', 'profile_data',
            'preferences', 'is_active'
        ]);

        $userData['password'] = Hash::make($request->password);

        $user = User::create($userData);

        // Assign roles if provided
        if ($request->has('roles')) {
            $user->roles()->sync($request->roles);
        }

        // Log user creation
        AuditLog::logCreate(
            Auth::user(),
            'User',
            $user->id,
            $user->toArray(),
            'core',
            'Created new user'
        );

        $user->load(['company', 'department', 'roles']);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => [
                'user' => $user,
            ],
        ], 201);
    }

    /**
     * Update user
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|nullable|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'company_id' => 'sometimes|required|exists:companies,id',
            'department_id' => 'nullable|exists:departments,id',
            'employee_id' => 'nullable|string|max:50',
            'position' => 'nullable|string|max:100',
            'hire_date' => 'nullable|date',
            'profile_data' => 'nullable|array',
            'preferences' => 'nullable|array',
            'is_active' => 'boolean',
            'is_super_admin' => 'boolean',
            'roles' => 'nullable|array',
            'roles.*' => 'exists:roles,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $oldData = $user->toArray();

        $updateData = $request->only([
            'name', 'email', 'phone', 'company_id', 'department_id',
            'employee_id', 'position', 'hire_date', 'profile_data',
            'preferences', 'is_active', 'is_super_admin'
        ]);

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $user->update($updateData);

        // Update roles if provided
        if ($request->has('roles')) {
            $user->roles()->sync($request->roles);
        }

        // Log user update
        AuditLog::logUpdate(
            Auth::user(),
            'User',
            $user->id,
            $oldData,
            $user->fresh()->toArray(),
            'core',
            'Updated user information'
        );

        $user->load(['company', 'department', 'roles']);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => [
                'user' => $user,
            ],
        ]);
    }

    /**
     * Delete user
     */
    public function destroy(User $user): JsonResponse
    {
        // Prevent deletion of super admin users
        if ($user->is_super_admin) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete super admin users',
            ], 403);
        }

        $oldData = $user->toArray();

        // Log user deletion
        AuditLog::logDelete(
            Auth::user(),
            'User',
            $user->id,
            $oldData,
            'core',
            'Deleted user'
        );

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully',
        ]);
    }

    /**
     * Assign roles to user
     */
    public function assignRoles(Request $request, User $user): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $oldRoles = $user->roles->pluck('id')->toArray();

        $user->roles()->sync($request->roles);

        // Log role assignment
        AuditLog::logUpdate(
            Auth::user(),
            'User',
            $user->id,
            ['roles' => $oldRoles],
            ['roles' => $request->roles],
            'core',
            'Updated user roles'
        );

        $user->load('roles');

        return response()->json([
            'success' => true,
            'message' => 'Roles assigned successfully',
            'data' => [
                'user' => $user,
            ],
        ]);
    }

    /**
     * Get user permissions
     */
    public function getPermissions(User $user): JsonResponse
    {
        $permissions = $user->permissions();

        return response()->json([
            'success' => true,
            'data' => [
                'permissions' => $permissions->get()->map(function ($permission) {
                    return [
                        'id' => $permission->id,
                        'name' => $permission->name,
                        'display_name' => $permission->display_name,
                        'module' => $permission->module,
                        'resource' => $permission->resource,
                        'action' => $permission->action,
                        'category' => $permission->category,
                    ];
                }),
                'permissions_by_module' => $user->getPermissionsByModule('*'),
            ],
        ]);
    }

    /**
     * Update user preferences
     */
    public function updatePreferences(Request $request, User $user): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'preferences' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $oldPreferences = $user->preferences;

        $user->update(['preferences' => $request->preferences]);

        // Log preference update
        AuditLog::logUpdate(
            Auth::user(),
            'User',
            $user->id,
            ['preferences' => $oldPreferences],
            ['preferences' => $request->preferences],
            'core',
            'Updated user preferences'
        );

        return response()->json([
            'success' => true,
            'message' => 'Preferences updated successfully',
            'data' => [
                'preferences' => $user->preferences,
            ],
        ]);
    }

    /**
     * Get user audit logs
     */
    public function getAuditLogs(User $user, Request $request): JsonResponse
    {
        $logs = $user->auditLogs()
            ->when($request->system_key, function ($q, $systemKey) {
                return $q->where('system_key', $systemKey);
            })
            ->when($request->action, function ($q, $action) {
                return $q->where('action', $action);
            })
            ->when($request->date_from, function ($q, $dateFrom) {
                return $q->where('created_at', '>=', $dateFrom);
            })
            ->when($request->date_to, function ($q, $dateTo) {
                return $q->where('created_at', '<=', $dateTo);
            })
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => [
                'logs' => $logs->items(),
                'pagination' => [
                    'current_page' => $logs->currentPage(),
                    'last_page' => $logs->lastPage(),
                    'per_page' => $logs->perPage(),
                    'total' => $logs->total(),
                ],
            ],
        ]);
    }

    /**
     * Get companies for dropdown
     */
    public function getCompanies(): JsonResponse
    {
        $companies = Company::active()
            ->select('id', 'name', 'code')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'companies' => $companies,
            ],
        ]);
    }

    /**
     * Get departments for dropdown
     */
    public function getDepartments(Request $request): JsonResponse
    {
        $departments = Department::active()
            ->when($request->company_id, function ($q, $companyId) {
                return $q->where('company_id', $companyId);
            })
            ->select('id', 'name', 'code', 'company_id')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'departments' => $departments,
            ],
        ]);
    }

    /**
     * Get roles for dropdown
     */
    public function getRoles(Request $request): JsonResponse
    {
        $roles = Role::active()
            ->when($request->company_id, function ($q, $companyId) {
                return $q->where('company_id', $companyId);
            })
            ->when($request->module, function ($q, $module) {
                return $q->where('module', $module);
            })
            ->select('id', 'name', 'display_name', 'module', 'company_id')
            ->orderBy('module')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'roles' => $roles,
            ],
        ]);
    }
}
