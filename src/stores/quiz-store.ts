import { create } from 'zustand'
import type { QuizSession, QuizQuestion, DifficultyLevel, QuizType } from '../types/quiz'

interface QuizState {
  session: QuizSession | null
  startSession: (type: QuizType, difficulty: DifficultyLevel, questions: QuizQuestion[]) => void
  answerQuestion: (selectedIds: string[]) => void
  nextQuestion: () => void
  endSession: () => void
}

export const useQuizStore = create<QuizState>()((set) => ({
  session: null,

  startSession: (type, difficulty, questions) =>
    set({
      session: {
        id: crypto.randomUUID(),
        type,
        difficulty,
        questions,
        currentIndex: 0,
        answers: [],
        startedAt: new Date(),
        score: 0,
      },
    }),

  answerQuestion: (selectedIds) =>
    set((state) => {
      if (!state.session) return state
      const question = state.session.questions[state.session.currentIndex]
      const correct =
        selectedIds.length === question.correctAnswerIds.length &&
        selectedIds.every((id) => question.correctAnswerIds.includes(id))
      const newAnswers = [
        ...state.session.answers,
        { questionId: question.id, selectedIds, correct },
      ]
      return {
        session: {
          ...state.session,
          answers: newAnswers,
          score: newAnswers.filter((a) => a.correct).length,
        },
      }
    }),

  nextQuestion: () =>
    set((state) => {
      if (!state.session) return state
      return {
        session: {
          ...state.session,
          currentIndex: state.session.currentIndex + 1,
        },
      }
    }),

  endSession: () =>
    set((state) => {
      if (!state.session) return state
      return {
        session: { ...state.session, completedAt: new Date() },
      }
    }),
}))
