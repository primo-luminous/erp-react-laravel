import {
  CogIcon as SettingsIcon,
  UsersIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  CalculatorIcon,
  ChartBarIcon,
  UserIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  WalletIcon,
  UserCircleIcon,
  DocumentTextIcon,
  ChartBarSquareIcon,
  CubeIcon,
  TruckIcon,
  BookOpenIcon,
  ClipboardDocumentIcon,
  Squares2X2Icon,
  // Car Rental System Icons
  TruckIcon as CarIcon,
  MapPinIcon,
  CreditCardIcon,
  ClipboardDocumentCheckIcon,
  // Smart Classroom System Icons
  AcademicCapIcon,
  PresentationChartBarIcon,
  VideoCameraIcon,
  ComputerDesktopIcon,
  WifiIcon,
} from '@heroicons/react/24/outline'

export interface SidebarMenuItem {
  name: string
  nameKey: string
  path: string
  icon: any
  permission?: string
}

export interface SidebarMenuGroup {
  label: string
  labelKey: string
  icon: any
  children: SidebarMenuItem[]
}

export const sidebarMenu: SidebarMenuGroup[] = [
  {
    label: "Core System",
    labelKey: "coreSystem",
    icon: SettingsIcon,
    children: [
      { name: "Dashboard", nameKey: "coreDashboard", path: "/core", icon: Squares2X2Icon, permission: "core.users.view" },
      { name: "Users", nameKey: "users", path: "/core/users", icon: UserIcon, permission: "core.users.view" },
      { name: "Roles", nameKey: "roles", path: "/core/roles", icon: ShieldCheckIcon, permission: "core.roles.view" },
      { name: "Departments", nameKey: "departments", path: "/core/departments", icon: BuildingOfficeIcon, permission: "core.departments.view" },
      { name: "Settings", nameKey: "settings", path: "/core/settings", icon: Cog6ToothIcon, permission: "core.systems.view" },
    ],
  },
  {
    label: "ERP System",
    labelKey: "erpSystem",
    icon: ChartBarIcon,
    children: [
      { name: "ERP Dashboard", nameKey: "erpDashboard", path: "/erp", icon: Squares2X2Icon, permission: "erp.access" },
      { name: "HR Dashboard", nameKey: "hrDashboard", path: "/erp/hr", icon: UsersIcon, permission: "erp.hr.view" },
      { name: "Employees", nameKey: "employees", path: "/erp/hr/employees", icon: IdentificationIcon, permission: "erp.hr.employees.view" },
      { name: "Leaves", nameKey: "leaves", path: "/erp/hr/leaves", icon: CalendarDaysIcon, permission: "erp.hr.leave.view" },
    ],
  },
  {
    label: "Sales & CRM",
    labelKey: "salesCRM",
    icon: ShoppingCartIcon,
    children: [
      { name: "Sales Dashboard", nameKey: "salesDashboard", path: "/erp/sales", icon: Squares2X2Icon, permission: "erp.sales.view" },
      { name: "Customers", nameKey: "customers", path: "/erp/sales/customers", icon: UserCircleIcon, permission: "erp.sales.customers.view" },
      { name: "Orders", nameKey: "orders", path: "/erp/sales/orders", icon: DocumentTextIcon, permission: "erp.sales.orders.view" },
      { name: "Invoices", nameKey: "invoices", path: "/erp/sales/invoices", icon: ChartBarSquareIcon, permission: "erp.sales.invoices.view" },
    ],
  },
  {
    label: "Inventory / Purchase",
    labelKey: "inventoryPurchase",
    icon: ArchiveBoxIcon,
    children: [
      { name: "Inventory Dashboard", nameKey: "inventoryDashboard", path: "/erp/inventory", icon: Squares2X2Icon, permission: "erp.inventory.view" },
      { name: "Products", nameKey: "products", path: "/erp/inventory/products", icon: CubeIcon, permission: "erp.inventory.products.view" },
      { name: "Stock", nameKey: "stock", path: "/erp/inventory/stock", icon: ArchiveBoxIcon, permission: "erp.inventory.stock.view" },
      { name: "Suppliers", nameKey: "suppliers", path: "/erp/purchase/suppliers", icon: TruckIcon, permission: "erp.purchase.suppliers.view" },
      { name: "Purchase Orders", nameKey: "purchaseOrders", path: "/erp/purchase/orders", icon: ClipboardDocumentIcon, permission: "erp.purchase.orders.view" },
    ],
  },
  {
    label: "Accounting / Finance",
    labelKey: "accountingFinance",
    icon: CalculatorIcon,
    children: [
      { name: "Accounting Dashboard", nameKey: "accountingDashboard", path: "/erp/accounting", icon: Squares2X2Icon, permission: "erp.accounting.view" },
      { name: "Chart of Accounts", nameKey: "chartOfAccounts", path: "/erp/accounting/chart", icon: BookOpenIcon, permission: "erp.accounting.chart.view" },
      { name: "Journal Entries", nameKey: "journalEntries", path: "/erp/accounting/journals", icon: ClipboardDocumentIcon, permission: "erp.accounting.journal.view" },
      { name: "Finance Dashboard", nameKey: "financeDashboard", path: "/erp/finance", icon: WalletIcon, permission: "erp.finance.view" },
      { name: "Bank Accounts", nameKey: "bankAccounts", path: "/erp/finance/bank", icon: CreditCardIcon, permission: "erp.finance.bank.view" },
    ],
  },
  {
    label: "Reports / Dashboard",
    labelKey: "reportsDashboard",
    icon: ChartBarIcon,
    children: [
      { name: "Main Dashboard", nameKey: "mainDashboard", path: "/", icon: Squares2X2Icon },
      { name: "Custom Reports", nameKey: "customReports", path: "/erp/reports/custom", icon: ChartBarSquareIcon, permission: "erp.reports.view" },
    ],
  },
  {
    label: "System / Tools",
    labelKey: "systemTools",
    icon: Cog6ToothIcon,
    children: [
      { name: "Audit Logs", nameKey: "auditLogs", path: "/core/audit", icon: DocumentTextIcon, permission: "core.audit.view" },
      { name: "System Registry", nameKey: "systemRegistry", path: "/core/systems", icon: Cog6ToothIcon, permission: "core.systems.view" },
      { name: "Backups", nameKey: "backups", path: "/core/backups", icon: ArchiveBoxIcon, permission: "core.system.backups.view" },
    ],
  },
  {
    label: "Car Rental System",
    labelKey: "carRentalSystem",
    icon: CarIcon,
    children: [
      { name: "Rental Dashboard", nameKey: "rentalDashboard", path: "/rental", icon: Squares2X2Icon, permission: "rental.access" },
      { name: "Fleet Management", nameKey: "fleetManagement", path: "/rental/fleet", icon: CarIcon, permission: "rental.fleet.view" },
      { name: "Bookings", nameKey: "bookings", path: "/rental/bookings", icon: CalendarDaysIcon, permission: "rental.bookings.view" },
      { name: "Locations", nameKey: "locations", path: "/rental/locations", icon: MapPinIcon, permission: "rental.locations.view" },
      { name: "Payments", nameKey: "payments", path: "/rental/payments", icon: CreditCardIcon, permission: "rental.payments.view" },
      { name: "Maintenance", nameKey: "maintenance", path: "/rental/maintenance", icon: ClipboardDocumentCheckIcon, permission: "rental.maintenance.view" },
    ],
  },
  {
    label: "Smart Classroom System",
    labelKey: "smartClassroomSystem",
    icon: AcademicCapIcon,
    children: [
      { name: "Classroom Dashboard", nameKey: "classroomDashboard", path: "/classroom", icon: Squares2X2Icon, permission: "classroom.access" },
      { name: "Classrooms", nameKey: "classrooms", path: "/classroom/classrooms", icon: AcademicCapIcon, permission: "classroom.classrooms.view" },
      { name: "Schedules", nameKey: "schedules", path: "/classroom/schedules", icon: CalendarDaysIcon, permission: "classroom.schedules.view" },
      { name: "Equipment", nameKey: "equipment", path: "/classroom/equipment", icon: ComputerDesktopIcon, permission: "classroom.equipment.view" },
      { name: "Presentations", nameKey: "presentations", path: "/classroom/presentations", icon: PresentationChartBarIcon, permission: "classroom.presentations.view" },
      { name: "Recordings", nameKey: "recordings", path: "/classroom/recordings", icon: VideoCameraIcon, permission: "classroom.recordings.view" },
      { name: "Network", nameKey: "network", path: "/classroom/network", icon: WifiIcon, permission: "classroom.network.view" },
    ],
  },
]
