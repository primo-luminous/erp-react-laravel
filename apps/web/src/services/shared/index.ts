/**
 * Shared Services for Enterprise Platform
 * 
 * บริการที่ใช้ร่วมกันระหว่าง Module ต่างๆ
 */

// Authentication Service
export class AuthService {
  private static instance: AuthService
  private token: string | null = null
  private user: any = null

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  /**
   * Sign in user
   */
  async signIn(email: string, password: string): Promise<{ user: any; token: string }> {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Sign in failed')
    }

    const data = await response.json()
    this.token = data.token
    this.user = data.user
    
    // Store in localStorage
    localStorage.setItem('auth_token', data.token)
    localStorage.setItem('user_data', JSON.stringify(data.user))

    return data
  }

  /**
   * Sign out user
   */
  signOut(): void {
    this.token = null
    this.user = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }

  /**
   * Get current user
   */
  getCurrentUser(): any {
    if (!this.user) {
      const stored = localStorage.getItem('user_data')
      if (stored) {
        this.user = JSON.parse(stored)
      }
    }
    return this.user
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token')
    }
    return this.token
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  /**
   * Refresh token
   */
  async refreshToken(): Promise<string> {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    })

    if (!response.ok) {
      throw new Error('Token refresh failed')
    }

    const data = await response.json()
    this.token = data.token
    localStorage.setItem('auth_token', data.token)

    return data.token
  }
}

// Permission Service
export class PermissionService {
  private static instance: PermissionService

  static getInstance(): PermissionService {
    if (!PermissionService.instance) {
      PermissionService.instance = new PermissionService()
    }
    return PermissionService.instance
  }

  /**
   * Check if user has permission
   */
  hasPermission(userPermissions: string[], permission: string): boolean {
    return userPermissions.includes(permission)
  }

  /**
   * Check if user has any of the permissions
   */
  hasAnyPermission(userPermissions: string[], permissions: string[]): boolean {
    return permissions.some(permission => userPermissions.includes(permission))
  }

  /**
   * Check if user has all permissions
   */
  hasAllPermissions(userPermissions: string[], permissions: string[]): boolean {
    return permissions.every(permission => userPermissions.includes(permission))
  }

  /**
   * Get permissions by module
   */
  getPermissionsByModule(userPermissions: string[], moduleId: string): string[] {
    return userPermissions.filter(permission => permission.startsWith(`${moduleId}.`))
  }

  /**
   * Filter data based on permissions
   */
  filterDataByPermission<T>(data: T[], userPermissions: string[], permissionKey: string): T[] {
    if (this.hasPermission(userPermissions, permissionKey)) {
      return data
    }
    return []
  }
}

// Notification Service
export class NotificationService {
  private static instance: NotificationService
  private notifications: any[] = []

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  /**
   * Add notification
   */
  addNotification(notification: {
    id?: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    duration?: number
    actions?: Array<{ label: string; action: () => void }>
  }): void {
    const id = notification.id || `notification_${Date.now()}`
    const newNotification = {
      ...notification,
      id,
      timestamp: new Date(),
      duration: notification.duration || 5000,
    }

    this.notifications.push(newNotification)

    // Auto remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        this.removeNotification(id)
      }, newNotification.duration)
    }
  }

  /**
   * Remove notification
   */
  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id)
  }

  /**
   * Get all notifications
   */
  getNotifications(): any[] {
    return [...this.notifications]
  }

  /**
   * Clear all notifications
   */
  clearNotifications(): void {
    this.notifications = []
  }

  /**
   * Show success notification
   */
  success(title: string, message: string, duration?: number): void {
    this.addNotification({
      type: 'success',
      title,
      message,
      duration,
    })
  }

  /**
   * Show error notification
   */
  error(title: string, message: string, duration?: number): void {
    this.addNotification({
      type: 'error',
      title,
      message,
      duration: duration || 0, // Error notifications don't auto-dismiss by default
    })
  }

  /**
   * Show warning notification
   */
  warning(title: string, message: string, duration?: number): void {
    this.addNotification({
      type: 'warning',
      title,
      message,
      duration,
    })
  }

  /**
   * Show info notification
   */
  info(title: string, message: string, duration?: number): void {
    this.addNotification({
      type: 'info',
      title,
      message,
      duration,
    })
  }
}

// API Service
export class ApiService {
  private static instance: ApiService
  private baseUrl: string = '/api'

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  /**
   * Set base URL
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url
  }

  /**
   * Get headers with auth token
   */
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    const token = AuthService.getInstance().getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  /**
   * Make GET request
   */
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

  /**
   * Make POST request
   */
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

  /**
   * Make PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`PUT request failed: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Make DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`DELETE request failed: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Upload file
   */
  async uploadFile<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key])
      })
    }

    const headers: Record<string, string> = {}
    const token = AuthService.getInstance().getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`File upload failed: ${response.statusText}`)
    }

    return response.json()
  }
}

// Audit Service
export class AuditService {
  private static instance: AuditService

  static getInstance(): AuditService {
    if (!AuditService.instance) {
      AuditService.instance = new AuditService()
    }
    return AuditService.instance
  }

  /**
   * Log user action
   */
  async logAction(action: {
    module: string
    resource: string
    action: string
    resourceId?: string
    details?: Record<string, any>
    ipAddress?: string
    userAgent?: string
  }): Promise<void> {
    const user = AuthService.getInstance().getCurrentUser()
    
    await ApiService.getInstance().post('/audit/log', {
      ...action,
      userId: user?.id,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Get audit logs
   */
  async getAuditLogs(filters?: {
    module?: string
    userId?: string
    dateFrom?: string
    dateTo?: string
    limit?: number
    offset?: number
  }): Promise<any[]> {
    return ApiService.getInstance().get('/audit/logs', filters)
  }
}

// Configuration Service
export class ConfigurationService {
  private static instance: ConfigurationService
  private config: Record<string, any> = {}

  static getInstance(): ConfigurationService {
    if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService()
    }
    return ConfigurationService.instance
  }

  /**
   * Get configuration value
   */
  get(key: string, defaultValue?: any): any {
    return this.config[key] ?? defaultValue
  }

  /**
   * Set configuration value
   */
  set(key: string, value: any): void {
    this.config[key] = value
  }

  /**
   * Load configuration from API
   */
  async loadConfiguration(): Promise<void> {
    try {
      const config = await ApiService.getInstance().get('/config')
      this.config = config as Record<string, any>
    } catch (error) {
      console.error('Failed to load configuration:', error)
    }
  }

  /**
   * Save configuration to API
   */
  async saveConfiguration(): Promise<void> {
    await ApiService.getInstance().put('/config', this.config)
  }
}

// Export all services
export const authService = AuthService.getInstance()
export const permissionService = PermissionService.getInstance()
export const notificationService = NotificationService.getInstance()
export const apiService = ApiService.getInstance()
export const auditService = AuditService.getInstance()
export const configService = ConfigurationService.getInstance()
