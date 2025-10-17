/**
 * Department Modal Component
 * 
 * Modal สำหรับจัดการแผนก (เพิ่ม, แก้ไข, ดู, ลบ)
 */

import { type FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { useToast } from '../../hooks/useToast'
import {
  XMarkIcon,
  BuildingOffice2Icon,
  UserIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface Department {
  id: number
  name: string
  code: string
  description?: string
  manager?: string
  employee_count: number
  budget?: number
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

interface DepartmentModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit' | 'view' | 'delete'
  department?: Department | null
  onSave: (department: Omit<Department, 'id' | 'created_at' | 'updated_at'>) => void
  onDelete?: (id: number) => void
  loading?: boolean
}

export const DepartmentModal: FC<DepartmentModalProps> = ({
  isOpen,
  onClose,
  mode,
  department,
  onSave,
  onDelete,
  loading = false
}) => {
  const { t } = useTranslation()
  const { success, error } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    manager: '',
    employee_count: 0,
    budget: 0,
    status: 'active' as 'active' | 'inactive'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form data when department changes
  useEffect(() => {
    if (department && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: department.name || '',
        code: department.code || '',
        description: department.description || '',
        manager: department.manager || '',
        employee_count: department.employee_count || 0,
        budget: department.budget || 0,
        status: department.status || 'active'
      })
    } else if (mode === 'create') {
      setFormData({
        name: '',
        code: '',
        description: '',
        manager: '',
        employee_count: 0,
        budget: 0,
        status: 'active'
      })
    }
  }, [department, mode])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t('nameRequired')
    }

    if (!formData.code.trim()) {
      newErrors.code = t('codeRequired')
    }

    if (mode === 'create' && formData.employee_count < 0) {
      newErrors.employee_count = t('employeeCountInvalid')
    }

    if (mode === 'create' && formData.budget < 0) {
      newErrors.budget = t('budgetInvalid')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'delete' && department && onDelete) {
      onDelete(department.id)
      return
    }

    if (mode === 'view') {
      onClose()
      return
    }

    if (!validateForm()) {
      return
    }

    try {
      onSave(formData)
      success(t('departmentSavedSuccessfully'))
      onClose()
    } catch (err) {
      error(t('failedToSaveDepartment'))
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const getModeColor = () => {
    switch (mode) {
      case 'create':
        return 'bg-green-500 dark:bg-green-600'
      case 'edit':
        return 'bg-blue-500 dark:bg-blue-600'
      case 'view':
        return 'bg-purple-500 dark:bg-purple-600'
      case 'delete':
        return 'bg-red-500 dark:bg-red-600'
      default:
        return 'bg-gray-500 dark:bg-gray-600'
    }
  }

  const getModeTitle = () => {
    switch (mode) {
      case 'create':
        return t('addDepartment')
      case 'edit':
        return t('editDepartment')
      case 'view':
        return t('viewDepartment')
      case 'delete':
        return t('deleteDepartment')
      default:
        return t('department')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-4 w-4" />
      case 'inactive':
        return <ExclamationTriangleIcon className="h-4 w-4" />
      default:
        return <ClockIcon className="h-4 w-4" />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`${getModeColor()} px-6 py-4 rounded-t-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BuildingOffice2Icon className="h-6 w-6 text-white" />
              <h2 className="text-xl font-semibold text-white">
                {getModeTitle()}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'delete' ? (
            // Delete Confirmation
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('confirmDeleteDepartment')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('deleteDepartmentWarning', { name: department?.name, code: department?.code })}
              </p>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <BuildingOffice2Icon className="h-5 w-5 mr-2 text-blue-600" />
                  {t('basicInformation')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('departmentName')} <span className="text-red-500">*</span>
                    </label>
                    {mode === 'view' ? (
                      <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                        {formData.name}
                      </p>
                    ) : (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={t('enterDepartmentName')}
                        disabled={loading}
                      />
                    )}
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('departmentCode')} <span className="text-red-500">*</span>
                    </label>
                    {mode === 'view' ? (
                      <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                        {formData.code}
                      </p>
                    ) : (
                      <input
                        type="text"
                        value={formData.code}
                        onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.code ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={t('enterDepartmentCode')}
                        disabled={loading}
                      />
                    )}
                    {errors.code && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.code}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('description')}
                  </label>
                  {mode === 'view' ? (
                    <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md min-h-[80px]">
                      {formData.description || '-'}
                    </p>
                  ) : (
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder={t('enterDescription')}
                      disabled={loading}
                    />
                  )}
                </div>
              </div>

              {/* Management Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-green-600" />
                  {t('managementInformation')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('manager')}
                    </label>
                    {mode === 'view' ? (
                      <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                        {formData.manager || '-'}
                      </p>
                    ) : (
                      <input
                        type="text"
                        value={formData.manager}
                        onChange={(e) => handleInputChange('manager', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder={t('enterManagerName')}
                        disabled={loading}
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('status')}
                    </label>
                    {mode === 'view' ? (
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(formData.status)}`}>
                          {getStatusIcon(formData.status)}
                          <span className="ml-1">{t(formData.status)}</span>
                        </span>
                      </div>
                    ) : (
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        disabled={loading}
                      >
                        <option value="active">{t('active')}</option>
                        <option value="inactive">{t('inactive')}</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2 text-yellow-600" />
                  {t('financialInformation')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('employeeCount')}
                    </label>
                    {mode === 'view' ? (
                      <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                        {formData.employee_count}
                      </p>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={formData.employee_count}
                        onChange={(e) => handleInputChange('employee_count', parseInt(e.target.value) || 0)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.employee_count ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={t('enterEmployeeCount')}
                        disabled={loading}
                      />
                    )}
                    {errors.employee_count && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.employee_count}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('budget')} (฿)
                    </label>
                    {mode === 'view' ? (
                      <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                        {formData.budget ? `฿${formData.budget.toLocaleString()}` : '-'}
                      </p>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', parseInt(e.target.value) || 0)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.budget ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={t('enterBudget')}
                        disabled={loading}
                      />
                    )}
                    {errors.budget && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.budget}</p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg flex justify-end space-x-3">
          {mode === 'view' ? (
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              {t('close')}
            </Button>
          ) : mode === 'delete' ? (
            <>
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                disabled={loading}
              >
                {t('cancel')}
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={loading}
              >
                {loading ? t('deleting') : t('delete')}
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                disabled={loading}
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? t('saving') : t('save')}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}