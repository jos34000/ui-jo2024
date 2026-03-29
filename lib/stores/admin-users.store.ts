import { create } from "zustand"
import { api } from "@/lib/utils/api"
import { AdminUser, AdminUserResponse } from "@/lib/types/user.types"

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
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        role: u.role,
        mfaEnabled: u.mfaEnabled,
        locale: u.locale,
        createdAt: new Date(u.createdDate),
      }))
      set({ users })
    } catch {
      set({ users: [] })
    } finally {
      set({ isLoading: false })
    }
  },
}))
