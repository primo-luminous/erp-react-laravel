/**
 * User List Page
 * 
 * หน้าจัดการรายการผู้ใช้ทั้งหมด
 */

import { type FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCoreAuth } from '../../context/CoreAuthContext'
import { PermissionGate } from '../../components/core/PermissionGate'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { ActionButton } from '../../components/ui/ActionButton'
import { UserModal } from '../../components/modals/UserModal'
import { DeleteConfirmModal } from '../../components/modals/DeleteConfirmModal'
import { userService, type User } from '../../services/UserService'
import { ToastContainer } from '../../components/ui/ToastContainer'
import { Pagination } from '../../components/ui/Pagination'
import { useToast } from '../../hooks/useToast'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline'

interface User {
  id: number
  name: string
  email: string
  position?: string
  employee_id?: string
  company?: {
    name: string
  }
  department?: {
    name: string
  }
  is_active: boolean
  created_at: string
  last_login_at?: string
}

export const UserListPage: FC = () => {
  const { t } = useTranslation()
  const { hasPermission } = useCoreAuth()
  const { toasts, success, error, removeToast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Modal states
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  // Mock data for development
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Administrator',
        email: 'admin@example.com',
        position: 'System Administrator',
        employee_id: 'EMP001',
        company: { name: 'Enterprise Platform Company' },
        department: { name: 'IT Department' },
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        last_login_at: '2024-10-14T08:30:00Z',
      },
      {
        id: 2,
        name: 'John Doe',
        email: 'john.doe@example.com',
        position: 'HR Manager',
        employee_id: 'EMP002',
        company: { name: 'Enterprise Platform Company' },
        department: { name: 'HR Department' },
        is_active: true,
        created_at: '2024-01-15T00:00:00Z',
        last_login_at: '2024-10-13T16:45:00Z',
      },
      {
        id: 3,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        position: 'Sales Manager',
        employee_id: 'EMP003',
        company: { name: 'Enterprise Platform Company' },
        department: { name: 'Sales Department' },
        is_active: true,
        created_at: '2024-02-01T00:00:00Z',
        last_login_at: '2024-10-12T09:20:00Z',
      },
      {
        id: 4,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        position: 'Accountant',
        employee_id: 'EMP004',
        company: { name: 'Enterprise Platform Company' },
        department: { name: 'Accounting Department' },
        is_active: false,
        created_at: '2024-03-01T00:00:00Z',
        last_login_at: '2024-10-10T14:30:00Z',
      },
    ]

    loadUsers()
  }, [])

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.employee_id?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Paginate users
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page
    setTotalPages(Math.ceil(filteredUsers.length / newItemsPerPage))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Modal handlers
  const handleCreateUser = () => {
    setModalMode('create')
    setSelectedUser(null)
    setModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setModalMode('edit')
    setSelectedUser(user)
    setModalOpen(true)
  }

  const handleViewUser = (user: User) => {
    setModalMode('view')
    setSelectedUser(user)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedUser(null)
  }

  const loadUsers = async () => {
    try {
      setLoading(true)
      // For now, use mock data
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          position: 'Software Developer',
          employee_id: 'EMP001',
          company_id: 1,
          department_id: 1,
          is_active: true,
          created_at: '2024-01-01T00:00:00Z',
          last_login_at: '2024-10-15T09:30:00Z',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          position: 'Project Manager',
          employee_id: 'EMP002',
          company_id: 1,
          department_id: 2,
          is_active: true,
          created_at: '2024-02-01T00:00:00Z',
          last_login_at: '2024-10-14T14:20:00Z',
        },
        {
          id: 3,
          name: 'Bob Johnson',
          email: 'bob@example.com',
          position: 'Designer',
          employee_id: 'EMP003',
          company_id: 2,
          department_id: 3,
          is_active: false,
          created_at: '2024-03-01T00:00:00Z',
          last_login_at: '2024-10-10T14:30:00Z',
        },
      ]
      setUsers(mockUsers)
      setTotalPages(Math.ceil(mockUsers.length / itemsPerPage))
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!userToDelete) return

    try {
      setLoading(true)
      await userService.deleteUser(userToDelete.id)
      loadUsers() // Refresh the list
      success(t('userDeleted'), t('userDeletedSuccessfully'))
      setDeleteModalOpen(false)
      setUserToDelete(null)
    } catch (error: any) {
      console.error('Error deleting user:', error)
      error(t('deleteFailed'), error.message || t('deleteFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false)
    setUserToDelete(null)
  }

  const handleModalSuccess = () => {
    // Refresh users list
    loadUsers()
    
    // Show success message based on mode
    if (modalMode === 'create') {
      success(t('userCreated'), t('userCreatedSuccessfully'))
    } else if (modalMode === 'edit') {
      success(t('userUpdated'), t('userUpdatedSuccessfully'))
    }
  }

  if (!hasPermission('core.users.view')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access user management.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('users')}</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Manage system users and their permissions</p>
            </div>
            <PermissionGate permissions={['core.users.create']}>
              <Button 
                className="flex items-center gap-2"
                onClick={handleCreateUser}
              >
                <PlusIcon className="h-5 w-5" />
                {t('create')} {t('users')}
              </Button>
            </PermissionGate>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <Input
                  type="text"
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300">
                {t('filter')}
              </Button>
              <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300">
                {t('export')}
              </Button>
            </div>
          </div>
        </div>

        {/* Users Table */}
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
                        {t('name')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('email')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('position')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('company')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('status')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('lastLogin')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {t('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <UserIcon className="h-5 w-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{user.employee_id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900 dark:text-white">
                            <EnvelopeIcon className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {user.position || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900 dark:text-white">
                            <BuildingOfficeIcon className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                            {user.company?.name || '-'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.department?.name || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.is_active 
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          }`}>
                            {user.is_active ? t('active') : t('inactive')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.last_login_at ? formatDate(user.last_login_at) : t('never')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <PermissionGate permissions={['core.users.view']}>
                              <ActionButton
                                variant="view"
                                onClick={() => handleViewUser(user)}
                                title={t('view')}
                              >
                                <EyeIcon className="h-4 w-4" />
                                {t('view')}
                              </ActionButton>
                            </PermissionGate>
                            <PermissionGate permissions={['core.users.edit']}>
                              <ActionButton
                                variant="edit"
                                onClick={() => handleEditUser(user)}
                                title={t('edit')}
                              >
                                <PencilIcon className="h-4 w-4" />
                                {t('edit')}
                              </ActionButton>
                            </PermissionGate>
                            <PermissionGate permissions={['core.users.delete']}>
                              <ActionButton
                                variant="delete"
                                onClick={() => handleDeleteUser(user)}
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
                totalItems={filteredUsers.length}
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
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        user={selectedUser}
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
        title={t('confirmDelete')}
        message={t('confirmDeleteMessage')}
        itemName={userToDelete?.name || ''}
        itemDetails={userToDelete?.position || t('notSpecified')}
        loading={loading}
      />
    </div>
  )
}
