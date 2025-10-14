/**
 * Enterprise Platform Module System
 * 
 * ระบบจัดการ Module แบบ Enterprise ที่รองรับการเพิ่มระบบใหม่ได้
 */

export interface ModuleDefinition {
  id: string
  name: string
  nameKey: string
  description: string
  version: string
  icon: string
  color: string
  enabled: boolean
  dependencies: string[]
  permissions: ModulePermission[]
  routes: ModuleRoute[]
  components: ModuleComponent[]
  services: ModuleService[]
}

export interface ModulePermission {
  key: string
  name: string
  description: string
  category: string
}

export interface ModuleRoute {
  path: string
  component: string
  name: string
  permission?: string
  meta?: Record<string, any>
}

export interface ModuleComponent {
  name: string
  path: string
  type: 'page' | 'component' | 'widget'
  permission?: string
}

export interface ModuleService {
  name: string
  path: string
  type: 'api' | 'util' | 'hook'
}

// Module Registry
export const moduleRegistry: Record<string, ModuleDefinition> = {
  // ERP Core Module
  erp: {
    id: 'erp',
    name: 'ERP Core System',
    nameKey: 'coreSystem',
    description: 'Enterprise Resource Planning Core System',
    version: '1.0.0',
    icon: 'CogIcon',
    color: 'blue',
    enabled: true,
    dependencies: [],
    permissions: [
      { key: 'erp.users.view', name: 'View Users', description: 'View user list', category: 'users' },
      { key: 'erp.users.create', name: 'Create Users', description: 'Create new users', category: 'users' },
      { key: 'erp.users.edit', name: 'Edit Users', description: 'Edit user information', category: 'users' },
      { key: 'erp.users.delete', name: 'Delete Users', description: 'Delete users', category: 'users' },
      { key: 'erp.hr.employees.view', name: 'View Employees', description: 'View employee list', category: 'hr' },
      { key: 'erp.hr.employees.create', name: 'Create Employees', description: 'Create new employees', category: 'hr' },
      { key: 'erp.accounting.reports.view', name: 'View Accounting Reports', description: 'View accounting reports', category: 'accounting' },
      { key: 'erp.sales.orders.view', name: 'View Sales Orders', description: 'View sales orders', category: 'sales' },
    ],
    routes: [
      { path: '/core/users', component: 'ERPUsersPage', name: 'ERP Users', permission: 'erp.users.view' },
      { path: '/core/roles', component: 'ERPRolesPage', name: 'ERP Roles', permission: 'erp.roles.view' },
      { path: '/core/departments', component: 'ERPDepartmentsPage', name: 'ERP Departments', permission: 'erp.departments.view' },
      { path: '/core/settings', component: 'ERPSettingsPage', name: 'ERP Settings', permission: 'erp.settings.view' },
    ],
    components: [
      { name: 'ERPUsersPage', path: '/pages/ERP/Users', type: 'page', permission: 'erp.users.view' },
      { name: 'ERPRolesPage', path: '/pages/ERP/Roles', type: 'page', permission: 'erp.roles.view' },
      { name: 'ERPDepartmentsPage', path: '/pages/ERP/Departments', type: 'page', permission: 'erp.departments.view' },
      { name: 'ERPSettingsPage', path: '/pages/ERP/Settings', type: 'page', permission: 'erp.settings.view' },
    ],
    services: [
      { name: 'ERPUserService', path: '/services/ERP/UserService', type: 'api' },
      { name: 'ERPRoleService', path: '/services/ERP/RoleService', type: 'api' },
      { name: 'ERPDepartmentService', path: '/services/ERP/DepartmentService', type: 'api' },
    ],
  },

  // Car Rental Module
  carRental: {
    id: 'carRental',
    name: 'Car Rental System',
    nameKey: 'carRentalSystem',
    description: 'Car Rental Management System',
    version: '1.0.0',
    icon: 'TruckIcon',
    color: 'green',
    enabled: true,
    dependencies: ['erp'], // Depends on ERP for user management
    permissions: [
      { key: 'carrental.fleet.view', name: 'View Fleet', description: 'View vehicle fleet', category: 'fleet' },
      { key: 'carrental.fleet.create', name: 'Add Vehicles', description: 'Add new vehicles', category: 'fleet' },
      { key: 'carrental.bookings.view', name: 'View Bookings', description: 'View booking list', category: 'bookings' },
      { key: 'carrental.bookings.create', name: 'Create Bookings', description: 'Create new bookings', category: 'bookings' },
      { key: 'carrental.payments.process', name: 'Process Payments', description: 'Process payment transactions', category: 'payments' },
    ],
    routes: [
      { path: '/car-rental/fleet', component: 'CarRentalFleetPage', name: 'Fleet Management', permission: 'carrental.fleet.view' },
      { path: '/car-rental/bookings', component: 'CarRentalBookingsPage', name: 'Bookings', permission: 'carrental.bookings.view' },
      { path: '/car-rental/locations', component: 'CarRentalLocationsPage', name: 'Locations', permission: 'carrental.locations.view' },
      { path: '/car-rental/payments', component: 'CarRentalPaymentsPage', name: 'Payments', permission: 'carrental.payments.view' },
      { path: '/car-rental/maintenance', component: 'CarRentalMaintenancePage', name: 'Maintenance', permission: 'carrental.maintenance.view' },
    ],
    components: [
      { name: 'CarRentalFleetPage', path: '/pages/CarRental/Fleet', type: 'page', permission: 'carrental.fleet.view' },
      { name: 'CarRentalBookingsPage', path: '/pages/CarRental/Bookings', type: 'page', permission: 'carrental.bookings.view' },
      { name: 'CarRentalLocationsPage', path: '/pages/CarRental/Locations', type: 'page', permission: 'carrental.locations.view' },
      { name: 'CarRentalPaymentsPage', path: '/pages/CarRental/Payments', type: 'page', permission: 'carrental.payments.view' },
      { name: 'CarRentalMaintenancePage', path: '/pages/CarRental/Maintenance', type: 'page', permission: 'carrental.maintenance.view' },
    ],
    services: [
      { name: 'CarRentalFleetService', path: '/services/CarRental/FleetService', type: 'api' },
      { name: 'CarRentalBookingService', path: '/services/CarRental/BookingService', type: 'api' },
      { name: 'CarRentalPaymentService', path: '/services/CarRental/PaymentService', type: 'api' },
    ],
  },

  // Smart Classroom Module
  smartClassroom: {
    id: 'smartClassroom',
    name: 'Smart Classroom System',
    nameKey: 'smartClassroomSystem',
    description: 'Smart Classroom Management System',
    version: '1.0.0',
    icon: 'AcademicCapIcon',
    color: 'purple',
    enabled: true,
    dependencies: ['erp'], // Depends on ERP for user management
    permissions: [
      { key: 'smartclassroom.classrooms.view', name: 'View Classrooms', description: 'View classroom list', category: 'classrooms' },
      { key: 'smartclassroom.classrooms.create', name: 'Create Classrooms', description: 'Create new classrooms', category: 'classrooms' },
      { key: 'smartclassroom.equipment.control', name: 'Control Equipment', description: 'Control classroom equipment', category: 'equipment' },
      { key: 'smartclassroom.recordings.create', name: 'Create Recordings', description: 'Create class recordings', category: 'recordings' },
      { key: 'smartclassroom.network.manage', name: 'Manage Network', description: 'Manage classroom network', category: 'network' },
    ],
    routes: [
      { path: '/smart-classroom/classrooms', component: 'SmartClassroomClassroomsPage', name: 'Classrooms', permission: 'smartclassroom.classrooms.view' },
      { path: '/smart-classroom/schedules', component: 'SmartClassroomSchedulesPage', name: 'Schedules', permission: 'smartclassroom.schedules.view' },
      { path: '/smart-classroom/equipment', component: 'SmartClassroomEquipmentPage', name: 'Equipment', permission: 'smartclassroom.equipment.view' },
      { path: '/smart-classroom/presentations', component: 'SmartClassroomPresentationsPage', name: 'Presentations', permission: 'smartclassroom.presentations.view' },
      { path: '/smart-classroom/recordings', component: 'SmartClassroomRecordingsPage', name: 'Recordings', permission: 'smartclassroom.recordings.view' },
      { path: '/smart-classroom/network', component: 'SmartClassroomNetworkPage', name: 'Network', permission: 'smartclassroom.network.view' },
    ],
    components: [
      { name: 'SmartClassroomClassroomsPage', path: '/pages/SmartClassroom/Classrooms', type: 'page', permission: 'smartclassroom.classrooms.view' },
      { name: 'SmartClassroomSchedulesPage', path: '/pages/SmartClassroom/Schedules', type: 'page', permission: 'smartclassroom.schedules.view' },
      { name: 'SmartClassroomEquipmentPage', path: '/pages/SmartClassroom/Equipment', type: 'page', permission: 'smartclassroom.equipment.view' },
      { name: 'SmartClassroomPresentationsPage', path: '/pages/SmartClassroom/Presentations', type: 'page', permission: 'smartclassroom.presentations.view' },
      { name: 'SmartClassroomRecordingsPage', path: '/pages/SmartClassroom/Recordings', type: 'page', permission: 'smartclassroom.recordings.view' },
      { name: 'SmartClassroomNetworkPage', path: '/pages/SmartClassroom/Network', type: 'page', permission: 'smartclassroom.network.view' },
    ],
    services: [
      { name: 'SmartClassroomClassroomService', path: '/services/SmartClassroom/ClassroomService', type: 'api' },
      { name: 'SmartClassroomEquipmentService', path: '/services/SmartClassroom/EquipmentService', type: 'api' },
      { name: 'SmartClassroomRecordingService', path: '/services/SmartClassroom/RecordingService', type: 'api' },
    ],
  },
}

