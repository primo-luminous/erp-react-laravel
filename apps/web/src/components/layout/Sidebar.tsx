import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { cn } from '../../lib/utils'
import { useTranslation } from 'react-i18next'
import { sidebarMenu } from '../../config/sidebarMenu'


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
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  // Filter menu groups based on permissions
  const filteredMenu = sidebarMenu.map(group => ({
    ...group,
    children: group.children.filter(
      (item) => !item.permission || userPermissions.includes(item.permission)
    )
  })).filter(group => group.children.length > 0)

  const toggleGroup = (groupLabel: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev)
      if (newSet.has(groupLabel)) {
        newSet.delete(groupLabel)
      } else {
        newSet.add(groupLabel)
      }
      return newSet
    })
  }

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
      <nav className="flex-1 px-3 py-4 space-y-1 relative z-10 overflow-y-auto">
        {filteredMenu.map((group) => {
          const isGroupExpanded = expandedGroups.has(group.label)
          const hasActiveChild = group.children.some(child => location.pathname === child.path)
          
          return (
            <div key={group.label} className="space-y-1">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.label)}
                className={cn(
                  'group flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden',
                  hasActiveChild
                    ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-cyan-400/20 dark:to-blue-400/20 text-white'
                    : 'text-slate-300 hover:bg-slate-700/50 dark:hover:bg-indigo-700/50 hover:text-white hover:translate-x-1',
                )}
              >
                <group.icon
                  className={cn(
                    'h-5 w-5 flex-shrink-0 transition-all duration-200',
                    hasActiveChild
                      ? 'text-white'
                      : 'text-slate-400 group-hover:text-white group-hover:scale-110',
                    collapsed ? 'mx-auto' : 'mr-3',
                  )}
                />
                {!collapsed && (
                  <>
                    <span className="relative z-10 flex-1 text-left">{t(group.labelKey)}</span>
                    {isGroupExpanded ? (
                      <ChevronDownIcon className="h-4 w-4 text-slate-400 group-hover:text-white transition-all duration-200" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4 text-slate-400 group-hover:text-white transition-all duration-200" />
                    )}
                  </>
                )}
              </button>

              {/* Group Children */}
              {(!collapsed && isGroupExpanded) && (
                <div className="ml-4 space-y-1 border-l border-slate-600/30 pl-4">
                  {group.children.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden',
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-cyan-400 dark:to-blue-500 text-white shadow-lg'
                            : 'text-slate-300 hover:bg-slate-700/50 dark:hover:bg-indigo-700/50 hover:text-white hover:translate-x-1',
                        )}
                      >
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-cyan-400/20 dark:to-blue-400/20 rounded-lg" />
                        )}
                        <item.icon
                          className={cn(
                            'h-4 w-4 flex-shrink-0 transition-all duration-200',
                            isActive
                              ? 'text-white'
                              : 'text-slate-400 group-hover:text-white group-hover:scale-110',
                            'mr-3',
                          )}
                        />
                        <span className="relative z-10">{t(item.nameKey)}</span>
                        {isActive && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-white rounded-full" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
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