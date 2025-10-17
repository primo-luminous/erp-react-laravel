/**
 * Role Service
 * 
 * Service สำหรับจัดการบทบาท (Roles)
 */

export interface Role {
  id: number
  name: string
  display_name: string
  description?: string
  permissions?: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateRoleRequest {
  name: string
  display_name: string
  description?: string
  permissions?: string[]
  is_active?: boolean
}

export interface UpdateRoleRequest extends Partial<CreateRoleRequest> {
  id: number
}

class RoleService {
  private baseUrl = '/api/v1/core'

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': localStorage.getItem('i18nextLng') || 'en',
      'X-Locale': localStorage.getItem('i18nextLng') || 'en',
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async getRoles(): Promise<Role[]> {
    try {
      // Mock data for development
      return [
        {
          id: 1,
          name: 'super_admin',
          display_name: 'Super Administrator',
          description: 'Full system access with all permissions',
          permissions: ['*'],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          name: 'admin',
          display_name: 'Administrator',
          description: 'Administrative access to most system features',
          permissions: ['core.*', 'hr.*', 'finance.*'],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 3,
          name: 'manager',
          display_name: 'Manager',
          description: 'Management access to department features',
          permissions: ['core.users.view', 'core.users.edit', 'hr.*'],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 4,
          name: 'user',
          display_name: 'User',
          description: 'Basic user access',
          permissions: ['core.users.view'],
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 5,
          name: 'guest',
          display_name: 'Guest',
          description: 'Limited guest access',
          permissions: [],
          is_active: false,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ]
    } catch (error) {
      console.error('Error fetching roles:', error)
      throw error
    }
  }

  async getRole(id: number): Promise<Role> {
    try {
      const roles = await this.getRoles()
      const role = roles.find(r => r.id === id)
      if (!role) {
        throw new Error('Role not found')
      }
      return role
    } catch (error) {
      console.error('Error fetching role:', error)
      throw error
    }
  }

  async createRole(roleData: CreateRoleRequest): Promise<Role> {
    try {
      // Mock implementation
      const newRole: Role = {
        id: Date.now(),
        ...roleData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return newRole
    } catch (error) {
      console.error('Error creating role:', error)
      throw error
    }
  }

  async updateRole(roleData: UpdateRoleRequest): Promise<Role> {
    try {
      // Mock implementation
      const updatedRole: Role = {
        id: roleData.id,
        name: roleData.name || '',
        display_name: roleData.display_name || '',
        description: roleData.description,
        permissions: roleData.permissions || [],
        is_active: roleData.is_active ?? true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: new Date().toISOString()
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return updatedRole
    } catch (error) {
      console.error('Error updating role:', error)
      throw error
    }
  }

  async deleteRole(id: number): Promise<void> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error deleting role:', error)
      throw error
    }
  }

  async getPermissions(): Promise<string[]> {
    try {
      // Mock permissions data
      return [
        'core.*',
        'core.users.*',
        'core.users.view',
        'core.users.create',
        'core.users.edit',
        'core.users.delete',
        'core.roles.*',
        'core.roles.view',
        'core.roles.create',
        'core.roles.edit',
        'core.roles.delete',
        'hr.*',
        'hr.employees.*',
        'hr.employees.view',
        'hr.employees.create',
        'hr.employees.edit',
        'hr.employees.delete',
        'finance.*',
        'finance.accounts.*',
        'finance.accounts.view',
        'finance.accounts.create',
        'finance.accounts.edit',
        'finance.accounts.delete'
      ]
    } catch (error) {
      console.error('Error fetching permissions:', error)
      throw error
    }
  }
}

export const roleService = new RoleService()
