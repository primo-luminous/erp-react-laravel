import { useState } from 'react'
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
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function ChangePassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const passwordRequirements = {
    minLength: formData.newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.newPassword),
    hasLowercase: /[a-z]/.test(formData.newPassword),
    hasNumber: /[0-9]/.test(formData.newPassword),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword),
  }

  const allRequirementsMet = Object.values(passwordRequirements).every(Boolean)
  const passwordsMatch = formData.newPassword === formData.confirmPassword && formData.newPassword !== ''

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError(null)
    setSuccess(null)
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (!allRequirementsMet) {
      setError(t('passwordRequirementsNotMet'))
      setLoading(false)
      return
    }

    if (!passwordsMatch) {
      setError(t('passwordsDoNotMatch'))
      setLoading(false)
      return
    }

    try {
      await api.post('/profile/change-password', {
        current_password: formData.currentPassword,
        password: formData.newPassword,
        password_confirmation: formData.confirmPassword,
      })
      
      setSuccess(t('passwordUpdatedSuccessfully'))
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (err: any) {
      setError(err?.response?.data?.message || t('passwordChangeFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setError(null)
    setSuccess(null)
  }

  const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
    <li className={`flex items-center gap-2 text-sm ${met ? 'text-success-600' : 'text-neutral-500'}`}>
      {met ? <CheckCircleIcon className="h-4 w-4" /> : <XCircleIcon className="h-4 w-4" />}
      {text}
    </li>
  )

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="animate-in-up">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="hover:bg-neutral-100"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-warning-500 to-error-500">
              <KeyIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text-primary">
                {t('changePassword')}
              </h1>
              <p className="text-neutral-600 mt-1">
                {t('updateYourPassword')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="rounded-xl bg-success-50 border border-success-200 p-4 animate-in-up">
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-success-500 mr-3" />
            <p className="text-sm text-success-700">{success}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="rounded-xl bg-error-50 border border-error-200 p-4 animate-in-up">
          <div className="flex items-center">
            <XCircleIcon className="h-5 w-5 text-error-500 mr-3" />
            <p className="text-sm text-error-700">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Change Password Form */}
        <div className="lg:col-span-2">
          <Card className="animate-in-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-5 w-5 text-primary-500" />
                <CardTitle>{t('changePassword')}</CardTitle>
              </div>
              <CardDescription>
                {t('enterYourCurrentPasswordAndNewPassword')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('currentPassword')}
                  </label>
                  <Input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    placeholder={t('enterCurrentPassword')}
                    leftIcon={<KeyIcon className="h-5 w-5" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="text-neutral-400 hover:text-neutral-600"
                      >
                        {showPasswords.current ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('newPassword')}
                  </label>
                  <Input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    placeholder={t('enterNewPassword')}
                    leftIcon={<KeyIcon className="h-5 w-5" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="text-neutral-400 hover:text-neutral-600"
                      >
                        {showPasswords.new ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('confirmPassword')}
                  </label>
                  <Input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder={t('confirmNewPassword')}
                    leftIcon={<KeyIcon className="h-5 w-5" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="text-neutral-400 hover:text-neutral-600"
                      >
                        {showPasswords.confirm ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    }
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    {t('reset')}
                  </Button>
                  <Button
                    type="submit"
                    variant="gradient"
                    disabled={loading || !allRequirementsMet || !passwordsMatch}
                    loading={loading}
                  >
                    {t('changePassword')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Password Requirements */}
        <div className="space-y-6">
          <Card className="animate-in-up" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-5 w-5 text-warning-500" />
                <CardTitle>{t('passwordRequirements')}</CardTitle>
              </div>
              <CardDescription>
                {t('ensureYourPasswordMeetsTheFollowingCriteria')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <RequirementItem
                  met={passwordRequirements.minLength}
                  text={t('atLeast8Characters')}
                />
                <RequirementItem
                  met={passwordRequirements.hasUppercase}
                  text={t('oneUppercaseLetter')}
                />
                <RequirementItem
                  met={passwordRequirements.hasLowercase}
                  text={t('oneLowercaseLetter')}
                />
                <RequirementItem
                  met={passwordRequirements.hasNumber}
                  text={t('oneNumber')}
                />
                <RequirementItem
                  met={passwordRequirements.hasSpecialChar}
                  text={t('oneSpecialCharacter')}
                />
                {formData.newPassword !== '' && !passwordsMatch && (
                  <li className="flex items-center gap-2 text-sm text-error-600">
                    <XCircleIcon className="h-4 w-4" />
                    {t('passwordsDoNotMatch')}
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card className="animate-in-up" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-5 w-5 text-accent-500" />
                <CardTitle>{t('securityTips')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>• {t('useUniquePassword')}</li>
                <li>• {t('avoidPersonalInfo')}</li>
                <li>• {t('changeRegularly')}</li>
                <li>• {t('dontSharePassword')}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}