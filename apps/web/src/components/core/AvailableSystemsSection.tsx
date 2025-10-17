/**
 * Available Systems Section Component
 * 
 * Component สำหรับแสดงส่วนระบบที่สามารถเข้าถึงได้
 */

import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { SystemCard } from './SystemCard'
import { PermissionGate } from './PermissionGate'
import {
  ChartBarIcon,
  TruckIcon,
  AcademicCapIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  CpuChipIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  CogIcon,
  ShieldCheckIcon,
  HomeIcon,
  HeartIcon,
  WrenchScrewdriverIcon,
  GlobeAltIcon,
  CloudIcon,
  LockClosedIcon,
  ChartPieIcon,
  DocumentTextIcon,
  BeakerIcon,
  CameraIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  MapIcon,
  CurrencyDollarIcon,
  BuildingOffice2Icon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
  FireIcon,
  BoltIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export const AvailableSystemsSection: FC = () => {
  const { t } = useTranslation()

  const systems = [
    // Core Business Systems
    {
      id: 'erp',
      title: t('erpSystem'),
      description: t('erpDescription'),
      icon: <ChartBarIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 6,
      color: 'green' as const,
      href: '/erp',
      permission: 'erp.access'
    },
    {
      id: 'accounting',
      title: t('accountingSystem'),
      description: t('accountingDescription'),
      icon: <BanknotesIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 5,
      color: 'teal' as const,
      permission: 'accounting.access'
    },
    {
      id: 'inventory',
      title: t('inventorySystem'),
      description: t('inventoryDescription'),
      icon: <BuildingStorefrontIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 4,
      color: 'indigo' as const,
      permission: 'inventory.access'
    },
    {
      id: 'crm',
      title: t('crmSystem'),
      description: t('crmDescription'),
      icon: <UserGroupIcon className="h-8 w-8" />,
      status: 'active' as const,
      features: 6,
      color: 'pink' as const,
      permission: 'crm.access'
    },
    {
      id: 'ecommerce',
      title: t('ecommerceSystem'),
      description: t('ecommerceDescription'),
      icon: <ShoppingCartIcon className="h-8 w-8" />,
      status: 'active' as const,
      features: 4,
      color: 'blue' as const,
      permission: 'ecommerce.access'
    },
    
    // Human Resources & Education
    {
      id: 'hr',
      title: t('hrSystem'),
      description: t('hrDescription'),
      icon: <UserGroupIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 8,
      color: 'purple' as const,
      permission: 'hr.access'
    },
    {
      id: 'classroom',
      title: t('smartClassroom'),
      description: t('educationManagement'),
      icon: <AcademicCapIcon className="h-8 w-8" />,
      status: 'active' as const,
      features: 5,
      color: 'purple' as const,
      permission: 'classroom.access'
    },
    {
      id: 'lms',
      title: t('lmsSystem'),
      description: t('lmsDescription'),
      icon: <DocumentTextIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 6,
      color: 'blue' as const,
      permission: 'lms.access'
    },
    
    // Healthcare & Medical
    {
      id: 'his',
      title: t('hisSystem'),
      description: t('hisDescription'),
      icon: <HeartIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 12,
      color: 'red' as const,
      permission: 'his.access'
    },
    {
      id: 'pharmacy',
      title: t('pharmacySystem'),
      description: t('pharmacyDescription'),
      icon: <BeakerIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 4,
      color: 'green' as const,
      permission: 'pharmacy.access'
    },
    
    // Transportation & Logistics
    {
      id: 'rental',
      title: t('carRental'),
      description: t('fleetManagement'),
      icon: <TruckIcon className="h-8 w-8" />,
      status: 'active' as const,
      features: 5,
      color: 'orange' as const,
      permission: 'rental.access'
    },
    {
      id: 'logistics',
      title: t('logisticsSystem'),
      description: t('logisticsDescription'),
      icon: <MapIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 6,
      color: 'indigo' as const,
      permission: 'logistics.access'
    },
    
    // Real Estate & Property
    {
      id: 'property',
      title: t('propertySystem'),
      description: t('propertyDescription'),
      icon: <HomeIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 7,
      color: 'blue' as const,
      permission: 'property.access'
    },
    {
      id: 'facility',
      title: t('facilitySystem'),
      description: t('facilityDescription'),
      icon: <WrenchScrewdriverIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 5,
      color: 'orange' as const,
      permission: 'facility.access'
    },
    
    // Technology & IT
    {
      id: 'iot',
      title: t('iotSystem'),
      description: t('iotDescription'),
      icon: <CpuChipIcon className="h-8 w-8" />,
      status: 'active' as const,
      features: 8,
      color: 'red' as const,
      permission: 'iot.access'
    },
    {
      id: 'cloud',
      title: t('cloudSystem'),
      description: t('cloudDescription'),
      icon: <CloudIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 10,
      color: 'blue' as const,
      permission: 'cloud.access'
    },
    {
      id: 'security',
      title: t('securitySystem'),
      description: t('securityDescription'),
      icon: <LockClosedIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 6,
      color: 'red' as const,
      permission: 'security.access'
    },
    
    // Media & Entertainment
    {
      id: 'media',
      title: t('mediaSystem'),
      description: t('mediaDescription'),
      icon: <CameraIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 8,
      color: 'purple' as const,
      permission: 'media.access'
    },
    {
      id: 'music',
      title: t('musicSystem'),
      description: t('musicDescription'),
      icon: <MusicalNoteIcon className="h-8 w-8" />,
      status: 'active' as const,
      features: 5,
      color: 'pink' as const,
      permission: 'music.access'
    },
    {
      id: 'design',
      title: t('designSystem'),
      description: t('designDescription'),
      icon: <PaintBrushIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 6,
      color: 'purple' as const,
      permission: 'design.access'
    },
    
    // Financial Services
    {
      id: 'banking',
      title: t('bankingSystem'),
      description: t('bankingDescription'),
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 15,
      color: 'green' as const,
      permission: 'banking.access'
    },
    {
      id: 'insurance',
      title: t('insuranceSystem'),
      description: t('insuranceDescription'),
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 8,
      color: 'blue' as const,
      permission: 'insurance.access'
    },
    
    // Government & Public Services
    {
      id: 'government',
      title: t('governmentSystem'),
      description: t('governmentDescription'),
      icon: <BuildingOffice2Icon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 20,
      color: 'indigo' as const,
      permission: 'government.access'
    },
    {
      id: 'citizen',
      title: t('citizenSystem'),
      description: t('citizenDescription'),
      icon: <UserGroupIcon className="h-8 w-8" />,
      status: 'active' as const,
      features: 10,
      color: 'blue' as const,
      permission: 'citizen.access'
    },
    
    // Communication & Collaboration
    {
      id: 'communication',
      title: t('communicationSystem'),
      description: t('communicationDescription'),
      icon: <PhoneIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 6,
      color: 'green' as const,
      permission: 'communication.access'
    },
    {
      id: 'email',
      title: t('emailSystem'),
      description: t('emailDescription'),
      icon: <EnvelopeIcon className="h-8 w-8" />,
      status: 'active' as const,
      features: 4,
      color: 'blue' as const,
      permission: 'email.access'
    },
    
    // Project Management & Productivity
    {
      id: 'project',
      title: t('projectSystem'),
      description: t('projectDescription'),
      icon: <ChartPieIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 8,
      color: 'orange' as const,
      permission: 'project.access'
    },
    {
      id: 'calendar',
      title: t('calendarSystem'),
      description: t('calendarDescription'),
      icon: <CalendarIcon className="h-8 w-8" />,
      status: 'active' as const,
      features: 3,
      color: 'blue' as const,
      permission: 'calendar.access'
    },
    
    // Analytics & Business Intelligence
    {
      id: 'analytics',
      title: t('analyticsSystem'),
      description: t('analyticsDescription'),
      icon: <ChartBarIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 12,
      color: 'purple' as const,
      permission: 'analytics.access'
    },
    {
      id: 'reporting',
      title: t('reportingSystem'),
      description: t('reportingDescription'),
      icon: <DocumentTextIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 6,
      color: 'indigo' as const,
      permission: 'reporting.access'
    },
    
    // Energy & Utilities
    {
      id: 'energy',
      title: t('energySystem'),
      description: t('energyDescription'),
      icon: <BoltIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 8,
      color: 'yellow' as const,
      permission: 'energy.access'
    },
    {
      id: 'utilities',
      title: t('utilitiesSystem'),
      description: t('utilitiesDescription'),
      icon: <WrenchScrewdriverIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 6,
      color: 'orange' as const,
      permission: 'utilities.access'
    },
    
    // Environmental & Sustainability
    {
      id: 'environment',
      title: t('environmentSystem'),
      description: t('environmentDescription'),
      icon: <SunIcon className="h-8 w-8" />,
      status: 'active' as const,
      modules: 5,
      color: 'green' as const,
      permission: 'environment.access'
    },
    {
      id: 'sustainability',
      title: t('sustainabilitySystem'),
      description: t('sustainabilityDescription'),
      icon: <SparklesIcon className="h-8 w-8" />,
      status: 'active' as const,
      features: 4,
      color: 'emerald' as const,
      permission: 'sustainability.access'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CogIcon className="h-5 w-5 text-blue-600" />
          {t('availableSystems')}
        </CardTitle>
        <CardDescription>
          {t('availableSystemsDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {systems.map((system) => (
            <PermissionGate key={system.id} permissions={[system.permission]}>
              <SystemCard
                title={system.title}
                description={system.description}
                icon={system.icon}
                status={system.status}
                modules={system.modules}
                features={system.features}
                href={system.href}
                color={system.color}
              />
            </PermissionGate>
          ))}
        </div>

        {/* System Status Summary */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5 text-green-600" />
            {t('systemStatusSummary')}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {systems.filter(s => s.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('active')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {systems.filter(s => s.status === 'development').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('development')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {systems.filter(s => s.status === 'maintenance').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('maintenance')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {systems.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('total')}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
