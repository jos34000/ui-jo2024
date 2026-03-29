import { create } from "zustand"
import { api } from "@/lib/utils/api"

export interface AdminUser {
  id: number
  firstName: string
  lastName: string
  email: string
  role: "admin" | "user"
  isVerified: boolean
  createdAt: Date
  lastLoginAt: Date | null
}

interface AdminUserResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  role: "admin" | "user"
  isVerified: boolean
  createdAt: string
  lastLoginAt: string | null
}

interface AdminUsersState {
  users: AdminUser[]
  isLoading: boolean
  fetchUsers: () => Promise<void>
}

export const useAdminUsersStore = create<AdminUsersState>()(set => ({
  users: [],
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true })
    try {
      const data = await api<AdminUserResponse[]>("/user/all")
      const users: AdminUser[] = data.map(u => ({
        ...u,
        createdAt: new Date(u.createdAt),
        lastLoginAt: u.lastLoginAt ? new Date(u.lastLoginAt) : null,
      }))
      set({ users })
    } catch {
      set({ users: [] })
    } finally {
      set({ isLoading: false })
    }
  },
}))
