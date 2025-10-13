import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/Card'
import {
  UserIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  CalendarIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  SparklesIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface ProfileData {
  id: number
  name: string
  email: string
  roles: string[]
  permissions: string[]
  created_at: string
  updated_at: string
}

export default function Profile() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  // Load profile data
  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      const response = await api.get('/profile')
      const data = response.data.data
      setProfileData(data)
      setFormData({
        name: data.name,
        email: data.email,
      })
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setError(null)
    setSuccess(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      name: profileData?.name || '',
      email: profileData?.email || '',
    })
    setError(null)
    setSuccess(null)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      const response = await api.put('/profile', formData)
      const data = response.data.data
      
      setProfileData(data)
      setIsEditing(false)
      setSuccess('Profile updated successfully')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="spinner h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="animate-in-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500">
              <UserIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text-primary">
                {t('profile')}
              </h1>
              <p className="text-neutral-600 mt-1">
                {t('manageYourProfile')}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  variant="gradient"
                  loading={saving}
                  className="flex items-center space-x-2"
                >
                  <CheckIcon className="h-4 w-4" />
                  <span>{t('save')}</span>
                </Button>
                <Button
                  onClick={handleCancel}
                  disabled={saving}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <XMarkIcon className="h-4 w-4" />
                  <span>{t('cancel')}</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={handleEdit}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <PencilIcon className="h-4 w-4" />
                <span>{t('editProfile')}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="rounded-xl bg-success-50 border border-success-200 p-4 animate-in-up">
          <div className="flex items-center">
            <CheckIcon className="h-5 w-5 text-success-500 mr-3" />
            <p className="text-sm text-success-700">{success}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="rounded-xl bg-error-50 border border-error-200 p-4 animate-in-up">
          <div className="flex items-center">
            <XMarkIcon className="h-5 w-5 text-error-500 mr-3" />
            <p className="text-sm text-error-700">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="animate-in-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-primary-500" />
                <CardTitle>{t('profileInformation')}</CardTitle>
              </div>
              <CardDescription>
                {t('updateYourPersonalDetails')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('fullName')}
                </label>
                {isEditing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={t('enterYourName')}
                    leftIcon={<UserIcon className="h-5 w-5" />}
                  />
                ) : (
                  <div className="px-4 py-3 bg-neutral-50 rounded-xl text-neutral-900 border border-neutral-200">
                    {profileData?.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('emailAddress')}
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={t('enterYourEmail')}
                    leftIcon={<EnvelopeIcon className="h-5 w-5" />}
                  />
                ) : (
                  <div className="px-4 py-3 bg-neutral-50 rounded-xl text-neutral-900 border border-neutral-200">
                    {profileData?.email}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Roles & Permissions */}
          <Card className="animate-in-up" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-5 w-5 text-secondary-500" />
                <CardTitle>{t('rolesAndPermissions')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-3">{t('roles')}</h4>
                <div className="flex flex-wrap gap-2">
                  {profileData?.roles.map((role) => (
                    <span
                      key={role}
                      className="badge-primary"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-3">{t('permissions')}</h4>
                <div className="text-sm text-neutral-500">
                  {profileData?.permissions.length} {t('permissions')}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Info */}
          <Card className="animate-in-up" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-accent-500" />
                <CardTitle>{t('accountInformation')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-neutral-700">{t('memberSince')}</h4>
                <p className="text-sm text-neutral-500">
                  {profileData?.created_at ? new Date(profileData.created_at).toLocaleDateString() : '-'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral-700">{t('lastUpdated')}</h4>
                <p className="text-sm text-neutral-500">
                  {profileData?.updated_at ? new Date(profileData.updated_at).toLocaleDateString() : '-'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="animate-in-up" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-5 w-5 text-warning-500" />
                <CardTitle>{t('quickActions')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/change-password')}
              >
                <KeyIcon className="h-4 w-4 mr-2" />
                {t('changePassword')}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-error-600 hover:text-error-700 hover:bg-error-50"
                onClick={signOut}
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                {t('signOut')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}