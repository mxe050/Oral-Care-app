import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  darkMode: boolean
  prologueSeen: boolean
  toggleDarkMode: () => void
  setPrologueSeen: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: false,
      prologueSeen: false,
      toggleDarkMode: () =>
        set((state) => {
          const next = !state.darkMode
          document.documentElement.classList.toggle('dark', next)
          return { darkMode: next }
        }),
      setPrologueSeen: () => set({ prologueSeen: true }),
    }),
    { name: 'oralcare-app' },
  ),
)
