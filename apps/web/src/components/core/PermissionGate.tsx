/**
 * Permission Gate Component
 * 
 * Component สำหรับควบคุมการแสดงผลตามสิทธิ์
 */

import React from 'react'
import { useCoreAuth } from '../../context/CoreAuthContext'

interface PermissionGateProps {
  children: React.ReactNode
  permission?: string
  permissions?: string[]
  role?: string
  roles?: string[]
  requireAllPermissions?: boolean
  fallback?: React.ReactNode
  mode?: 'hide' | 'disable'
}

export function PermissionGate({
  children,
  permission,
  permissions,
  role,
  roles,
  requireAllPermissions = false,
  fallback = null,
  mode = 'hide'
}: PermissionGateProps) {
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole
  } = useCoreAuth()

  let hasAccess = true

  // Check single permission
  if (permission) {
    hasAccess = hasAccess && hasPermission(permission)
  }

  // Check multiple permissions
  if (permissions && permissions.length > 0) {
    const hasRequiredPermissions = requireAllPermissions 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions)
    hasAccess = hasAccess && hasRequiredPermissions
  }

  // Check single role
  if (role) {
    hasAccess = hasAccess && hasRole(role)
  }

  // Check multiple roles
  if (roles && roles.length > 0) {
    hasAccess = hasAccess && hasAnyRole(roles)
  }

  if (!hasAccess) {
    if (mode === 'disable') {
      return (
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
      )
    }
    
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Hook for conditional rendering based on permissions
export function usePermissionGate(
  permission?: string,
  permissions?: string[],
  role?: string,
  roles?: string[],
  requireAllPermissions = false
): boolean {
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole
  } = useCoreAuth()

  let hasAccess = true

  if (permission) {
    hasAccess = hasAccess && hasPermission(permission)
  }

  if (permissions && permissions.length > 0) {
    const hasRequiredPermissions = requireAllPermissions 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions)
    hasAccess = hasAccess && hasRequiredPermissions
  }

  if (role) {
    hasAccess = hasAccess && hasRole(role)
  }

  if (roles && roles.length > 0) {
    hasAccess = hasAccess && hasAnyRole(roles)
  }

  return hasAccess
}

// Specific permission gates
export function PermissionGateView({ children, ...props }: Omit<PermissionGateProps, 'permission'>) {
  return <PermissionGate permission="view" {...props}>{children}</PermissionGate>
}

export function PermissionGateCreate({ children, ...props }: Omit<PermissionGateProps, 'permission'>) {
  return <PermissionGate permission="create" {...props}>{children}</PermissionGate>
}

export function PermissionGateEdit({ children, ...props }: Omit<PermissionGateProps, 'permission'>) {
  return <PermissionGate permission="edit" {...props}>{children}</PermissionGate>
}

export function PermissionGateDelete({ children, ...props }: Omit<PermissionGateProps, 'permission'>) {
  return <PermissionGate permission="delete" {...props}>{children}</PermissionGate>
}
