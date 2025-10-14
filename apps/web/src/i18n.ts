import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Common
      search: 'Search...',
      signOut: 'Sign Out',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      create: 'Create',
      update: 'Update',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      confirm: 'Confirm',
      reset: 'Reset',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      open: 'Open',
      yes: 'Yes',
      no: 'No',
      
      // Navigation
      dashboard: 'Dashboard',
      profile: 'Profile',
      changePassword: 'Change Password',
      users: 'Users',
      roles: 'Roles',
      departments: 'Departments',
      company: 'Company',
      settings: 'Settings',
      hr: 'HR',
      accounting: 'Accounting',
      sales: 'Sales',
      reports: 'Reports',
      
      // Dashboard
      dashboardWelcome: 'Welcome to your ERP system',
      recentActivity: 'Recent Activity',
      latestActions: 'Latest actions in the system',
      commonTasks: 'Common tasks',
      quickActions: 'Quick Actions',
      
      // Dashboard Stats
      totalUsers: 'Total Users',
      revenue: 'Revenue',
      activeProjects: 'Active Projects',
      
      // Dashboard Activities
      newUserRegistered: 'New user registered',
      departmentUpdated: 'Department updated',
      settingsChanged: 'Settings changed',
      reportGenerated: 'Report generated',
      minutesAgo: 'minutes ago',
      hourAgo: 'hour ago',
      hoursAgo: 'hours ago',
      
      // Dashboard Quick Actions
      addUser: 'Add User',
      createNewUserAccount: 'Create new user account',
      newDepartment: 'New Department',
      addDepartment: 'Add department',
      generateReport: 'Generate Report',
      createSystemReport: 'Create system report',
      viewAnalytics: 'View Analytics',
      systemAnalytics: 'System analytics',
      
      // Dashboard Status
      systemStatus: 'System Status',
      allSystemsOperational: 'All systems operational',
      performance: 'Performance',
      uptime: 'uptime',
      lastBackup: 'Last Backup',
      
      // Header
      searchPlaceholder: 'Search...',
      notifications: 'Notifications',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      adminUser: 'Admin User',
      standardUser: 'Standard User',
      
      // Sidebar
      erpSystem: 'ERP System',
      online: 'Online',
      
      // Sidebar Menu Groups
      coreSystem: 'Core System',
      salesCRM: 'Sales & CRM',
      inventoryPurchase: 'Inventory / Purchase',
      accountingFinance: 'Accounting / Finance',
      reportsDashboard: 'Reports / Dashboard',
      systemTools: 'System / Tools',
      
      // Core Dashboard
      coreDashboard: 'Core Dashboard',
      
      // Core Dashboard Content
      coreDashboardWelcome: 'Welcome, {{name}}',
      coreDashboardTitle: 'Enterprise Platform Dashboard',
      userInformation: 'User Information',
      name: 'Name',
      email: 'Email',
      company: 'Company',
      department: 'Department',
      position: 'Position',
      employeeId: 'Employee ID',
      availableSystems: 'Available Systems',
      erpSystem: 'ERP System',
      erpDescription: 'Enterprise Resource Planning',
      modules: 'Modules',
      status: 'Status',
      active: 'Active',
      carRental: 'Car Rental',
      fleetManagement: 'Fleet Management',
      features: 'Features',
      development: 'Development',
      smartClassroom: 'Smart Classroom',
      educationManagement: 'Education Management',
      quickActions: 'Quick Actions',
      userManagement: 'User Management',
      userManagementDescription: 'Manage users, roles, and permissions',
      systemManagement: 'System Management',
      systemManagementDescription: 'Manage systems and applications',
      auditLogs: 'Audit Logs',
      auditLogsDescription: 'View system usage logs',
      recentActivity: 'Recent Activity',
      noRecentActivity: 'No recent activity',
      
      // ERP Dashboard
      erpDashboard: 'ERP Dashboard',
      hrDashboard: 'HR Dashboard',
      
      // ERP Dashboard Content
      erpDashboardTitle: 'ERP Dashboard',
      erpDashboardWelcome: 'Welcome back, {{name}}! Manage your business operations efficiently.',
      humanResources: 'Human Resources',
      hrDescription: 'Employee management & HR processes',
      inventory: 'Inventory',
      inventoryDescription: 'Product & stock management',
      sales: 'Sales',
      salesDescription: 'Customer & sales order management',
      purchase: 'Purchase',
      purchaseDescription: 'Supplier & procurement management',
      accounting: 'Accounting',
      accountingDescription: 'Financial records & journal entries',
      finance: 'Finance',
      financeDescription: 'Bank accounts & cash flow',
      employees: 'Employees',
      pendingLeave: 'Pending Leave',
      products: 'Products',
      lowStockItems: 'Low Stock Items',
      customers: 'Customers',
      pendingOrders: 'Pending Orders',
      suppliers: 'Suppliers',
      journalEntries: 'Journal Entries',
      accounts: 'Accounts',
      bankAccounts: 'Bank Accounts',
      cashFlow: 'Cash Flow',
      accessHrModule: 'Access HR Module',
      accessInventory: 'Access Inventory',
      accessSales: 'Access Sales',
      accessPurchase: 'Access Purchase',
      accessAccounting: 'Access Accounting',
      accessFinance: 'Access Finance',
      recentActivity: 'Recent Activity',
      
      // Additional Menu Items
      orders: 'Orders',
      invoices: 'Invoices',
      customers: 'Customers',
      purchaseOrders: 'Purchase Orders',
      journalEntries: 'Journal Entries',
      bankAccounts: 'Bank Accounts',
      mainDashboard: 'Main Dashboard',
      customReports: 'Custom Reports',
      auditLogs: 'Audit Logs',
      systemRegistry: 'System Registry',
      
      // User Management
      userList: 'User List',
      userCreate: 'Create User',
      userEdit: 'Edit User',
      userDelete: 'Delete User',
      userDetails: 'User Details',
      filter: 'Filter',
      export: 'Export',
      lastLogin: 'Last Login',
      inactive: 'Inactive',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      results: 'results',
      
      // Core System
      companySettings: 'Company Settings',
      
      // HR
      employees: 'Employees',
      leaves: 'Leaves',
      attendance: 'Attendance',
      payroll: 'Payroll',
      
      // Sales & CRM
      leads: 'Leads',
      quotations: 'Quotations',
      
      // Inventory / Purchase
      products: 'Products',
      stock: 'Stock',
      suppliers: 'Suppliers',
      
      // Accounting / Finance
      chartOfAccounts: 'Chart of Accounts',
      journals: 'Journals',
      arAp: 'AR/AP',
      
      // Reports / Dashboard
      
      // System / Tools
      backups: 'Backups',
      logs: 'Logs',
      apiKeys: 'API Keys',
      
      // Car Rental System
      carRentalSystem: 'Car Rental System',
      fleetManagement: 'Fleet Management',
      bookings: 'Bookings',
      locations: 'Locations',
      payments: 'Payments',
      maintenance: 'Maintenance',
      rentalDashboard: 'Rental Dashboard',
      
      // Smart Classroom System
      smartClassroomSystem: 'Smart Classroom System',
      classrooms: 'Classrooms',
      schedules: 'Schedules',
      equipment: 'Equipment',
      presentations: 'Presentations',
      recordings: 'Recordings',
      network: 'Network',
      classroomDashboard: 'Classroom Dashboard',
      
      // Auth
      signIn: 'Sign In',
      signInTitle: 'Welcome Back',
      signInSubtitle: 'Sign in to your account to continue',
      signInFailed: 'Sign in failed. Please check your credentials.',
      signingIn: 'Signing in...',
      welcomeBack: 'Welcome back!',
      pleaseSignIn: 'Please sign in to your account',
      emailAddress: 'Email Address',
      password: 'Password',
      enterYourEmail: 'Enter your email',
      enterYourPassword: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      defaultCredentials: 'Default: admin@example.com / admin1234',
      termsAndPrivacy: 'By signing in, you agree to our Terms of Service and Privacy Policy',
      
      // Profile
      manageYourProfile: 'Manage your profile information',
      profileInformation: 'Profile Information',
      updateYourPersonalDetails: 'Update your personal details',
      fullName: 'Full Name',
      enterYourName: 'Enter your name',
      rolesAndPermissions: 'Roles & Permissions',
      yourAssignedRolesAndPermissions: 'Your assigned roles and permissions',
      accountInformation: 'Account Information',
      accountCreationAndLastUpdate: 'Account creation and last update',
      memberSince: 'Member Since',
      lastUpdated: 'Last Updated',
      commonAccountActions: 'Common account actions',
      editProfile: 'Edit Profile',
      
      // Change Password
      updateYourPassword: 'Update your password',
      enterYourCurrentPasswordAndNewPassword: 'Enter your current password and new password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      enterCurrentPassword: 'Enter current password',
      enterNewPassword: 'Enter new password',
      confirmNewPassword: 'Confirm new password',
      passwordRequirements: 'Password Requirements',
      ensureYourPasswordMeetsTheFollowingCriteria: 'Ensure your password meets the following criteria',
      atLeast8Characters: 'At least 8 characters',
      oneUppercaseLetter: 'One uppercase letter',
      oneLowercaseLetter: 'One lowercase letter',
      oneNumber: 'One number',
      oneSpecialCharacter: 'One special character',
      passwordsDoNotMatch: 'Passwords do not match',
      passwordRequirementsNotMet: 'Password requirements not met',
      passwordUpdatedSuccessfully: 'Password updated successfully',
      passwordChangeFailed: 'Password change failed',
      securityTips: 'Security Tips',
      useUniquePassword: 'Use a unique password for this account',
      avoidPersonalInfo: 'Avoid using personal information',
      changeRegularly: 'Change your password regularly',
      dontSharePassword: 'Never share your password with others',
      
      // Language
      language: 'Language',
      selectLanguage: 'Select Language',
      thailand: 'Thailand',
      unitedStates: 'United States',
      china: 'China',
    }
  },
  th: {
    translation: {
      // Common
      search: 'ค้นหา...',
      signOut: 'ออกจากระบบ',
      save: 'บันทึก',
      cancel: 'ยกเลิก',
      edit: 'แก้ไข',
      delete: 'ลบ',
      create: 'สร้าง',
      update: 'อัปเดต',
      loading: 'กำลังโหลด...',
      error: 'ข้อผิดพลาด',
      success: 'สำเร็จ',
      warning: 'คำเตือน',
      info: 'ข้อมูล',
      confirm: 'ยืนยัน',
      reset: 'รีเซ็ต',
      back: 'กลับ',
      next: 'ถัดไป',
      previous: 'ก่อนหน้า',
      close: 'ปิด',
      open: 'เปิด',
      yes: 'ใช่',
      no: 'ไม่',
      
      // Navigation
      dashboard: 'แดชบอร์ด',
      profile: 'โปรไฟล์',
      changePassword: 'เปลี่ยนรหัสผ่าน',
      users: 'ผู้ใช้',
      roles: 'บทบาท',
      departments: 'แผนก',
      company: 'บริษัท',
      settings: 'การตั้งค่า',
      hr: 'ทรัพยากรบุคคล',
      accounting: 'บัญชี',
      sales: 'ขาย',
      reports: 'รายงาน',
      
      // Dashboard
      dashboardWelcome: 'ยินดีต้อนรับสู่ระบบ ERP ของคุณ',
      recentActivity: 'กิจกรรมล่าสุด',
      latestActions: 'การดำเนินการล่าสุดในระบบ',
      commonTasks: 'งานทั่วไป',
      quickActions: 'การดำเนินการด่วน',
      
      // Dashboard Stats
      totalUsers: 'ผู้ใช้ทั้งหมด',
      revenue: 'รายได้',
      activeProjects: 'โครงการที่ใช้งาน',
      
      // Dashboard Activities
      newUserRegistered: 'ผู้ใช้ใหม่ลงทะเบียน',
      departmentUpdated: 'อัปเดตแผนก',
      settingsChanged: 'เปลี่ยนการตั้งค่า',
      reportGenerated: 'สร้างรายงาน',
      minutesAgo: 'นาทีที่แล้ว',
      hourAgo: 'ชั่วโมงที่แล้ว',
      hoursAgo: 'ชั่วโมงที่แล้ว',
      
      // Dashboard Quick Actions
      addUser: 'เพิ่มผู้ใช้',
      createNewUserAccount: 'สร้างบัญชีผู้ใช้ใหม่',
      newDepartment: 'แผนกใหม่',
      addDepartment: 'เพิ่มแผนก',
      generateReport: 'สร้างรายงาน',
      createSystemReport: 'สร้างรายงานระบบ',
      viewAnalytics: 'ดูการวิเคราะห์',
      systemAnalytics: 'การวิเคราะห์ระบบ',
      
      // Dashboard Status
      systemStatus: 'สถานะระบบ',
      allSystemsOperational: 'ระบบทั้งหมดทำงานปกติ',
      performance: 'ประสิทธิภาพ',
      uptime: 'เวลาทำงาน',
      lastBackup: 'สำรองข้อมูลล่าสุด',
      
      // Header
      searchPlaceholder: 'ค้นหา...',
      notifications: 'การแจ้งเตือน',
      darkMode: 'โหมดมืด',
      lightMode: 'โหมดสว่าง',
      adminUser: 'ผู้ดูแลระบบ',
      standardUser: 'ผู้ใช้ทั่วไป',
      
      // Sidebar
      erpSystem: 'ระบบ ERP',
      online: 'ออนไลน์',
      
      // Sidebar Menu Groups
      coreSystem: 'ระบบหลัก',
      salesCRM: 'ขาย & CRM',
      inventoryPurchase: 'คลังสินค้า / การจัดซื้อ',
      accountingFinance: 'บัญชี / การเงิน',
      reportsDashboard: 'รายงาน / แดชบอร์ด',
      systemTools: 'ระบบ / เครื่องมือ',
      
      // Core Dashboard
      coreDashboard: 'แดชบอร์ดหลัก',
      
      // Core Dashboard Content
      coreDashboardWelcome: 'ยินดีต้อนรับ, {{name}}',
      coreDashboardTitle: 'Enterprise Platform Dashboard',
      userInformation: 'ข้อมูลผู้ใช้',
      name: 'ชื่อ',
      email: 'อีเมล',
      company: 'บริษัท',
      department: 'แผนก',
      position: 'ตำแหน่ง',
      employeeId: 'รหัสพนักงาน',
      availableSystems: 'ระบบที่สามารถเข้าถึงได้',
      erpSystem: 'ระบบ ERP',
      erpDescription: 'Enterprise Resource Planning',
      modules: 'โมดูล',
      status: 'สถานะ',
      active: 'ใช้งาน',
      carRental: 'เช่ารถ',
      fleetManagement: 'จัดการรถยนต์',
      features: 'ฟีเจอร์',
      development: 'กำลังพัฒนา',
      smartClassroom: 'ห้องเรียนอัจฉริยะ',
      educationManagement: 'จัดการการศึกษา',
      quickActions: 'การดำเนินการด่วน',
      userManagement: 'จัดการผู้ใช้',
      userManagementDescription: 'จัดการผู้ใช้ บทบาท และสิทธิ์',
      systemManagement: 'จัดการระบบ',
      systemManagementDescription: 'จัดการระบบและแอปพลิเคชัน',
      auditLogs: 'Audit Logs',
      auditLogsDescription: 'ดูบันทึกการใช้งานระบบ',
      recentActivity: 'กิจกรรมล่าสุด',
      noRecentActivity: 'ไม่มีกิจกรรมล่าสุด',
      
      // ERP Dashboard
      erpDashboard: 'แดชบอร์ด ERP',
      hrDashboard: 'แดชบอร์ด HR',
      
      // ERP Dashboard Content
      erpDashboardTitle: 'แดชบอร์ด ERP',
      erpDashboardWelcome: 'ยินดีต้อนรับกลับ {{name}}! จัดการธุรกิจของคุณอย่างมีประสิทธิภาพ',
      humanResources: 'ทรัพยากรบุคคล',
      hrDescription: 'การจัดการพนักงานและกระบวนการ HR',
      inventory: 'คลังสินค้า',
      inventoryDescription: 'การจัดการสินค้าและสต็อก',
      sales: 'ขาย',
      salesDescription: 'การจัดการลูกค้าและคำสั่งซื้อ',
      purchase: 'จัดซื้อ',
      purchaseDescription: 'การจัดการผู้จัดหาและการจัดซื้อ',
      accounting: 'บัญชี',
      accountingDescription: 'บันทึกทางการเงินและรายการบันทึก',
      finance: 'การเงิน',
      financeDescription: 'บัญชีธนาคารและกระแสเงินสด',
      employees: 'พนักงาน',
      pendingLeave: 'การลารออนุมัติ',
      products: 'สินค้า',
      lowStockItems: 'สินค้าใกล้หมด',
      customers: 'ลูกค้า',
      pendingOrders: 'คำสั่งซื้อรออนุมัติ',
      suppliers: 'ผู้จัดหา',
      journalEntries: 'รายการบันทึก',
      accounts: 'บัญชี',
      bankAccounts: 'บัญชีธนาคาร',
      cashFlow: 'กระแสเงินสด',
      accessHrModule: 'เข้าถึงโมดูล HR',
      accessInventory: 'เข้าถึงคลังสินค้า',
      accessSales: 'เข้าถึงการขาย',
      accessPurchase: 'เข้าถึงการจัดซื้อ',
      accessAccounting: 'เข้าถึงบัญชี',
      accessFinance: 'เข้าถึงการเงิน',
      recentActivity: 'กิจกรรมล่าสุด',
      
      // Additional Menu Items
      orders: 'คำสั่งซื้อ',
      invoices: 'ใบแจ้งหนี้',
      customers: 'ลูกค้า',
      purchaseOrders: 'คำสั่งซื้อ',
      journalEntries: 'รายการบันทึก',
      bankAccounts: 'บัญชีธนาคาร',
      mainDashboard: 'แดชบอร์ดหลัก',
      customReports: 'รายงานกำหนดเอง',
      auditLogs: 'บันทึกการตรวจสอบ',
      systemRegistry: 'ทะเบียนระบบ',
      
      // User Management
      userList: 'รายการผู้ใช้',
      userCreate: 'เพิ่มผู้ใช้',
      userEdit: 'แก้ไขผู้ใช้',
      userDelete: 'ลบผู้ใช้',
      userDetails: 'รายละเอียดผู้ใช้',
      filter: 'กรอง',
      export: 'ส่งออก',
      lastLogin: 'เข้าสู่ระบบล่าสุด',
      inactive: 'ไม่ใช้งาน',
      showing: 'แสดง',
      to: 'ถึง',
      of: 'จาก',
      results: 'ผลลัพธ์',
      
      // Core System
      companySettings: 'การตั้งค่าบริษัท',
      
      // HR
      employees: 'พนักงาน',
      leaves: 'การลา',
      attendance: 'การเข้างาน',
      payroll: 'เงินเดือน',
      
      // Sales & CRM
      leads: 'ลูกค้าเป้าหมาย',
      quotations: 'ใบเสนอราคา',
      
      // Inventory / Purchase
      products: 'สินค้า',
      stock: 'สต็อก',
      suppliers: 'ผู้จัดหา',
      
      // Accounting / Finance
      chartOfAccounts: 'ผังบัญชี',
      journals: 'สมุดรายวัน',
      arAp: 'ลูกหนี้/เจ้าหนี้',
      
      // Reports / Dashboard
      
      // System / Tools
      backups: 'สำรองข้อมูล',
      logs: 'บันทึก',
      apiKeys: 'API Keys',
      
      // Car Rental System
      carRentalSystem: 'ระบบเช่ารถ',
      fleetManagement: 'จัดการรถยนต์',
      bookings: 'การจอง',
      locations: 'สถานที่',
      payments: 'การชำระเงิน',
      maintenance: 'การบำรุงรักษา',
      rentalDashboard: 'แดชบอร์ดการเช่า',
      
      // Smart Classroom System
      smartClassroomSystem: 'ระบบบริหารจัดการห้องเรียนอัจฉริยะ',
      classrooms: 'ห้องเรียน',
      schedules: 'ตารางเรียน',
      equipment: 'อุปกรณ์',
      presentations: 'การนำเสนอ',
      recordings: 'การบันทึก',
      network: 'เครือข่าย',
      classroomDashboard: 'แดชบอร์ดห้องเรียน',
      
      // Auth
      signIn: 'เข้าสู่ระบบ',
      signInTitle: 'ยินดีต้อนรับ',
      signInSubtitle: 'เข้าสู่ระบบเพื่อดำเนินการต่อ',
      signInFailed: 'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูลของคุณ',
      signingIn: 'กำลังเข้าสู่ระบบ...',
      welcomeBack: 'ยินดีต้อนรับกลับ!',
      pleaseSignIn: 'กรุณาเข้าสู่ระบบ',
      emailAddress: 'ที่อยู่อีเมล',
      password: 'รหัสผ่าน',
      enterYourEmail: 'กรอกอีเมลของคุณ',
      enterYourPassword: 'กรอกรหัสผ่านของคุณ',
      rememberMe: 'จดจำฉัน',
      forgotPassword: 'ลืมรหัสผ่าน?',
      defaultCredentials: 'เริ่มต้น: admin@example.com / admin1234',
      termsAndPrivacy: 'การเข้าสู่ระบบถือว่าคุณยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว',
      
      // Profile
      manageYourProfile: 'จัดการข้อมูลโปรไฟล์ของคุณ',
      profileInformation: 'ข้อมูลโปรไฟล์',
      updateYourPersonalDetails: 'อัปเดตข้อมูลส่วนตัวของคุณ',
      fullName: 'ชื่อเต็ม',
      enterYourName: 'กรอกชื่อของคุณ',
      rolesAndPermissions: 'บทบาทและสิทธิ์',
      yourAssignedRolesAndPermissions: 'บทบาทและสิทธิ์ที่ได้รับมอบหมาย',
      accountInformation: 'ข้อมูลบัญชี',
      accountCreationAndLastUpdate: 'การสร้างบัญชีและการอัปเดตล่าสุด',
      memberSince: 'สมาชิกตั้งแต่',
      lastUpdated: 'อัปเดตล่าสุด',
      commonAccountActions: 'การดำเนินการบัญชีทั่วไป',
      editProfile: 'แก้ไขโปรไฟล์',
      
      // Change Password
      updateYourPassword: 'อัปเดตรหัสผ่านของคุณ',
      enterYourCurrentPasswordAndNewPassword: 'กรอกรหัสผ่านปัจจุบันและรหัสผ่านใหม่',
      currentPassword: 'รหัสผ่านปัจจุบัน',
      newPassword: 'รหัสผ่านใหม่',
      confirmPassword: 'ยืนยันรหัสผ่าน',
      enterCurrentPassword: 'กรอกรหัสผ่านปัจจุบัน',
      enterNewPassword: 'กรอกรหัสผ่านใหม่',
      confirmNewPassword: 'ยืนยันรหัสผ่านใหม่',
      passwordRequirements: 'ข้อกำหนดรหัสผ่าน',
      ensureYourPasswordMeetsTheFollowingCriteria: 'ให้แน่ใจว่ารหัสผ่านของคุณตรงตามเกณฑ์ต่อไปนี้',
      atLeast8Characters: 'อย่างน้อย 8 ตัวอักษร',
      oneUppercaseLetter: 'ตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว',
      oneLowercaseLetter: 'ตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว',
      oneNumber: 'ตัวเลขอย่างน้อย 1 ตัว',
      oneSpecialCharacter: 'อักขระพิเศษอย่างน้อย 1 ตัว',
      passwordsDoNotMatch: 'รหัสผ่านไม่ตรงกัน',
      passwordRequirementsNotMet: 'รหัสผ่านไม่ตรงตามข้อกำหนด',
      passwordUpdatedSuccessfully: 'อัปเดตรหัสผ่านสำเร็จ',
      passwordChangeFailed: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
      securityTips: 'เคล็ดลับความปลอดภัย',
      useUniquePassword: 'ใช้รหัสผ่านที่ไม่ซ้ำกันสำหรับบัญชีนี้',
      avoidPersonalInfo: 'หลีกเลี่ยงการใช้ข้อมูลส่วนตัว',
      changeRegularly: 'เปลี่ยนรหัสผ่านเป็นประจำ',
      dontSharePassword: 'อย่าแชร์รหัสผ่านกับผู้อื่น',
      
      // Language
      language: 'ภาษา',
      selectLanguage: 'เลือกภาษา',
      thailand: 'ไทย',
      unitedStates: 'สหรัฐอเมริกา',
      china: 'จีน',
    }
  },
  zh: {
    translation: {
      // Common
      search: '搜索...',
      signOut: '退出',
      save: '保存',
      cancel: '取消',
      edit: '编辑',
      delete: '删除',
      create: '创建',
      update: '更新',
      loading: '加载中...',
      error: '错误',
      success: '成功',
      warning: '警告',
      info: '信息',
      confirm: '确认',
      reset: '重置',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      close: '关闭',
      open: '打开',
      yes: '是',
      no: '否',
      
      // Navigation
      dashboard: '仪表板',
      profile: '个人资料',
      changePassword: '修改密码',
      users: '用户',
      roles: '角色',
      departments: '部门',
      company: '公司',
      settings: '设置',
      hr: '人力资源',
      accounting: '会计',
      sales: '销售',
      reports: '报告',
      
      // Dashboard
      dashboardWelcome: '欢迎来到您的ERP系统',
      recentActivity: '最近活动',
      latestActions: '系统最新操作',
      commonTasks: '常用任务',
      quickActions: '快速操作',
      
      // Dashboard Stats
      totalUsers: '总用户数',
      revenue: '收入',
      activeProjects: '活跃项目',
      
      // Dashboard Activities
      newUserRegistered: '新用户注册',
      departmentUpdated: '部门更新',
      settingsChanged: '设置更改',
      reportGenerated: '报告生成',
      minutesAgo: '分钟前',
      hourAgo: '小时前',
      hoursAgo: '小时前',
      
      // Dashboard Quick Actions
      addUser: '添加用户',
      createNewUserAccount: '创建新用户账户',
      newDepartment: '新部门',
      addDepartment: '添加部门',
      generateReport: '生成报告',
      createSystemReport: '创建系统报告',
      viewAnalytics: '查看分析',
      systemAnalytics: '系统分析',
      
      // Dashboard Status
      systemStatus: '系统状态',
      allSystemsOperational: '所有系统正常运行',
      performance: '性能',
      uptime: '运行时间',
      lastBackup: '最后备份',
      
      // Header
      searchPlaceholder: '搜索...',
      notifications: '通知',
      darkMode: '深色模式',
      lightMode: '浅色模式',
      adminUser: '管理员',
      standardUser: '普通用户',
      
      // Sidebar
      erpSystem: 'ERP系统',
      online: '在线',
      
      // Sidebar Menu Groups
      coreSystem: '核心系统',
      salesCRM: '销售与客户管理',
      inventoryPurchase: '库存/采购',
      accountingFinance: '会计/财务',
      reportsDashboard: '报告/仪表板',
      systemTools: '系统/工具',
      
      // Core Dashboard
      coreDashboard: '核心仪表板',
      
      // Core Dashboard Content
      coreDashboardWelcome: '欢迎，{{name}}',
      coreDashboardTitle: '企业平台仪表板',
      userInformation: '用户信息',
      name: '姓名',
      email: '电子邮件',
      company: '公司',
      department: '部门',
      position: '职位',
      employeeId: '员工编号',
      availableSystems: '可用系统',
      erpSystem: 'ERP系统',
      erpDescription: '企业资源规划',
      modules: '模块',
      status: '状态',
      active: '活跃',
      carRental: '汽车租赁',
      fleetManagement: '车队管理',
      features: '功能',
      development: '开发中',
      smartClassroom: '智能教室',
      educationManagement: '教育管理',
      quickActions: '快速操作',
      userManagement: '用户管理',
      userManagementDescription: '管理用户、角色和权限',
      systemManagement: '系统管理',
      systemManagementDescription: '管理系统和应用程序',
      auditLogs: '审计日志',
      auditLogsDescription: '查看系统使用日志',
      recentActivity: '最近活动',
      noRecentActivity: '暂无最近活动',
      
      // ERP Dashboard
      erpDashboard: 'ERP仪表板',
      hrDashboard: 'HR仪表板',
      
      // ERP Dashboard Content
      erpDashboardTitle: 'ERP仪表板',
      erpDashboardWelcome: '欢迎回来，{{name}}！高效管理您的业务运营。',
      humanResources: '人力资源',
      hrDescription: '员工管理和人力资源流程',
      inventory: '库存',
      inventoryDescription: '产品和库存管理',
      sales: '销售',
      salesDescription: '客户和销售订单管理',
      purchase: '采购',
      purchaseDescription: '供应商和采购管理',
      accounting: '会计',
      accountingDescription: '财务记录和日记账分录',
      finance: '财务',
      financeDescription: '银行账户和现金流',
      employees: '员工',
      pendingLeave: '待审批请假',
      products: '产品',
      lowStockItems: '库存不足商品',
      customers: '客户',
      pendingOrders: '待处理订单',
      suppliers: '供应商',
      journalEntries: '日记账分录',
      accounts: '账户',
      bankAccounts: '银行账户',
      cashFlow: '现金流',
      accessHrModule: '访问HR模块',
      accessInventory: '访问库存',
      accessSales: '访问销售',
      accessPurchase: '访问采购',
      accessAccounting: '访问会计',
      accessFinance: '访问财务',
      recentActivity: '最近活动',
      
      // Additional Menu Items
      orders: '订单',
      invoices: '发票',
      customers: '客户',
      purchaseOrders: '采购订单',
      journalEntries: '日记账分录',
      bankAccounts: '银行账户',
      mainDashboard: '主仪表板',
      customReports: '自定义报告',
      auditLogs: '审计日志',
      systemRegistry: '系统注册表',
      
      // User Management
      userList: '用户列表',
      userCreate: '创建用户',
      userEdit: '编辑用户',
      userDelete: '删除用户',
      userDetails: '用户详情',
      filter: '筛选',
      export: '导出',
      lastLogin: '最后登录',
      inactive: '未激活',
      showing: '显示',
      to: '到',
      of: '共',
      results: '条结果',
      
      // Core System
      companySettings: '公司设置',
      
      // HR
      employees: '员工',
      leaves: '请假',
      attendance: '考勤',
      payroll: '工资',
      
      // Sales & CRM
      leads: '潜在客户',
      quotations: '报价单',
      
      // Inventory / Purchase
      products: '产品',
      stock: '库存',
      suppliers: '供应商',
      
      // Accounting / Finance
      chartOfAccounts: '会计科目表',
      journals: '日记账',
      arAp: '应收/应付',
      
      // Reports / Dashboard
      
      // System / Tools
      backups: '备份',
      logs: '日志',
      apiKeys: 'API密钥',
      
      // Car Rental System
      carRentalSystem: '汽车租赁系统',
      fleetManagement: '车队管理',
      bookings: '预订',
      locations: '地点',
      payments: '付款',
      maintenance: '维护',
      rentalDashboard: '租赁仪表板',
      
      // Smart Classroom System
      smartClassroomSystem: '智能教室管理系统',
      classrooms: '教室',
      schedules: '课程表',
      equipment: '设备',
      presentations: '演示',
      recordings: '录制',
      network: '网络',
      classroomDashboard: '教室仪表板',
      
      // Auth
      signIn: '登录',
      signInTitle: '欢迎回来',
      signInSubtitle: '登录您的账户以继续',
      signInFailed: '登录失败。请检查您的凭据。',
      signingIn: '正在登录...',
      welcomeBack: '欢迎回来！',
      pleaseSignIn: '请登录您的账户',
      emailAddress: '电子邮件地址',
      password: '密码',
      enterYourEmail: '输入您的电子邮件',
      enterYourPassword: '输入您的密码',
      rememberMe: '记住我',
      forgotPassword: '忘记密码？',
      defaultCredentials: '默认：admin@example.com / admin1234',
      termsAndPrivacy: '登录即表示您同意我们的服务条款和隐私政策',
      
      // Profile
      manageYourProfile: '管理您的个人资料信息',
      profileInformation: '个人资料信息',
      updateYourPersonalDetails: '更新您的个人详细信息',
      fullName: '全名',
      enterYourName: '输入您的姓名',
      rolesAndPermissions: '角色和权限',
      yourAssignedRolesAndPermissions: '您分配的角色和权限',
      accountInformation: '账户信息',
      accountCreationAndLastUpdate: '账户创建和最后更新',
      memberSince: '注册时间',
      lastUpdated: '最后更新',
      commonAccountActions: '常见账户操作',
      editProfile: '编辑个人资料',
      
      // Change Password
      updateYourPassword: '更新您的密码',
      enterYourCurrentPasswordAndNewPassword: '输入您当前的密码和新密码',
      currentPassword: '当前密码',
      newPassword: '新密码',
      confirmPassword: '确认密码',
      enterCurrentPassword: '输入当前密码',
      enterNewPassword: '输入新密码',
      confirmNewPassword: '确认新密码',
      passwordRequirements: '密码要求',
      ensureYourPasswordMeetsTheFollowingCriteria: '确保您的密码符合以下标准',
      atLeast8Characters: '至少8个字符',
      oneUppercaseLetter: '至少一个大写字母',
      oneLowercaseLetter: '至少一个小写字母',
      oneNumber: '至少一个数字',
      oneSpecialCharacter: '至少一个特殊字符',
      passwordsDoNotMatch: '密码不匹配',
      passwordRequirementsNotMet: '密码不符合要求',
      passwordUpdatedSuccessfully: '密码更新成功',
      passwordChangeFailed: '密码更改失败',
      securityTips: '安全提示',
      useUniquePassword: '为此账户使用唯一密码',
      avoidPersonalInfo: '避免使用个人信息',
      changeRegularly: '定期更改密码',
      dontSharePassword: '永远不要与他人分享您的密码',
      
      // Language
      language: '语言',
      selectLanguage: '选择语言',
      thailand: '泰国',
      unitedStates: '美国',
      china: '中国',
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n