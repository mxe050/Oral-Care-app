import type { SwallowingPhase } from '../types/ohat'

export interface PhaseInfo {
  id: SwallowingPhase
  name: string
  nameEn: string
  description: string
  keyStructures: string[]
  cranialNerves: string[]
  observationSigns: string[]
}

export const PHASE_MODEL: PhaseInfo[] = [
  {
    id: 'anticipatory',
    name: '先行期',
    nameEn: 'Anticipatory Phase',
    description: '食物を目で見て認知し、口に運ぶまでの段階。何をどのように食べるかを判断する。',
    keyStructures: ['視覚', '嗅覚', '大脳皮質'],
    cranialNerves: [],
    observationSigns: ['ボーッとしている', 'キョロキョロしている', '食物に注意が向かない', '食べ方が分からない様子'],
  },
  {
    id: 'preparatory',
    name: '準備期',
    nameEn: 'Preparatory Phase',
    description: '口腔内で食物を咀嚼し、唾液と混ぜ合わせて飲み込みやすい食塊を形成する段階。',
    keyStructures: ['歯', '舌', '頬', '唾液腺', '顎関節'],
    cranialNerves: ['V 三叉神経（咀嚼）', 'VII 顔面神経（口唇閉鎖・味覚）'],
    observationSigns: ['口からのこぼれ', '咀嚼が不十分', '一側でしか噛めない', '食物が口腔内に滞留'],
  },
  {
    id: 'oral',
    name: '口腔期',
    nameEn: 'Oral Phase',
    description: '舌の動きで食塊を口腔から咽頭へ送り込む段階。随意運動で約1秒。',
    keyStructures: ['舌', '口蓋', '舌骨上筋群'],
    cranialNerves: ['XII 舌下神経（舌運動）', 'V 三叉神経'],
    observationSigns: ['送り込みに時間がかかる', '口腔内残留', '舌の動きが弱い'],
  },
  {
    id: 'pharyngeal',
    name: '咽頭期',
    nameEn: 'Pharyngeal Phase',
    description: '嚥下反射により食塊が咽頭を通過する段階。喉頭蓋が閉じて気道を保護する。約0.5〜1秒。',
    keyStructures: ['咽頭', '喉頭蓋', '声門', '食道入口部', '軟口蓋'],
    cranialNerves: ['IX 舌咽神経（嚥下反射）', 'X 迷走神経（気道保護）'],
    observationSigns: ['むせ', '湿性嗄声（ゴロゴロ声）', '咽頭残留感', '嚥下後の咳'],
  },
  {
    id: 'esophageal',
    name: '食道期',
    nameEn: 'Esophageal Phase',
    description: '食道の蠕動運動により食塊が胃へ送られる段階。不随意運動。',
    keyStructures: ['食道', '下部食道括約筋', '横隔膜'],
    cranialNerves: ['X 迷走神経（蠕動運動）'],
    observationSigns: ['胸のつかえ', '逆流', '嘔吐', '胸やけ'],
  },
]
