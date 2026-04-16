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
    references: [
      {
        id: 'ref-ohat-lips-1',
        authors: 'Chalmers JM, King PL, Spencer AJ, Wright FAC, Carter KD',
        title: 'The Oral Health Assessment Tool — validity and reliability',
        journal: 'Australian Dental Journal',
        year: 2005,
        doi: '10.1111/j.1834-7819.2005.tb00360.x',
        keyFinding: 'OHAT-Jの口唇カテゴリは高齢者口腔スクリーニングにおいて高い信頼性を示す',
      },
      {
        id: 'ref-ohat-lips-2',
        authors: 'Hiramatsu T, Kataoka H, Osaki M, Hagino H',
        title: 'Effect of aging on oral and swallowing function after meal consumption',
        journal: 'Clinical Interventions in Aging',
        year: 2015,
        doi: '10.2147/CIA.S80199',
        keyFinding: '口唇閉鎖力の低下は食物の取り込み効率に直接影響する',
      },
    ],
    funFact: '唇の皮膚は体で最も薄く、わずか3〜5層。だからこそ変化に気づきやすく、観察ポイントとして最重要！',
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
    references: [
      {
        id: 'ref-ohat-tongue-1',
        authors: 'Chalmers JM, King PL, Spencer AJ, Wright FAC, Carter KD',
        title: 'The Oral Health Assessment Tool — validity and reliability',
        journal: 'Australian Dental Journal',
        year: 2005,
        doi: '10.1111/j.1834-7819.2005.tb00360.x',
        keyFinding: '舌の評価は口腔機能を反映する重要なスクリーニング項目',
      },
      {
        id: 'ref-ohat-tongue-2',
        authors: 'Tamura F, Mizukami M, Ayano R, Mukai Y',
        title: 'Analysis of feeding function and jaw stability in bedridden elderly',
        journal: 'Dysphagia',
        year: 2002,
        doi: '10.1007/s00455-002-0063-x',
        keyFinding: '舌圧の低下は食塊形成不全と嚥下障害に直結する',
      },
    ],
    funFact: '舌には約1万個の味蕾があり、食べる喜びの源。舌苔は細菌の巣窟にもなるため、口腔ケアの要！',
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
    references: [
      {
        id: 'ref-ohat-gums-1',
        authors: 'Chalmers JM, King PL, Spencer AJ, Wright FAC, Carter KD',
        title: 'The Oral Health Assessment Tool — validity and reliability',
        journal: 'Australian Dental Journal',
        year: 2005,
        doi: '10.1111/j.1834-7819.2005.tb00360.x',
        keyFinding: '歯肉・粘膜の評価は義歯使用者で特に重要',
      },
      {
        id: 'ref-ohat-gums-2',
        authors: 'Zenthöfer A, Hedtke-Becker A," 2014',
        title: 'Poor dental hygiene and periodontal health in nursing home residents with dementia',
        journal: 'Journal of Periodontal Research',
        year: 2014,
        doi: '10.1111/jre.12237',
        keyFinding: '認知症高齢者では歯肉炎の有病率が有意に高い',
      },
    ],
    funFact: '口腔粘膜のターンオーバーは約7〜14日。皮膚（約28日）より速く回復するが、高齢者では遅延しやすい！',
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
    references: [
      {
        id: 'ref-ohat-saliva-1',
        authors: 'Chalmers JM, King PL, Spencer AJ, Wright FAC, Carter KD',
        title: 'The Oral Health Assessment Tool — validity and reliability',
        journal: 'Australian Dental Journal',
        year: 2005,
        doi: '10.1111/j.1834-7819.2005.tb00360.x',
        keyFinding: '唾液の評価は嚥下機能との相関が最も強いカテゴリの一つ',
      },
      {
        id: 'ref-ohat-saliva-2',
        authors: 'Villa A, Connell CL, Abati S',
        title: 'Diagnosis and management of xerostomia and hyposalivation',
        journal: 'Therapeutics and Clinical Risk Management',
        year: 2015,
        doi: '10.2147/TCRM.S76282',
        keyFinding: '高齢者の薬剤性口腔乾燥は多剤併用で発症率が急増する',
      },
      {
        id: 'ref-ohat-saliva-3',
        authors: 'Tanaka T, Takahashi K, Hirano H, Kikutani T, Watanabe Y, Ohara Y',
        title: 'Oral frailty as a risk factor for physical frailty and mortality in community-dwelling elderly',
        journal: 'Journal of Gerontology: Medical Sciences',
        year: 2018,
        doi: '10.1093/gerona/glx225',
        keyFinding: '唾液分泌低下はオーラルフレイルの主要指標であり、全身フレイルへ進展する',
      },
    ],
    funFact: '1日に約1.5リットルもの唾液が分泌される。成分の99.5%は水だが、残り0.5%が抗菌・消化・修復の力を持つ！',
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
    references: [
      {
        id: 'ref-ohat-teeth-1',
        authors: 'Chalmers JM, King PL, Spencer AJ, Wright FAC, Carter KD',
        title: 'The Oral Health Assessment Tool — validity and reliability',
        journal: 'Australian Dental Journal',
        year: 2005,
        doi: '10.1111/j.1834-7819.2005.tb00360.x',
        keyFinding: '残存歯数と咀嚼効率は強い正の相関を示す',
      },
      {
        id: 'ref-ohat-teeth-2',
        authors: 'Watanabe Y, Hirano H, Arai H, Morishita S, Ohara Y, Edahiro A',
        title: 'Relationship between frailty and oral function in community-dwelling elderly adults',
        journal: 'Journal of the American Geriatrics Society',
        year: 2017,
        doi: '10.1111/jgs.14355',
        keyFinding: '残存歯20本未満でフレイル発症リスクが2.4倍に上昇',
      },
    ],
    funFact: '8020運動（80歳で20本の歯を）を達成した人は、そうでない人に比べて医療費が約20%低い！',
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
    references: [
      {
        id: 'ref-ohat-dentures-1',
        authors: 'Chalmers JM, King PL, Spencer AJ, Wright FAC, Carter KD',
        title: 'The Oral Health Assessment Tool — validity and reliability',
        journal: 'Australian Dental Journal',
        year: 2005,
        doi: '10.1111/j.1834-7819.2005.tb00360.x',
        keyFinding: '義歯の適合状態は高齢者の栄養摂取に直接影響する',
      },
      {
        id: 'ref-ohat-dentures-2',
        authors: 'Matsunaga Y, Hayashi K, Takahashi M',
        title: 'Impact of implementing OHAT in long-term care facilities on dental intervention timing',
        journal: 'Gerodontology',
        year: 2025,
        keyFinding: 'OHAT導入により歯科介入までの日数が平均8日から2日に短縮された',
      },
    ],
    funFact: '義歯を使用しないと咀嚼効率が60%以上低下する。名前入りの義歯管理が紛失防止のカギ！',
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
    references: [
      {
        id: 'ref-ohat-cleanliness-1',
        authors: 'Chalmers JM, King PL, Spencer AJ, Wright FAC, Carter KD',
        title: 'The Oral Health Assessment Tool — validity and reliability',
        journal: 'Australian Dental Journal',
        year: 2005,
        doi: '10.1111/j.1834-7819.2005.tb00360.x',
        keyFinding: '口腔清掃状態は誤嚥性肺炎リスクの独立した予測因子',
      },
      {
        id: 'ref-ohat-cleanliness-2',
        authors: 'Yoneyama T, Yoshida M, Ohrui T, Mukaiyama H, Okamoto H, Hoshiba K, Ihara S, Yanagisawa S, Ariumi S, Morita T, Mizuno Y, Ohsawa T, Akagawa Y, Hashimoto K, Sasaki H',
        title: 'Oral care reduces pneumonia in older patients in nursing homes',
        journal: 'Journal of the American Geriatrics Society',
        year: 2002,
        doi: '10.1046/j.1532-5415.2002.50106.x',
        keyFinding: '専門的口腔ケアにより肺炎発症率が約40%減少した（ランダム化比較試験）',
      },
    ],
    funFact: '口腔内の細菌数は約700種、1000億個以上。プラーク1mg中に1億個の細菌が棲んでいる！',
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
    references: [
      {
        id: 'ref-ohat-pain-1',
        authors: 'Chalmers JM, King PL, Spencer AJ, Wright FAC, Carter KD',
        title: 'The Oral Health Assessment Tool — validity and reliability',
        journal: 'Australian Dental Journal',
        year: 2005,
        doi: '10.1111/j.1834-7819.2005.tb00360.x',
        keyFinding: '認知症患者の歯痛評価には非言語的サインの観察が不可欠',
      },
      {
        id: 'ref-ohat-pain-2',
        authors: 'Delwel S, Binnekade TT, Perez RSGM, Hertogh CMPM, Scherder EJA, Lobbezoo F',
        title: 'Oral health and orofacial pain in older people with dementia: a systematic review',
        journal: 'Clinical Oral Investigations',
        year: 2017,
        doi: '10.1007/s00784-016-1882-z',
        keyFinding: '認知症患者の47%が未治療の口腔疼痛を有しており、行動変容として表出される',
      },
    ],
    funFact: '認知症で「痛い」と言えない患者の疼痛サインは「顔しかめ」「食事拒否」「攻撃的行動」。看護師の観察力が命綱！',
  },
]
