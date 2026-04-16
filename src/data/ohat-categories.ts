import type { OhatCategory } from '../types/ohat'

export const OHAT_CATEGORIES: OhatCategory[] = [
  {
    id: 'lips',
    name: '口唇',
    icon: 'Smile',
    scoreCriteria: {
      0: {
        label: '健全',
        description: '滑らかでピンク色、湿潤している',
      },
      1: {
        label: 'やや不良',
        description: '乾燥、ひび割れ、口角の赤み',
      },
      2: {
        label: '病的',
        description: '腫脹、潰瘍、出血、口角びらん、水疱',
      },
    },
    swallowingPhases: ['anticipatory'],
    phaseExplanation: '先行期：食物の取り込み（口唇閉鎖）に影響',
  },
  {
    id: 'tongue',
    name: '舌',
    icon: 'Zap',
    scoreCriteria: {
      0: {
        label: '健全',
        description: '正常なピンク色、湿潤、乳頭あり',
      },
      1: {
        label: 'やや不良',
        description: '舌苔あり、赤みが強い、滑沢',
      },
      2: {
        label: '病的',
        description: '紅色・白色パッチ、潰瘍、腫脹',
      },
    },
    swallowingPhases: ['preparatory', 'oral'],
    phaseExplanation: '準備期〜口腔期：食塊形成・口腔内送り込みに影響',
  },
  {
    id: 'gums_mucosa',
    name: '歯肉・粘膜',
    icon: 'Heart',
    scoreCriteria: {
      0: {
        label: '健全',
        description: 'ピンク色、湿潤、出血や腫脹なし',
      },
      1: {
        label: 'やや不良',
        description: '浮腫を伴う発赤、レッドスポット（義歯下の赤み）',
      },
      2: {
        label: '病的',
        description: '歯肉出血・発赤・腫脹、潰瘍、白色パッチ',
      },
    },
    swallowingPhases: ['preparatory'],
    phaseExplanation: '準備期：咀嚼時の疼痛で摂食量低下',
  },
  {
    id: 'saliva',
    name: '唾液',
    icon: 'Droplets',
    scoreCriteria: {
      0: {
        label: '健全',
        description: '湿潤な口腔組織、水様性の唾液',
      },
      1: {
        label: 'やや不良',
        description: '乾燥・べたつきのある口腔組織、唾液がやや少ない',
      },
      2: {
        label: '病的',
        description: '赤く乾燥した口腔組織、唾液がほぼない、唾液が粘稠',
      },
    },
    swallowingPhases: ['preparatory', 'oral'],
    phaseExplanation: '準備期〜口腔期：食塊の潤滑・送り込みが悪化',
    drugInfo: {
      title: '口腔乾燥を引き起こしやすい薬剤',
      medications: [
        { genericName: 'リスペリドン', category: '抗精神病薬', mechanism: '抗コリン作用による唾液分泌抑制' },
        { genericName: 'ハロペリドール', category: '抗精神病薬', mechanism: '抗コリン作用による唾液分泌抑制' },
        { genericName: 'クエチアピン', category: '抗精神病薬', mechanism: '抗コリン作用による唾液分泌抑制' },
        { genericName: 'チアプリド', category: '抗精神病薬', mechanism: 'ドパミン受容体遮断' },
        { genericName: 'アルプラゾラム', category: '抗不安薬', mechanism: '唾液腺への作用' },
        { genericName: 'ジアゼパム', category: '抗不安薬', mechanism: '唾液腺への作用' },
      ],
    },
  },
  {
    id: 'natural_teeth',
    name: '残存歯',
    icon: 'Gem',
    scoreCriteria: {
      0: {
        label: '健全',
        description: 'う蝕なし、歯の破折なし',
      },
      1: {
        label: 'やや不良',
        description: '歯が3本以下のう蝕・破折・欠損、磨り減った歯',
      },
      2: {
        label: '病的',
        description: '歯が4本以上のう蝕・破折・欠損、磨り減った歯、残根',
      },
    },
    swallowingPhases: ['preparatory'],
    phaseExplanation: '準備期：咀嚼・食塊形成が困難になる',
  },
  {
    id: 'dentures',
    name: '義歯',
    icon: 'CircleDot',
    scoreCriteria: {
      0: {
        label: '健全',
        description: '義歯を日常的に使用しており、適合良好',
      },
      1: {
        label: 'やや不良',
        description: '1日1〜2時間しか使用しない、ゆるい、義歯なし',
      },
      2: {
        label: '病的',
        description: '義歯を使用していない、適合不良、義歯の名前なし、義歯紛失',
      },
    },
    swallowingPhases: ['preparatory'],
    phaseExplanation: '準備期：咀嚼効率の低下',
  },
  {
    id: 'oral_cleanliness',
    name: '口腔清掃',
    icon: 'Sparkles',
    scoreCriteria: {
      0: {
        label: '健全',
        description: '口腔内・義歯が清潔、食物残渣なし',
      },
      1: {
        label: 'やや不良',
        description: '口腔内・義歯の一部に食物残渣・歯石・プラーク',
      },
      2: {
        label: '病的',
        description: '口腔内・義歯の大部分に食物残渣・歯石・プラーク、口臭あり',
      },
    },
    swallowingPhases: ['anticipatory', 'preparatory', 'oral', 'pharyngeal', 'esophageal'],
    phaseExplanation: '全期：細菌増殖→誤嚥性肺炎リスク上昇',
  },
  {
    id: 'dental_pain',
    name: '歯痛',
    icon: 'AlertTriangle',
    scoreCriteria: {
      0: {
        label: '健全',
        description: '口腔内の疼痛を示す言動・徴候なし',
      },
      1: {
        label: 'やや不良',
        description: '口腔内の疼痛を示す言動・徴候あり',
      },
      2: {
        label: '病的',
        description: '口腔内の疼痛を示す身体的徴候あり（腫脹、歯の破折、潰瘍、義歯による褥瘡）',
      },
    },
    swallowingPhases: ['anticipatory', 'preparatory'],
    phaseExplanation: '先行期〜準備期：摂食拒否・摂食量低下',
  },
]
