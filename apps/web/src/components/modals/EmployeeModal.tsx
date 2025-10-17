/**
 * Employee Modal Component
 * 
 * Modal สำหรับจัดการพนักงาน (เพิ่ม, แก้ไข, ดู, ลบ)
 */

import { type FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import {
  XMarkIcon,
  UserGroupIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface Employee {
  id?: number
  employee_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  position: string
  department: string
  manager: string
  hire_date: string
  status: 'active' | 'inactive' | 'terminated'
  address?: string
  emergency_contact?: string
  emergency_phone?: string
  salary?: number
  created_at?: string
  updated_at?: string
}

interface Department {
  id: number
  name: string
  code: string
}

interface Position {
  id: number
  name: string
  department_id: number
}

interface EmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit' | 'view' | 'delete'
  employee?: Employee | null
  onSave?: (employee: Employee) => void
  onDelete?: (employee: Employee) => void
  departments?: Department[]
  positions?: Position[]
  loading?: boolean
}

export const EmployeeModal: FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  mode,
  employee,
  onSave,
  onDelete,
  departments = [],
  positions = [],
  loading = false
}) => {
  const { t } = useTranslation()
  
  const [formData, setFormData] = useState<Employee>({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    manager: '',
    hire_date: '',
    status: 'active',
    address: '',
    emergency_contact: '',
    emergency_phone: '',
    salary: 0
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form data when employee changes
  useEffect(() => {
    if (employee && (mode === 'edit' || mode === 'view' || mode === 'delete')) {
      setFormData(employee)
    } else if (mode === 'create') {
      setFormData({
        employee_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        manager: '',
        hire_date: '',
        status: 'active',
        address: '',
        emergency_contact: '',
        emergency_phone: '',
        salary: 0
      })
    }
  }, [employee, mode])

  const handleInputChange = (field: keyof Employee, value: string | number) => {
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

    if (!formData.employee_id.trim()) {
      newErrors.employee_id = t('employeeIdRequired')
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = t('firstNameRequired')
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = t('lastNameRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('emailInvalid')
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('phoneRequired')
    }

    if (!formData.position.trim()) {
      newErrors.position = t('positionRequired')
    }

    if (!formData.department.trim()) {
      newErrors.department = t('departmentRequired')
    }

    if (!formData.hire_date.trim()) {
      newErrors.hire_date = t('hireDateRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (mode === 'create' || mode === 'edit') {
      if (validateForm()) {
        onSave?.(formData)
      }
    }
  }

  const handleDelete = () => {
    if (mode === 'delete' && employee) {
      onDelete?.(employee)
    }
  }

  const getModeInfo = () => {
    switch (mode) {
      case 'create':
        return {
          title: t('addEmployee'),
          description: t('addEmployeeDescription'),
          icon: <PlusIcon className="h-6 w-6" />,
          color: 'blue'
        }
      case 'edit':
        return {
          title: t('editEmployee'),
          description: t('editEmployeeDescription'),
          icon: <PencilIcon className="h-6 w-6" />,
          color: 'amber'
        }
      case 'view':
        return {
          title: t('viewEmployee'),
          description: t('viewEmployeeDescription'),
          icon: <EyeIcon className="h-6 w-6" />,
          color: 'blue'
        }
      case 'delete':
        return {
          title: t('deleteEmployee'),
          description: t('deleteEmployeeDescription'),
          icon: <TrashIcon className="h-6 w-6" />,
          color: 'red'
        }
      default:
        return {
          title: t('employeeManagement'),
          description: t('manageEmployeeInformation'),
          icon: <UserGroupIcon className="h-6 w-6" />,
          color: 'gray'
        }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'terminated':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
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
      case 'terminated':
        return <XCircleIcon className="h-4 w-4" />
      default:
        return <ClockIcon className="h-4 w-4" />
    }
  }

  const modeInfo = getModeInfo()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-${modeInfo.color}-50 dark:bg-${modeInfo.color}-900/20`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-${modeInfo.color}-100 dark:bg-${modeInfo.color}-900/20 text-${modeInfo.color}-600 dark:text-${modeInfo.color}-400`}>
                {modeInfo.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {modeInfo.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {modeInfo.description}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {mode === 'delete' ? (
            /* Delete Confirmation */
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <TrashIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('confirmDelete')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('deleteEmployeeConfirm', { 
                  name: `${employee?.first_name} ${employee?.last_name}`,
                  id: employee?.employee_id
                })}
              </p>
              <div className="flex justify-center space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? t('deleting') : t('delete')}
                </Button>
              </div>
            </div>
          ) : (
            /* Form Content */
            <div className="space-y-6">
              {/* Basic Information */}
              <Card className="bg-gray-50 dark:bg-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <UserGroupIcon className="h-5 w-5 text-blue-600" />
                    {t('basicInformation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('employeeId')} *
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">{formData.employee_id}</p>
                      ) : (
                        <input
                          type="text"
                          value={formData.employee_id}
                          onChange={(e) => handleInputChange('employee_id', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            errors.employee_id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder={t('enterEmployeeId')}
                        />
                      )}
                      {errors.employee_id && (
                        <p className="text-red-500 text-sm mt-1">{errors.employee_id}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('status')} *
                      </label>
                      {mode === 'view' ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(formData.status)}`}>
                          {getStatusIcon(formData.status)}
                          <span className="ml-1">{t(formData.status)}</span>
                        </span>
                      ) : (
                        <select
                          value={formData.status}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="active">{t('active')}</option>
                          <option value="inactive">{t('inactive')}</option>
                          <option value="terminated">{t('terminated')}</option>
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('firstName')} *
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">{formData.first_name}</p>
                      ) : (
                        <input
                          type="text"
                          value={formData.first_name}
                          onChange={(e) => handleInputChange('first_name', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            errors.first_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder={t('enterFirstName')}
                        />
                      )}
                      {errors.first_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('lastName')} *
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">{formData.last_name}</p>
                      ) : (
                        <input
                          type="text"
                          value={formData.last_name}
                          onChange={(e) => handleInputChange('last_name', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            errors.last_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder={t('enterLastName')}
                        />
                      )}
                      {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('email')} *
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">{formData.email}</p>
                      ) : (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder={t('enterEmail')}
                        />
                      )}
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('phone')} *
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">{formData.phone}</p>
                      ) : (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder={t('enterPhone')}
                        />
                      )}
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Work Information */}
              <Card className="bg-gray-50 dark:bg-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BriefcaseIcon className="h-5 w-5 text-purple-600" />
                    {t('workInformation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('department')} *
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">{formData.department}</p>
                      ) : (
                        <select
                          value={formData.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <option value="">{t('selectDepartment')}</option>
                          {departments.map(dept => (
                            <option key={dept.id} value={dept.name}>{dept.name}</option>
                          ))}
                        </select>
                      )}
                      {errors.department && (
                        <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('position')} *
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">{formData.position}</p>
                      ) : (
                        <select
                          value={formData.position}
                          onChange={(e) => handleInputChange('position', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            errors.position ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <option value="">{t('selectPosition')}</option>
                          {positions.map(pos => (
                            <option key={pos.id} value={pos.name}>{pos.name}</option>
                          ))}
                        </select>
                      )}
                      {errors.position && (
                        <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('manager')}
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">{formData.manager}</p>
                      ) : (
                        <input
                          type="text"
                          value={formData.manager}
                          onChange={(e) => handleInputChange('manager', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder={t('enterManager')}
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('hireDate')} *
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">
                          {new Date(formData.hire_date).toLocaleDateString()}
                        </p>
                      ) : (
                        <input
                          type="date"
                          value={formData.hire_date}
                          onChange={(e) => handleInputChange('hire_date', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                            errors.hire_date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                      )}
                      {errors.hire_date && (
                        <p className="text-red-500 text-sm mt-1">{errors.hire_date}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('salary')}
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">
                          {formData.salary ? `฿${formData.salary.toLocaleString()}` : '-'}
                        </p>
                      ) : (
                        <input
                          type="number"
                          value={formData.salary || ''}
                          onChange={(e) => handleInputChange('salary', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder={t('enterSalary')}
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="bg-gray-50 dark:bg-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPinIcon className="h-5 w-5 text-green-600" />
                    {t('additionalInformation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('address')}
                    </label>
                    {mode === 'view' ? (
                      <p className="text-gray-900 dark:text-white py-2">{formData.address || '-'}</p>
                    ) : (
                      <textarea
                        value={formData.address || ''}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder={t('enterAddress')}
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('emergencyContact')}
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">{formData.emergency_contact || '-'}</p>
                      ) : (
                        <input
                          type="text"
                          value={formData.emergency_contact || ''}
                          onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder={t('enterEmergencyContact')}
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('emergencyPhone')}
                      </label>
                      {mode === 'view' ? (
                        <p className="text-gray-900 dark:text-white py-2">{formData.emergency_phone || '-'}</p>
                      ) : (
                        <input
                          type="tel"
                          value={formData.emergency_phone || ''}
                          onChange={(e) => handleInputChange('emergency_phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder={t('enterEmergencyPhone')}
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        {mode !== 'delete' && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                {mode === 'view' ? t('close') : t('cancel')}
              </Button>
              {(mode === 'create' || mode === 'edit') && (
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? t('saving') : (mode === 'create' ? t('create') : t('update'))}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
