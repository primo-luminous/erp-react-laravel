/**
 * Core Dashboard Page
 * 
 * หน้าแดชบอร์ดหลักของระบบ Core Platform
 */

import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCoreAuth } from '../../context/CoreAuthContext'
import { PermissionGate } from '../../components/core/PermissionGate'
import { AvailableSystemsSection } from '../../components/core/AvailableSystemsSection'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import {
  UserGroupIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  ClockIcon,
  BellIcon,
  CogIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

export const DashboardPage: FC = () => {
  const { t } = useTranslation()
  const { user } = useCoreAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t('coreDashboardWelcome', { name: user?.name })}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('coreDashboardTitle')}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('lastLogin')}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : t('never')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">{t('totalUsers')}</p>
                  <p className="text-3xl font-bold">1,234</p>
                </div>
                <UserGroupIcon className="h-8 w-8 text-blue-200" />
              </div>
              <div className="mt-4 flex items-center text-blue-100 text-sm">
                <ArrowRightIcon className="h-4 w-4 mr-1" />
                +12% {t('fromLastMonth')}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">{t('activeSystems')}</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <ShieldCheckIcon className="h-8 w-8 text-green-200" />
              </div>
              <div className="mt-4 flex items-center text-green-100 text-sm">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                {t('allSystemsRunning')}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">{t('departments')}</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <BuildingOfficeIcon className="h-8 w-8 text-purple-200" />
              </div>
              <div className="mt-4 flex items-center text-purple-100 text-sm">
                <ArrowRightIcon className="h-4 w-4 mr-1" />
                +2 {t('newThisMonth')}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">{t('pendingTasks')}</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
                <ClockIcon className="h-8 w-8 text-orange-200" />
              </div>
              <div className="mt-4 flex items-center text-orange-100 text-sm">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                {t('requiresAttention')}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CogIcon className="h-5 w-5 text-blue-600" />
                  {t('quickActions')}
                </CardTitle>
                <CardDescription>
                  {t('quickActionsDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PermissionGate permissions={['core.users.view']}>
                    <Link to="/core/users">
                      <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        <UserGroupIcon className="h-6 w-6 text-blue-600" />
                        <span className="font-medium">{t('userManagement')}</span>
                      </Button>
                    </Link>
                  </PermissionGate>

                  <PermissionGate permissions={['core.roles.view']}>
                    <Link to="/core/roles">
                      <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                        <ShieldCheckIcon className="h-6 w-6 text-amber-600" />
                        <span className="font-medium">{t('roleManagement')}</span>
                      </Button>
                    </Link>
                  </PermissionGate>

                  <PermissionGate permissions={['core.departments.view']}>
                    <Link to="/core/departments">
                      <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-green-50 dark:hover:bg-green-900/20">
                        <BuildingOfficeIcon className="h-6 w-6 text-green-600" />
                        <span className="font-medium">{t('departmentManagement')}</span>
                      </Button>
                    </Link>
                  </PermissionGate>

                  <PermissionGate permissions={['core.audit.view']}>
                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                      <DocumentTextIcon className="h-6 w-6 text-purple-600" />
                      <span className="font-medium">{t('auditLogs')}</span>
                    </Button>
                  </PermissionGate>
                </div>
              </CardContent>
            </Card>

            {/* Available Systems */}
            <AvailableSystemsSection />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* User Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserGroupIcon className="h-5 w-5 text-blue-600" />
                  {t('userProfile')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.position || t('notSpecified')}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{t('email')}</span>
                    <span className="text-gray-900 dark:text-white">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{t('company')}</span>
                    <span className="text-gray-900 dark:text-white">{user?.company?.name || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{t('department')}</span>
                    <span className="text-gray-900 dark:text-white">{user?.department?.name || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{t('employeeId')}</span>
                    <span className="text-gray-900 dark:text-white">{user?.employee_id || '-'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-orange-600" />
                  {t('notifications')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <InformationCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">{t('systemUpdate')}</p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">{t('systemUpdateDescription')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">{t('maintenanceScheduled')}</p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">{t('maintenanceScheduledDescription')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}
