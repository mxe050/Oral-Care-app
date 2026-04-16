import type { SwallowingPhase } from './ohat'
import type { Reference } from './common'

export type Core10Group = 'A' | 'B' | 'C'
export type Core10ItemId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type Core10Score = 0 | 1 | 2

export interface Core10Item {
  id: Core10ItemId
  group: Core10Group
  groupName: string
  title: string
  description: string
  medicalRationale: string
  swallowingPhases: SwallowingPhase[]
  phaseExplanation: string
  scoreCriteria: Record<Core10Score, string>
  specificCriteria?: string
  errorConsequence: string
  references: Reference[]
  funFact: string
}

export type MistakeCategory = 'posture' | 'technique' | 'timing' | 'environment'

export interface MistakeZone {
  id: string
  category: MistakeCategory
  region: { x: number; y: number; width: number; height: number }
  description: string
  explanation: string
  relatedCore10Items: Core10ItemId[]
}

export interface MistakeScenario {
  id: string
  title: string
  description: string
  mistakes: MistakeZone[]
}

export interface Core10Evaluation {
  id: string
  createdAt: Date
  scores: Record<Core10ItemId, Core10Score>
  totalScore: number
  improvementAreas: Core10ItemId[]
}
