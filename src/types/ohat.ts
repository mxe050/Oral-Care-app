export type OhatCategoryId =
  | 'lips'
  | 'tongue'
  | 'gums_mucosa'
  | 'saliva'
  | 'natural_teeth'
  | 'dentures'
  | 'oral_cleanliness'
  | 'dental_pain'

export type OhatScore = 0 | 1 | 2

export type SwallowingPhase =
  | 'anticipatory'   // 先行期
  | 'preparatory'    // 準備期
  | 'oral'           // 口腔期
  | 'pharyngeal'     // 咽頭期
  | 'esophageal'     // 食道期

export interface OhatScoreCriteria {
  label: string
  description: string
  imageUrl?: string
}

export interface DrugInfo {
  title: string
  medications: {
    genericName: string
    category: string
    mechanism: string
  }[]
}

export interface OhatCategory {
  id: OhatCategoryId
  name: string
  icon: string
  scoreCriteria: Record<OhatScore, OhatScoreCriteria>
  swallowingPhases: SwallowingPhase[]
  phaseExplanation: string
  drugInfo?: DrugInfo
}

export interface RecommendedAction {
  categoryId: OhatCategoryId
  professional: string
  reason: string
}

export interface OhatRecord {
  id: string
  createdAt: Date
  scores: Record<OhatCategoryId, OhatScore>
  totalScore: number
  notes?: string
  recommendedActions: RecommendedAction[]
}
