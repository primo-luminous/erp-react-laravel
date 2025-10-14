/**
 * Core Dashboard Page
 * 
 * หน้าแดชบอร์ดหลักของระบบ Core Platform
 */

import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCoreAuth } from '../../context/CoreAuthContext'
import { SystemNavigator } from '../../components/core/SystemNavigator'
import { PermissionGate } from '../../components/core/PermissionGate'

export const DashboardPage: FC = () => {
  const { t } = useTranslation()
  const { user, availableSystems } = useCoreAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('coreDashboardWelcome', { name: user?.name })}
          </h1>
          <p className="mt-2 text-gray-600">
            {t('coreDashboardTitle')}
          </p>
        </div>

        {/* User Info */}
        <div className='bg-white rounded-lg shadow p-6 mb-8'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>{t('userInformation')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('name')}</label>
              <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
              <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('company')}</label>
              <p className="mt-1 text-sm text-gray-900">{user?.company?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('department')}</label>
              <p className="mt-1 text-sm text-gray-900">{user?.department?.name || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('position')}</label>
              <p className="mt-1 text-sm text-gray-900">{user?.position || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('employeeId')}</label>
              <p className="mt-1 text-sm text-gray-900">{user?.employee_id || '-'}</p>
            </div>
          </div>
        </div>

        {/* Available Systems */}
        <div className='bg-white rounded-lg shadow p-6 mb-8'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>{t('availableSystems')}</h2>
          {availableSystems.length > 0 ? (
            <SystemNavigator />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* ERP System */}
              <PermissionGate permissions={['erp.access']}>
                <Link to="/erp" className="block">
                  <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{t('erpSystem')}</h3>
                        <p className="text-sm text-gray-500">{t('erpDescription')}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('modules')}</span>
                        <span className="font-medium">6</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t('status')}</span>
                        <span className="font-medium text-green-600">{t('active')}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </PermissionGate>

              {/* Car Rental System */}
              <PermissionGate permissions={['rental.access']}>
                <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{t('carRental')}</h3>
                      <p className="text-sm text-gray-500">{t('fleetManagement')}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t('features')}</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status</span>
                      <span className="font-medium text-yellow-600">{t('development')}</span>
                    </div>
                  </div>
                </div>
              </PermissionGate>

              {/* Smart Classroom System */}
              <PermissionGate permissions={['classroom.access']}>
                <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{t('smartClassroom')}</h3>
                      <p className="text-sm text-gray-500">{t('educationManagement')}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t('features')}</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status</span>
                      <span className="font-medium text-yellow-600">{t('development')}</span>
                    </div>
                  </div>
                </div>
              </PermissionGate>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <PermissionGate permissions={['core.users.view', 'core.roles.view']}>
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{t('userManagement')}</h3>
                  <p className="text-sm text-gray-500">{t('userManagementDescription')}</p>
                </div>
              </div>
            </div>
          </PermissionGate>

          {/* System Management */}
          <PermissionGate permissions={['core.systems.view', 'core.systems.edit']}>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{t('systemManagement')}</h3>
                  <p className="text-sm text-gray-500">{t('systemManagementDescription')}</p>
                </div>
              </div>
            </div>
          </PermissionGate>

          {/* Audit Logs */}
          <PermissionGate permissions={['core.audit.view']}>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{t('auditLogs')}</h3>
                  <p className="text-sm text-gray-500">{t('auditLogsDescription')}</p>
                </div>
              </div>
            </div>
          </PermissionGate>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('recentActivity')}</h2>
          <div className="text-gray-500">
            <p>{t('noRecentActivity')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
