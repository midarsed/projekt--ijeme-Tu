'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type AuthUser = { id: string; email: string; role: 'user' | 'admin' | 'team' }
type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  register: (email: string, password: string) => Promise<{ error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('zijemetu_user')
    if (stored) { try { setUser(JSON.parse(stored)) } catch {} }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.error) return { error: data.error }
    setUser(data.user)
    localStorage.setItem('zijemetu_user', JSON.stringify(data.user))
    return {}
  }

  const register = async (email: string, password: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.error) return { error: data.error }
    setUser(data.user)
    localStorage.setItem('zijemetu_user', JSON.stringify(data.user))
    return {}
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('zijemetu_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
