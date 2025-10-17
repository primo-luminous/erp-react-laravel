/**
 * User Modal Component
 * 
 * Modal สำหรับ CRUD operations ของ User
 */

import { type FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { userService, type User, type CreateUserRequest } from '../../services/UserService'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import {
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  KeyIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  CheckIcon,
  EyeIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit' | 'view'
  user?: User | null
  onSuccess?: () => void
}

interface Company {
  id: number
  name: string
}

interface Department {
  id: number
  name: string
}

export const UserModal: FC<UserModalProps> = ({
  isOpen,
  onClose,
  mode,
  user = null,
  onSuccess,
}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [companies, setCompanies] = useState<Company[]>([])
  const [departments, setDepartments] = useState<Department[]>([])

  const [formData, setFormData] = useState<CreateUserRequest>({
    name: '',
    email: '',
    password: '',
    position: '',
    employee_id: '',
    company_id: 0,
    department_id: 0,
    is_active: true,
  })

  // Load companies and departments on mount
  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        try {
          const [companiesData, departmentsData] = await Promise.all([
            userService.getCompanies(),
            userService.getDepartments()
          ])
          
          setCompanies(companiesData)
          setDepartments(departmentsData)
          
          // Set default values for create mode
          if (mode === 'create' && companiesData.length > 0 && departmentsData.length > 0) {
            setFormData(prev => ({
              ...prev,
              company_id: companiesData[0].id,
              department_id: departmentsData[0].id
            }))
          }
        } catch (error) {
          console.error('Error loading data:', error)
        }
      }

      loadData()
    }
  }, [isOpen, mode])

  // Load user data for edit/view mode
  useEffect(() => {
    if (isOpen && user && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '', // Don't pre-fill password
        position: user.position || '',
        employee_id: user.employee_id || '',
        company_id: user.company_id || 0,
        department_id: user.department_id || 0,
        is_active: user.is_active ?? true,
      })
    }
  }, [isOpen, user, mode])

  const handleInputChange = (field: keyof CreateUserRequest, value: string | number | boolean) => {
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t('name') + ' ' + t('isRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('email') + ' ' + t('isRequired')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('invalidEmail')
    }

    if (mode === 'create' && !formData.password) {
      newErrors.password = t('password') + ' ' + t('isRequired')
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = t('passwordMinLength')
    }

    if (!formData.position.trim()) {
      newErrors.position = t('position') + ' ' + t('isRequired')
    }

    if (!formData.employee_id.trim()) {
      newErrors.employee_id = t('employeeId') + ' ' + t('isRequired')
    }

    if (!formData.company_id) {
      newErrors.company_id = t('company') + ' ' + t('isRequired')
    }

    if (!formData.department_id) {
      newErrors.department_id = t('department') + ' ' + t('isRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (mode === 'view') {
      onClose()
      return
    }

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})
    
    try {
      if (mode === 'create') {
        await userService.createUser(formData)
      } else if (mode === 'edit' && user) {
        await userService.updateUser({
          id: user.id,
          ...formData
        })
      }
      
      onSuccess?.()
      onClose()
    } catch (error: any) {
      console.error('Error saving user:', error)
      setErrors({ 
        general: error.message || t('saveFailed')
      })
    } finally {
      setLoading(false)
    }
  }


  if (!isOpen) return null

  const getTitle = () => {
    switch (mode) {
      case 'create': return t('create') + ' ' + t('users')
      case 'edit': return t('edit') + ' ' + t('users')
      case 'view': return t('userDetails')
      default: return ''
    }
  }

  const getDescription = () => {
    switch (mode) {
      case 'create': return t('createNewUserAccount')
      case 'edit': return t('updateUserInformation')
      case 'view': return t('viewUserInformation')
      default: return ''
    }
  }

  const getModeIcon = () => {
    switch (mode) {
      case 'create': return <UserIcon className="h-6 w-6" />
      case 'edit': return <PencilIcon className="h-6 w-6" />
      case 'view': return <EyeIcon className="h-6 w-6" />
      default: return <UserIcon className="h-6 w-6" />
    }
  }

  const getModeColor = () => {
    switch (mode) {
      case 'create': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20'
      case 'edit': return 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/20'
      case 'view': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800/20'
    }
  }

  const FieldDisplay = ({ label, value, icon: Icon }: { label: string, value: string | number | boolean, icon?: any }) => {
    if (mode === 'view') {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            {label}
          </label>
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
            <p className="text-sm text-gray-900 dark:text-white">
              {typeof value === 'boolean' ? (value ? t('active') : t('inactive')) : (value || t('notSpecified'))}
            </p>
          </div>
        </div>
      )
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {label} <span className="text-red-500">*</span>
        </label>
        <Input
          value={value as string}
          onChange={(e) => handleInputChange(label.toLowerCase().replace(/\s+/g, '_') as keyof CreateUserRequest, e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={`dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors[label.toLowerCase().replace(/\s+/g, '_')] ? 'border-red-500' : ''}`}
        />
        {errors[label.toLowerCase().replace(/\s+/g, '_')] && (
          <p className="text-red-500 text-xs mt-1">{errors[label.toLowerCase().replace(/\s+/g, '_')]}</p>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          {/* Header */}
          <div className={`flex items-center justify-between p-6 rounded-t-xl ${getModeColor()}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${getModeColor()}`}>
                {getModeIcon()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {getTitle()}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {getDescription()}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-white/20 dark:hover:bg-black/20 rounded-lg text-gray-600 dark:text-gray-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="mx-6 mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
              <div className="flex">
                <XMarkIcon className="h-5 w-5 text-red-400 dark:text-red-500" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{t('error')}</h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p>{errors.general}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('basicInformation')}
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FieldDisplay
                    label={t('name')}
                    value={formData.name}
                    icon={UserIcon}
                  />
                  <FieldDisplay
                    label={t('email')}
                    value={formData.email}
                    icon={EnvelopeIcon}
                  />
                </div>

                {mode === 'create' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <KeyIcon className="h-4 w-4" />
                      {t('password')} <span className="text-red-500">*</span>
                    </label>
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder={t('enterPassword')}
                        className={`dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.password ? 'border-red-500' : ''}`}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Work Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <BuildingOfficeIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('workInformation')}
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FieldDisplay
                    label={t('position')}
                    value={formData.position}
                    icon={ShieldCheckIcon}
                  />
                  <FieldDisplay
                    label={t('employeeId')}
                    value={formData.employee_id}
                    icon={UserIcon}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <BuildingOfficeIcon className="h-4 w-4" />
                      {t('company')} <span className="text-red-500">*</span>
                    </label>
                    {mode === 'view' ? (
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {companies.find(c => c.id === formData.company_id)?.name || t('notSpecified')}
                        </p>
                      </div>
                    ) : (
                      <>
                        <select
                          value={formData.company_id}
                          onChange={(e) => handleInputChange('company_id', parseInt(e.target.value))}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                            errors.company_id ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value={0}>{t('selectCompany')}</option>
                          {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                              {company.name}
                            </option>
                          ))}
                        </select>
                        {errors.company_id && (
                          <p className="text-red-500 text-xs mt-1">{errors.company_id}</p>
                        )}
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <BuildingOfficeIcon className="h-4 w-4" />
                      {t('department')} <span className="text-red-500">*</span>
                    </label>
                    {mode === 'view' ? (
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {departments.find(d => d.id === formData.department_id)?.name || t('notSpecified')}
                        </p>
                      </div>
                    ) : (
                      <>
                        <select
                          value={formData.department_id}
                          onChange={(e) => handleInputChange('department_id', parseInt(e.target.value))}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                            errors.department_id ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value={0}>{t('selectDepartment')}</option>
                          {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                              {department.name}
                            </option>
                          ))}
                        </select>
                        {errors.department_id && (
                          <p className="text-red-500 text-xs mt-1">{errors.department_id}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}
              {mode === 'view' ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <ShieldCheckIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t('status')}
                    </h4>
                  </div>
                  
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${formData.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formData.is_active ? t('active') : t('inactive')}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <ShieldCheckIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t('status')}
                    </h4>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => handleInputChange('is_active', e.target.checked)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_active" className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('active')}
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-4 p-8 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-b-xl">
              {mode === 'view' ? (
                // View mode: Only Close button
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="px-6 py-2"
                >
                  {t('close')}
                </Button>
              ) : mode === 'edit' ? (
                // Edit mode: Cancel, Delete, Update buttons
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={loading}
                    className="px-6 py-2"
                  >
                    {t('cancel')}
                  </Button>
                  
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {t('updating')}
                      </>
                    ) : (
                      <>
                        <PencilIcon className="h-4 w-4" />
                        {t('update')}
                      </>
                    )}
                  </Button>
                </>
              ) : (
                // Create mode: Cancel, Create buttons
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={loading}
                    className="px-6 py-2"
                  >
                    {t('cancel')}
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {t('creating')}
                      </>
                    ) : (
                      <>
                        <UserIcon className="h-4 w-4" />
                        {t('create')}
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
