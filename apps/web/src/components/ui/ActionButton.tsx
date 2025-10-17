/**
 * Action Button Component
 * 
 * Component สำหรับปุ่มดำเนินการที่ใช้ซ้ำได้
 */

import { type FC } from 'react'
import { Button } from './Button'

interface ActionButtonProps {
  variant: 'view' | 'edit' | 'delete'
  onClick: () => void
  title: string
  children: React.ReactNode
  disabled?: boolean
}

export const ActionButton: FC<ActionButtonProps> = ({
  variant,
  onClick,
  title,
  children,
  disabled = false
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'view':
        return 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600'
      case 'edit':
        return 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-300 dark:hover:border-amber-600'
      case 'delete':
        return 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600'
      default:
        return 'text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/20 hover:border-gray-300 dark:hover:border-gray-600'
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex items-center gap-1.5 px-3 py-1.5 transition-all duration-200 hover:scale-105 ${getVariantStyles()}`}
    >
      {children}
    </Button>
  )
}
