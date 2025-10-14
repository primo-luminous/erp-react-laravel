/**
 * System Navigator Component
 * 
 * Component สำหรับแสดงระบบต่างๆ ที่ผู้ใช้สามารถเข้าถึงได้
 */

import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { useCoreAuth } from '../../context/CoreAuthContext'

interface SystemNavigatorProps {
  className?: string
}

export const SystemNavigator: FC<SystemNavigatorProps> = ({ className = '' }) => {
  const { availableSystems, isAuthenticated } = useCoreAuth()

  if (!isAuthenticated || availableSystems.length === 0) {
    return null
  }

  return (
    <div className={`system-navigator ${className}`}>
      <div className="flex flex-wrap gap-2">
        {availableSystems.map((system) => (
          <Link
            key={system.system_key}
            to={system.url_prefix || `/${system.system_key}`}
            className="inline-flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <div 
              className="w-4 h-4 mr-2 rounded"
              style={{ backgroundColor: system.color }}
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {system.display_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
