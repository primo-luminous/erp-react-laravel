/**
 * Employee List Page
 * 
 * หน้ารายชื่อพนักงานทั้งหมด พร้อมฟิลเตอร์ตามแผนกและตำแหน่ง
 */

import { type FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/Card'
import { HRNavigation } from '../../../components/erp/hr/HRNavigation'
import { Button } from '../../../components/ui/Button'
import { Pagination } from '../../../components/ui/Pagination'
import { ActionButton } from '../../../components/ui/ActionButton'
import { useToast } from '../../../hooks/useToast'
import { ToastContainer } from '../../../components/ui/ToastContainer'
import { EmployeeModal } from '../../../components/modals/EmployeeModal'
import {
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
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
  id: number
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
  avatar?: string
  address?: string
  emergency_contact?: string
  emergency_phone?: string
  salary?: number
  created_at: string
  updated_at: string
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

export const EmployeeListPage: FC = () => {
  const { t } = useTranslation()
  const { toasts, success, error, removeToast } = useToast()
  
  const [employees, setEmployees] = useState<Employee[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view' | 'delete'>('create')
  const [modalLoading, setModalLoading] = useState(false)

  // Mock data
  useEffect(() => {
    const mockEmployees: Employee[] = [
      {
        id: 1,
        employee_id: 'EMP001',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@company.com',
        phone: '+66 81 234 5678',
        position: 'Software Engineer',
        department: 'IT',
        manager: 'Jane Smith',
        hire_date: '2023-01-15',
        status: 'active',
        address: '123 Main St, Bangkok',
        emergency_contact: 'Mary Doe',
        emergency_phone: '+66 81 234 5679',
        salary: 50000,
        created_at: '2023-01-15T00:00:00Z',
        updated_at: '2023-01-15T00:00:00Z'
      },
      {
        id: 2,
        employee_id: 'EMP002',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@company.com',
        phone: '+66 81 234 5680',
        position: 'Team Lead',
        department: 'IT',
        manager: 'Bob Johnson',
        hire_date: '2022-06-01',
        status: 'active',
        address: '456 Oak Ave, Bangkok',
        emergency_contact: 'John Smith',
        emergency_phone: '+66 81 234 5681',
        salary: 75000,
        created_at: '2022-06-01T00:00:00Z',
        updated_at: '2022-06-01T00:00:00Z'
      },
      {
        id: 3,
        employee_id: 'EMP003',
        first_name: 'Bob',
        last_name: 'Johnson',
        email: 'bob.johnson@company.com',
        phone: '+66 81 234 5682',
        position: 'IT Manager',
        department: 'IT',
        manager: 'CEO',
        hire_date: '2021-03-10',
        status: 'active',
        address: '789 Pine St, Bangkok',
        emergency_contact: 'Sarah Johnson',
        emergency_phone: '+66 81 234 5683',
        salary: 100000,
        created_at: '2021-03-10T00:00:00Z',
        updated_at: '2021-03-10T00:00:00Z'
      },
      {
        id: 4,
        employee_id: 'EMP004',
        first_name: 'Alice',
        last_name: 'Brown',
        email: 'alice.brown@company.com',
        phone: '+66 81 234 5684',
        position: 'HR Specialist',
        department: 'HR',
        manager: 'Carol Wilson',
        hire_date: '2023-02-20',
        status: 'active',
        address: '321 Elm St, Bangkok',
        emergency_contact: 'Tom Brown',
        emergency_phone: '+66 81 234 5685',
        salary: 45000,
        created_at: '2023-02-20T00:00:00Z',
        updated_at: '2023-02-20T00:00:00Z'
      },
      {
        id: 5,
        employee_id: 'EMP005',
        first_name: 'Charlie',
        last_name: 'Wilson',
        email: 'charlie.wilson@company.com',
        phone: '+66 81 234 5686',
        position: 'Accountant',
        department: 'Finance',
        manager: 'David Lee',
        hire_date: '2022-11-05',
        status: 'inactive',
        address: '654 Maple St, Bangkok',
        emergency_contact: 'Lisa Wilson',
        emergency_phone: '+66 81 234 5687',
        salary: 40000,
        created_at: '2022-11-05T00:00:00Z',
        updated_at: '2022-11-05T00:00:00Z'
      }
    ]

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

    setEmployees(mockEmployees)
    setDepartments(mockDepartments)
    setPositions(mockPositions)
    setFilteredEmployees(mockEmployees)
    setLoading(false)
  }, [])

  // Filter employees
  useEffect(() => {
    let filtered = employees

    if (searchTerm) {
      filtered = filtered.filter(employee =>
        employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedDepartment) {
      filtered = filtered.filter(employee => employee.department === selectedDepartment)
    }

    if (selectedPosition) {
      filtered = filtered.filter(employee => employee.position === selectedPosition)
    }

    if (selectedStatus) {
      filtered = filtered.filter(employee => employee.status === selectedStatus)
    }

    setFilteredEmployees(filtered)
    setCurrentPage(1)
  }, [employees, searchTerm, selectedDepartment, selectedPosition, selectedStatus])

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setModalMode('view')
    setShowEmployeeModal(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setModalMode('edit')
    setShowEmployeeModal(true)
  }

  const handleDeleteEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setModalMode('delete')
    setShowEmployeeModal(true)
  }

  const handleCreateEmployee = () => {
    setSelectedEmployee(null)
    setModalMode('create')
    setShowEmployeeModal(true)
  }

  const handleCloseModal = () => {
    setShowEmployeeModal(false)
    setShowDeleteModal(false)
    setSelectedEmployee(null)
    setModalLoading(false)
  }

  const handleSaveEmployee = async (employeeData: Employee) => {
    setModalLoading(true)
    
    try {
      if (modalMode === 'create') {
        const newEmployee = {
          ...employeeData,
          id: employees.length + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setEmployees([...employees, newEmployee])
        success(t('employeeCreated'))
      } else if (modalMode === 'edit' && selectedEmployee) {
        const updatedEmployees = employees.map(emp => 
          emp.id === selectedEmployee.id 
            ? { ...employeeData, id: selectedEmployee.id, updated_at: new Date().toISOString() }
            : emp
        )
        setEmployees(updatedEmployees)
        success(t('employeeUpdated'))
      }
      
      handleCloseModal()
    } catch (error) {
      error(t('errorSavingEmployee'))
    } finally {
      setModalLoading(false)
    }
  }

  const handleDeleteEmployeeConfirm = async (employeeData: Employee) => {
    setModalLoading(true)
    
    try {
      setEmployees(employees.filter(emp => emp.id !== employeeData.id))
      success(t('employeeDeleted'))
      handleCloseModal()
    } catch (error) {
      error(t('errorDeletingEmployee'))
    } finally {
      setModalLoading(false)
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

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('employeeManagement')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t('employeeManagementDescription')}
              </p>
            </div>
            <Button 
              onClick={handleCreateEmployee}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              {t('addEmployee')}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('search')}
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('searchEmployees')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('department')}
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">{t('allDepartments')}</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              {/* Position Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('position')}
                </label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">{t('allPositions')}</option>
                  {positions.map(pos => (
                    <option key={pos.id} value={pos.name}>{pos.name}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('status')}
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">{t('allStatuses')}</option>
                  <option value="active">{t('active')}</option>
                  <option value="inactive">{t('inactive')}</option>
                  <option value="terminated">{t('terminated')}</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee List */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
              {t('employeeList')}
            </CardTitle>
            <CardDescription>
              {t('showingResults', { count: filteredEmployees.length, total: employees.length })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      {t('employee')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      {t('position')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      {t('department')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      {t('manager')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      {t('hireDate')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                      {t('status')}
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">
                      {t('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-400 font-medium">
                              {employee.first_name[0]}{employee.last_name[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {employee.first_name} {employee.last_name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {employee.employee_id}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {employee.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <BriefcaseIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-900 dark:text-white">{employee.position}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <BuildingOffice2Icon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-900 dark:text-white">{employee.department}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900 dark:text-white">{employee.manager}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-900 dark:text-white">
                            {new Date(employee.hire_date).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                          {getStatusIcon(employee.status)}
                          <span className="ml-1">{t(employee.status)}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <ActionButton
                            variant="view"
                            onClick={() => handleViewEmployee(employee)}
                            title={t('viewEmployee')}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </ActionButton>
                          <ActionButton
                            variant="edit"
                            onClick={() => handleEditEmployee(employee)}
                            title={t('editEmployee')}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </ActionButton>
                          <ActionButton
                            variant="delete"
                            onClick={() => handleDeleteEmployee(employee)}
                            title={t('deleteEmployee')}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </ActionButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                totalItems={filteredEmployees.length}
              />
            </div>
          </CardContent>
        </Card>

        {/* Employee Modal */}
        <EmployeeModal
          isOpen={showEmployeeModal}
          onClose={handleCloseModal}
          mode={modalMode}
          employee={selectedEmployee}
          onSave={handleSaveEmployee}
          onDelete={handleDeleteEmployeeConfirm}
          departments={departments}
          positions={positions}
          loading={modalLoading}
        />

        {/* Toast Container */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
          </div>
          
          {/* HR Navigation Sidebar */}
          <div className="lg:col-span-1">
            <HRNavigation />
          </div>
        </div>
      </div>
    </div>
  )
}
