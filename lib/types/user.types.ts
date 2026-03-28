export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  mfaEnabled: boolean
  locale: string
  createdDate: string
  roles: string[]
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export interface StoredUser {
  firstName: string
  lastName: string
  email: string
  mfaEnabled: boolean
  locale: string
}

export interface UpdateUser {
  firstName: string
  lastName: string
  email: string
  password: string
}
