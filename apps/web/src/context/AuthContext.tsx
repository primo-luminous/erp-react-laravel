import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { fetchMe, login, setAuthToken } from '../lib/api'
import type { LoginResponse } from '../lib/api'
type AuthState = {
  user: LoginResponse['user'] | null
  token: string | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  loading: boolean
}
const AuthCtx = createContext<AuthState | undefined>(undefined)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthState['user']>(null)
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('auth_token')
  )
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    setAuthToken(token)
    if (!token) {
      setLoading(false)
      return
    }
    fetchMe()
      .then((u) => setUser(u))
      .finally(() => setLoading(false))
  }, [token])
  const signIn = useCallback(async (email: string, password: string) => {
    const data = await login(email, password)
    localStorage.setItem('auth_token', data.token)
    setToken(data.token)
    setUser(data.user)
  }, [])
  const signOut = useCallback(() => {
    localStorage.removeItem('auth_token')
    setToken(null)
    setUser(null)
    setAuthToken(null)
  }, [])
  const value = useMemo<AuthState>(
    () => ({ user, token, signIn, signOut, loading }),
    [user, token, signIn, signOut, loading]
  )
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}