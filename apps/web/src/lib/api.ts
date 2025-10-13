// create axios client for API
import axios from 'axios'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1'
export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false,
})
export function setAuthToken(token: string | null) {
  if (token) {
    (api.defaults.headers as any).common.Authorization = `Bearer ${token}`
  } else {
    delete (api.defaults.headers as any).common.Authorization
  }
}
export type LoginResponse = {
  token: string
  user: {
    id: number
    name: string
    email: string
    roles: string[]
    permissions: string[]
  }
}
export async function login(email: string, password: string) {
  const { data } = await api.post<LoginResponse>('/login', { email, password })
  return data
}
export async function fetchMe() {
  const { data } = await api.get('/me')
  return data as LoginResponse['user']
}