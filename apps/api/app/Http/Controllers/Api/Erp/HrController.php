<?php

namespace App\Http\Controllers\Api\Erp;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use App\Models\Erp\EmployeeProfile;
use App\Models\Erp\LeaveRequest;
use App\Models\Erp\LeaveType;
use App\Models\Core\User;

class HrController extends Controller
{
    /**
     * Get employee profiles
     */
    public function getEmployees(Request $request): JsonResponse
    {
        try {
            $employees = EmployeeProfile::with(['user', 'user.department', 'user.company'])
                ->when($request->department_id, function ($query, $departmentId) {
                    return $query->whereHas('user', function ($q) use ($departmentId) {
                        $q->where('department_id', $departmentId);
                    });
                })
                ->when($request->search, function ($query, $search) {
                    return $query->whereHas('user', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%")
                          ->orWhere('employee_id', 'like', "%{$search}%");
                    });
                })
                ->paginate($request->per_page ?? 15);

            return response()->json([
                'success' => true,
                'data' => $employees,
                'message' => 'Employee profiles retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve employee profiles',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create employee profile
     */
    public function createEmployee(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'employee_number' => 'required|string|unique:employee_profiles',
            'national_id' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'marital_status' => 'nullable|string',
            'address' => 'nullable|string',
            'emergency_contact_name' => 'nullable|string',
            'emergency_contact_phone' => 'nullable|string',
            'bank_account' => 'nullable|string',
            'bank_name' => 'nullable|string',
            'salary' => 'nullable|numeric|min:0',
            'contract_start' => 'nullable|date',
            'contract_end' => 'nullable|date',
            'employment_status' => 'nullable|in:active,inactive,terminated,resigned'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $employee = EmployeeProfile::create($request->all());

            return response()->json([
                'success' => true,
                'data' => $employee->load(['user', 'user.department', 'user.company']),
                'message' => 'Employee profile created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create employee profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update employee profile
     */
    public function updateEmployee(Request $request, $id): JsonResponse
    {
        $employee = EmployeeProfile::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'employee_number' => 'sometimes|string|unique:employee_profiles,employee_number,' . $id,
            'national_id' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'marital_status' => 'nullable|string',
            'address' => 'nullable|string',
            'emergency_contact_name' => 'nullable|string',
            'emergency_contact_phone' => 'nullable|string',
            'bank_account' => 'nullable|string',
            'bank_name' => 'nullable|string',
            'salary' => 'nullable|numeric|min:0',
            'contract_start' => 'nullable|date',
            'contract_end' => 'nullable|date',
            'employment_status' => 'nullable|in:active,inactive,terminated,resigned'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $employee->update($request->all());

            return response()->json([
                'success' => true,
                'data' => $employee->load(['user', 'user.department', 'user.company']),
                'message' => 'Employee profile updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update employee profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get leave requests
     */
    public function getLeaveRequests(Request $request): JsonResponse
    {
        try {
            $leaveRequests = LeaveRequest::with(['user', 'leaveType', 'approvedBy'])
                ->when($request->user_id, function ($query, $userId) {
                    return $query->where('user_id', $userId);
                })
                ->when($request->status, function ($query, $status) {
                    return $query->where('status', $status);
                })
                ->when($request->date_from, function ($query, $dateFrom) {
                    return $query->where('start_date', '>=', $dateFrom);
                })
                ->when($request->date_to, function ($query, $dateTo) {
                    return $query->where('end_date', '<=', $dateTo);
                })
                ->orderBy('created_at', 'desc')
                ->paginate($request->per_page ?? 15);

            return response()->json([
                'success' => true,
                'data' => $leaveRequests,
                'message' => 'Leave requests retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve leave requests',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create leave request
     */
    public function createLeaveRequest(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'leave_type_id' => 'required|exists:leave_types,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'nullable|string|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $startDate = \Carbon\Carbon::parse($request->start_date);
            $endDate = \Carbon\Carbon::parse($request->end_date);
            $days = $startDate->diffInDays($endDate) + 1;

            $leaveRequest = LeaveRequest::create([
                'user_id' => $request->user_id,
                'leave_type_id' => $request->leave_type_id,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'days' => $days,
                'reason' => $request->reason,
                'status' => 'pending'
            ]);

            return response()->json([
                'success' => true,
                'data' => $leaveRequest->load(['user', 'leaveType']),
                'message' => 'Leave request created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create leave request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Approve/reject leave request
     */
    public function updateLeaveRequestStatus(Request $request, $id): JsonResponse
    {
        $leaveRequest = LeaveRequest::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:approved,rejected',
            'approval_notes' => 'nullable|string|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $leaveRequest->update([
                'status' => $request->status,
                'approved_by' => $request->user()->id,
                'approved_at' => now(),
                'approval_notes' => $request->approval_notes
            ]);

            return response()->json([
                'success' => true,
                'data' => $leaveRequest->load(['user', 'leaveType', 'approvedBy']),
                'message' => "Leave request {$request->status} successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update leave request status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get leave types
     */
    public function getLeaveTypes(): JsonResponse
    {
        try {
            $leaveTypes = LeaveType::where('is_active', true)
                ->orderBy('name')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $leaveTypes,
                'message' => 'Leave types retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve leave types',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get HR dashboard statistics
     */
    public function getDashboardStats(): JsonResponse
    {
        try {
            $stats = [
                'total_employees' => EmployeeProfile::where('employment_status', 'active')->count(),
                'pending_leave_requests' => LeaveRequest::where('status', 'pending')->count(),
                'approved_leave_requests' => LeaveRequest::where('status', 'approved')->count(),
                'rejected_leave_requests' => LeaveRequest::where('status', 'rejected')->count(),
                'employees_by_department' => EmployeeProfile::where('employment_status', 'active')
                    ->join('users', 'employee_profiles.user_id', '=', 'users.id')
                    ->join('departments', 'users.department_id', '=', 'departments.id')
                    ->selectRaw('departments.name as department_name, COUNT(*) as count')
                    ->groupBy('departments.id', 'departments.name')
                    ->get()
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'HR dashboard statistics retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve HR dashboard statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
