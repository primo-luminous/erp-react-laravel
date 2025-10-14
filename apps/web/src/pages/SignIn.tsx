import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCoreAuth } from '../context/CoreAuthContext'
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
  BuildingOfficeIcon,
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { branding } from '../config/branding'
import { useTranslation } from 'react-i18next'

export default function SignIn() {
  const { t } = useTranslation()
  const { login } = useCoreAuth()
  const loading = false // Mock loading state
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await login({ email, password })
      navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.message ?? t('signInFailed'))
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-300/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 animate-in-up">
        {/* Logo and branding */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 shadow-glow">
              <BuildingOfficeIcon className="h-10 w-10 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold gradient-text-primary">
                {branding.companyName}
              </span>
              <p className="text-sm text-neutral-600 mt-1">{branding.companyTagline}</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            {t('signInTitle')}
          </h2>
          <p className="text-neutral-600 text-lg">
            {t('signInSubtitle')}
          </p>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 animate-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="relative">
          {/* Glass effect background */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl"></div>
          
          <Card className="relative bg-white/80 backdrop-blur-xl border-white/20 shadow-large">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-neutral-900">
                {t('welcomeBack')}
              </CardTitle>
              <CardDescription className="text-neutral-600">
                {t('pleaseSignIn')}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      {t('emailAddress')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('enterYourEmail')}
                      leftIcon={<BuildingOfficeIcon className="h-5 w-5" />}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      {t('password')}
                    </label>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('enterYourPassword')}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-neutral-400 hover:text-neutral-600"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-neutral-700"
                    >
                      {t('rememberMe')}
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                    >
                      {t('forgotPassword')}
                    </a>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl bg-error-50 border border-error-200 p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-5 w-5 text-error-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-error-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  variant="gradient"
                  loading={loading}
                >
                  {loading ? t('signingIn') : t('signIn')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Footer info */}
          <div className="mt-8 text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-neutral-500">
              <SparklesIcon className="h-4 w-4" />
              <span>{t('defaultCredentials')}</span>
            </div>
            <p className="text-xs text-neutral-400">
              {t('termsAndPrivacy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}