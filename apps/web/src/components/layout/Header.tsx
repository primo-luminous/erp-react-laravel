'use client'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCoreAuth } from '../../context/CoreAuthContext'
import {
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  KeyIcon,
} from '@heroicons/react/24/outline'
import { branding } from '../../config/branding'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export function Header() {
  const { i18n, t } = useTranslation()
  const { user, logout } = useCoreAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [notificationCount] = useState(3) // จำนวนการแจ้งเตือน
  const [darkMode, setDarkMode] = useState(() => {
    // ตั้งค่าเริ่มต้นเป็น light mode (กลางวัน)
    const saved = localStorage.getItem('theme')
    return saved === 'dark'
  })

  // ใช้ useEffect เพื่อจัดการ theme
  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <header className="sticky top-0 z-50 glass-enhanced border-b border-slate-200/30 dark:border-slate-700/30 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
              className="w-full pl-10 pr-4 py-2.5"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Branding */}
          <div className="hidden md:flex items-center text-sm text-slate-600 dark:text-slate-300 mr-2">
            <span className="font-bold text-slate-800 dark:text-slate-100 mr-1 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">{branding.companyName}</span>
            <span className="hidden lg:inline text-slate-500 dark:text-slate-400">{branding.companyTagline}</span>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200 hover:scale-105"
            title={darkMode ? t('darkMode') : t('lightMode')}
          >
            {darkMode ? (
              <MoonIcon className="h-5 w-5 text-white" />
            ) : (
              <SunIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            )}
          </Button>

          {/* Language Selector */}
          <div className="relative">
            <LanguageDropdown
              current={i18n.language}
              onSelect={(lng) => {
                i18n.changeLanguage(lng)
                localStorage.setItem('lang', lng)
              }}
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200 hover:scale-105"
              title={t('notifications')}
            >
              <BellIcon className="h-5 w-5 text-slate-600 dark:text-white" />
            </Button>
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg border-2 border-white dark:border-slate-800 z-[60]">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700/50"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-300">{user?.roles.join(', ')}</p>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-slate-400 dark:text-slate-300" />
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 shadow-large border border-slate-200/50 dark:border-slate-700/50 py-2 z-50 rounded-xl">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">{user?.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <UserIcon className="h-4 w-4 mr-3" />
                    {t('profile')}
                  </Link>
                  <Link
                    to="/change-password"
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <KeyIcon className="h-4 w-4 mr-3" />
                    {t('changePassword')}
                  </Link>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-700 py-1">
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="w-full justify-start px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                    {t('signOut')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

/* ------------------------- 🇹🇭 Flag Renderer ------------------------- */
function Flag({ code }: { code: 'th' | 'en' | 'zh' }) {
  const flags: Record<'th' | 'en' | 'zh', string> = {
    th: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 480'%3E%3Cpath fill='%23DA1212' d='M0 0h640v480H0z'/%3E%3Cpath fill='%23FFFFFF' d='M0 96h640v288H0z'/%3E%3Cpath fill='%232D2A4A' d='M0 192h640v96H0z'/%3E%3C/svg%3E",
    en: 'data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 513 342%27%3e%3cpath fill=%27%23fff%27 d=%27M0 0h513v342H0z%27/%3e%3cpath d=%27M0 0h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.7h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513V342H0z%27 fill=%27%23D80027%27/%3e%3cpath fill=%27%232E52B2%27 d=%27M0 0h256.5v184.1H0z%27/%3e%3cpath d=%27m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zm56.3 0-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zm56.5 0-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zm56.2 0-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zm-56.2 0-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zm112.5 0-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zm56.5 0-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zm-169-50.6-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zm56.2 0-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zm56.3 0-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zm56.5 0-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z%27 fill=%27%23fff%27/%3e%3c/svg%3e',
    zh: 'data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 513 342%27%3e%3cpath fill=%27%23de2910%27 d=%27M0 0h513v342H0z%27/%3e%3cpath fill=%27%23ffde00%27 d=%27m114.4 85.8 22.6 69.7-59.2-43h73.2l-59.2 43 22.6-69.7zm64.1 11.4 6.7 20.5-17.6-12.8h21.8l-17.6 12.8 6.7-20.5zm29.3 31.2 11.3 17.4-19.1-8.5 18.3 11.3-11.3-17.4 .8 21.6zm-11 39.2 17.5 11.3-21.6-.8 17.4 11.3-19.1-8.5 6.7 20.5zm-37.8 24.5 20.5 6.7-21.6-.8 20.5 6.7-19.1-8.5 11.3 17.4z%27/%3e%3c/svg%3e'
  }
  
  return (
    <img
      src={flags[code]}
      alt={code}
      className="inline-block rounded-sm"
      style={{ width: '20px', height: '14px' }}
    />
  )
}

/* ---------------------- 🌍 Language Dropdown ----------------------- */
function LanguageDropdown({
  current,
  onSelect,
}: {
  current: string
  onSelect: (lng: 'th' | 'en' | 'zh') => void
}) {
  const [open, setOpen] = useState(false)
  
  const labelMap: Record<string, { lang: string; country: string }> = {
    th: { lang: 'ไทย', country: 'Thailand' },
    en: { lang: 'English', country: 'United States' },
    zh: { lang: '中文', country: 'China' },
  }
  const ordered: Array<'th' | 'en' | 'zh'> = ['th', 'en', 'zh']
  const active = (['th', 'en', 'zh'].includes(current) ? current : 'en') as
    | 'th'
    | 'en'
    | 'zh'

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2"
      >
        <Flag code={active} />
        <div className="flex flex-col items-start leading-tight">
          <span className="font-medium text-sm text-slate-900 dark:text-white">{labelMap[active].lang}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">{labelMap[active].country}</span>
        </div>
        <ChevronDownIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 shadow-large border border-slate-200/50 dark:border-slate-700/50 py-2 z-50 rounded-xl">
          {ordered.map((lng) => (
            <Button
              key={lng}
              variant="ghost"
              onClick={() => {
                onSelect(lng)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                lng === active ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              <Flag code={lng} />
              <div className="flex flex-col items-start leading-tight">
                <span>{labelMap[lng].lang}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{labelMap[lng].country}</span>
              </div>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}