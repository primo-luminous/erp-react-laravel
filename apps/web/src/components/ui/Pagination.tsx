/**
 * Pagination Component
 * 
 * Component สำหรับ pagination ที่ใช้ซ้ำได้
 */

import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './Button'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
  itemsPerPageOptions?: number[]
  showItemsPerPage?: boolean
  showInfo?: boolean
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50, 100],
  showItemsPerPage = true,
  showInfo = true
}) => {
  const { t } = useTranslation()

  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems)

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1 && !showItemsPerPage) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 dark:border-gray-700">
      {/* Items per page selector */}
      {showItemsPerPage && (
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <label className="text-sm text-gray-700 dark:text-gray-300">
            {t('itemsPerPage')}:
          </label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Info */}
      {showInfo && (
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {t('showing')} <span className="font-medium">{startIndex}</span> {t('to')} <span className="font-medium">{endIndex}</span> {t('of')} <span className="font-medium">{totalItems}</span> {t('results')}
          </p>
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center space-x-1">
          {/* Previous button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">{t('previous')}</span>
          </Button>

          {/* Page numbers */}
          <div className="flex space-x-1">
            {getVisiblePages().map((page, index) => (
              <div key={index}>
                {page === '...' ? (
                  <span className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400">
                    ...
                  </span>
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(page as number)}
                    className={`px-3 py-1 ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Next button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1"
          >
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">{t('next')}</span>
          </Button>
        </div>
      )}
    </div>
  )
}
