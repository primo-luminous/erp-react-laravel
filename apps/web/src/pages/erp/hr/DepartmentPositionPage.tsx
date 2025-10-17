/**
 * Department & Position Page
 * 
 * หน้าแผนกและตำแหน่ง - จัดการแผนกและตำแหน่งงาน
 */

import { type FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { HRNavigation } from '../../../components/erp/hr/HRNavigation'
import { useToast } from '../../../hooks/useToast'
import { ToastContainer } from '../../../components/ui/ToastContainer'
import { DepartmentModal } from '../../../components/modals/DepartmentModal'
import { PositionModal } from '../../../components/modals/PositionModal'
import { ActionButton } from '../../../components/ui/ActionButton'
import {
  BuildingOffice2Icon,
  BriefcaseIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowRightIcon,
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

export const DepartmentPositionPage: FC = () => {
  const { t } = useTranslation()
  const { toasts, success, error, removeToast } = useToast()
  
  const [activeTab, setActiveTab] = useState<'departments' | 'positions'>('departments')
  const [departments, setDepartments] = useState<Department[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  
  // Modal states
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)
  const [showPositionModal, setShowPositionModal] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view' | 'delete'>('create')
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [modalLoading, setModalLoading] = useState(false)

  // Mock data
  useEffect(() => {
    const mockDepartments: Department[] = [
      {
        id: 1,
        name: 'Information Technology',
        code: 'IT',
        description: 'Responsible for all technology infrastructure and software development',
        manager: 'Bob Johnson',
        employee_count: 15,
        budget: 5000000,
        status: 'active',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Human Resources',
        code: 'HR',
        description: 'Manages employee relations, recruitment, and organizational development',
        manager: 'Carol Wilson',
        employee_count: 8,
        budget: 2000000,
        status: 'active',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 3,
        name: 'Finance',
        code: 'FIN',
        description: 'Handles financial planning, accounting, and budget management',
        manager: 'David Lee',
        employee_count: 12,
        budget: 3000000,
        status: 'active',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 4,
        name: 'Marketing',
        code: 'MKT',
        description: 'Brand management, advertising, and market research',
        manager: 'Eva Brown',
        employee_count: 10,
        budget: 4000000,
        status: 'active',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 5,
        name: 'Sales',
        code: 'SALES',
        description: 'Customer acquisition, sales strategy, and revenue generation',
        manager: 'Frank Miller',
        employee_count: 20,
        budget: 6000000,
        status: 'active',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      }
    ]

    const mockPositions: Position[] = [
      {
        id: 1,
        name: 'Software Engineer',
        code: 'SE',
        department_id: 1,
        department_name: 'Information Technology',
        level: 3,
        base_salary_min: 40000,
        base_salary_max: 60000,
        requirements: ['Bachelor in Computer Science', '3+ years experience', 'Proficiency in React, Node.js'],
        responsibilities: ['Develop web applications', 'Code review', 'Technical documentation'],
        status: 'active',
        employee_count: 8,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Team Lead',
        code: 'TL',
        department_id: 1,
        department_name: 'Information Technology',
        level: 4,
        base_salary_min: 60000,
        base_salary_max: 80000,
        requirements: ['Bachelor in Computer Science', '5+ years experience', 'Leadership skills'],
        responsibilities: ['Lead development team', 'Project management', 'Mentor junior developers'],
        status: 'active',
        employee_count: 3,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 3,
        name: 'IT Manager',
        code: 'ITM',
        department_id: 1,
        department_name: 'Information Technology',
        level: 5,
        base_salary_min: 80000,
        base_salary_max: 120000,
        requirements: ['Master in Computer Science', '8+ years experience', 'Management experience'],
        responsibilities: ['IT strategy planning', 'Team management', 'Budget management'],
        status: 'active',
        employee_count: 1,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 4,
        name: 'HR Specialist',
        code: 'HRS',
        department_id: 2,
        department_name: 'Human Resources',
        level: 3,
        base_salary_min: 35000,
        base_salary_max: 50000,
        requirements: ['Bachelor in HR or related field', '2+ years experience', 'Communication skills'],
        responsibilities: ['Recruitment', 'Employee relations', 'HR policies'],
        status: 'active',
        employee_count: 5,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 5,
        name: 'Accountant',
        code: 'ACC',
        department_id: 3,
        department_name: 'Finance',
        level: 3,
        base_salary_min: 30000,
        base_salary_max: 45000,
        requirements: ['Bachelor in Accounting', 'CPA preferred', '2+ years experience'],
        responsibilities: ['Financial reporting', 'Tax preparation', 'Budget analysis'],
        status: 'active',
        employee_count: 6,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      }
    ]

    setDepartments(mockDepartments)
    setPositions(mockPositions)
    setLoading(false)
  }, [])

  // Department handlers
  const handleCreateDepartment = () => {
    setSelectedDepartment(null)
    setModalMode('create')
    setShowDepartmentModal(true)
  }

  const handleViewDepartment = (department: Department) => {
    setSelectedDepartment(department)
    setModalMode('view')
    setShowDepartmentModal(true)
  }

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department)
    setModalMode('edit')
    setShowDepartmentModal(true)
  }

  const handleDeleteDepartment = (department: Department) => {
    setSelectedDepartment(department)
    setModalMode('delete')
    setShowDepartmentModal(true)
  }

  const handleCloseDepartmentModal = () => {
    setShowDepartmentModal(false)
    setSelectedDepartment(null)
    setModalLoading(false)
  }

  const handleSaveDepartment = async (departmentData: Omit<Department, 'id' | 'created_at' | 'updated_at'>) => {
    setModalLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (modalMode === 'create') {
        const newDepartment: Department = {
          ...departmentData,
          id: Date.now(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setDepartments(prev => [...prev, newDepartment])
        success(t('departmentCreatedSuccessfully'))
      } else if (modalMode === 'edit' && selectedDepartment) {
        setDepartments(prev => prev.map(dept => 
          dept.id === selectedDepartment.id 
            ? { ...dept, ...departmentData, updated_at: new Date().toISOString() }
            : dept
        ))
        success(t('departmentUpdatedSuccessfully'))
      }
    } catch (err) {
      error(t('failedToSaveDepartment'))
    } finally {
      setModalLoading(false)
    }
  }

  const handleDeleteDepartmentConfirm = async (id: number) => {
    setModalLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setDepartments(prev => prev.filter(dept => dept.id !== id))
      success(t('departmentDeletedSuccessfully'))
      handleCloseDepartmentModal()
    } catch (err) {
      error(t('failedToDeleteDepartment'))
    } finally {
      setModalLoading(false)
    }
  }

  // Position handlers
  const handleCreatePosition = () => {
    setSelectedPosition(null)
    setModalMode('create')
    setShowPositionModal(true)
  }

  const handleViewPosition = (position: Position) => {
    setSelectedPosition(position)
    setModalMode('view')
    setShowPositionModal(true)
  }

  const handleEditPosition = (position: Position) => {
    setSelectedPosition(position)
    setModalMode('edit')
    setShowPositionModal(true)
  }

  const handleDeletePosition = (position: Position) => {
    setSelectedPosition(position)
    setModalMode('delete')
    setShowPositionModal(true)
  }

  const handleClosePositionModal = () => {
    setShowPositionModal(false)
    setSelectedPosition(null)
    setModalLoading(false)
  }

  const handleSavePosition = async (positionData: Omit<Position, 'id' | 'created_at' | 'updated_at' | 'department_name' | 'employee_count'>) => {
    setModalLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (modalMode === 'create') {
        const department = departments.find(d => d.id === positionData.department_id)
        const newPosition: Position = {
          ...positionData,
          department_name: department?.name || '',
          employee_count: 0,
          id: Date.now(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setPositions(prev => [...prev, newPosition])
        success(t('positionCreatedSuccessfully'))
      } else if (modalMode === 'edit' && selectedPosition) {
        const department = departments.find(d => d.id === positionData.department_id)
        setPositions(prev => prev.map(pos => 
          pos.id === selectedPosition.id 
            ? { 
                ...pos, 
                ...positionData, 
                department_name: department?.name || pos.department_name,
                updated_at: new Date().toISOString() 
              }
            : pos
        ))
        success(t('positionUpdatedSuccessfully'))
      }
    } catch (err) {
      error(t('failedToSavePosition'))
    } finally {
      setModalLoading(false)
    }
  }

  const handleDeletePositionConfirm = async (id: number) => {
    setModalLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setPositions(prev => prev.filter(pos => pos.id !== id))
      success(t('positionDeletedSuccessfully'))
      handleClosePositionModal()
    } catch (err) {
      error(t('failedToDeletePosition'))
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t('departmentPosition')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('departmentPositionDescription')}
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('departments')}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'departments'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <BuildingOffice2Icon className="h-5 w-5" />
                  <span>{t('departments')} ({departments.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('positions')}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'positions'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <BriefcaseIcon className="h-5 w-5" />
                  <span>{t('positions')} ({positions.length})</span>
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'departments' && (
              <div className="space-y-6">
                {/* Department Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <BuildingOffice2Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {t('totalDepartments')}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {departments.length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                          <UsersIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {t('totalEmployees')}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {departments.reduce((sum, dept) => sum + dept.employee_count, 0)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                          <ChartBarIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {t('totalBudget')}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ฿{departments.reduce((sum, dept) => sum + (dept.budget || 0), 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Department List */}
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BuildingOffice2Icon className="h-6 w-6 text-blue-600" />
                          {t('departmentList')}
                        </CardTitle>
                        <CardDescription>
                          {t('manageDepartments')}
                        </CardDescription>
                      </div>
                      <Button 
                        onClick={handleCreateDepartment}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        {t('addDepartment')}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departments.map((department) => (
                        <div key={department.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {department.name}
                                </h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  ({department.code})
                                </span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(department.status)}`}>
                                  {getStatusIcon(department.status)}
                                  <span className="ml-1">{t(department.status)}</span>
                                </span>
                              </div>
                              
                              <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {department.description}
                              </p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">{t('manager')}:</span>
                                  <span className="ml-2 text-gray-900 dark:text-white">{department.manager}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">{t('employees')}:</span>
                                  <span className="ml-2 text-gray-900 dark:text-white">{department.employee_count}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">{t('budget')}:</span>
                                  <span className="ml-2 text-gray-900 dark:text-white">
                                    {department.budget ? `฿${department.budget.toLocaleString()}` : '-'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-4">
                              <ActionButton
                                variant="view"
                                onClick={() => handleViewDepartment(department)}
                              >
                                <EyeIcon className="h-4 w-4" />
                              </ActionButton>
                              <ActionButton
                                variant="edit"
                                onClick={() => handleEditDepartment(department)}
                              >
                                <PencilIcon className="h-4 w-4" />
                              </ActionButton>
                              <ActionButton
                                variant="delete"
                                onClick={() => handleDeleteDepartment(department)}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </ActionButton>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'positions' && (
              <div className="space-y-6">
                {/* Position Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <BriefcaseIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {t('totalPositions')}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {positions.length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                          <UsersIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {t('totalEmployees')}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {positions.reduce((sum, pos) => sum + pos.employee_count, 0)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                          <ChartBarIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {t('avgSalary')}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ฿{Math.round(positions.reduce((sum, pos) => sum + ((pos.base_salary_min || 0) + (pos.base_salary_max || 0)) / 2, 0) / positions.length).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                          <ArrowRightIcon className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {t('avgLevel')}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {Math.round(positions.reduce((sum, pos) => sum + pos.level, 0) / positions.length)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Position List */}
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BriefcaseIcon className="h-6 w-6 text-purple-600" />
                          {t('positionList')}
                        </CardTitle>
                        <CardDescription>
                          {t('managePositions')}
                        </CardDescription>
                      </div>
                      <Button 
                        onClick={handleCreatePosition}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        {t('addPosition')}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {positions.map((position) => (
                        <div key={position.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {position.name}
                                </h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  ({position.code})
                                </span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(position.level)}`}>
                                  Level {position.level}
                                </span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(position.status)}`}>
                                  {getStatusIcon(position.status)}
                                  <span className="ml-1">{t(position.status)}</span>
                                </span>
                              </div>
                              
                              <div className="mb-4">
                                <span className="text-gray-500 dark:text-gray-400">{t('department')}:</span>
                                <span className="ml-2 text-gray-900 dark:text-white">{position.department_name}</span>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">{t('employees')}:</span>
                                  <span className="ml-2 text-gray-900 dark:text-white">{position.employee_count}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">{t('salaryRange')}:</span>
                                  <span className="ml-2 text-gray-900 dark:text-white">
                                    {position.base_salary_min && position.base_salary_max 
                                      ? `฿${position.base_salary_min.toLocaleString()} - ฿${position.base_salary_max.toLocaleString()}`
                                      : '-'
                                    }
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">{t('level')}:</span>
                                  <span className="ml-2 text-gray-900 dark:text-white">{position.level}</span>
                                </div>
                              </div>

                              {position.requirements && position.requirements.length > 0 && (
                                <div className="mb-2">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('requirements')}:</span>
                                  <ul className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    {position.requirements.slice(0, 2).map((req, index) => (
                                      <li key={index}>• {req}</li>
                                    ))}
                                    {position.requirements.length > 2 && (
                                      <li>• +{position.requirements.length - 2} more...</li>
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-4">
                              <ActionButton
                                variant="view"
                                onClick={() => handleViewDepartment(department)}
                              >
                                <EyeIcon className="h-4 w-4" />
                              </ActionButton>
                              <ActionButton
                                variant="edit"
                                onClick={() => handleEditDepartment(department)}
                              >
                                <PencilIcon className="h-4 w-4" />
                              </ActionButton>
                              <ActionButton
                                variant="delete"
                                onClick={() => handleDeleteDepartment(department)}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </ActionButton>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          
          {/* HR Navigation Sidebar */}
          <div className="lg:col-span-1">
            <HRNavigation />
          </div>
        </div>

        {/* Toast Container */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />

        {/* Department Modal */}
        <DepartmentModal
          isOpen={showDepartmentModal}
          onClose={handleCloseDepartmentModal}
          mode={modalMode}
          department={selectedDepartment}
          onSave={handleSaveDepartment}
          onDelete={handleDeleteDepartmentConfirm}
          loading={modalLoading}
        />

        {/* Position Modal */}
        <PositionModal
          isOpen={showPositionModal}
          onClose={handleClosePositionModal}
          mode={modalMode}
          position={selectedPosition}
          departments={departments}
          onSave={handleSavePosition}
          onDelete={handleDeletePositionConfirm}
          loading={modalLoading}
        />
      </div>
    </div>
  )
}
