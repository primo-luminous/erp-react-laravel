<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Company;
use App\Models\Department;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Get all users
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::with(['company', 'department', 'roles']);

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('employee_id', 'like', "%{$search}%");
            });
        }

        // Filter by company
        if ($request->has('company_id') && $request->company_id) {
            $query->where('company_id', $request->company_id);
        }

        // Filter by department
        if ($request->has('department_id') && $request->department_id) {
            $query->where('department_id', $request->department_id);
        }

        // Filter by active status
        if ($request->has('is_active') && $request->is_active !== '') {
            $query->where('is_active', $request->boolean('is_active'));
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $users = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    /**
     * Get user by ID
     */
    public function show(User $user): JsonResponse
    {
        $user->load(['company', 'department', 'roles']);
        
        return response()->json([
            'success' => true,
            'data' => $user
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
            'password' => 'required|string|min:8',
            'position' => 'required|string|max:255',
            'employee_id' => 'required|string|max:50|unique:users,employee_id',
            'company_id' => 'required|exists:companies,id',
            'department_id' => 'required|exists:departments,id',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'position' => $request->position,
                'employee_id' => $request->employee_id,
                'company_id' => $request->company_id,
                'department_id' => $request->department_id,
                'is_active' => $request->boolean('is_active', true),
            ]);

            $user->load(['company', 'department', 'roles']);

            return response()->json([
                'success' => true,
                'data' => $user,
                'message' => 'User created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create user: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update user
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => ['sometimes', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'sometimes|string|min:8',
            'position' => 'sometimes|string|max:255',
            'employee_id' => ['sometimes', 'string', 'max:50', Rule::unique('users')->ignore($user->id)],
            'company_id' => 'sometimes|exists:companies,id',
            'department_id' => 'sometimes|exists:departments,id',
            'is_active' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $updateData = $request->only([
                'name', 'email', 'position', 'employee_id', 
                'company_id', 'department_id', 'is_active'
            ]);

            if ($request->has('password')) {
                $updateData['password'] = Hash::make($request->password);
            }

            $user->update($updateData);
            $user->load(['company', 'department', 'roles']);

            return response()->json([
                'success' => true,
                'data' => $user,
                'message' => 'User updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update user: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete user
     */
    public function destroy(User $user): JsonResponse
    {
        try {
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get companies for dropdown
     */
    public function getCompanies(): JsonResponse
    {
        $companies = Company::select('id', 'name')->get();
        
        return response()->json([
            'success' => true,
            'data' => $companies
        ]);
    }

    /**
     * Get departments for dropdown
     */
    public function getDepartments(): JsonResponse
    {
        $departments = Department::select('id', 'name')->get();
        
        return response()->json([
            'success' => true,
            'data' => $departments
        ]);
    }

    /**
     * Get roles for dropdown
     */
    public function getRoles(): JsonResponse
    {
        $roles = Role::select('id', 'name', 'display_name')->get();
        
        return response()->json([
            'success' => true,
            'data' => $roles
        ]);
    }

    /**
     * Assign roles to user
     */
    public function assignRoles(Request $request, User $user): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'role_ids' => 'required|array',
            'role_ids.*' => 'exists:roles,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user->roles()->sync($request->role_ids);

            return response()->json([
                'success' => true,
                'message' => 'Roles assigned successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to assign roles: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user roles
     */
    public function getUserRoles(User $user): JsonResponse
    {
        $roles = $user->roles()->select('id', 'name', 'display_name')->get();
        
        return response()->json([
            'success' => true,
            'data' => $roles
        ]);
    }
}