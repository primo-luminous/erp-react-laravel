/**
 * HR Dashboard Page
 * 
 * หน้าแดชบอร์ดหลักของระบบ HR
 */

import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/Card'
import { HRNavigation } from '../../../components/erp/hr/HRNavigation'
import { Button } from '../../../components/ui/Button'
import {
  UserGroupIcon,
  ClockIcon,
  CalendarIcon,
  BanknotesIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon as ClockIconSolid
} from '@heroicons/react/24/outline'

export const HRDashboardPage: FC = () => {
  const { t } = useTranslation()

  // Stats data
  const stats = [
    {
      title: t('totalEmployees'),
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      changeLabel: t('fromLastMonth'),
      icon: <UserGroupIcon className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: t('activeEmployees'),
      value: '1,180',
      change: '+8%',
      changeType: 'positive' as const,
      changeLabel: t('fromLastMonth'),
      icon: <CheckCircleIcon className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: t('departments'),
      value: '12',
      change: '+2',
      changeType: 'positive' as const,
      changeLabel: t('newThisMonth'),
      icon: <BuildingOffice2Icon className="h-6 w-6" />,
      color: 'purple'
    },
    {
      title: t('pendingRequests'),
      value: '28',
      change: '-5',
      changeType: 'negative' as const,
      changeLabel: t('fromLastWeek'),
      icon: <ExclamationTriangleIcon className="h-6 w-6" />,
      color: 'orange'
    }
  ]

  // HR Modules data
  const modules = [
    {
      title: t('employeeManagement'),
      description: t('employeeManagementDescription'),
      href: '/erp/hr/employees',
      icon: <UserGroupIcon className="h-6 w-6" />,
      color: 'blue',
      status: 'active',
      features: [t('employeeList'), t('employeeProfile'), t('addEmployee')]
    },
    {
      title: t('departmentPosition'),
      description: t('departmentPositionDescription'),
      href: '/erp/hr/departments',
      icon: <BuildingOffice2Icon className="h-6 w-6" />,
      color: 'purple',
      status: 'active',
      features: [t('departmentList'), t('positionList'), t('organizationChart')]
    },
    {
      title: t('attendanceTimeTracking'),
      description: t('attendanceTimeTrackingDescription'),
      href: '/erp/hr/attendance',
      icon: <ClockIcon className="h-6 w-6" />,
      color: 'green',
      status: 'active',
      features: [t('attendanceLog'), t('timeClock'), t('overtimeRequest')]
    },
    {
      title: t('leaveManagement'),
      description: t('leaveManagementDescription'),
      href: '/erp/hr/leaves',
      icon: <CalendarIcon className="h-6 w-6" />,
      color: 'orange',
      status: 'active',
      features: [t('leaveRequests'), t('leaveCalendar'), t('leavePolicies')]
    },
    {
      title: t('payrollSalary'),
      description: t('payrollSalaryDescription'),
      href: '/erp/hr/payroll',
      icon: <BanknotesIcon className="h-6 w-6" />,
      color: 'teal',
      status: 'active',
      features: [t('payrollDashboard'), t('salaryStructure'), t('payslips')]
    },
    {
      title: t('performanceEvaluation'),
      description: t('performanceEvaluationDescription'),
      href: '/erp/hr/performance',
      icon: <ChartBarIcon className="h-6 w-6" />,
      color: 'indigo',
      status: 'development',
      features: [t('kpiSetup'), t('evaluationForm'), t('performanceReports')]
    },
    {
      title: t('documentsContracts'),
      description: t('documentsContractsDescription'),
      href: '/erp/hr/documents',
      icon: <DocumentTextIcon className="h-6 w-6" />,
      color: 'gray',
      status: 'active',
      features: [t('employeeContracts'), t('documentTemplates'), t('documentExpiryAlert')]
    },
    {
      title: t('rolePermission'),
      description: t('rolePermissionDescription'),
      href: '/erp/hr/roles',
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      color: 'red',
      status: 'active',
      features: [t('roleList'), t('permissionMatrix'), t('userAccessLog')]
    },
    {
      title: t('trainingCertificates'),
      description: t('trainingCertificatesDescription'),
      href: '/erp/hr/training',
      icon: <AcademicCapIcon className="h-6 w-6" />,
      color: 'yellow',
      status: 'development',
      features: [t('trainingPrograms'), t('certificates'), t('trainingReports')]
    }
  ]

  // Recent Activity data
  const recentActivity = [
    {
      id: 1,
      type: 'employee',
      title: t('newEmployeeAdded'),
      description: t('johnDoeJoined'),
      time: '2 hours ago',
      icon: <UserGroupIcon className="h-5 w-5" />,
      color: 'blue'
    },
    {
      id: 2,
      type: 'leave',
      title: t('leaveRequestSubmitted'),
      description: t('janeSmithRequested'),
      time: '4 hours ago',
      icon: <CalendarIcon className="h-5 w-5" />,
      color: 'orange'
    },
    {
      id: 3,
      type: 'attendance',
      title: t('attendanceRecorded'),
      description: t('bobJohnsonCheckedIn'),
      time: '6 hours ago',
      icon: <ClockIcon className="h-5 w-5" />,
      color: 'green'
    },
    {
      id: 4,
      type: 'payroll',
      title: t('payrollProcessed'),
      description: t('monthlyPayrollCompleted'),
      time: '1 day ago',
      icon: <BanknotesIcon className="h-5 w-5" />,
      color: 'teal'
    }
  ]

  // Quick Actions data
  const quickActions = [
    {
      title: t('addEmployee'),
      description: t('addNewEmployee'),
      href: '/erp/hr/employees/create',
      icon: <UserGroupIcon className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: t('processPayroll'),
      description: t('runMonthlyPayroll'),
      href: '/erp/hr/payroll',
      icon: <BanknotesIcon className="h-6 w-6" />,
      color: 'teal'
    },
    {
      title: t('approveLeaves'),
      description: t('reviewLeaveRequests'),
      href: '/erp/hr/leaves',
      icon: <CalendarIcon className="h-6 w-6" />,
      color: 'orange'
    },
    {
      title: t('viewReports'),
      description: t('generateHRReports'),
      href: '/erp/hr/reports',
      icon: <ChartBarIcon className="h-6 w-6" />,
      color: 'indigo'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
      teal: 'bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
      gray: 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400',
      red: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getStatusColor = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      development: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      maintenance: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
    }
    return statusColors[status as keyof typeof statusColors] || statusColors.active
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('hrDashboardTitle')}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {t('hrDashboardWelcome')}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('lastUpdated')}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className={`text-sm font-medium ${
                            stat.changeType === 'positive' 
                              ? 'text-green-600 dark:text-green-400' 
                              : stat.changeType === 'negative'
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {stat.change}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                            {t('fromLastMonth')}
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Modules Section */}
              <div className="lg:col-span-2">
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserGroupIcon className="h-6 w-6 text-blue-600" />
                      {t('hrModules')}
                    </CardTitle>
                    <CardDescription>
                      {t('hrModulesDescription')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {modules.map((module, index) => (
                        <Link
                          key={index}
                          to={module.href}
                          className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${getColorClasses(module.color)}`}>
                              {module.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {module.title}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {module.description}
                              </p>
                              <div className="flex items-center mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(module.status)}`}>
                                  {t(module.status)}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                  {module.features.length} {t('features')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClockIconSolid className="h-6 w-6 text-green-600" />
                      {t('recentActivity')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                            {activity.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {activity.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowRightIcon className="h-6 w-6 text-purple-600" />
                      {t('quickActions')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {quickActions.map((action, index) => (
                        <Link
                          key={index}
                          to={action.href}
                          className="group p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                          <div className="text-center">
                            <div className={`p-2 rounded-lg ${getColorClasses(action.color)} mx-auto mb-2`}>
                              {action.icon}
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {action.title}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {action.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                      {t('systemStatus')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {t('database')}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          {t('online')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {t('api')}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          {t('online')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {t('fileStorage')}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                          {t('processing')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* HR Navigation Sidebar */}
          <div className="lg:col-span-1">
            <HRNavigation />
          </div>
        </div>
      </div>
    </div>
  )
}