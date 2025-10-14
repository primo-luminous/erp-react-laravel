/**
 * Core System Registry Service
 * 
 * บริการจัดการระบบต่างๆ ในแพลตฟอร์ม
 */

// Simple API service for system registry
class ApiService {
  private baseUrl: string = '/api'

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
}

const apiService = new ApiService()

export interface System {
  id: number
  system_key: string
  name: string
  display_name: string
  description?: string
  version: string
  icon: string
  color: string
  url_prefix?: string
  api_base_url?: string
  config?: Record<string, any>
  permissions?: string[]
  is_enabled: boolean
  requires_auth: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface NavigationSystem {
  system_key: string
  name: string
  display_name: string
  icon: string
  color: string
  url_prefix?: string
  sort_order: number
}

export interface SystemListResponse {
  success: boolean
  data: {
    systems: System[]
  }
}

export interface NavigationResponse {
  success: boolean
  data: {
    systems: NavigationSystem[]
  }
}

export interface SystemResponse {
  success: boolean
  data: {
    system: System
  }
}

export class SystemRegistryService {
  private static instance: SystemRegistryService
  private systems: System[] = []
  private navigationSystems: NavigationSystem[] = []

  static getInstance(): SystemRegistryService {
    if (!SystemRegistryService.instance) {
      SystemRegistryService.instance = new SystemRegistryService()
    }
    return SystemRegistryService.instance
  }

  /**
   * Get all systems
   */
  async getSystems(enabledOnly: boolean = true): Promise<System[]> {
    const response = await apiService.get<SystemListResponse>('/core/systems', {
      enabled_only: enabledOnly
    })

    if (response.success) {
      this.systems = response.data.systems
      return this.systems
    }

    return []
  }

  /**
   * Get system by key
   */
  async getSystem(systemKey: string): Promise<System | null> {
    try {
      const response = await apiService.get<SystemResponse>(`/core/systems/${systemKey}`)
      
      if (response.success) {
        return response.data.system
      }
    } catch (error) {
      console.error(`Error fetching system ${systemKey}:`, error)
    }

    return null
  }

  /**
   * Get navigation systems
   */
  async getNavigationSystems(): Promise<NavigationSystem[]> {
    try {
      // Mock data for development since API routing has issues
      console.log('Mock getNavigationSystems')
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockSystems: NavigationSystem[] = [
        {
          system_key: 'core',
          name: 'Core Platform',
          display_name: 'Core Platform',
          url_prefix: '/core',
          api_base_url: '/api/core',
          description: 'Central platform for user management, authentication, and system registry',
          icon: 'cog',
          color: 'blue',
          order: 1,
          is_active: true,
          permissions: [],
          config: {
            theme: 'default',
            features: ['auth', 'users', 'rbac', 'audit']
          }
        },
        {
          system_key: 'erp',
          name: 'ERP System',
          display_name: 'ERP System',
          url_prefix: '/erp',
          api_base_url: '/api/erp',
          description: 'Enterprise Resource Planning system for business operations',
          icon: 'chart-bar',
          color: 'green',
          order: 2,
          is_active: true,
          permissions: ['erp.access'],
          config: {
            theme: 'default',
            features: ['inventory', 'accounting', 'hr']
          }
        },
        {
          system_key: 'rental',
          name: 'Car Rental',
          display_name: 'Car Rental System',
          url_prefix: '/rental',
          api_base_url: '/api/rental',
          description: 'Car rental management system',
          icon: 'truck',
          color: 'orange',
          order: 3,
          is_active: true,
          permissions: ['rental.access'],
          config: {
            theme: 'default',
            features: ['booking', 'fleet', 'maintenance']
          }
        },
        {
          system_key: 'classroom',
          name: 'Smart Classroom',
          display_name: 'Smart Classroom System',
          url_prefix: '/classroom',
          api_base_url: '/api/classroom',
          description: 'Smart classroom management system',
          icon: 'academic-cap',
          color: 'purple',
          order: 4,
          is_active: true,
          permissions: ['classroom.access'],
          config: {
            theme: 'default',
            features: ['scheduling', 'attendance', 'resources']
          }
        }
      ]
      
      this.navigationSystems = mockSystems
      return mockSystems
    } catch (error) {
      console.error('Error fetching navigation systems:', error)
      return []
    }
  }

  /**
   * Check if system exists and is enabled
   */
  async isSystemEnabled(systemKey: string): Promise<boolean> {
    const systems = await this.getSystems(true)
    return systems.some(system => system.system_key === systemKey && system.is_enabled)
  }

  /**
   * Get system configuration
   */
  async getSystemConfig(systemKey: string): Promise<Record<string, any> | null> {
    try {
      const response = await apiService.get<{ success: boolean; data: { config: Record<string, any> } }>(`/core/systems/${systemKey}/config`)
      
      if (response.success) {
        return response.data.config
      }
    } catch (error) {
      console.error(`Error fetching config for system ${systemKey}:`, error)
    }

    return null
  }

