import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  CogIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  KeyIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { cn } from '../../lib/utils'
import { useTranslation } from 'react-i18next'

const getNavigation = (t: (key: string) => string) => [
  { name: t('dashboard'), href: '/', icon: HomeIcon },
  { name: t('profile'), href: '/profile', icon: UserIcon },
  { name: t('changePassword'), href: '/change-password', icon: KeyIcon },
  { name: t('users'), href: '/users', icon: UsersIcon, permission: 'users.view' },
  {
    name: t('roles'),
    href: '/roles',
    icon: UserGroupIcon,
    permission: 'roles.view',
  },
  {
    name: t('departments'),
    href: '/departments',
    icon: BuildingOfficeIcon,
    permission: 'departments.view',
  },
  {
    name: t('company'),
    href: '/company',
    icon: BuildingOfficeIcon,
    permission: 'company.view',
  },
  {
    name: t('settings'),
    href: '/settings',
    icon: CogIcon,
    permission: 'settings.view',
  },
  { name: t('hr'), href: '/hr', icon: UsersIcon, permission: 'hr.view' },
  {
    name: t('accounting'),
    href: '/accounting',
    icon: CurrencyDollarIcon,
    permission: 'accounting.view',
  },
  {
    name: t('sales'),
    href: '/sales',
    icon: ShoppingCartIcon,
    permission: 'sales.view',
  },
  {
    name: t('reports'),
    href: '/reports',
    icon: ChartBarIcon,
    permission: 'reports.view',
  },
]

interface SidebarProps {
  userPermissions: string[]
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({
  userPermissions,
  collapsed,
  onToggle,
}: SidebarProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const navigation = getNavigation(t)

  const filteredNavigation = navigation.filter(
    (item) => !item.permission || userPermissions.includes(item.permission),
  )

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-gradient-to-b from-slate-700 via-slate-800 to-slate-700 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 text-white transition-all duration-500 relative overflow-hidden shadow-2xl',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      {/* Background decoration - Day/Night Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-indigo-500/20 dark:from-cyan-400/10 dark:via-transparent dark:to-purple-400/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-slate-700/30 to-transparent dark:from-transparent dark:via-indigo-900/20 dark:to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 dark:border-indigo-700/50 relative z-10 backdrop-blur-sm">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-cyan-400 dark:to-blue-500 flex items-center justify-center shadow-lg">
              <SparklesIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text-primary">
                {t('erpSystem')}
              </h1>
              <p className="text-xs text-slate-400 dark:text-slate-300">Modern Business Suite</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-slate-700/50 dark:hover:bg-indigo-700/50 transition-all duration-200 hover:scale-105"
        >
          {collapsed ? (
            <Bars3Icon className="h-5 w-5" />
          ) : (
            <XMarkIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 relative z-10">
        {filteredNavigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden',
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-cyan-400 dark:to-blue-500 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50 dark:hover:bg-indigo-700/50 hover:text-white hover:translate-x-1',
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-cyan-400/20 dark:to-blue-400/20 rounded-xl" />
              )}
              <item.icon
                className={cn(
                  'h-5 w-5 flex-shrink-0 transition-all duration-200',
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 group-hover:text-white group-hover:scale-110',
                  collapsed ? 'mx-auto' : 'mr-3',
                )}
              />
              {!collapsed && (
                <span className="relative z-10">{item.name}</span>
              )}
              {isActive && !collapsed && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 h-2 w-2 bg-white rounded-full" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-700/50 relative z-10">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              <span className="text-sm font-bold text-white">A</span>
            </div>
          </div>
          {!collapsed && (
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userPermissions.includes('admin') ? t('adminUser') : t('standardUser')}</p>
              <p className="text-xs text-neutral-400 truncate">admin@example.com</p>
              <div className="flex items-center mt-1">
                <div className="h-2 w-2 bg-success-500 rounded-full mr-2" />
                <span className="text-xs text-success-400">{t('online')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}