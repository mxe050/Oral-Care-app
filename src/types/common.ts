export interface LearningProgress {
  id: string
  moduleId: string
  sectionId: string
  completed: boolean
  completedAt?: Date
  score?: number
}

export interface ProfessionalReferral {
  problem: string
  professional: string
  reason: string
}
