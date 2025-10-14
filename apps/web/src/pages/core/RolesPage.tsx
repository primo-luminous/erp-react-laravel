/**
 * Core Roles Management Page
 */

import { type FC } from 'react'
import { useCoreAuth } from '../../context/CoreAuthContext'

export const RolesPage: FC = () => {
  const { hasPermission } = useCoreAuth()

  if (!hasPermission('core.roles.view')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access role management.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
          <p className="mt-2 text-gray-600">Manage roles and permissions across all systems</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Role & Permission Management</h2>
            <p className="text-gray-600 mb-4">Advanced role-based access control system</p>
            <div className="text-sm text-gray-500">
              <p>• Create and manage roles</p>
              <p>• Assign permissions to roles</p>
              <p>• Module-based permissions</p>
              <p>• Hierarchical role structure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
