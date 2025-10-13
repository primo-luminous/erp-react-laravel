import {
  UsersIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useTranslation } from 'react-i18next'

const getStats = (t: (key: string) => string) => [
  {
    name: t('totalUsers'),
    value: '1,234',
    change: '+12%',
    changeType: 'increase' as const,
    icon: UsersIcon,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    name: t('departments'),
    value: '8',
    change: '+2',
    changeType: 'increase' as const,
    icon: BuildingOfficeIcon,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
  {
    name: t('revenue'),
    value: '$45,231',
    change: '+8.2%',
    changeType: 'increase' as const,
    icon: CurrencyDollarIcon,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    name: t('activeProjects'),
    value: '24',
    change: '-4',
    changeType: 'decrease' as const,
    icon: ChartBarIcon,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
  },
]

const getRecentActivities = (t: (key: string) => string) => [
  {
    id: 1,
    action: t('newUserRegistered'),
    user: 'John Doe',
    time: `2 ${t('minutesAgo')}`,
    type: 'user',
  },
  {
    id: 2,
    action: t('departmentUpdated'),
    user: 'Jane Smith',
    time: `1 ${t('hourAgo')}`,
    type: 'department',
  },
  {
    id: 3,
    action: t('settingsChanged'),
    user: 'Admin User',
    time: `3 ${t('hoursAgo')}`,
    type: 'settings',
  },
  {
    id: 4,
    action: t('reportGenerated'),
    user: 'Mike Johnson',
    time: `5 ${t('hoursAgo')}`,
    type: 'report',
  },
]

const getQuickActions = (t: (key: string) => string) => [
  {
    name: t('addUser'),
    description: t('createNewUserAccount'),
    icon: UsersIcon,
    href: '/users',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    name: t('newDepartment'),
    description: t('addDepartment'),
    icon: BuildingOfficeIcon,
    href: '/departments',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
  },
  {
    name: t('generateReport'),
    description: t('createSystemReport'),
    icon: ChartBarIcon,
    href: '/reports',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    name: t('viewAnalytics'),
    description: t('systemAnalytics'),
    icon: ArrowTrendingUpIcon,
    href: '/analytics',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
  },
]

export default function Dashboard() {
  const { t } = useTranslation()
  const stats = getStats(t)
  const recentActivities = getRecentActivities(t)
  const quickActions = getQuickActions(t)

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-sky-50/80 via-transparent to-indigo-50/50 dark:from-slate-900/50 dark:via-transparent dark:to-indigo-900/30 min-h-screen">
      {/* Page header */}
      <div className="animate-in-up">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-cyan-400 dark:to-blue-500 shadow-lg">
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text-primary">
              {t('dashboard')}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              {t('dashboardWelcome')}
            </p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <Card
            key={stat.name}
            className="card-day dark:card-night animate-in-up backdrop-blur-sm"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center">
                    {stat.changeType === 'increase' ? (
                      <ArrowUpIcon className="h-4 w-4 text-success-500 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-error-500 mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === 'increase'
                          ? 'text-success-600'
                          : 'text-error-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="card-day dark:card-night animate-in-up backdrop-blur-sm" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5 text-blue-500 dark:text-cyan-400" />
              <CardTitle className="text-slate-900 dark:text-white">{t('recentActivity')}</CardTitle>
            </div>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              {t('latestActions')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors animate-in-up"
                  style={{ animationDelay: `${500 + idx * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-primary-500 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-300">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-day dark:card-night animate-in-up backdrop-blur-sm" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-5 w-5 text-indigo-500 dark:text-purple-400" />
              <CardTitle className="text-slate-900 dark:text-white">{t('quickActions')}</CardTitle>
            </div>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              {t('commonTasks')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, idx) => (
                <Button
                  key={action.name}
                  variant="ghost"
                  className="h-auto p-4 flex flex-col items-start text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 animate-in-up"
                  style={{ animationDelay: `${600 + idx * 100}ms` }}
                >
                  <div className={`p-2 rounded-lg ${action.bgColor} mb-3`}>
                    <action.icon className={`h-5 w-5 text-orange-500`} />
                  </div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                    {action.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-300">
                    {action.description}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional info cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="card-day dark:card-night animate-in-up backdrop-blur-sm" style={{ animationDelay: '800ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-success-50">
                <CheckCircleIcon className="h-6 w-6 text-success-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('systemStatus')}</p>
                <p className="text-xs text-success-600 dark:text-success-400">{t('allSystemsOperational')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-day dark:card-night animate-in-up backdrop-blur-sm" style={{ animationDelay: '900ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary-50">
                <ArrowTrendingUpIcon className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('performance')}</p>
                <p className="text-xs text-blue-600 dark:text-cyan-400">98.5% {t('uptime')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-day dark:card-night animate-in-up backdrop-blur-sm" style={{ animationDelay: '1000ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-warning-50">
                <ClockIcon className="h-6 w-6 text-warning-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('lastBackup')}</p>
                <p className="text-xs text-warning-600 dark:text-warning-400">2 {t('hoursAgo')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}