/**
 * Employee Create Page
 * 
 * หน้าเพิ่มพนักงานใหม่
 */

import { type FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { HRNavigation } from '../../../components/erp/hr/HRNavigation'
import { useToast } from '../../../hooks/useToast'
import { ToastContainer } from '../../../components/ui/ToastContainer'
import {
  ArrowLeftIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  MapPinIcon,
  BanknotesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface Employee {
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
  birth_date?: string
  gender?: string
  marital_status?: string
  nationality?: string
  id_card?: string
  social_security?: string
  tax_id?: string
  bank_account?: string
  bank_name?: string
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

export const EmployeeCreatePage: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { toasts, success, error, removeToast } = useToast()
  
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
    salary: 0,
    birth_date: '',
    gender: '',
    marital_status: '',
    nationality: '',
    id_card: '',
    social_security: '',
    tax_id: '',
    bank_account: '',
    bank_name: ''
  })

  const [departments, setDepartments] = useState<Department[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  // Mock data
  useEffect(() => {
    const mockDepartments: Department[] = [
      { id: 1, name: 'IT', code: 'IT' },
      { id: 2, name: 'HR', code: 'HR' },
      { id: 3, name: 'Finance', code: 'FIN' },
      { id: 4, name: 'Marketing', code: 'MKT' },
      { id: 5, name: 'Sales', code: 'SALES' }
    ]

    const mockPositions: Position[] = [
      { id: 1, name: 'Software Engineer', department_id: 1 },
      { id: 2, name: 'Team Lead', department_id: 1 },
      { id: 3, name: 'IT Manager', department_id: 1 },
      { id: 4, name: 'HR Specialist', department_id: 2 },
      { id: 5, name: 'HR Manager', department_id: 2 },
      { id: 6, name: 'Accountant', department_id: 3 },
      { id: 7, name: 'Finance Manager', department_id: 3 }
    ]

    setDepartments(mockDepartments)
    setPositions(mockPositions)
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      success(t('employeeCreated'))
      navigate('/erp/hr/employees')
    } catch (error) {
      error(t('errorSavingEmployee'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/erp/hr/employees')}
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  {t('back')}
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t('addEmployee')}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('addEmployeeDescription')}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserGroupIcon className="h-6 w-6 text-blue-600" />
                    {t('basicInformation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('employeeId')} *
                      </label>
                      <input
                        type="text"
                        value={formData.employee_id}
                        onChange={(e) => handleInputChange('employee_id', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                          errors.employee_id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder={t('enterEmployeeId')}
                      />
                      {errors.employee_id && (
                        <p className="text-red-500 text-sm mt-1">{errors.employee_id}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('status')} *
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="active">{t('active')}</option>
                        <option value="inactive">{t('inactive')}</option>
                        <option value="terminated">{t('terminated')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('firstName')} *
                      </label>
                      <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                          errors.first_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder={t('enterFirstName')}
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('lastName')} *
                      </label>
                      <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                          errors.last_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder={t('enterLastName')}
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('email')} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                          errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder={t('enterEmail')}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('phone')} *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                          errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder={t('enterPhone')}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Work Information */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BriefcaseIcon className="h-6 w-6 text-purple-600" />
                    {t('workInformation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('department')} *
                      </label>
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
                      {errors.department && (
                        <p className="text-red-500 text-sm mt-1">{errors.department}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('position')} *
                      </label>
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
                      {errors.position && (
                        <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('manager')}
                      </label>
                      <input
                        type="text"
                        value={formData.manager}
                        onChange={(e) => handleInputChange('manager', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder={t('enterManager')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('hireDate')} *
                      </label>
                      <input
                        type="date"
                        value={formData.hire_date}
                        onChange={(e) => handleInputChange('hire_date', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                          errors.hire_date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      />
                      {errors.hire_date && (
                        <p className="text-red-500 text-sm mt-1">{errors.hire_date}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('salary')}
                      </label>
                      <input
                        type="number"
                        value={formData.salary || ''}
                        onChange={(e) => handleInputChange('salary', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder={t('enterSalary')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPinIcon className="h-6 w-6 text-green-600" />
                    {t('additionalInformation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('address')}
                    </label>
                    <textarea
                      value={formData.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder={t('enterAddress')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('emergencyContact')}
                      </label>
                      <input
                        type="text"
                        value={formData.emergency_contact || ''}
                        onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder={t('enterEmergencyContact')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('emergencyPhone')}
                      </label>
                      <input
                        type="tel"
                        value={formData.emergency_phone || ''}
                        onChange={(e) => handleInputChange('emergency_phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder={t('enterEmergencyPhone')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/erp/hr/employees')}
                  disabled={loading}
                >
                  {t('cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t('saving')}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      {t('createEmployee')}
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          {/* HR Navigation Sidebar */}
          <div className="lg:col-span-1">
            <HRNavigation />
          </div>
        </div>

        {/* Toast Container */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </div>
  )
}
