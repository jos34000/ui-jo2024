import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CookiePreferences {
  necessary: boolean // Always true, cannot be disabled
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

interface CookieState {
  hasConsented: boolean
  preferences: CookiePreferences
  showBanner: boolean
  setPreferences: (prefs: Partial<CookiePreferences>) => void
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: () => void
  openBanner: () => void
  closeBanner: () => void
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
}

export const useCookieStore = create<CookieState>()(
  persist(
    set => ({
      hasConsented: false,
      preferences: defaultPreferences,
      showBanner: true,

      setPreferences: prefs =>
        set(state => ({
          preferences: { ...state.preferences, ...prefs, necessary: true },
        })),

      acceptAll: () =>
        set({
          hasConsented: true,
          showBanner: false,
          preferences: {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
          },
        }),

      rejectAll: () =>
        set({
          hasConsented: true,
          showBanner: false,
          preferences: defaultPreferences,
        }),

      savePreferences: () =>
        set({
          hasConsented: true,
          showBanner: false,
        }),

      openBanner: () => set({ showBanner: true }),

      closeBanner: () => set({ showBanner: false }),
    }),
    {
      name: "paris2024-cookies",
    },
  ),
)