// Module Management Functions
export class ModuleManager {
  /**
   * Get all enabled modules
   */
  static getEnabledModules(): ModuleDefinition[] {
    return Object.values(moduleRegistry).filter(module => module.enabled)
  }

  /**
   * Get module by ID
   */
  static getModule(id: string): ModuleDefinition | undefined {
    return moduleRegistry[id]
  }

  /**
   * Get modules by dependency
   */
  static getModulesByDependency(dependency: string): ModuleDefinition[] {
    return Object.values(moduleRegistry).filter(module => 
      module.dependencies.includes(dependency)
    )
  }

  /**
   * Get all permissions for enabled modules
   */
  static getAllPermissions(): ModulePermission[] {
    const enabledModules = this.getEnabledModules()
    return enabledModules.flatMap(module => module.permissions)
  }

  /**
   * Get permissions by module
   */
  static getPermissionsByModule(moduleId: string): ModulePermission[] {
    const module = this.getModule(moduleId)
    return module ? module.permissions : []
  }

  /**
   * Get permissions by category
   */
  static getPermissionsByCategory(category: string): ModulePermission[] {
    return this.getAllPermissions().filter(permission => permission.category === category)
  }

  /**
   * Check if user has permission for module
   */
  static hasModulePermission(userPermissions: string[], moduleId: string, permission: string): boolean {
    const module = this.getModule(moduleId)
    if (!module) return false

    const fullPermissionKey = `${moduleId}.${permission}`
    return userPermissions.includes(fullPermissionKey)
  }

  /**
   * Get routes for enabled modules
   */
  static getAllRoutes(): ModuleRoute[] {
    const enabledModules = this.getEnabledModules()
    return enabledModules.flatMap(module => module.routes)
  }

  /**
   * Get routes by module
   */
  static getRoutesByModule(moduleId: string): ModuleRoute[] {
    const module = this.getModule(moduleId)
    return module ? module.routes : []
  }

  /**
   * Register new module
   */
  static registerModule(module: ModuleDefinition): void {
    moduleRegistry[module.id] = module
  }

  /**
   * Enable/disable module
   */
  static toggleModule(moduleId: string, enabled: boolean): void {
    const module = this.getModule(moduleId)
    if (module) {
      module.enabled = enabled
    }
  }
}

// Export default module registry
export default moduleRegistry
