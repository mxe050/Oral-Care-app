import type { Reference } from './common'
import type { SwallowingPhase } from './ohat'

export interface SwallowingPhaseDetail {
  phase: SwallowingPhase
  nameJa: string
  nameEn: string
  duration: string
  keyStructures: string[]
  cranialNerves: string[]
  observationSigns: string[]
  commonDisorders: string[]
  assessmentMethods: string[]
  nursingPoints: string[]
  references: Reference[]
  funFact: string
}

export interface OodaStep {
  step: 'observe' | 'orient' | 'decide' | 'act'
  nameJa: string
  description: string
  examples: string[]
}

export interface MealRoundScenario {
  id: string
  patientProfile: string
  ohatFindings: string
  ooda: OodaStep[]
  correctActions: string[]
  references: Reference[]
}

export interface SwallowingQuizQuestion {
  id: string
  phase: SwallowingPhase
  prompt: string
  options: { id: string; text: string; isCorrect: boolean }[]
  explanation: string
  reference?: Reference
}
