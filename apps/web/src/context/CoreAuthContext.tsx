/**
 * Core Authentication Context
 * 
 * Context สำหรับจัดการการยืนยันตัวตนผ่าน Core Platform
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { coreAuthService, type User, type LoginCredentials } from '../services/core/AuthService'
import { systemRegistryService, type NavigationSystem } from '../services/core/SystemRegistryService'

interface CoreAuthContextType {
  // Auth state
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  availableSystems: NavigationSystem[]
  
  // Auth actions
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  
  // Permission checks
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  hasAllPermissions: (permissions: string[]) => boolean
  hasRole: (roleName: string) => boolean
  hasAnyRole: (roleNames: string[]) => boolean
  getPermissionsByModule: (module: string) => string[]
  getRolesByModule: (module: string) => Array<{ id: number; name: string; display_name: string; module?: string }>
  
  // System access
  canAccessSystem: (systemKey: string) => boolean
  getAvailableSystems: () => NavigationSystem[]
}

const CoreAuthContext = createContext<CoreAuthContextType | undefined>(undefined)

interface CoreAuthProviderProps {
  children: ReactNode
}

export function CoreAuthProvider({ children }: CoreAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [availableSystems, setAvailableSystems] = useState<NavigationSystem[]>([])

  // Initialize auth state
  useEffect(() => {
    initializeAuth()
  }, [])

  // Update available systems when user changes
  useEffect(() => {
    if (user) {
      updateAvailableSystems()
    } else {
      setAvailableSystems([])
    }
  }, [user])

  const initializeAuth = async () => {
    try {
      setIsLoading(true)
      
      // Check if user is already authenticated
      if (coreAuthService.isAuthenticated()) {
        const currentUser = await coreAuthService.getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
          setIsAuthenticated(true)
        } else {
          // Token is invalid, clear auth data
          await logout()
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      await logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await coreAuthService.login(credentials)
      
      if (response.success) {
        setUser(response.data.user)
        setIsAuthenticated(true)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await coreAuthService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      setAvailableSystems([])
    }
  }

  const refreshUser = async (): Promise<void> => {
    try {
      const currentUser = await coreAuthService.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
      } else {
        await logout()
      }
    } catch (error) {
      console.error('Refresh user error:', error)
      await logout()
    }
  }

  const updateAvailableSystems = async (): Promise<void> => {
    if (!user) return

    try {
      const systems = await systemRegistryService.getAvailableSystems(user.permissions)
      setAvailableSystems(systems)
    } catch (error) {
      console.error('Error updating available systems:', error)
    }
  }

  // Permission checks
  const hasPermission = (permission: string): boolean => {
    return coreAuthService.hasPermission(permission)
  }

  const hasAnyPermission = (permissions: string[]): boolean => {
    return coreAuthService.hasAnyPermission(permissions)
  }

  const hasAllPermissions = (permissions: string[]): boolean => {
    return coreAuthService.hasAllPermissions(permissions)
  }

  const hasRole = (roleName: string): boolean => {
    return coreAuthService.hasRole(roleName)
  }

  const hasAnyRole = (roleNames: string[]): boolean => {
    return coreAuthService.hasAnyRole(roleNames)
  }

  const getPermissionsByModule = (module: string): string[] => {
    return coreAuthService.getPermissionsByModule(module)
  }

  const getRolesByModule = (module: string): Array<{ id: number; name: string; display_name: string; module?: string }> => {
    return coreAuthService.getRolesByModule(module)
  }

  // System access
  const canAccessSystem = (systemKey: string): boolean => {
    if (!user) return false
    
    // Check if system is available to user
    return availableSystems.some(system => system.system_key === systemKey)
  }

  const getAvailableSystems = (): NavigationSystem[] => {
    return availableSystems
  }

  const value: CoreAuthContextType = {
    // Auth state
    user,
    isAuthenticated,
    isLoading,
    availableSystems,
    
    // Auth actions
    login,
    logout,
    refreshUser,
    
    // Permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    getPermissionsByModule,
    getRolesByModule,
    
    // System access
    canAccessSystem,
    getAvailableSystems,
  }

  return (
    <CoreAuthContext.Provider value={value}>
      {children}
    </CoreAuthContext.Provider>
  )
}

export function useCoreAuth(): CoreAuthContextType {
  const context = useContext(CoreAuthContext)
  if (context === undefined) {
    throw new Error('useCoreAuth must be used within a CoreAuthProvider')
  }
  return context
}

// Hook for checking permissions
export function usePermission(permission: string): boolean {
  const { hasPermission } = useCoreAuth()
  return hasPermission(permission)
}

// Hook for checking multiple permissions
export function usePermissions(permissions: string[]): boolean {
  const { hasAllPermissions } = useCoreAuth()
  return hasAllPermissions(permissions)
}

// Hook for checking roles
export function useRole(roleName: string): boolean {
  const { hasRole } = useCoreAuth()
  return hasRole(roleName)
}

// Hook for checking system access
export function useSystemAccess(systemKey: string): boolean {
  const { canAccessSystem } = useCoreAuth()
  return canAccessSystem(systemKey)
}
