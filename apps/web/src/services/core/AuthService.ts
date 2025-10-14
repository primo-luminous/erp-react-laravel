/**
 * Core Authentication Service
 */

// Simple API service
class ApiService {
  private baseUrl = '/api'

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    const token = localStorage.getItem('core_auth_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`POST request failed: ${response.statusText}`)
    }

    return response.json()
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key].toString())
        }
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`GET request failed: ${response.statusText}`)
    }

    return response.json()
  }
}

const apiService = new ApiService()

// Types
export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  phone?: string
  company: {
    id: number
    name: string
    code: string
  }
  department?: {
    id: number
    name: string
    code: string
  }
  position?: string
  employee_id?: string
  hire_date?: string
  last_login_at?: string
  last_login_ip?: string
  is_active: boolean
  is_super_admin: boolean
  permissions: string[]
  roles: Array<{
    id: number
    name: string
    display_name: string
    module?: string
  }>
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: User
    token: string
    session_id: string
    expires_at: string
  }
}

export interface SystemAccessResponse {
  success: boolean
  message: string
  data: {
    system: {
      key: string
      name: string
      display_name: string
      version: string
      url_prefix: string
      api_base_url: string
      config: Record<string, any>
    }
    user_permissions: string[]
  }
}

// Auth Service Class
export class CoreAuthService {
  private static instance: CoreAuthService
  private currentUser: User | null = null
  private token: string | null = null
  private sessionId: string | null = null

  static getInstance(): CoreAuthService {
    if (!CoreAuthService.instance) {
      CoreAuthService.instance = new CoreAuthService()
    }
    return CoreAuthService.instance
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Mock login for development since API routing has issues
    console.log('Mock login with credentials:', credentials)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check credentials
    if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
      const mockResponse: LoginResponse = {
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: 1,
            name: 'Admin User',
            email: 'admin@example.com',
            avatar: undefined,
            phone: '+66-81-234-5678',
            company: {
              id: 1,
              name: 'Enterprise Platform Company',
              code: 'ENT001'
            },
            department: {
              id: 1,
              name: 'IT Department',
              code: 'IT001'
            },
            position: 'System Administrator',
            employee_id: 'EMP001',
            hire_date: '2024-01-01',
            last_login_at: new Date().toISOString(),
            last_login_ip: '127.0.0.1',
            is_active: true,
            is_super_admin: true,
            permissions: [
              'core.users.view',
              'core.users.create',
              'core.users.edit',
              'core.users.delete',
              'core.roles.view',
              'core.roles.create',
              'core.roles.edit',
              'core.roles.delete',
              'core.permissions.view',
              'core.permissions.create',
              'core.permissions.edit',
              'core.permissions.delete',
              'core.companies.view',
              'core.companies.create',
              'core.companies.edit',
              'core.companies.delete',
              'core.departments.view',
              'core.departments.create',
              'core.departments.edit',
              'core.departments.delete',
              'core.systems.view',
              'core.systems.create',
              'core.systems.edit',
              'core.systems.delete',
              'core.audit.view'
            ],
            roles: [
              {
                id: 1,
                name: 'super_admin',
                display_name: 'Super Administrator',
                module: 'core'
              }
            ]
          },
          token: `mock_token_${Date.now()}`,
          session_id: `session_${Date.now()}`,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      }
      
      this.currentUser = mockResponse.data.user
      this.token = mockResponse.data.token
      this.sessionId = mockResponse.data.session_id
      
      localStorage.setItem('core_auth_token', mockResponse.data.token)
      localStorage.setItem('core_session_id', mockResponse.data.session_id)
      localStorage.setItem('core_user_data', JSON.stringify(mockResponse.data.user))
      
      return mockResponse
    } else {
      throw new Error('Invalid credentials')
    }
  }

  async logout(): Promise<void> {
    try {
      await apiService.post('/core/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      this.clearAuthData()
    }
  }

  async refreshToken(): Promise<string> {
    const response = await apiService.post<{ success: boolean; data: { token: string; expires_at: string } }>('/core/auth/refresh')
    
    if (response.success) {
      this.token = response.data.token
      localStorage.setItem('core_auth_token', response.data.token)
    }
    
    return response.data.token
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser
    }

    try {
      const response = await apiService.get<{ success: boolean; data: { user: User } }>('/core/auth/me')
      if (response.success) {
        this.currentUser = response.data.user
        return this.currentUser
      }
    } catch (error) {
      console.error('Get current user error:', error)
      this.clearAuthData()
    }

    return null
  }

  async checkSystemAccess(systemKey: string): Promise<SystemAccessResponse> {
    return apiService.get<SystemAccessResponse>(`/core/auth/check-system/${systemKey}`)
  }

  async getSessions(): Promise<any[]> {
    const response = await apiService.get<{ success: boolean; data: { sessions: any[] } }>('/core/auth/sessions')
    return response.data.sessions
  }

  async revokeSession(sessionId: string): Promise<void> {
    await apiService.post(`/core/auth/sessions/${sessionId}/revoke`)
  }

  async revokeAllSessions(): Promise<void> {
    await apiService.post('/core/auth/sessions/revoke-all')
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('core_auth_token')
    }
    return this.token
  }

  getSessionId(): string | null {
    if (!this.sessionId) {
      this.sessionId = localStorage.getItem('core_session_id')
    }
    return this.sessionId
  }

  getCurrentUserData(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('core_user_data')
      if (stored) {
        this.currentUser = JSON.parse(stored)
      }
    }
    return this.currentUser
  }

  hasPermission(permission: string): boolean {
    const user = this.getCurrentUserData()
    if (!user) return false

    if (user.is_super_admin) return true

    return user.permissions.includes(permission)
  }

  hasAnyPermission(permissions: string[]): boolean {
    const user = this.getCurrentUserData()
    if (!user) return false

    if (user.is_super_admin) return true

    return permissions.some(permission => user.permissions.includes(permission))
  }

  hasAllPermissions(permissions: string[]): boolean {
    const user = this.getCurrentUserData()
    if (!user) return false

    if (user.is_super_admin) return true

    return permissions.every(permission => user.permissions.includes(permission))
  }

  getPermissionsByModule(module: string): string[] {
    const user = this.getCurrentUserData()
    if (!user) return []

    return user.permissions.filter(permission => permission.startsWith(`${module}.`))
  }

  hasRole(roleName: string): boolean {
    const user = this.getCurrentUserData()
    if (!user) return false

    return user.roles.some(role => role.name === roleName)
  }

  hasAnyRole(roleNames: string[]): boolean {
    const user = this.getCurrentUserData()
    if (!user) return false

    return user.roles.some(role => roleNames.includes(role.name))
  }

  getRolesByModule(module: string): Array<{ id: number; name: string; display_name: string; module?: string }> {
    const user = this.getCurrentUserData()
    if (!user) return []

    return user.roles.filter(role => !role.module || role.module === module)
  }

  private clearAuthData(): void {
    this.currentUser = null
    this.token = null
    this.sessionId = null
    
    localStorage.removeItem('core_auth_token')
    localStorage.removeItem('core_session_id')
    localStorage.removeItem('core_user_data')
  }

  initialize(): void {
    const token = localStorage.getItem('core_auth_token')
    const sessionId = localStorage.getItem('core_session_id')
    const userData = localStorage.getItem('core_user_data')

    if (token && sessionId && userData) {
      this.token = token
      this.sessionId = sessionId
      this.currentUser = JSON.parse(userData)
    }
  }
}

// Create and export singleton instance
const coreAuthService = CoreAuthService.getInstance()

// Initialize on import
coreAuthService.initialize()

// Export the instance
export { coreAuthService }