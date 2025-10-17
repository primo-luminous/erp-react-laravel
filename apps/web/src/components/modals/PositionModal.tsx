/**
 * Position Modal Component
 * 
 * Modal สำหรับจัดการตำแหน่ง (เพิ่ม, แก้ไข, ดู, ลบ)
 */

import { type FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { useToast } from '../../hooks/useToast'
import {
  XMarkIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

interface Position {
  id: number
  name: string
  code: string
  department_id: number
  department_name: string
  level: number
  base_salary_min?: number
  base_salary_max?: number
  requirements?: string[]
  responsibilities?: string[]
  status: 'active' | 'inactive'
  employee_count: number
  created_at: string
  updated_at: string
}

interface Department {
  id: number
  name: string
  code: string
}

interface PositionModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit' | 'view' | 'delete'
  position?: Position | null
  departments: Department[]
  onSave: (position: Omit<Position, 'id' | 'created_at' | 'updated_at' | 'department_name' | 'employee_count'>) => void
  onDelete?: (id: number) => void
  loading?: boolean
}

export const PositionModal: FC<PositionModalProps> = ({
  isOpen,
  onClose,
  mode,
  position,
  departments,
  onSave,
  onDelete,
  loading = false
}) => {
  const { t } = useTranslation()
  const { success, error } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department_id: 0,
    level: 1,
    base_salary_min: 0,
    base_salary_max: 0,
    requirements: [] as string[],
    responsibilities: [] as string[],
    status: 'active' as 'active' | 'inactive'
  })

  const [newRequirement, setNewRequirement] = useState('')
  const [newResponsibility, setNewResponsibility] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form data when position changes
  useEffect(() => {
    if (position && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: position.name || '',
        code: position.code || '',
        department_id: position.department_id || 0,
        level: position.level || 1,
        base_salary_min: position.base_salary_min || 0,
        base_salary_max: position.base_salary_max || 0,
        requirements: position.requirements || [],
        responsibilities: position.responsibilities || [],
        status: position.status || 'active'
      })
    } else if (mode === 'create') {
      setFormData({
        name: '',
        code: '',
        department_id: departments.length > 0 ? departments[0].id : 0,
        level: 1,
        base_salary_min: 0,
        base_salary_max: 0,
        requirements: [],
        responsibilities: [],
        status: 'active'
      })
    }
  }, [position, mode, departments])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t('nameRequired')
    }

    if (!formData.code.trim()) {
      newErrors.code = t('codeRequired')
    }

    if (formData.department_id === 0) {
      newErrors.department_id = t('departmentRequired')
    }

    if (formData.level < 1 || formData.level > 10) {
      newErrors.level = t('levelInvalid')
    }

    if (mode === 'create' && formData.base_salary_min < 0) {
      newErrors.base_salary_min = t('salaryMinInvalid')
    }

    if (mode === 'create' && formData.base_salary_max < 0) {
      newErrors.base_salary_max = t('salaryMaxInvalid')
    }

    if (formData.base_salary_min > formData.base_salary_max) {
      newErrors.base_salary_max = t('salaryMaxLessThanMin')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'delete' && position && onDelete) {
      onDelete(position.id)
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
      success(t('positionSavedSuccessfully'))
      onClose()
    } catch (err) {
      error(t('failedToSavePosition'))
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

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }))
      setNewRequirement('')
    }
  }

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResponsibility.trim()]
      }))
      setNewResponsibility('')
    }
  }

  const removeResponsibility = (index: number) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }))
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
        return t('addPosition')
      case 'edit':
        return t('editPosition')
      case 'view':
        return t('viewPosition')
      case 'delete':
        return t('deletePosition')
      default:
        return t('position')
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

  const getLevelColor = (level: number) => {
    if (level >= 5) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
    if (level >= 4) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    if (level >= 3) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    if (level >= 2) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`${getModeColor()} px-6 py-4 rounded-t-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BriefcaseIcon className="h-6 w-6 text-white" />
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
                {t('confirmDeletePosition')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('deletePositionWarning', { name: position?.name, code: position?.code })}
              </p>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <BriefcaseIcon className="h-5 w-5 mr-2 text-blue-600" />
                  {t('basicInformation')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('positionName')} <span className="text-red-500">*</span>
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
                        placeholder={t('enterPositionName')}
                        disabled={loading}
                      />
                    )}
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('positionCode')} <span className="text-red-500">*</span>
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
                        placeholder={t('enterPositionCode')}
                        disabled={loading}
                      />
                    )}
                    {errors.code && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.code}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('department')} <span className="text-red-500">*</span>
                    </label>
                    {mode === 'view' ? (
                      <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                        {departments.find(d => d.id === formData.department_id)?.name || '-'}
                      </p>
                    ) : (
                      <select
                        value={formData.department_id}
                        onChange={(e) => handleInputChange('department_id', parseInt(e.target.value))}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.department_id ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                      >
                        <option value={0}>{t('selectDepartment')}</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name} ({dept.code})
                          </option>
                        ))}
                      </select>
                    )}
                    {errors.department_id && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.department_id}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('level')} <span className="text-red-500">*</span>
                    </label>
                    {mode === 'view' ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                          {formData.level}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(formData.level)}`}>
                          Level {formData.level}
                        </span>
                      </div>
                    ) : (
                      <select
                        value={formData.level}
                        onChange={(e) => handleInputChange('level', parseInt(e.target.value))}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.level ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                          <option key={level} value={level}>Level {level}</option>
                        ))}
                      </select>
                    )}
                    {errors.level && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.level}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Salary Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2 text-green-600" />
                  {t('salaryInformation')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('minSalary')} (฿)
                    </label>
                    {mode === 'view' ? (
                      <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                        {formData.base_salary_min ? `฿${formData.base_salary_min.toLocaleString()}` : '-'}
                      </p>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.base_salary_min}
                        onChange={(e) => handleInputChange('base_salary_min', parseInt(e.target.value) || 0)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.base_salary_min ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={t('enterMinSalary')}
                        disabled={loading}
                      />
                    )}
                    {errors.base_salary_min && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.base_salary_min}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('maxSalary')} (฿)
                    </label>
                    {mode === 'view' ? (
                      <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                        {formData.base_salary_max ? `฿${formData.base_salary_max.toLocaleString()}` : '-'}
                      </p>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.base_salary_max}
                        onChange={(e) => handleInputChange('base_salary_max', parseInt(e.target.value) || 0)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.base_salary_max ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={t('enterMaxSalary')}
                        disabled={loading}
                      />
                    )}
                    {errors.base_salary_max && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.base_salary_max}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2 text-orange-600" />
                  {t('requirements')}
                </h3>
                
                {mode === 'view' ? (
                  <div className="space-y-2">
                    {formData.requirements.length > 0 ? (
                      formData.requirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                          <span>•</span>
                          <span>{req}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">-</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newRequirement}
                        onChange={(e) => setNewRequirement(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder={t('enterRequirement')}
                        disabled={loading}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                      />
                      <Button
                        type="button"
                        onClick={addRequirement}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={loading || !newRequirement.trim()}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {formData.requirements.map((req, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                          <span className="text-gray-900 dark:text-white">• {req}</span>
                          <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="text-red-600 hover:text-red-700"
                            disabled={loading}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <BriefcaseIcon className="h-5 w-5 mr-2 text-purple-600" />
                  {t('responsibilities')}
                </h3>
                
                {mode === 'view' ? (
                  <div className="space-y-2">
                    {formData.responsibilities.length > 0 ? (
                      formData.responsibilities.map((resp, index) => (
                        <div key={index} className="flex items-center space-x-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                          <span>•</span>
                          <span>{resp}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">-</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newResponsibility}
                        onChange={(e) => setNewResponsibility(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder={t('enterResponsibility')}
                        disabled={loading}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
                      />
                      <Button
                        type="button"
                        onClick={addResponsibility}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={loading || !newResponsibility.trim()}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {formData.responsibilities.map((resp, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                          <span className="text-gray-900 dark:text-white">• {resp}</span>
                          <button
                            type="button"
                            onClick={() => removeResponsibility(index)}
                            className="text-red-600 hover:text-red-700"
                            disabled={loading}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
                  {t('status')}
                </h3>
                
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
