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
      departments: 'Departments',
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
      roles: 'Roles',
      accountInformation: 'Account Information',
      accountCreationAndLastUpdate: 'Account creation and last update',
      memberSince: 'Member Since',
      lastUpdated: 'Last Updated',
      quickActions: 'Quick Actions',
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
      
      // Dashboard
      dashboardWelcome: 'Welcome to your dashboard',
      recentActivity: 'Recent Activity',
      latestActions: 'Latest system actions',
      commonTasks: 'Common tasks and shortcuts',
      
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
      departments: 'แผนก',
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
      roles: 'บทบาท',
      accountInformation: 'ข้อมูลบัญชี',
      accountCreationAndLastUpdate: 'การสร้างบัญชีและการอัปเดตล่าสุด',
      memberSince: 'สมาชิกตั้งแต่',
      lastUpdated: 'อัปเดตล่าสุด',
      quickActions: 'การดำเนินการด่วน',
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
      
      // Dashboard
      dashboardWelcome: 'ยินดีต้อนรับสู่แดชบอร์ดของคุณ',
      recentActivity: 'กิจกรรมล่าสุด',
      latestActions: 'การดำเนินการล่าสุดของระบบ',
      commonTasks: 'งานทั่วไปและทางลัด',
      
      // Language
      language: 'ภาษา',
      selectLanguage: 'เลือกภาษา',
      thailand: 'ประเทศไทย',
      unitedStates: 'สหรัฐอเมริกา',
      china: 'จีน',
    }
  },
  zh: {
    translation: {
      // Common
      search: '搜索...',
      signOut: '退出登录',
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
      dashboardWelcome: '欢迎使用您的ERP系统',
      recentActivity: '最近活动',
      latestActions: '系统中的最新操作',
      commonTasks: '常用任务',
      quickActions: '快速操作',
      
      // Dashboard Stats
      totalUsers: '总用户数',
      departments: '部门',
      revenue: '收入',
      activeProjects: '活跃项目',
      
      // Dashboard Activities
      newUserRegistered: '新用户注册',
      departmentUpdated: '部门已更新',
      settingsChanged: '设置已更改',
      reportGenerated: '报告已生成',
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
      roles: '角色',
      accountInformation: '账户信息',
      accountCreationAndLastUpdate: '账户创建和最后更新',
      memberSince: '注册时间',
      lastUpdated: '最后更新',
      quickActions: '快速操作',
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
      
      // Dashboard
      dashboardWelcome: '欢迎来到您的仪表板',
      recentActivity: '最近活动',
      latestActions: '最新的系统操作',
      commonTasks: '常见任务和快捷方式',
      
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
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n