import Dexie, { type Table } from 'dexie'
import type { OhatRecord } from '../types/ohat'
import type { Core10Evaluation } from '../types/core10'
import type { QuizSession } from '../types/quiz'
import type { LearningProgress } from '../types/common'

export class OralCareDB extends Dexie {
  ohatRecords!: Table<OhatRecord, string>
  core10Evaluations!: Table<Core10Evaluation, string>
  quizResults!: Table<QuizSession, string>
  learningProgress!: Table<LearningProgress, string>

  constructor() {
    super('oralcare-navi')
    this.version(1).stores({
      ohatRecords: 'id, createdAt',
      core10Evaluations: 'id, createdAt',
      quizResults: 'id, type, completedAt',
      learningProgress: 'id, moduleId',
    })
  }
}

export const db = new OralCareDB()
