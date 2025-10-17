/**
 * Delete Confirmation Modal Component
 * 
 * Modal สำหรับยืนยันการลบข้อมูล
 */

import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  itemName: string
  itemDetails?: string
  loading?: boolean
}

export const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  itemDetails,
  loading = false
}) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center">
              <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-600 dark:text-red-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {message}
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-medium">{t('name')}:</span> {itemName}
                </p>
                {itemDetails && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">{t('position')}:</span> {itemDetails}
                  </p>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('deleteWarning')}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2"
            >
              {t('cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={loading}
              className="px-6 py-2 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {t('deleting')}
                </>
              ) : (
                <>
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  {t('delete')}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
