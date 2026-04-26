export interface Reference {
  id: string
  authors: string
  title: string
  journal: string
  year: number
  doi?: string
  keyFinding?: string
}

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

export interface UserStats {
  totalXp: number
  level: number
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
  badgesEarned: string[]
}

export const LEVELS = [
  { level: 1, name: 'ルーキー', minXp: 0, emoji: '🌱' },
  { level: 2, name: 'ビギナー', minXp: 100, emoji: '🌿' },
  { level: 3, name: 'プラクティショナー', minXp: 300, emoji: '🌳' },
  { level: 4, name: 'スペシャリスト', minXp: 600, emoji: '⭐' },
  { level: 5, name: 'エキスパート', minXp: 1000, emoji: '👑' },
  { level: 6, name: 'マスター', minXp: 1500, emoji: '🏆' },
] as const

export const BADGES = {
  firstLogin: {
    id: 'firstLogin',
    name: '初ログイン',
    emoji: '🎉',
    description: '初めてアプリにログインした',
  },
  ohatComplete: {
    id: 'ohatComplete',
    name: 'OHAT-Jマスター',
    emoji: '🦷',
    description: 'OHAT-Jモジュールを全て完了した',
  },
  core10Complete: {
    id: 'core10Complete',
    name: 'FASS・CORE10達人',
    emoji: '🍽️',
    description: 'FASS・CORE10モジュールを全て完了した',
  },
  quizStreak3: {
    id: 'quizStreak3',
    name: '3連続正解',
    emoji: '🔥',
    description: 'クイズで3問連続正解した',
  },
  quizStreak5: {
    id: 'quizStreak5',
    name: '5連続正解',
    emoji: '💥',
    description: 'クイズで5問連続正解した',
  },
  perfectQuiz: {
    id: 'perfectQuiz',
    name: 'パーフェクト',
    emoji: '💯',
    description: 'クイズで全問正解した',
  },
  clinicalFirst: {
    id: 'clinicalFirst',
    name: '初めての臨床記録',
    emoji: '📋',
    description: '初めてOHAT-J臨床評価を保存した',
  },
  swallowMaster: {
    id: 'swallowMaster',
    name: '嚥下マスター',
    emoji: '🧠',
    description: '嚥下の知識モジュールを全て完了した',
  },
  weekStreak: {
    id: 'weekStreak',
    name: '1週間連続学習',
    emoji: '📅',
    description: '7日間連続でアプリを利用した',
  },
} as const

export const XP_ACTIONS = {
  viewLesson: 10,
  completeCategory: 25,
  quizCorrect: 15,
  quizPerfect: 50,
  clinicalSave: 30,
  dailyLogin: 10,
  streakBonus: 5,
} as const
