/**
 * HR Navigation Component
 * 
 * เมนูนำทางสำหรับ HR Module
 */

import { type FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  UserGroupIcon,
  BuildingOffice2Icon,
  ClockIcon,
  CalendarIcon,
  BanknotesIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  HomeIcon
} from '@heroicons/react/24/outline'

interface NavigationItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
  badge?: string
  badgeColor?: string
}

export const HRNavigation: FC = () => {
  const { t } = useTranslation()
  const location = useLocation()

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      title: t('hrDashboard'),
      description: t('hrDashboardDescription'),
      icon: <HomeIcon className="h-6 w-6" />,
      href: '/erp/hr',
      color: 'blue'
    },
    {
      id: 'employee-list',
      title: t('employeeList'),
      description: t('viewAllEmployees'),
      icon: <UserGroupIcon className="h-6 w-6" />,
      href: '/erp/hr/employees',
      color: 'blue',
      badge: '5',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      id: 'department-position',
      title: t('departmentPosition'),
      description: t('departmentPositionDescription'),
      icon: <BuildingOffice2Icon className="h-6 w-6" />,
      href: '/erp/hr/departments',
      color: 'purple',
      badge: '5',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      children: [
        {
          id: 'department-list',
          title: t('departmentList'),
          description: t('manageDepartments'),
          icon: <BuildingOffice2Icon className="h-5 w-5" />,
          href: '/erp/hr/departments',
          color: 'purple'
        },
        {
          id: 'position-list',
          title: t('positionList'),
          description: t('managePositions'),
          icon: <BuildingOffice2Icon className="h-5 w-5" />,
          href: '/erp/hr/positions',
          color: 'purple'
        },
        {
          id: 'org-chart',
          title: t('organizationChart'),
          description: t('viewOrgChart'),
          icon: <BuildingOffice2Icon className="h-5 w-5" />,
          href: '/erp/hr/org-chart',
          color: 'purple'
        }
      ]
    },
    {
      id: 'attendance',
      title: t('attendanceTimeTracking'),
      description: t('attendanceTimeTrackingDescription'),
      icon: <ClockIcon className="h-6 w-6" />,
      href: '/erp/hr/attendance',
      color: 'green',
      badge: '3',
      badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      children: [
        {
          id: 'attendance-log',
          title: t('attendanceLog'),
          description: t('viewAttendanceRecords'),
          icon: <ClockIcon className="h-5 w-5" />,
          href: '/erp/hr/attendance',
          color: 'green'
        },
        {
          id: 'time-clock',
          title: t('timeClock'),
          description: t('clockInOut'),
          icon: <ClockIcon className="h-5 w-5" />,
          href: '/erp/hr/time-clock',
          color: 'green'
        },
        {
          id: 'overtime',
          title: t('overtimeRequest'),
          description: t('manageOvertime'),
          icon: <ClockIcon className="h-5 w-5" />,
          href: '/erp/hr/overtime',
          color: 'green'
        }
      ]
    },
    {
      id: 'leave',
      title: t('leaveManagement'),
      description: t('leaveManagementDescription'),
      icon: <CalendarIcon className="h-6 w-6" />,
      href: '/erp/hr/leaves',
      color: 'orange',
      badge: '8',
      badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      children: [
        {
          id: 'leave-requests',
          title: t('leaveRequests'),
          description: t('manageLeaveRequests'),
          icon: <CalendarIcon className="h-5 w-5" />,
          href: '/erp/hr/leaves',
          color: 'orange'
        },
        {
          id: 'leave-calendar',
          title: t('leaveCalendar'),
          description: t('viewLeaveCalendar'),
          icon: <CalendarIcon className="h-5 w-5" />,
          href: '/erp/hr/leave-calendar',
          color: 'orange'
        },
        {
          id: 'leave-policies',
          title: t('leavePolicies'),
          description: t('manageLeavePolicies'),
          icon: <CalendarIcon className="h-5 w-5" />,
          href: '/erp/hr/leave-policies',
          color: 'orange'
        }
      ]
    },
    {
      id: 'payroll',
      title: t('payrollSalary'),
      description: t('payrollSalaryDescription'),
      icon: <BanknotesIcon className="h-6 w-6" />,
      href: '/erp/hr/payroll',
      color: 'teal',
      children: [
        {
          id: 'payroll-dashboard',
          title: t('payrollDashboard'),
          description: t('viewPayrollSummary'),
          icon: <BanknotesIcon className="h-5 w-5" />,
          href: '/erp/hr/payroll',
          color: 'teal'
        },
        {
          id: 'salary-structure',
          title: t('salaryStructure'),
          description: t('manageSalaryStructure'),
          icon: <BanknotesIcon className="h-5 w-5" />,
          href: '/erp/hr/salary-structure',
          color: 'teal'
        },
        {
          id: 'payslips',
          title: t('payslips'),
          description: t('viewPayslips'),
          icon: <BanknotesIcon className="h-5 w-5" />,
          href: '/erp/hr/payslips',
          color: 'teal'
        }
      ]
    },
    {
      id: 'performance',
      title: t('performanceEvaluation'),
      description: t('performanceEvaluationDescription'),
      icon: <ChartBarIcon className="h-6 w-6" />,
      href: '/erp/hr/performance',
      color: 'indigo',
      children: [
        {
          id: 'kpi-setup',
          title: t('kpiSetup'),
          description: t('setupKPIs'),
          icon: <ChartBarIcon className="h-5 w-5" />,
          href: '/erp/hr/kpi-setup',
          color: 'indigo'
        },
        {
          id: 'evaluation-form',
          title: t('evaluationForm'),
          description: t('manageEvaluations'),
          icon: <ChartBarIcon className="h-5 w-5" />,
          href: '/erp/hr/evaluations',
          color: 'indigo'
        },
        {
          id: 'performance-reports',
          title: t('performanceReports'),
          description: t('viewPerformanceReports'),
          icon: <ChartBarIcon className="h-5 w-5" />,
          href: '/erp/hr/performance-reports',
          color: 'indigo'
        }
      ]
    },
    {
      id: 'documents',
      title: t('documentsContracts'),
      description: t('documentsContractsDescription'),
      icon: <DocumentTextIcon className="h-6 w-6" />,
      href: '/erp/hr/documents',
      color: 'gray',
      children: [
        {
          id: 'employee-contracts',
          title: t('employeeContracts'),
          description: t('manageContracts'),
          icon: <DocumentTextIcon className="h-5 w-5" />,
          href: '/erp/hr/contracts',
          color: 'gray'
        },
        {
          id: 'document-templates',
          title: t('documentTemplates'),
          description: t('manageTemplates'),
          icon: <DocumentTextIcon className="h-5 w-5" />,
          href: '/erp/hr/document-templates',
          color: 'gray'
        },
        {
          id: 'document-expiry',
          title: t('documentExpiryAlert'),
          description: t('trackExpiryDates'),
          icon: <DocumentTextIcon className="h-5 w-5" />,
          href: '/erp/hr/document-expiry',
          color: 'gray'
        }
      ]
    },
    {
      id: 'roles',
      title: t('rolePermission'),
      description: t('rolePermissionDescription'),
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      href: '/erp/hr/roles',
      color: 'red',
      children: [
        {
          id: 'role-list',
          title: t('roleList'),
          description: t('manageRoles'),
          icon: <ShieldCheckIcon className="h-5 w-5" />,
          href: '/erp/hr/roles',
          color: 'red'
        },
        {
          id: 'permission-matrix',
          title: t('permissionMatrix'),
          description: t('managePermissions'),
          icon: <ShieldCheckIcon className="h-5 w-5" />,
          href: '/erp/hr/permissions',
          color: 'red'
        },
        {
          id: 'access-logs',
          title: t('userAccessLog'),
          description: t('viewAccessLogs'),
          icon: <ShieldCheckIcon className="h-5 w-5" />,
          href: '/erp/hr/access-logs',
          color: 'red'
        }
      ]
    },
    {
      id: 'training',
      title: t('trainingCertificates'),
      description: t('trainingCertificatesDescription'),
      icon: <AcademicCapIcon className="h-6 w-6" />,
      href: '/erp/hr/training',
      color: 'yellow',
      children: [
        {
          id: 'training-programs',
          title: t('trainingPrograms'),
          description: t('manageTrainingPrograms'),
          icon: <AcademicCapIcon className="h-5 w-5" />,
          href: '/erp/hr/training-programs',
          color: 'yellow'
        },
        {
          id: 'certificates',
          title: t('certificates'),
          description: t('manageCertificates'),
          icon: <AcademicCapIcon className="h-5 w-5" />,
          href: '/erp/hr/certificates',
          color: 'yellow'
        },
        {
          id: 'training-reports',
          title: t('trainingReports'),
          description: t('viewTrainingReports'),
          icon: <AcademicCapIcon className="h-5 w-5" />,
          href: '/erp/hr/training-reports',
          color: 'yellow'
        }
      ]
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

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('hrNavigation')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t('hrNavigationDescription')}
        </p>
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <div key={item.id} className="space-y-1">
            {/* Main Navigation Item */}
            <Link
              to={item.href}
              className={`group flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${getColorClasses(item.color)}`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-medium ${
                      isActive(item.href)
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {item.title}
                    </h3>
                    {item.badge && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </nav>

    </div>
  )
}
