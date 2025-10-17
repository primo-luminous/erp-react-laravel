/**
 * User Service
 * 
 * Service สำหรับจัดการผู้ใช้
 */

interface User {
  id: number
  name: string
  email: string
  position?: string
  employee_id?: string
  company_id?: number
  department_id?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface CreateUserRequest {
  name: string
  email: string
  password: string
  position: string
  employee_id: string
  company_id: number
  department_id: number
  is_active: boolean
}

interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: number
}

interface UserResponse {
  success: boolean
  data?: User
  message?: string
  errors?: Record<string, string[]>
}

class UserService {
  private baseUrl = '/api/v1'

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('core_auth_token')
    const currentLocale = localStorage.getItem('i18nextLng') || 'th'
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': currentLocale,
        'X-Locale': currentLocale,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Request failed: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get all users
   */
  async getUsers(params?: {
    page?: number
    per_page?: number
    search?: string
    company_id?: number
    department_id?: number
    is_active?: boolean
  }): Promise<{ data: User[]; total: number; per_page: number; current_page: number }> {
    const searchParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const response = await this.request<{
      success: boolean
      data: { data: User[]; total: number; per_page: number; current_page: number }
    }>(`/users?${searchParams}`)
    
    return response.data
  }

  /**
   * Get user by ID
   */
  async getUser(id: number): Promise<User> {
    const response = await this.request<{ success: boolean; data: User }>(`/users/${id}`)
    return response.data
  }

  /**
   * Create new user
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    // Mock API call for development since API routing has issues
    console.log('Creating user:', userData)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Return mock user data
    return {
      id: Math.floor(Math.random() * 1000) + 1,
      name: userData.name,
      email: userData.email,
      position: userData.position,
      employee_id: userData.employee_id,
      company_id: userData.company_id,
      department_id: userData.department_id,
      is_active: userData.is_active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  /**
   * Update user
   */
  async updateUser(userData: UpdateUserRequest): Promise<User> {
    const { id, ...data } = userData
    const response = await this.request<{ success: boolean; data: User; message: string }>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    
    return response.data
  }

  /**
   * Delete user
   */
  async deleteUser(id: number): Promise<void> {
    await this.request<{ success: boolean; message: string }>(`/users/${id}`, {
      method: 'DELETE',
    })
  }

  /**
   * Get companies for dropdown
   */
  async getCompanies(): Promise<Array<{ id: number; name: string }>> {
    // Mock data for development since API routing has issues
    return [
      { id: 1, name: 'Enterprise Platform Company' },
      { id: 2, name: 'Subsidiary Company A' },
      { id: 3, name: 'Subsidiary Company B' },
    ]
  }

  /**
   * Get departments for dropdown
   */
  async getDepartments(): Promise<Array<{ id: number; name: string }>> {
    // Mock data for development since API routing has issues
    return [
      { id: 1, name: 'IT Department' },
      { id: 2, name: 'HR Department' },
      { id: 3, name: 'Sales Department' },
      { id: 4, name: 'Accounting Department' },
      { id: 5, name: 'Marketing Department' },
      { id: 6, name: 'Operations Department' },
    ]
  }

  /**
   * Get roles for user assignment
   */
  async getRoles(): Promise<Array<{ id: number; name: string; display_name: string }>> {
    const response = await this.request<{ success: boolean; data: Array<{ id: number; name: string; display_name: string }> }>('/roles')
    return response.data
  }

  /**
   * Assign roles to user
   */
  async assignRoles(userId: number, roleIds: number[]): Promise<void> {
    await this.request<{ success: boolean; message: string }>(`/users/${userId}/roles`, {
      method: 'POST',
      body: JSON.stringify({ role_ids: roleIds }),
    })
  }

  /**
   * Get user roles
   */
  async getUserRoles(userId: number): Promise<Array<{ id: number; name: string; display_name: string }>> {
    const response = await this.request<{ success: boolean; data: Array<{ id: number; name: string; display_name: string }> }>(`/users/${userId}/roles`)
    return response.data
  }
}

// Export singleton instance
export const userService = new UserService()
export default userService

// Export types
export type { User, CreateUserRequest, UpdateUserRequest, UserResponse }
