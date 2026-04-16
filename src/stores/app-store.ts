import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  darkMode: boolean
  prologueSeen: boolean
  hasSeenSwallowIntro: boolean
  toggleDarkMode: () => void
  setPrologueSeen: () => void
  setSwallowIntroSeen: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: false,
      prologueSeen: false,
      hasSeenSwallowIntro: false,
      toggleDarkMode: () =>
        set((state) => {
          const next = !state.darkMode
          document.documentElement.classList.toggle('dark', next)
          return { darkMode: next }
        }),
      setPrologueSeen: () => set({ prologueSeen: true }),
      setSwallowIntroSeen: () => set({ hasSeenSwallowIntro: true }),
    }),
    { name: 'oralcare-app' },
  ),
)
