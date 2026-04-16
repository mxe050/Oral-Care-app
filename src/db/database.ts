import Dexie, { type Table } from 'dexie'
import type { OhatRecord } from '../types/ohat'
import type { Core10Evaluation } from '../types/core10'
import type { QuizSession } from '../types/quiz'
import type { LearningProgress } from '../types/common'

export interface SwallowingQuizResult {
  id: string
  completedAt: Date
  phase: string
  score: number
  totalQuestions: number
  answers: { questionId: string; selectedId: string; correct: boolean }[]
}

export class OralCareDB extends Dexie {
  ohatRecords!: Table<OhatRecord, string>
  core10Evaluations!: Table<Core10Evaluation, string>
  quizResults!: Table<QuizSession, string>
  learningProgress!: Table<LearningProgress, string>
  swallowingQuizResults!: Table<SwallowingQuizResult, string>

  constructor() {
    super('oralcare-navi')
    this.version(1).stores({
      ohatRecords: 'id, createdAt',
      core10Evaluations: 'id, createdAt',
      quizResults: 'id, type, completedAt',
      learningProgress: 'id, moduleId',
    })
    this.version(2).stores({
      ohatRecords: 'id, createdAt',
      core10Evaluations: 'id, createdAt',
      quizResults: 'id, type, completedAt',
      learningProgress: 'id, moduleId',
      swallowingQuizResults: 'id, completedAt, phase',
    })
  }
}

export const db = new OralCareDB()
