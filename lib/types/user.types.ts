export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  mfaEnabled: boolean
  locale: string
  createdDate: string
  roles?: string[]
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

export interface AdminUser {
  id: number
  firstName: string
  lastName: string
  email: string
  role: "ROLE_ADMIN" | "ROLE_USER"
  mfaEnabled: boolean
  locale: string
  createdAt: Date
}

export interface AdminUserResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  role: "ROLE_ADMIN" | "ROLE_USER"
  mfaEnabled: boolean
  locale: string
  createdDate: string
}
