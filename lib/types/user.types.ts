export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  mfaEnabled: boolean
  createdDate: string
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
}

export interface UpdateUser {
  firstName: string
  lastName: string
  email: string
  password: string
}
