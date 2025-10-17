/**
 * System Card Component
 * 
 * Component สำหรับแสดงการ์ดระบบต่างๆ
 */

import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { ArrowRightIcon, CheckCircleIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline'

interface SystemCardProps {
  title: string
  description: string
  icon: React.ReactNode
  status: 'active' | 'development' | 'maintenance' | 'inactive'
  modules?: number
  features?: number
  href?: string
  onClick?: () => void
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo' | 'pink' | 'teal'
}

export const SystemCard: FC<SystemCardProps> = ({
  title,
  description,
  icon,
  status,
  modules,
  features,
  href,
  onClick,
  color
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          icon: CheckCircleIcon,
          text: 'Active',
          className: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
          iconClassName: 'text-green-600 dark:text-green-400'
        }
      case 'development':
        return {
          icon: ClockIcon,
          text: 'Development',
          className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
          iconClassName: 'text-yellow-600 dark:text-yellow-400'
        }
      case 'maintenance':
        return {
          icon: ExclamationTriangleIcon,
          text: 'Maintenance',
          className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
          iconClassName: 'text-orange-600 dark:text-orange-400'
        }
      case 'inactive':
        return {
          icon: ExclamationTriangleIcon,
          text: 'Inactive',
          className: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
          iconClassName: 'text-red-600 dark:text-red-400'
        }
      default:
        return {
          icon: ClockIcon,
          text: 'Unknown',
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
          iconClassName: 'text-gray-600 dark:text-gray-400'
        }
    }
  }

  const getColorConfig = () => {
    const configs = {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/20',
        icon: 'text-blue-600 dark:text-blue-400',
        hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/30',
        border: 'border-blue-200 dark:border-blue-700'
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/20',
        icon: 'text-green-600 dark:text-green-400',
        hover: 'hover:bg-green-50 dark:hover:bg-green-900/30',
        border: 'border-green-200 dark:border-green-700'
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/20',
        icon: 'text-purple-600 dark:text-purple-400',
        hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/30',
        border: 'border-purple-200 dark:border-purple-700'
      },
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/20',
        icon: 'text-orange-600 dark:text-orange-400',
        hover: 'hover:bg-orange-50 dark:hover:bg-orange-900/30',
        border: 'border-orange-200 dark:border-orange-700'
      },
      red: {
        bg: 'bg-red-100 dark:bg-red-900/20',
        icon: 'text-red-600 dark:text-red-400',
        hover: 'hover:bg-red-50 dark:hover:bg-red-900/30',
        border: 'border-red-200 dark:border-red-700'
      },
      indigo: {
        bg: 'bg-indigo-100 dark:bg-indigo-900/20',
        icon: 'text-indigo-600 dark:text-indigo-400',
        hover: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/30',
        border: 'border-indigo-200 dark:border-indigo-700'
      },
      pink: {
        bg: 'bg-pink-100 dark:bg-pink-900/20',
        icon: 'text-pink-600 dark:text-pink-400',
        hover: 'hover:bg-pink-50 dark:hover:bg-pink-900/30',
        border: 'border-pink-200 dark:border-pink-700'
      },
      teal: {
        bg: 'bg-teal-100 dark:bg-teal-900/20',
        icon: 'text-teal-600 dark:text-teal-400',
        hover: 'hover:bg-teal-50 dark:hover:bg-teal-900/30',
        border: 'border-teal-200 dark:border-teal-700'
      }
    }
    return configs[color] || configs.blue
  }

  const statusConfig = getStatusConfig()
  const colorConfig = getColorConfig()
  const StatusIcon = statusConfig.icon

  const cardContent = (
    <Card className={`group transition-all duration-300 hover:shadow-xl hover:scale-105 ${colorConfig.hover} ${colorConfig.border}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-16 h-16 ${colorConfig.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <div className={colorConfig.icon}>
              {icon}
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}>
              <StatusIcon className="h-3 w-3" />
              {statusConfig.text}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          {modules && (
            <div className="flex items-center gap-1">
              <span>Modules:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{modules}</span>
            </div>
          )}
          {features && (
            <div className="flex items-center gap-1">
              <span>Features:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{features}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {status === 'active' && 'Ready to use'}
            {status === 'development' && 'Coming soon'}
            {status === 'maintenance' && 'Temporarily unavailable'}
            {status === 'inactive' && 'Not available'}
          </div>
          <div className={`${colorConfig.icon} transition-transform group-hover:translate-x-1`}>
            <ArrowRightIcon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (href) {
    return (
      <Link to={href} className="block">
        {cardContent}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full text-left">
        {cardContent}
      </button>
    )
  }

  return cardContent
}
