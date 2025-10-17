/**
 * Department List Page
 * 
 * หน้าจัดการแผนก (Departments) ตาม flow การทำงานที่กำหนด
 */

import { type FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCoreAuth } from '../../context/CoreAuthContext'
import { PermissionGate } from '../../components/core/PermissionGate'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { ActionButton } from '../../components/ui/ActionButton'
import { DepartmentModal } from '../../components/modals/DepartmentModal'
import { DeleteConfirmModal } from '../../components/modals/DeleteConfirmModal'
import { departmentService, type Department } from '../../services/DepartmentService'
import { ToastContainer } from '../../components/ui/ToastContainer'
import { Pagination } from '../../components/ui/Pagination'
import { useToast } from '../../hooks/useToast'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  BuildingOfficeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline'

export const DepartmentListPage: FC = () => {
  const { t } = useTranslation()
  const { user } = useCoreAuth()
  const { toasts, addToast, removeToast, success, error } = useToast()

  // State management
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Modal states
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  
  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null)

  // Load departments data
  const loadDepartments = async () => {
    try {
      setLoading(true)
      const data = await departmentService.getDepartments()
      setDepartments(data)
      setTotalPages(Math.ceil(data.length / itemsPerPage))
    } catch (error: any) {
      console.error('Error loading departments:', error)
      error(t('loadFailed'), error.message || t('loadFailed'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDepartments()
  }, [])

  // Filter departments based on search term
  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (department.description && department.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedDepartments = filteredDepartments.slice(startIndex, endIndex)

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page
    setTotalPages(Math.ceil(filteredDepartments.length / newItemsPerPage))
  }

  // Modal handlers
  const handleCreateDepartment = () => {
    setSelectedDepartment(null)
    setModalMode('create')
    setModalOpen(true)
  }

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department)
    setModalMode('edit')
    setModalOpen(true)
  }

  const handleViewDepartment = (department: Department) => {
    setSelectedDepartment(department)
    setModalMode('view')
    setModalOpen(true)
  }

  const handleDeleteDepartment = (department: Department) => {
    setDepartmentToDelete(department)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!departmentToDelete) return

    try {
      setLoading(true)
      await departmentService.deleteDepartment(departmentToDelete.id)
      loadDepartments() // Refresh the list
      success(t('departmentDeleted'), t('departmentDeletedSuccessfully'))
      setDeleteModalOpen(false)
      setDepartmentToDelete(null)
    } catch (error: any) {
      console.error('Error deleting department:', error)
      error(t('deleteFailed'), error.message || t('deleteFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false)
    setDepartmentToDelete(null)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedDepartment(null)
  }

  const handleModalSuccess = () => {
    // Refresh departments list
    loadDepartments()
    setModalOpen(false)
    setSelectedDepartment(null)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  // Get status color
  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <BuildingOfficeIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                {t('departmentManagement')}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {t('departmentManagementDescription')}
              </p>
            </div>
            <PermissionGate permissions={['core.departments.create']}>
              <Button
                onClick={handleCreateDepartment}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                {t('createDepartment')}
              </Button>
            </PermissionGate>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t('searchDepartments')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2"
              >
                <FunnelIcon className="h-4 w-4" />
                {t('filter')}
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-4 py-2"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                {t('export')}
              </Button>
            </div>
          </div>
        </div>

        {/* Departments Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">{t('loading')}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('departmentName')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('code')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('description')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('status')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('createdAt')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedDepartments.map((department) => (
                      <tr key={department.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                <BuildingOfficeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {department.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white font-mono">
                            {department.code}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                            {department.description || t('notSpecified')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(department.is_active)}`}>
                            {department.is_active ? t('active') : t('inactive')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(department.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <PermissionGate permissions={['core.departments.view']}>
                              <ActionButton
                                variant="view"
                                onClick={() => handleViewDepartment(department)}
                                title={t('view')}
                              >
                                <EyeIcon className="h-4 w-4" />
                                {t('view')}
                              </ActionButton>
                            </PermissionGate>
                            <PermissionGate permissions={['core.departments.edit']}>
                              <ActionButton
                                variant="edit"
                                onClick={() => handleEditDepartment(department)}
                                title={t('edit')}
                              >
                                <PencilIcon className="h-4 w-4" />
                                {t('edit')}
                              </ActionButton>
                            </PermissionGate>
                            <PermissionGate permissions={['core.departments.delete']}>
                              <ActionButton
                                variant="delete"
                                onClick={() => handleDeleteDepartment(department)}
                                title={t('delete')}
                              >
                                <TrashIcon className="h-4 w-4" />
                                {t('delete')}
                              </ActionButton>
                            </PermissionGate>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredDepartments.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                itemsPerPageOptions={[5, 10, 20, 50, 100]}
                showItemsPerPage={true}
                showInfo={true}
              />
            </>
          )}
        </div>

        {/* Department Modal */}
        <DepartmentModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          mode={modalMode}
          department={selectedDepartment}
          onSuccess={handleModalSuccess}
        />

        {/* Toast Notifications */}
        <ToastContainer
          toasts={toasts}
          onClose={removeToast}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={deleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title={t('confirmDeleteDepartment')}
          message={t('confirmDeleteDepartmentMessage')}
          itemName={departmentToDelete?.name || ''}
          itemDetails={departmentToDelete?.code || t('notSpecified')}
          loading={loading}
        />
      </div>
    </div>
  )
}
