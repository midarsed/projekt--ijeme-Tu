'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from './supabase'

type AuthUser = { id: string; email: string; role: 'user' | 'admin' | 'team'; verified?: boolean }
type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  register: (email: string, password: string) => Promise<{ error?: string; message?: string }>
  forgotPassword: (email: string) => Promise<{ error?: string; message?: string }>
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
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }
    if (!data?.session || !data.user) return { error: 'Přihlášení selhalo.' }

    const user = {
      id: data.user.id,
      email: data.user.email || '',
      role: 'user' as const,
      verified: !!data.user.email_confirmed_at
    }
    setUser(user)
    localStorage.setItem('zijemetu_user', JSON.stringify(user))
    return {}
  }

  const register = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://www.zijemetustraznice.cz/vitejte'
      }
    })
    if (error) return { error: error.message }
    return { message: 'Registrace byla úspěšná! Zkontroluj svůj e-mail a potvrď svůj účet.' }
  }

  const forgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://www.zijemetustraznice.cz/obnova-hesla'
    })
    if (error) return { error: error.message }
    return { message: 'Odkaz pro obnovení hesla byl odeslán na tvůj email.' }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem('zijemetu_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
