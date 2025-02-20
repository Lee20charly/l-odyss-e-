// Service pour gérer l'état d'authentification
export const authService = {
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
    const user = localStorage.getItem("user")
    return !!user
  },

  getUser() {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },

  setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user))
  },

  logout() {
    localStorage.removeItem("user")
  },
}

