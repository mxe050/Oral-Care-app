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

/**
 * 新・能動学習型 食事ラウンドシナリオ
 * 観察結果を先に提示し、ユーザーが Orient/Decide/Act を能動的に判断する
 */
export interface MealRoundChallenge {
  id: string
  title: string
  patientProfile: string
  ohatFindings: string
  /** 看護師が既に行った観察結果（Observe段階は提示のみ） */
  observations: string[]
  orient: MealRoundStepQuestion
  decide: MealRoundStepQuestion
  act: MealRoundStepQuestion
  summary: string
  references: Reference[]
}

export interface MealRoundStepQuestion {
  prompt: string
  options: MealRoundOption[]
  /** 解説（全体を表示） */
  explanation: string
}

export interface MealRoundOption {
  id: string
  text: string
  isCorrect: boolean
  /** なぜ正解/不正解か */
  rationale: string
}

export interface SwallowingQuizQuestion {
  id: string
  phase: SwallowingPhase
  prompt: string
  options: { id: string; text: string; isCorrect: boolean }[]
  explanation: string
  reference?: Reference
}