  /**
   * Get system permissions
   */
  async getSystemPermissions(systemKey: string): Promise<string[]> {
    try {
      const response = await apiService.get<{ success: boolean; data: { permissions: string[] } }>(`/core/systems/${systemKey}/permissions`)
      
      if (response.success) {
        return response.data.permissions
      }
    } catch (error) {
      console.error(`Error fetching permissions for system ${systemKey}:`, error)
    }

    return []
  }

  /**
   * Get systems by module
   */
  async getSystemsByModule(module: string): Promise<System[]> {
    const systems = await this.getSystems()
    return systems.filter(system => system.system_key === module)
  }

  /**
   * Get available systems for user (based on permissions)
   */
  async getAvailableSystems(userPermissions: string[]): Promise<NavigationSystem[]> {
    const navigationSystems = await this.getNavigationSystems()
    
    return navigationSystems.filter(navSystem => {
      // If system has no specific permissions, it's available to all authenticated users
      const system = this.systems.find(s => s.system_key === navSystem.system_key)
      if (!system || !system.permissions || system.permissions.length === 0) {
        return true
      }

      // Check if user has any of the required permissions
      return system.permissions.some(permission => userPermissions.includes(permission))
    })
  }

  /**
   * Get system URL
   */
  getSystemUrl(system: System | NavigationSystem): string {
    if (system.url_prefix) {
      return system.url_prefix
    }
    return `/${system.system_key}`
  }

  /**
   * Get system API URL
   */
  getSystemApiUrl(system: System): string {
    if (system.api_base_url) {
      return system.api_base_url
    }
    return `/api/${system.system_key}`
  }

  /**
   * Register new system (admin only)
   */
  async registerSystem(systemData: Partial<System>): Promise<System | null> {
    try {
      const response = await apiService.post<SystemResponse>('/core/systems', systemData)
      
      if (response.success) {
        // Refresh systems list
        await this.getSystems()
        return response.data.system
      }
    } catch (error) {
      console.error('Error registering system:', error)
    }

    return null
  }

  /**
   * Update system (admin only)
   */
  async updateSystem(systemKey: string, systemData: Partial<System>): Promise<System | null> {
    try {
      const response = await apiService.put<SystemResponse>(`/core/systems/${systemKey}`, systemData)
      
      if (response.success) {
        // Refresh systems list
        await this.getSystems()
        return response.data.system
      }
    } catch (error) {
      console.error(`Error updating system ${systemKey}:`, error)
    }

    return null
  }

  /**
   * Delete system (admin only)
   */
  async deleteSystem(systemKey: string): Promise<boolean> {
    try {
      const response = await apiService.delete<{ success: boolean }>(`/core/systems/${systemKey}`)
      
      if (response.success) {
        // Refresh systems list
        await this.getSystems()
        return true
      }
    } catch (error) {
      console.error(`Error deleting system ${systemKey}:`, error)
    }

    return false
  }

  /**
   * Toggle system status (admin only)
   */
  async toggleSystemStatus(systemKey: string): Promise<boolean> {
    try {
      const response = await apiService.post<{ success: boolean }>(`/core/systems/${systemKey}/toggle-status`)
      
      if (response.success) {
        // Refresh systems list
        await this.getSystems()
        return true
      }
    } catch (error) {
      console.error(`Error toggling system status for ${systemKey}:`, error)
    }

    return false
  }

  /**
   * Update system configuration (admin only)
   */
  async updateSystemConfig(systemKey: string, config: Record<string, any>): Promise<boolean> {
    try {
      const response = await apiService.put<{ success: boolean }>(`/core/systems/${systemKey}/config`, { config })
      
      if (response.success) {
        // Refresh systems list
        await this.getSystems()
        return true
      }
    } catch (error) {
      console.error(`Error updating config for system ${systemKey}:`, error)
    }

    return false
  }

  /**
   * Update system permissions (admin only)
   */
  async updateSystemPermissions(systemKey: string, permissions: string[]): Promise<boolean> {
    try {
      const response = await apiService.put<{ success: boolean }>(`/core/systems/${systemKey}/permissions`, { permissions })
      
      if (response.success) {
        // Refresh systems list
        await this.getSystems()
        return true
      }
    } catch (error) {
      console.error(`Error updating permissions for system ${systemKey}:`, error)
    }

    return false
  }

  /**
   * Get cached systems
   */
  getCachedSystems(): System[] {
    return this.systems
  }

  /**
   * Get cached navigation systems
   */
  getCachedNavigationSystems(): NavigationSystem[] {
    return this.navigationSystems
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.systems = []
    this.navigationSystems = []
  }
}

// Export singleton instance
export const systemRegistryService = SystemRegistryService.getInstance()
