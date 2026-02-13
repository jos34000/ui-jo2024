interface User {
  id: number
  email: string
  firstName?: string
  lastName?: string
  mfaEnabled: boolean
  createdDate: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}
