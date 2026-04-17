import type { OhatCategoryId } from './ohat'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export type QuizType = 'ohat_photo' | 'next_action' | 'mistake_finder'

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  type: QuizType
  difficulty: DifficultyLevel
  categoryId?: OhatCategoryId
  prompt: string
  imageUrl?: string
  options: QuizOption[]
  correctAnswerIds: string[]
  narrativeFeedback: {
    correct: string
    incorrect: string
  }
  explanation: string
}

export interface QuizAnswer {
  questionId: string
  selectedIds: string[]
  correct: boolean
}

export interface QuizSession {
  id: string
  type: QuizType
  difficulty: DifficultyLevel
  questions: QuizQuestion[]
  currentIndex: number
  answers: QuizAnswer[]
  startedAt: Date
  completedAt?: Date
  score: number
}
