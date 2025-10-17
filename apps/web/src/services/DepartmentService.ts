/**
 * Department Service
 * 
 * Service สำหรับจัดการแผนก (Departments)
 */

export interface Department {
  id: number
  name: string
  code: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateDepartmentRequest {
  name: string
  code: string
  description?: string
  is_active?: boolean
}

export interface UpdateDepartmentRequest extends Partial<CreateDepartmentRequest> {
  id: number
}

class DepartmentService {
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

  async getDepartments(): Promise<Department[]> {
    try {
      // Mock data for development
      return [
        {
          id: 1,
          name: 'Information Technology',
          code: 'IT',
          description: 'Information Technology Department',
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          name: 'Human Resources',
          code: 'HR',
          description: 'Human Resources Department',
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 3,
          name: 'Finance',
          code: 'FIN',
          description: 'Finance Department',
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 4,
          name: 'Sales',
          code: 'SALES',
          description: 'Sales Department',
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 5,
          name: 'Marketing',
          code: 'MKT',
          description: 'Marketing Department',
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 6,
          name: 'Operations',
          code: 'OPS',
          description: 'Operations Department',
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 7,
          name: 'Customer Service',
          code: 'CS',
          description: 'Customer Service Department',
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        },
        {
          id: 8,
          name: 'Research & Development',
          code: 'R&D',
          description: 'Research and Development Department',
          is_active: false,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ]
    } catch (error) {
      console.error('Error fetching departments:', error)
      throw error
    }
  }

  async getDepartment(id: number): Promise<Department> {
    try {
      const departments = await this.getDepartments()
      const department = departments.find(d => d.id === id)
      if (!department) {
        throw new Error('Department not found')
      }
      return department
    } catch (error) {
      console.error('Error fetching department:', error)
      throw error
    }
  }

  async createDepartment(departmentData: CreateDepartmentRequest): Promise<Department> {
    try {
      // Mock implementation
      const newDepartment: Department = {
        id: Date.now(),
        ...departmentData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return newDepartment
    } catch (error) {
      console.error('Error creating department:', error)
      throw error
    }
  }

  async updateDepartment(departmentData: UpdateDepartmentRequest): Promise<Department> {
    try {
      // Mock implementation
      const updatedDepartment: Department = {
        id: departmentData.id,
        name: departmentData.name || '',
        code: departmentData.code || '',
        description: departmentData.description,
        is_active: departmentData.is_active ?? true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: new Date().toISOString()
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return updatedDepartment
    } catch (error) {
      console.error('Error updating department:', error)
      throw error
    }
  }

  async deleteDepartment(id: number): Promise<void> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error deleting department:', error)
      throw error
    }
  }
}

export const departmentService = new DepartmentService()
