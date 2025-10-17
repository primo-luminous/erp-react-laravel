/**
 * Role Modal Component
 * 
 * Modal สำหรับ CRUD operations ของ Role
 */

import { type FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { roleService, type Role, type CreateRoleRequest } from '../../services/RoleService'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import {
  XMarkIcon,
  ShieldCheckIcon,
  TagIcon,
  DocumentTextIcon,
  KeyIcon,
  CheckIcon,
  EyeIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'

interface RoleModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit' | 'view'
  role?: Role | null
  onSuccess?: () => void
}

export const RoleModal: FC<RoleModalProps> = ({
  isOpen,
  onClose,
  mode,
  role,
  onSuccess
}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [permissions, setPermissions] = useState<string[]>([])
  const [availablePermissions, setAvailablePermissions] = useState<string[]>([])

  // Form data
  const [formData, setFormData] = useState<CreateRoleRequest>({
    name: '',
    display_name: '',
    description: '',
    permissions: [],
    is_active: true
  })

  // Load available permissions
  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const perms = await roleService.getPermissions()
        setAvailablePermissions(perms)
      } catch (error) {
        console.error('Error loading permissions:', error)
      }
    }
    loadPermissions()
  }, [])

  // Initialize form data
  useEffect(() => {
    if (role && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: role.name,
        display_name: role.display_name,
        description: role.description || '',
        permissions: role.permissions || [],
        is_active: role.is_active
      })
      setPermissions(role.permissions || [])
    } else {
      setFormData({
        name: '',
        display_name: '',
        description: '',
        permissions: [],
        is_active: true
      })
      setPermissions([])
    }
  }, [role, mode])

  const handleInputChange = (field: keyof CreateRoleRequest, value: string | boolean) => {
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

  const handlePermissionToggle = (permission: string) => {
    if (mode === 'view') return

    setPermissions(prev => {
      const newPermissions = prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
      
      setFormData(prevForm => ({
        ...prevForm,
        permissions: newPermissions
      }))
      
      return newPermissions
    })
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t('isRequired')
    } else if (!/^[a-z_]+$/.test(formData.name)) {
      newErrors.name = t('invalidRoleName')
    }

    if (!formData.display_name.trim()) {
      newErrors.display_name = t('isRequired')
    }

    if (mode === 'create' && !formData.name.trim()) {
      newErrors.name = t('isRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (mode === 'view') return

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})

    try {
      if (mode === 'create') {
        await roleService.createRole(formData)
      } else if (mode === 'edit' && role) {
        await roleService.updateRole({
          id: role.id,
          ...formData
        })
      }

      onSuccess?.()
      onClose()
    } catch (error: any) {
      console.error('Error saving role:', error)
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
      case 'create': return t('create') + ' ' + t('role')
      case 'edit': return t('edit') + ' ' + t('role')
      case 'view': return t('roleDetails')
      default: return ''
    }
  }

  const getDescription = () => {
    switch (mode) {
      case 'create': return t('createNewRole')
      case 'edit': return t('updateRoleInformation')
      case 'view': return t('viewRoleInformation')
      default: return ''
    }
  }

  const getModeIcon = () => {
    switch (mode) {
      case 'create': return <ShieldCheckIcon className="h-6 w-6" />
      case 'edit': return <PencilIcon className="h-6 w-6" />
      case 'view': return <EyeIcon className="h-6 w-6" />
      default: return <ShieldCheckIcon className="h-6 w-6" />
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

  const FieldDisplay = ({ label, value, icon: Icon, required = false }: { 
    label: string, 
    value: string | number | boolean, 
    icon?: any,
    required?: boolean 
  }) => {
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
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Input
          value={value as string}
          onChange={(e) => handleInputChange(label.toLowerCase().replace(/\s+/g, '_') as keyof CreateRoleRequest, e.target.value)}
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

          {/* Content */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XMarkIcon className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                        {t('error')}
                      </h3>
                      <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                        {errors.general}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TagIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      {t('basicInformation')}
                    </CardTitle>
                    <CardDescription>
                      {t('basicRoleInformation')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FieldDisplay
                      label={t('roleName')}
                      value={formData.name}
                      icon={ShieldCheckIcon}
                      required
                    />
                    <FieldDisplay
                      label={t('displayName')}
                      value={formData.display_name}
                      icon={TagIcon}
                      required
                    />
                    <FieldDisplay
                      label={t('description')}
                      value={formData.description}
                      icon={DocumentTextIcon}
                    />
                  </CardContent>
                </Card>

                {/* Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      {t('status')}
                    </CardTitle>
                    <CardDescription>
                      {t('roleStatusInformation')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mode === 'view' ? (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <CheckIcon className="h-4 w-4" />
                          {t('status')}
                        </label>
                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {formData.is_active ? t('active') : t('inactive')}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="is_active"
                          checked={formData.is_active}
                          onChange={(e) => handleInputChange('is_active', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                        />
                        <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('active')}
                        </label>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Permissions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <KeyIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    {t('permissions')}
                  </CardTitle>
                  <CardDescription>
                    {t('selectRolePermissions')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mode === 'view' ? (
                    <div className="space-y-2">
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {permissions.length} {t('permissions')} {t('selected')}
                        </p>
                        {permissions.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {permissions.map((permission) => (
                              <span
                                key={permission}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                              >
                                {permission}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                      {availablePermissions.map((permission) => (
                        <label
                          key={permission}
                          className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={permissions.includes(permission)}
                            onChange={() => handlePermissionToggle(permission)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {permission}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
              {mode === 'view' ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="px-6 py-2"
                >
                  {t('close')}
                </Button>
              ) : mode === 'edit' ? (
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
                        <ShieldCheckIcon className="h-4 w-4" />
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
