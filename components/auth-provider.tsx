"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authService } from "@/lib/auth-service"

type AuthContextType = {
  isAuthenticated: boolean
  user: any
  login: (user: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const isAuth = authService.isAuthenticated()
    setIsAuthenticated(isAuth)
    if (isAuth) {
      setUser(authService.getUser())
    }
  }, [])

  const login = (userData: any) => {
    // Stocker les données utilisateur dans un cookie
    document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`

    authService.setUser(userData)
    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    // Supprimer le cookie
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"

    authService.logout()
    setIsAuthenticated(false)
    setUser(null)
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

