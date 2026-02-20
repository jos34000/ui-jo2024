export interface UserReponse {
  id: number
  email: string
  firstName: string
  lastName: string
  mfaEnabled: boolean
  createdDate: string
}

export interface AuthState {
  user: UserReponse | null
  isAuthenticated: boolean
  setUser: (user: UserReponse | null) => void
  logout: () => void
}

export interface StoredUser {
  firstName: string
  lastName: string
  email: string
}
