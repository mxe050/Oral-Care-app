import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BadgeInfo {
  id: string
  name: string
  earnedAt: Date
}

interface ProgressState {
  completedSections: Record<string, boolean>
  quizScores: Record<string, number[]>
  badges: BadgeInfo[]
  markCompleted: (sectionId: string) => void
  addQuizScore: (quizType: string, score: number) => void
  addBadge: (id: string, name: string) => void
  getCompletionRate: (moduleId: string) => number
}

const MODULE_SECTIONS: Record<string, string[]> = {
  ohat: [
    'ohat-learn', 'ohat-quiz-beginner', 'ohat-quiz-intermediate',
    'ohat-quiz-advanced', 'ohat-clinical', 'ohat-next-action',
  ],
  fass: [
    'fass-learn', 'fass-mistake-quiz', 'fass-self-check', 'fass-evidence',
  ],
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedSections: {},
      quizScores: {},
      badges: [],

      markCompleted: (sectionId) =>
        set((state) => ({
          completedSections: { ...state.completedSections, [sectionId]: true },
        })),

      addQuizScore: (quizType, score) =>
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [quizType]: [...(state.quizScores[quizType] ?? []), score],
          },
        })),

      addBadge: (id, name) =>
        set((state) => {
          if (state.badges.some((b) => b.id === id)) return state
          return { badges: [...state.badges, { id, name, earnedAt: new Date() }] }
        }),

      getCompletionRate: (moduleId) => {
        const sections = MODULE_SECTIONS[moduleId] ?? []
        if (sections.length === 0) return 0
        const completed = sections.filter((s) => get().completedSections[s]).length
        return Math.round((completed / sections.length) * 100)
      },
    }),
    { name: 'oralcare-progress' },
  ),
)
