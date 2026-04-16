import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserStats } from '../types/common'
import { LEVELS, XP_ACTIONS } from '../types/common'

interface BadgeInfo {
  id: string
  name: string
  earnedAt: Date
}

interface ProgressState {
  // --- 学習進捗 ---
  completedSections: Record<string, boolean>
  quizScores: Record<string, number[]>
  badges: BadgeInfo[]

  // --- XP・ゲーミフィケーション ---
  totalXp: number
  currentStreak: number
  longestStreak: number
  lastActiveDate: string

  // --- アクション ---
  markCompleted: (sectionId: string) => void
  addQuizScore: (quizType: string, score: number) => void
  addBadge: (id: string, name: string) => void
  getCompletionRate: (moduleId: string) => number

  // --- XPアクション ---
  addXp: (amount: number) => void
  getLevel: () => typeof LEVELS[number]
  getXpToNextLevel: () => number

  // --- ストリーク ---
  checkStreak: () => void
  earnBadge: (badgeId: string, badgeName: string) => void

  // --- ユーザー統計 ---
  getUserStats: () => UserStats
}

const MODULE_SECTIONS: Record<string, string[]> = {
  ohat: [
    'ohat-learn', 'ohat-quiz-beginner', 'ohat-quiz-intermediate',
    'ohat-quiz-advanced', 'ohat-clinical', 'ohat-next-action',
  ],
  fass: [
    'fass-learn', 'fass-mistake-quiz', 'fass-self-check', 'fass-evidence',
  ],
  swallow: [
    'swallow-phases', 'swallow-background', 'swallow-ooda',
    'swallow-quiz-beginner', 'swallow-quiz-advanced',
  ],
}

function computeLevel(xp: number): typeof LEVELS[number] {
  let result: typeof LEVELS[number] = LEVELS[0]
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXp) {
      result = lvl
    }
  }
  return result
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10)
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedSections: {},
      quizScores: {},
      badges: [],
      totalXp: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: '',

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

      // --- XP ---
      addXp: (amount) =>
        set((state) => ({
          totalXp: state.totalXp + amount,
        })),

      getLevel: () => {
        return computeLevel(get().totalXp)
      },

      getXpToNextLevel: () => {
        const currentXp = get().totalXp
        const currentLevel = computeLevel(currentXp)
        const nextLevel = LEVELS.find((l) => l.minXp > currentLevel.minXp)
        if (!nextLevel) return 0
        return nextLevel.minXp - currentXp
      },

      // --- ストリーク ---
      checkStreak: () =>
        set((state) => {
          const today = getToday()
          if (state.lastActiveDate === today) return state

          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().slice(0, 10)

          let newStreak = state.currentStreak
          if (state.lastActiveDate === yesterdayStr) {
            newStreak = state.currentStreak + 1
          } else if (state.lastActiveDate !== today) {
            newStreak = 1
          }

          const newLongest = Math.max(state.longestStreak, newStreak)
          const streakXp = newStreak > 1 ? XP_ACTIONS.streakBonus * (newStreak - 1) : 0

          return {
            currentStreak: newStreak,
            longestStreak: newLongest,
            lastActiveDate: today,
            totalXp: state.totalXp + XP_ACTIONS.dailyLogin + streakXp,
          }
        }),

      earnBadge: (badgeId, badgeName) =>
        set((state) => {
          if (state.badges.some((b) => b.id === badgeId)) return state
          return {
            badges: [...state.badges, { id: badgeId, name: badgeName, earnedAt: new Date() }],
          }
        }),

      getUserStats: () => {
        const state = get()
        return {
          totalXp: state.totalXp,
          level: computeLevel(state.totalXp).level,
          currentStreak: state.currentStreak,
          longestStreak: state.longestStreak,
          lastActiveDate: state.lastActiveDate,
          badgesEarned: state.badges.map((b) => b.id),
        }
      },
    }),
    { name: 'oralcare-progress' },
  ),
)
