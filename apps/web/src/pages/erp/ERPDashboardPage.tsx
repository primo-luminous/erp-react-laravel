/**
 * ERP Dashboard Page
 * 
 * หน้าแดชบอร์ดหลักของระบบ ERP
 */

import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import {
  ChartBarIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CogIcon,
  ChartPieIcon,
  TruckIcon,
  HomeIcon,
  HeartIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  GlobeAltIcon,
  CloudIcon,
  LockClosedIcon,
  BeakerIcon,
  CameraIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  MapIcon,
  BuildingOffice2Icon,
  PhoneIcon,
  EnvelopeIcon,
  StarIcon,
  FireIcon,
  BoltIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export const ERPDashboardPage: FC = () => {
  const { t } = useTranslation()

  const modules = [
    {
      id: 'hr',
      title: t('humanResources'),
      description: t('hrDescription'),
      icon: <UserGroupIcon className="h-8 w-8" />,
      color: 'purple' as const,
      features: [
        t('employeeManagement'),
        t('payrollManagement'),
        t('leaveManagement'),
        t('attendanceTracking'),
        t('performanceReview'),
        t('recruitment'),
        t('training'),
        t('benefits')
      ],
      status: 'active' as const,
      href: '/erp/hr'
    },
    {
      id: 'inventory',
      title: t('inventory'),
      description: t('inventoryDescription'),
      icon: <BuildingStorefrontIcon className="h-8 w-8" />,
      color: 'indigo' as const,
      features: [
        t('stockManagement'),
        t('warehouseManagement'),
        t('productCatalog'),
        t('supplierManagement'),
        t('purchaseOrders'),
        t('stockTracking'),
        t('inventoryReports'),
        t('barcodeManagement')
      ],
      status: 'active' as const,
      href: '/erp/inventory'
    },
    {
      id: 'sales',
      title: t('sales'),
      description: t('salesDescription'),
      icon: <ShoppingCartIcon className="h-8 w-8" />,
      color: 'blue' as const,
      features: [
        t('customerManagement'),
        t('salesOrders'),
        t('quotations'),
        t('invoicing'),
        t('paymentTracking'),
        t('salesReports'),
        t('customerSupport'),
        t('salesForecasting')
      ],
      status: 'active' as const,
      href: '/erp/sales'
    },
    {
      id: 'purchase',
      title: t('purchase'),
      description: t('purchaseDescription'),
      icon: <TruckIcon className="h-8 w-8" />,
      color: 'orange' as const,
      features: [
        t('supplierManagement'),
        t('purchaseOrders'),
        t('receiving'),
        t('vendorEvaluation'),
        t('contractManagement'),
        t('purchaseReports'),
        t('approvalWorkflow'),
        t('costAnalysis')
      ],
      status: 'active' as const,
      href: '/erp/purchase'
    },
    {
      id: 'accounting',
      title: t('accounting'),
      description: t('accountingDescription'),
      icon: <BanknotesIcon className="h-8 w-8" />,
      color: 'teal' as const,
      features: [
        t('generalLedger'),
        t('accountsPayable'),
        t('accountsReceivable'),
        t('journalEntries'),
        t('financialReports'),
        t('budgetManagement'),
        t('taxManagement'),
        t('auditTrail')
      ],
      status: 'active' as const,
      href: '/erp/accounting'
    },
    {
      id: 'finance',
      title: t('finance'),
      description: t('financeDescription'),
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      color: 'green' as const,
      features: [
        t('bankAccounts'),
        t('cashFlow'),
        t('investmentTracking'),
        t('loanManagement'),
        t('financialPlanning'),
        t('riskManagement'),
        t('compliance'),
        t('financialAnalysis')
      ],
      status: 'active' as const,
      href: '/erp/finance'
    }
  ]

  const stats = [
    {
      title: t('totalEmployees'),
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: <UserGroupIcon className="h-6 w-6" />,
      color: 'purple' as const
    },
    {
      title: t('totalProducts'),
      value: '5,678',
      change: '+8%',
      changeType: 'positive' as const,
      icon: <BuildingStorefrontIcon className="h-6 w-6" />,
      color: 'indigo' as const
    },
    {
      title: t('monthlySales'),
      value: '$123,456',
      change: '+15%',
      changeType: 'positive' as const,
      icon: <ShoppingCartIcon className="h-6 w-6" />,
      color: 'blue' as const
    },
    {
      title: t('pendingOrders'),
      value: '89',
      change: '-5%',
      changeType: 'negative' as const,
      icon: <ExclamationTriangleIcon className="h-6 w-6" />,
      color: 'orange' as const
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'sale',
      title: t('newSaleOrder'),
      description: t('saleOrderCreated'),
      time: '2 minutes ago',
      icon: <ShoppingCartIcon className="h-5 w-5" />,
      color: 'blue' as const
    },
    {
      id: 2,
      type: 'inventory',
      title: t('lowStockAlert'),
      description: t('lowStockDescription'),
      time: '15 minutes ago',
      icon: <ExclamationTriangleIcon className="h-5 w-5" />,
      color: 'orange' as const
    },
    {
      id: 3,
      type: 'hr',
      title: t('newEmployee'),
      description: t('employeeAdded'),
      time: '1 hour ago',
      icon: <UserGroupIcon className="h-5 w-5" />,
      color: 'purple' as const
    },
    {
      id: 4,
      type: 'accounting',
      title: t('paymentReceived'),
      description: t('paymentReceivedDescription'),
      time: '2 hours ago',
      icon: <BanknotesIcon className="h-5 w-5" />,
      color: 'green' as const
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
      teal: 'bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t('erpDashboardTitle')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('erpDashboardWelcome')}
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
                          : 'text-red-600 dark:text-red-400'
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
                  <CogIcon className="h-6 w-6 text-blue-600" />
                  {t('erpModules')}
                </CardTitle>
                <CardDescription>
                  {t('erpModulesDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {modules.map((module) => (
                    <Card key={module.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg ${getColorClasses(module.color)}`}>
                            {module.icon}
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                              {t('active')}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                            {module.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {module.description}
                          </p>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            {t('keyFeatures')}:
                          </h4>
                          <div className="grid grid-cols-2 gap-1">
                            {module.features.slice(0, 6).map((feature, index) => (
                              <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                <CheckCircleIcon className="h-3 w-3 mr-1 text-green-500" />
                                {feature}
                              </div>
                            ))}
                          </div>
                          {module.features.length > 6 && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              +{module.features.length - 6} {t('moreFeatures')}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            {t('readyToUse')}
                          </div>
                          <Link to={module.href}>
                            <Button variant="outline" size="sm" className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                              {t('accessModule')}
                              <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-orange-600" />
                  {t('recentActivity')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
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
                  <BoltIcon className="h-5 w-5 text-yellow-600" />
                  {t('quickActions')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <DocumentTextIcon className="h-4 w-4 mr-2" />
                    {t('createInvoice')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCartIcon className="h-4 w-4 mr-2" />
                    {t('newSaleOrder')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    {t('addEmployee')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BuildingStorefrontIcon className="h-4 w-4 mr-2" />
                    {t('addProduct')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  {t('systemStatus')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('database')}</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      {t('online')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('api')}</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      {t('online')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('backup')}</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      {t('scheduled')}
                    </span>
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
