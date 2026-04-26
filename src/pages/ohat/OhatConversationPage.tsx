import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Sparkles,
  Trophy,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Brain,
  Pill,
  Activity,
  Eye,
  GraduationCap,
} from 'lucide-react'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'

// =====================================================================
// OHAT-J 評価基準(松尾2015 / Chalmers 2005 準拠 / 豊橋医療センター教材)
// =====================================================================

type CatKey =
  | 'lip'
  | 'tongue'
  | 'gum'
  | 'saliva'
  | 'teeth'
  | 'denture'
  | 'clean'
  | 'pain'

type Score = 0 | 1 | 2

interface Level {
  s: Score
  name: string
  short: string
}

interface Rule {
  label: string
  levels: [Level, Level, Level]
  full: string
  observationTip: string
  phaseLink: string
}

const RULES: Record<CatKey, Rule> = {
  lip: {
    label: '口唇',
    levels: [
      { s: 0, name: '健全', short: '正常・湿潤・ピンク' },
      { s: 1, name: 'やや不良', short: '乾燥・ひび割れ・口角の発赤' },
      { s: 2, name: '病的', short: '腫脹・潰瘍・口角からの出血' },
    ],
    full:
      '0:正常で湿潤、ピンク色 / 1:乾燥・ひび割れ・口角の発赤 / 2:腫脹や腫瘤、赤色斑・白色斑、潰瘍性出血、口角の出血、潰瘍',
    observationTip:
      '口唇をよく観察し、必要があれば触れてみる。口角は軽く開口させて観察する。口角の乾燥やひび割れがあればスコア1、潰瘍性病変・出血があればただちにスコア2。',
    phaseLink: '嚥下5期モデルの「先行期」に関連:口唇閉鎖は食物の取り込みに直結する。',
  },
  tongue: {
    label: '舌',
    levels: [
      { s: 0, name: '健全', short: '正常・湿潤・ピンク' },
      { s: 1, name: 'やや不良', short: '不整・亀裂・発赤・舌苔の付着' },
      { s: 2, name: '病的', short: '赤色斑・白色斑・潰瘍・腫脹' },
    ],
    full:
      '0:正常で湿潤、ピンク色 / 1:不整、亀裂、発赤、舌苔の付着(量・性状・色問わず) / 2:赤色斑、白色斑、潰瘍、腫脹',
    observationTip:
      '舌をよく観察し、必要があれば触れてみる。舌苔は量・性状・色に関わらず付着があればスコア1、潰瘍性病変があればただちにスコア2。',
    phaseLink: '嚥下5期モデルの「準備期〜口腔期」に関連:食塊形成と咽頭への送り込みに影響。',
  },
  gum: {
    label: '歯肉・粘膜',
    levels: [
      { s: 0, name: '健全', short: '正常・湿潤・出血なし' },
      { s: 1, name: 'やや不良', short: '部分的腫脹(1-6歯分)、発赤、義歯下の一部潰瘍' },
      { s: 2, name: '病的', short: '腫脹・出血(7歯分以上)、歯の動揺、潰瘍' },
    ],
    full:
      '0:正常で湿潤、ピンク、出血なし / 1:乾燥・光沢・粗造・発赤、部分的(1-6歯分)腫脹、義歯下の一部潰瘍 / 2:腫脹・出血(7歯分以上)、歯の動揺、潰瘍、白色斑、発赤、圧痛',
    observationTip:
      '歯肉は咬み合わせた状態で、頬粘膜は舌圧子などで軽く引っ張ると観察しやすい。歯の動揺や潰瘍性病変があればただちにスコア2。',
    phaseLink: '口腔感染は誤嚥性肺炎のリスク因子。歯周病原因菌は嚥下機能にも悪影響。',
  },
  saliva: {
    label: '唾液',
    levels: [
      { s: 0, name: '健全', short: '湿潤・漿液性' },
      { s: 1, name: 'やや不良', short: 'べたつく粘膜・少量の唾液・若干の口渇' },
      { s: 2, name: '病的', short: '赤く干からびた状態・唾液ほぼなし・口渇感あり' },
    ],
    full:
      '0:湿潤、漿液性 / 1:乾燥、べたつく粘膜、少量の唾液、若干の口渇感、泡沫状(泡状)の唾液 / 2:赤く干からびた状態、唾液はほぼなし、粘性の高い唾液、口渇感あり',
    observationTip:
      '泡沫状(泡状)の唾液もスコア1の典型サイン。問診で「少し口渇感あり」=1、「口渇感あり」とはっきり訴える=2。',
    phaseLink: '唾液は食塊形成・嚥下反射の誘発に必須。薬剤性口腔乾燥は嚥下障害の隠れた原因。',
  },
  teeth: {
    label: '残存歯',
    levels: [
      { s: 0, name: '健全', short: 'う蝕・破折なし(または無歯+総義歯)' },
      { s: 1, name: 'やや不良', short: '3本以下のう蝕・破折・残根・咬耗' },
      { s: 2, name: '病的', short: '4本以上のう蝕等、または義歯なしで残存歯3本以下' },
    ],
    full:
      '0:歯・歯根のう蝕または破折なし / 1:3本以下のう蝕、歯の破折、残根、咬耗 / 2:4歯以上のう蝕、歯の破折、残根、非常に強い咬耗、義歯使用無しで3本以下の残存歯',
    observationTip:
      '残存歯が無く、上下の総義歯を使用していればスコア0(健全)。う蝕・破折・残根・咬耗が3本以下でスコア1、4本以上でスコア2。',
    phaseLink: '咀嚼困難は栄養障害・低栄養を招き、嚥下機能低下を加速させる。',
  },
  denture: {
    label: '義歯',
    levels: [
      { s: 0, name: '健全', short: '正常・破折なし(義歯不要も0)' },
      { s: 1, name: 'やや不良', short: '1部位の破折、または1日1〜2時間のみ装着可能' },
      { s: 2, name: '病的', short: '2部位以上の破折・紛失・不適合で未装着' },
    ],
    full:
      '0:正常、義歯・人工歯の破折なし、普通に装着できる(義歯不要なら0) / 1:1部位の破折、毎日1-2時間の装着のみ可能 / 2:2部位以上の破折、義歯紛失、義歯不適合のため未装着、義歯接着剤が必要',
    observationTip:
      '破折等の異常がなくても1日1-2時間しか使えない場合はスコア1。救急搬送等で自宅に義歯を置いてきた場合は「義歯紛失」と同じ扱いでスコア2。',
    phaseLink: '義歯不適合は咀嚼力低下→食塊形成不良→誤嚥リスク上昇につながる。',
  },
  clean: {
    label: '口腔清掃',
    levels: [
      { s: 0, name: '健全', short: '食渣・歯石・プラークなし' },
      { s: 1, name: 'やや不良', short: '1-2部位に食渣・プラーク、若干の口臭' },
      { s: 2, name: '病的', short: '多く(3部位以上)に食渣・プラーク、強い口臭' },
    ],
    full:
      '0:食渣、歯石、プラークの付着がない / 1:1〜2部位(ブロック)に食渣・歯石・プラークあり、若干口臭あり / 2:3部位(ブロック)以上に食渣・歯石・プラークあり、強い口臭あり',
    observationTip:
      '「ブロック」=前歯部・左右臼歯部などのまとまり。口臭が著しい場合もスコア2の指標。口腔清掃不良は誤嚥性肺炎の最大の修正可能因子。',
    phaseLink: 'ADL低下のサインとしても重要。自己歯磨き不能は介護度の指標になる。',
  },
  pain: {
    label: '歯痛',
    levels: [
      { s: 0, name: '健全', short: '疼痛の言動的・身体的兆候なし' },
      { s: 1, name: 'やや不良', short: '言動的兆候(食事しない・顔を引きつらせる等)' },
      { s: 2, name: '病的', short: '身体的兆候(腫脹・歯の破折・潰瘍・膿瘍)+言動的兆候' },
    ],
    full:
      '0:疼痛を示す言動的・身体的兆候なし / 1:疼痛を示す言動的な兆候あり(顔を引きつらせる、口唇を噛む、食事しない、攻撃的になる) / 2:疼痛を示す身体的な兆候あり(頬・歯肉の腫脹、歯の破折、潰瘍、歯肉下膿瘍)、言動的な兆候もあり',
    observationTip:
      '認知症患者など意思疎通困難な場合、疼痛の訴えは弱いことが多い。表情の引きつり・食事拒否・攻撃性などの言動的兆候、頬や歯肉の腫脹・潰瘍などの身体的兆候を必ず観察。',
    phaseLink: '疼痛は食事拒否→経口摂取量低下→低栄養・脱水のリスク。BPSDの誘因にもなる。',
  },
}

const CAT_KEYS: CatKey[] = [
  'lip',
  'tongue',
  'gum',
  'saliva',
  'teeth',
  'denture',
  'clean',
  'pain',
]

// =====================================================================
// 患者データ
// =====================================================================

interface KeyFinding {
  cat: CatKey
  text: string
  importance: 'high' | 'mid'
}

interface Consultation {
  who: string
  why: string
}

interface Patient {
  id: 'A' | 'B' | 'C'
  name: string
  age: number
  sex: string
  room: string
  avatar: string
  gradient: string
  bgGradient: string
  summary: string
  stage: string
  stageIcon: typeof Brain
  difficulty: number
  truth: Record<CatKey, Score>
  keyFindings: KeyFinding[]
  background: string
  consultations: Consultation[]
  insight: string
}

const PATIENTS: Patient[] = [
  {
    id: 'A',
    name: '田中ハナ',
    age: 82,
    sex: '女性',
    room: '301',
    avatar: '👵',
    gradient: 'from-pink-300 to-rose-400',
    bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/40',
    summary: '誤嚥性肺炎で入院中。認知症あり。「最近ご飯食べたくない」と訴え。',
    stage: 'ステージ3:認知症',
    stageIcon: Brain,
    difficulty: 3,
    truth: { lip: 1, tongue: 1, gum: 0, saliva: 1, teeth: 0, denture: 0, clean: 2, pain: 0 },
    keyFindings: [
      { cat: 'clean', text: '認知症で自己歯磨き不十分。重度の磨き残しあり', importance: 'high' },
      { cat: 'lip', text: '軽度の口唇乾燥・口角発赤', importance: 'mid' },
      { cat: 'tongue', text: '舌苔がやや厚い', importance: 'mid' },
    ],
    background:
      '中等度アルツハイマー型認知症。嚥下5期モデルの「先行期」に障害があり、食物を見ても食べ物と認識しづらい。「食欲がない」という訴えの背景には、食事の認知ができていない可能性。OHATの口腔清掃スコア悪化はADL低下のサインで、誤嚥性肺炎のリスク因子。',
    consultations: [
      { who: '歯科衛生士', why: '口腔清掃スコア2 → 専門的口腔ケア(POHC)依頼' },
      { who: '言語聴覚士', why: '先行期障害の評価・食事環境の調整提案' },
      { who: '管理栄養士', why: '認知症患者でも認識しやすい食形態の検討' },
    ],
    insight:
      '「食欲がない」=単純な食欲不振ではなく、認知症による先行期障害の可能性。本人の言葉だけで判断せず、必ず実際の口腔内・食事場面を観察する。口腔清掃スコア2は誤嚥性肺炎の最大の修正可能リスク因子。',
  },
  {
    id: 'B',
    name: '山田一郎',
    age: 76,
    sex: '男性',
    room: '305',
    avatar: '👴',
    gradient: 'from-slate-400 to-slate-600',
    bgGradient: 'from-slate-50 to-zinc-50 dark:from-slate-900/40 dark:to-zinc-900/40',
    summary: '大腿骨頸部骨折術後。最近様子が変わった。口数が極端に少ない。',
    stage: 'ステージ5:薬剤性',
    stageIcon: Pill,
    difficulty: 5,
    truth: { lip: 2, tongue: 1, gum: 0, saliva: 2, teeth: 1, denture: 1, clean: 1, pain: 0 },
    keyFindings: [
      {
        cat: 'saliva',
        text: '薬剤性の著明な口腔乾燥(リスペリドン2週間前開始)',
        importance: 'high',
      },
      { cat: 'lip', text: '口唇乾燥・亀裂(出血を伴う)', importance: 'high' },
      { cat: 'denture', text: '義歯の適合不良(口腔乾燥が原因)', importance: 'mid' },
    ],
    background:
      '骨折術後の不眠・夜間せん妄に対し2週間前からリスペリドンが追加処方。薬剤性の錐体外路症状で嚥下機能が低下、口腔乾燥が著明。「うつ的になった」と見える変化の正体は薬剤性嚥下障害。常用量でも発症する。抗精神病薬・抗ヒスタミン薬・抗コリン薬・利尿薬・降圧薬は要注意。',
    consultations: [
      {
        who: '薬剤師',
        why: '唾液スコア2 + 2週間前の処方変更 → 薬剤性口腔乾燥の確認',
      },
      { who: '歯科医師', why: '義歯の適合再調整(口腔乾燥で粘膜の動きが変化)' },
      { who: '医師', why: 'リスペリドン継続の妥当性検討・代替薬の相談' },
    ],
    insight:
      '「最近元気がない」「ぼーっとしている」=うつや認知症進行と決めつけない。OHATの唾液スコアと2週間以内の処方変更を必ずクロスチェックする。薬剤性嚥下障害は中止・減量で改善することが多い。',
  },
  {
    id: 'C',
    name: '佐藤花子',
    age: 85,
    sex: '女性',
    room: '308',
    avatar: '👵',
    gradient: 'from-amber-300 to-orange-400',
    bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40',
    summary:
      '心不全コントロール目的で入院。元気でおしゃべり好き。「お肉が食べられない」と訴え。',
    stage: 'ステージ1〜2:老化+疾病',
    stageIcon: Activity,
    difficulty: 2,
    truth: { lip: 0, tongue: 0, gum: 1, saliva: 0, teeth: 2, denture: 0, clean: 1, pain: 1 },
    keyFindings: [
      { cat: 'teeth', text: 'う蝕4本以上、右下奥歯の破折・動揺', importance: 'high' },
      { cat: 'pain', text: '冷温痛・咬合痛あり、食事制限の訴え', importance: 'high' },
      { cat: 'gum', text: '部分的歯肉腫脹(2-3歯分)', importance: 'mid' },
    ],
    background:
      '生理的老化(ステージ1)に加え、心不全(ステージ2)。認知機能はしっかりしており、自分の症状を訴えられる。嚥下機能自体は保たれているが、咀嚼が困難。残存歯の問題で硬いものが食べられない。',
    consultations: [
      { who: '歯科医師', why: '残存歯スコア2 + 歯痛スコア1 → 緊急歯科紹介' },
      { who: '管理栄養士', why: '咀嚼困難に対応した食形態の調整(軟菜食など)' },
    ],
    insight:
      '訴えがはっきりしている患者でも、訴えだけで満足せず必ず実際の口腔内も確認する。「お肉が食べられない」の背景にある具体的な歯の問題を特定し、適切な専門職へ繋げる。',
  },
]

// =====================================================================
// ナビ先生
// =====================================================================

const NAVI = {
  name: 'ナビ先生',
  avatar: '👩‍🏫',
  gradient: 'from-violet-400 to-purple-500',
} as const

// =====================================================================
// ストーリーデータ
// =====================================================================

type Scene =
  | { t: 'p'; text: string }
  | { t: 'n'; text: string }
  | { t: 'nav'; text: string }
  | { t: 'obs'; text: string }
  | { t: 'q'; cat: CatKey }
  | { t: 'fb'; cat: CatKey; note: string }

const STORIES: Record<'A' | 'B' | 'C', Scene[]> = {
  A: [
    { t: 'p', text: 'あら…どちらさん?…あぁ、看護師さん。おはようございます。' },
    { t: 'n', text: '田中さん、おはようございます。今日も少しお話聞かせてくださいね。' },
    { t: 'p', text: 'うふふ、ええ、いいですよ…ねぇ、明はもう来たかしら?' },
    {
      t: 'nav',
      text:
        '田中ハナさんは中等度の認知症があります。直前のことを忘れがち。会話を進めながら、口の状態をしっかり観察していきましょう。今日はOHAT-Jの8項目を一緒に評価していきますよ。',
    },
    { t: 'n', text: 'ちょっとお顔を拝見しますね。' },
    { t: 'p', text: 'あら、どこ見るの?…まあ、いいわよ。' },
    {
      t: 'obs',
      text:
        '口唇は乾燥しており、薄く皮がむけかけている。両側の口角に軽度の発赤あり。腫脹・潰瘍・出血は認めない。',
    },
    {
      t: 'nav',
      text:
        'まずはOHAT-Jの「口唇」評価です。観察した状態から、0〜2のどれに当てはまるか考えてみて!',
    },
    { t: 'q', cat: 'lip' },
    {
      t: 'fb',
      cat: 'lip',
      note:
        '田中さんは認知症で水分摂取が減りがち、口呼吸傾向もあって乾燥しやすい状態です。乾燥+口角発赤は典型的なスコア1の所見ですね。',
    },
    { t: 'n', text: 'お口を「あー」と開けてもらえますか?' },
    { t: 'p', text: 'あー…こうかしら…' },
    {
      t: 'obs',
      text:
        '舌の表面に白色の舌苔が中等度付着している。舌縁に軽度の発赤あり。潰瘍や赤色斑、明らかな腫脹は認めない。',
    },
    { t: 'q', cat: 'tongue' },
    {
      t: 'fb',
      cat: 'tongue',
      note:
        'OHAT-Jでは舌苔の付着があれば、量・性状・色に関わらずスコア1です。口腔清掃が不十分な患者によくみられる所見。',
    },
    { t: 'n', text: '次に、歯ぐきも見せていただけますか?' },
    {
      t: 'obs',
      text:
        '歯肉は湿潤しピンク色。腫脹や発赤、出血、潰瘍は認められない。歯の動揺もなし。頬粘膜も健常。',
    },
    { t: 'q', cat: 'gum' },
    {
      t: 'fb',
      cat: 'gum',
      note:
        'ハナさんは歯肉自体は良好。歯肉腫脹は1-6歯分なら1、7歯分以上か潰瘍・歯の動揺があれば2になります。',
    },
    { t: 'n', text: 'お口の中、乾く感じはありますか?' },
    { t: 'p', text: 'うーん、ベタベタするわねぇ…お茶が欲しいわ。' },
    {
      t: 'obs',
      text:
        '粘膜にやや乾燥感あり、唾液は粘稠だが完全に干上がってはいない。本人は「ベタつく」と若干の口渇を表現。',
    },
    { t: 'q', cat: 'saliva' },
    {
      t: 'fb',
      cat: 'saliva',
      note:
        '「べたつく粘膜」「若干の口渇感」はスコア1の典型。完全に干からびて口渇感をはっきり訴えるレベルなら2です。',
    },
    { t: 'n', text: '歯の様子も拝見しますね。' },
    { t: 'obs', text: '残存歯は20本。う蝕や歯の破折、残根、咬耗はいずれも認めない。' },
    { t: 'q', cat: 'teeth' },
    {
      t: 'fb',
      cat: 'teeth',
      note:
        'ハナさんは歯自体は健康。3本以下のう蝕・破折・咬耗ならスコア1、4本以上または義歯なしで残存歯3本以下ならスコア2です。',
    },
    { t: 'n', text: '入れ歯はお使いですか?' },
    { t: 'p', text: '入れ歯?…ないわよ。自分の歯で食べてるの。' },
    { t: 'obs', text: '義歯の使用なし。残存歯が十分にあり、義歯は不要な状態。' },
    { t: 'q', cat: 'denture' },
    {
      t: 'fb',
      cat: 'denture',
      note:
        '義歯が不要で問題なく食事できているならスコア0です。「義歯なし=0」は迷いやすいポイントなので要注意!',
    },
    { t: 'n', text: '今朝、歯磨きはされましたか?' },
    { t: 'p', text: 'あら、しなきゃ?…昨日したかしらねぇ…' },
    {
      t: 'obs',
      text:
        '前歯部・両側臼歯部の3つのブロックに食物残渣とプラークが厚く付着。中等度の口臭あり。',
    },
    {
      t: 'nav',
      text:
        'ここがポイント! 認知症があると自分で歯磨きができないことが多い。本人の言葉だけでなく、必ず実際の口腔内を観察しましょう。',
    },
    { t: 'q', cat: 'clean' },
    {
      t: 'fb',
      cat: 'clean',
      note:
        '3部位以上に食渣・プラーク+口臭ありで明確にスコア2。これは認知症によるADL低下のサインで、歯科衛生士による専門的口腔ケアが必要です。',
    },
    { t: 'n', text: 'どこか痛むところはありますか?' },
    { t: 'p', text: '痛い?…別にないわよ。何ともないわぁ。' },
    {
      t: 'obs',
      text:
        '顔をしかめる・口唇を噛む・食事拒否・攻撃的になるなどの言動的兆候は見られない。頬や歯肉の腫脹・歯の破折・潰瘍などの身体的兆候もなし。',
    },
    { t: 'q', cat: 'pain' },
    {
      t: 'fb',
      cat: 'pain',
      note:
        '言動的兆候なし、身体的兆候もなしでスコア0。認知症患者は痛みの訴えが弱いこともあるので、表情や行動の観察も大事です。',
    },
    {
      t: 'nav',
      text: '8項目の評価、お疲れさまでした!最後に総合結果と、ハナさんの背景にある真実を見ていきましょう。',
    },
  ],
  B: [
    { t: 'n', text: '山田さん、おはようございます。' },
    { t: 'p', text: '…ああ。' },
    { t: 'n', text: 'お変わりありませんか?' },
    { t: 'p', text: '…(沈黙)…別に…。' },
    {
      t: 'nav',
      text:
        '山田さんは骨折術後で入院中。最近活気がなく、口数も少ないとのこと。情報を引き出すには時間と工夫が必要そうです。OHATを丁寧に評価していきましょう。',
    },
    { t: 'n', text: 'ちょっとお顔を拝見しますね。' },
    {
      t: 'obs',
      text:
        '口唇は強く乾燥している。下唇に縦に走る亀裂があり、軽度の出血を伴う。両側口角に深い亀裂と発赤、わずかに浸出液を認める。',
    },
    { t: 'q', cat: 'lip' },
    {
      t: 'fb',
      cat: 'lip',
      note:
        '出血を伴う亀裂は「潰瘍性出血」に相当し、スコア2。OHAT-Jでは出血や潰瘍があればただちに2と判定します。これは「重要所見」── 薬剤性口腔乾燥のサインかも。',
    },
    { t: 'n', text: 'お口、開けられますか?' },
    { t: 'p', text: '(ゆっくり開口)…あー。' },
    {
      t: 'obs',
      text:
        '舌に黄白色の舌苔が中等度付着。亀裂もみられる。潰瘍性病変や著明な腫脹はなし。',
    },
    { t: 'q', cat: 'tongue' },
    {
      t: 'fb',
      cat: 'tongue',
      note:
        '舌苔の付着+亀裂はスコア1。色や量に関わらず舌苔があれば1。潰瘍・赤色斑・著明な腫脹があれば2です。',
    },
    {
      t: 'obs',
      text:
        '歯肉は乾燥しており色調は褪色傾向だが、腫脹・出血・潰瘍は認めない。歯の動揺もなし。',
    },
    { t: 'q', cat: 'gum' },
    {
      t: 'fb',
      cat: 'gum',
      note:
        '乾燥はみられるが、腫脹・出血・潰瘍・歯の動揺がないため0と判定。乾燥所見は「唾液」のスコアに反映されます。観察項目を区別する練習を!',
    },
    { t: 'n', text: 'お口、乾きませんか?' },
    { t: 'p', text: '…ああ。…かわく…。' },
    { t: 'n', text: 'お水を飲んでもすぐ?' },
    { t: 'p', text: '…うん。…またすぐ…。' },
    {
      t: 'obs',
      text:
        '口腔内は赤く干からびた状態。唾液はほぼ確認できず、糸状の粘稠唾液が舌と頬粘膜の間にわずかに存在。本人ははっきりと口渇感を訴える。',
    },
    { t: 'q', cat: 'saliva' },
    {
      t: 'fb',
      cat: 'saliva',
      note:
        '「赤く干からびた状態」「粘性の高い唾液」「口渇感あり」── すべてスコア2の典型所見です。これは「重要所見」!',
    },
    {
      t: 'nav',
      text:
        'ナビ先生からの質問です。山田さんに「最近お薬は変わりましたか?」と聞いてみましょう。',
    },
    { t: 'n', text: '山田さん、最近お薬は変わりましたか?' },
    { t: 'p', text: '…2しゅうかんくらい前から…新しいの…。' },
    {
      t: 'nav',
      text:
        'ここがポイント! 唾液スコア2 + 2週間前の処方変更。これは薬剤性嚥下障害の典型パターン。リスペリドン・ハロペリドールなどの抗精神病薬は錐体外路症状で口腔乾燥・嚥下障害を引き起こします。常用量でも発症します。',
    },
    {
      t: 'obs',
      text:
        '上顎は無歯顎、下顎に残存歯が4本(うち2本は残根)、軽度の咬耗あり。明らかなう蝕は1本のみ。',
    },
    { t: 'q', cat: 'teeth' },
    {
      t: 'fb',
      cat: 'teeth',
      note:
        '3本以下のう蝕・残根・咬耗ならスコア1。4本以上または「義歯なしで残存歯3本以下」ならスコア2。山田さんは義歯ありなので残存歯数では問題ないですね。',
    },
    { t: 'n', text: '入れ歯はどうしてます?' },
    { t: 'p', text: '…あわなくなった…。' },
    {
      t: 'obs',
      text:
        '上下の総義歯あり。最近装着すると痛むため、1日1〜2時間しか装着できていない。明らかな破折はないが、口腔乾燥のため吸着不良。',
    },
    { t: 'q', cat: 'denture' },
    {
      t: 'fb',
      cat: 'denture',
      note:
        '破折などの異常がなくても「1日1-2時間しか使用できない」場合はスコア1。義歯不適合の背景に口腔乾燥がある可能性に注目!2部位以上の破折や紛失はスコア2です。',
    },
    {
      t: 'obs',
      text: '前歯舌側と臼歯部の2部位に食物残渣とプラークの付着あり。口臭は若干認める。',
    },
    { t: 'q', cat: 'clean' },
    {
      t: 'fb',
      cat: 'clean',
      note:
        '1〜2部位の食渣・プラーク+若干の口臭でスコア1。3部位以上または強い口臭でスコア2です。',
    },
    { t: 'n', text: '痛むところはありますか?' },
    { t: 'p', text: '…別に…。' },
    {
      t: 'obs',
      text:
        '顔の引きつり・口唇を噛む・食事拒否などの言動的兆候、頬や歯肉の腫脹・潰瘍などの身体的兆候は認めない。',
    },
    { t: 'q', cat: 'pain' },
    {
      t: 'fb',
      cat: 'pain',
      note:
        '疼痛兆候はなくスコア0。ただし、口数の少なさ自体が薬剤性の影響であり、訴えない=痛くないとは限らない点に注意。表情観察も継続的に。',
    },
    {
      t: 'nav',
      text:
        '全項目評価完了!山田さんの背景にある真実を確認しましょう。「重要所見」が2つあったの、覚えてますか?',
    },
  ],
  C: [
    { t: 'p', text: 'あらあら、看護師さん!おはよう。' },
    { t: 'n', text: '佐藤さん、お元気そうですね。' },
    { t: 'p', text: 'うふふ、孫が昨日来てくれてね、写真も持ってきてくれたのよ。可愛くって。' },
    {
      t: 'nav',
      text:
        '佐藤さんは認知機能しっかり、自分の症状もきちんと言葉にできるタイプ。でも訴えだけで判断せず、必ず実際に見ることが大事ですよ。',
    },
    { t: 'n', text: 'お顔を拝見しますね。' },
    {
      t: 'obs',
      text: '口唇は湿潤しピンク色。乾燥や口角発赤、潰瘍などの所見はない。',
    },
    { t: 'q', cat: 'lip' },
    {
      t: 'fb',
      cat: 'lip',
      note:
        'OHAT-Jでは正常・湿潤・ピンクならスコア0。佐藤さんは認知機能と全身状態が良好で、口唇は健全な状態を保っています。',
    },
    { t: 'n', text: 'お口「あー」ってお願いします。' },
    { t: 'p', text: 'はーい、あー。' },
    {
      t: 'obs',
      text: '舌は湿潤しピンク、舌苔の付着もなし。亀裂・発赤・潰瘍もなし。',
    },
    { t: 'q', cat: 'tongue' },
    {
      t: 'fb',
      cat: 'tongue',
      note:
        'スコア0。舌苔がなく潰瘍もなければ0です。舌苔があれば(量に関わらず)1、潰瘍・腫脹があれば2。',
    },
    { t: 'n', text: '歯ぐきも見せていただけますか?' },
    {
      t: 'obs',
      text:
        '歯肉は全体的にやや退縮しており、上前歯の歯肉に部分的(2〜3歯分)の発赤と軽度の腫脹を認める。出血・潰瘍はなし、歯の動揺もなし。',
    },
    { t: 'q', cat: 'gum' },
    {
      t: 'fb',
      cat: 'gum',
      note:
        '1-6歯分の部分的な腫脹・発赤はスコア1。7歯分以上の腫脹や歯の動揺・潰瘍があればただちにスコア2です。',
    },
    { t: 'n', text: 'お口の渇きはありますか?' },
    { t: 'p', text: 'あら、別に大丈夫よ。' },
    {
      t: 'obs',
      text: '口腔内は湿潤、唾液は漿液性で十分に存在。べたつきも口渇感もなし。',
    },
    { t: 'q', cat: 'saliva' },
    {
      t: 'fb',
      cat: 'saliva',
      note:
        '湿潤で漿液性ならスコア0。べたつく粘膜や少量の唾液、若干の口渇感があれば1、赤く干からびた状態+口渇感あれば2です。',
    },
    { t: 'n', text: '歯の様子も見せていただけますか?' },
    { t: 'p', text: 'うん、いいわよ。…でもね、最近お肉が食べられないのよ。' },
    {
      t: 'obs',
      text:
        '右下第二大臼歯に大きなう蝕で破折あり、動揺も認める。左下臼歯部に2本のう蝕、上前歯にも1本のう蝕。残根が1本。う蝕・破折・残根の合計は5本以上。',
    },
    { t: 'q', cat: 'teeth' },
    {
      t: 'fb',
      cat: 'teeth',
      note:
        'う蝕・破折・残根が4本以上でスコア2(病的)。これは「重要所見」── 緊急の歯科紹介が必要です。「お肉が食べられない」訴えの正体はこれ!',
    },
    { t: 'n', text: '入れ歯はお使いですか?' },
    { t: 'p', text: '上に小さい入れ歯入れてるのよ。これは問題ないわ。' },
    {
      t: 'obs',
      text: '上顎部分床義歯、適合良好で破折なし。問題なく装着できる状態。',
    },
    { t: 'q', cat: 'denture' },
    {
      t: 'fb',
      cat: 'denture',
      note:
        '義歯の破折なし・普通に装着できる状態ならスコア0。1部位の破折や1日1-2時間しか装着できない場合はスコア1。',
    },
    {
      t: 'obs',
      text: '上臼歯部頬側と下前歯舌側の2部位にプラークの付着を認める。若干の口臭もあり。',
    },
    { t: 'q', cat: 'clean' },
    {
      t: 'fb',
      cat: 'clean',
      note:
        '1-2部位の食渣・プラーク+若干の口臭でスコア1。3部位以上または強い口臭でスコア2です。',
    },
    { t: 'n', text: '痛むところはありますか?' },
    {
      t: 'p',
      text:
        'あるのよ!右の奥がね。冷たいお茶飲むとキーンとくるし、噛むときも痛むの。だからお肉は無理ねぇ。',
    },
    {
      t: 'obs',
      text:
        '「食事しない(硬いものを避ける)」言動的兆候あり。頬や歯肉の明確な腫脹、歯肉下膿瘍などの身体的兆候は触診上認めない。',
    },
    { t: 'q', cat: 'pain' },
    {
      t: 'fb',
      cat: 'pain',
      note:
        '「食事しない」「冷温痛の訴え」など言動的兆候があり、身体的兆候(明らかな腫脹・潰瘍・膿瘍)はないのでスコア1。身体的兆候があればスコア2になります。',
    },
    {
      t: 'nav',
      text: '8項目すべて評価完了!佐藤さんの「今回の学び」をチェックしましょう。',
    },
  ],
}

// =====================================================================
// メインコンポーネント
// =====================================================================

type Screen = 'select' | 'story' | 'reveal'

export function OhatConversationPage() {
  const [screen, setScreen] = useState<Screen>('select')
  const [patientId, setPatientId] = useState<'A' | 'B' | 'C' | null>(null)
  const [sceneIdx, setSceneIdx] = useState(0)
  const [scores, setScores] = useState<Partial<Record<CatKey, Score>>>({})
  const scrollRef = useRef<HTMLDivElement>(null)

  const markCompleted = useProgressStore((s) => s.markCompleted)
  const addXp = useProgressStore((s) => s.addXp)

  const patient = useMemo(
    () => PATIENTS.find((p) => p.id === patientId) ?? null,
    [patientId],
  )
  const story: Scene[] = patientId ? STORIES[patientId] : []

  useEffect(() => {
    const t = window.setTimeout(() => {
      const el = scrollRef.current
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    }, 50)
    return () => window.clearTimeout(t)
  }, [sceneIdx, screen])

  const startStory = (id: 'A' | 'B' | 'C') => {
    setPatientId(id)
    setSceneIdx(0)
    setScores({})
    setScreen('story')
  }

  const next = () => {
    if (sceneIdx < story.length - 1) {
      setSceneIdx((i) => i + 1)
    } else {
      setScreen('reveal')
      markCompleted('ohat-conversation')
      addXp(XP_ACTIONS.viewLesson)
    }
  }

  const submitScore = (cat: CatKey, score: Score) => {
    setScores((prev) => ({ ...prev, [cat]: score }))
    setSceneIdx((i) => Math.min(i + 1, story.length - 1))
    if (sceneIdx === story.length - 1) {
      setScreen('reveal')
      markCompleted('ohat-conversation')
      addXp(XP_ACTIONS.viewLesson)
    }
  }

  const reset = () => {
    setScreen('select')
    setPatientId(null)
    setSceneIdx(0)
    setScores({})
  }

  const evalCount = Object.keys(scores).length

  // ============================================================
  // 患者選択画面
  // ============================================================
  if (screen === 'select') {
    return (
      <div className="mx-auto max-w-lg space-y-4">
        <div className="flex items-center gap-2">
          <Link
            to="/ohat"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="戻る"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              会話で学ぶOHAT
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              観察してOHATを当てる ストーリーモード
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-3 dark:border-pink-900/40 dark:from-pink-950/40 dark:to-rose-950/40">
          <div className="flex items-center gap-2 text-xs">
            <Sparkles size={14} className="text-rose-500" />
            <span className="font-bold text-rose-700 dark:text-rose-300">
              ストーリーを読み進めながら、OHAT-J 8項目を判定する練習
            </span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-400">
            ▼ 今日の担当患者を選んでください
          </p>
          <div className="space-y-3">
            {PATIENTS.map((p) => {
              const StageIcon = p.stageIcon
              return (
                <button
                  key={p.id}
                  onClick={() => startStory(p.id)}
                  className={`relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br ${p.bgGradient} p-4 text-left transition-all hover:shadow-md active:scale-[0.98] dark:border-gray-700`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.gradient} text-3xl shadow-md`}
                    >
                      {p.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-1.5">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">
                          {p.name}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {p.age}歳・{p.room}号室
                        </span>
                      </div>
                      <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 dark:bg-gray-900/60">
                        <StageIcon size={12} className="text-gray-600 dark:text-gray-300" />
                        <span className="text-[10px] font-bold text-gray-700 dark:text-gray-200">
                          {p.stage}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-200">
                        {p.summary}
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">
                          難易度
                        </span>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i <= p.difficulty
                                ? 'text-amber-500'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className="mt-4 shrink-0 text-gray-400 dark:text-gray-500"
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl bg-white/70 p-4 text-xs leading-relaxed text-gray-600 dark:bg-gray-900/60 dark:text-gray-300">
          <p className="mb-1 font-bold text-gray-700 dark:text-gray-200">遊び方</p>
          <p>
            「次へ」ボタンを押すとストーリーが進みます。観察ポイントが出てきたら、OHAT-Jの基準に従って 0(健全)/ 1(やや不良)/ 2(病的)で採点。ナビ先生が即座に解説してくれます。
          </p>
        </div>
      </div>
    )
  }

  // ============================================================
  // ストーリー画面
  // ============================================================
  if (screen === 'story' && patient) {
    const currentScene = story[sceneIdx]
    const isQuiz = currentScene?.t === 'q'
    const visibleScenes = story.slice(0, sceneIdx + 1)

    return (
      <div className="mx-auto flex h-[calc(100dvh-9rem)] max-w-lg flex-col">
        {/* ヘッダー */}
        <div className="flex flex-shrink-0 items-center gap-3 rounded-t-xl border border-b-0 border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <button
            onClick={reset}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="患者選択へ戻る"
          >
            <ArrowLeft size={20} />
          </button>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${patient.gradient} text-xl shadow-sm`}
          >
            {patient.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {patient.name}さん
            </h2>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              {patient.age}歳・{patient.room}号室
            </p>
          </div>
          <div className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 dark:border-teal-800 dark:bg-teal-950">
            <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300">
              OHAT {evalCount}/8
            </span>
          </div>
        </div>

        {/* シーン表示エリア */}
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto border-x border-gray-200 bg-gradient-to-b from-teal-50 to-cyan-50 px-3 py-4 dark:border-gray-700 dark:from-gray-900 dark:to-gray-950"
        >
          {visibleScenes.map((sc, i) => (
            <SceneCard
              key={i}
              scene={sc}
              patient={patient}
              userScore={sc.t === 'q' ? scores[sc.cat] : undefined}
            />
          ))}
        </div>

        {/* アクションボタン */}
        <div className="flex-shrink-0 rounded-b-xl border border-t-0 border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {isQuiz && currentScene?.t === 'q' ? (
            <QuizButtons
              cat={currentScene.cat}
              onPick={(s) => submitScore(currentScene.cat, s)}
            />
          ) : (
            <button
              onClick={next}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 py-3 font-bold text-white shadow-md transition-all active:scale-[0.98]"
            >
              {sceneIdx === story.length - 1 ? '結果を見る' : '次へ'}
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    )
  }

  // ============================================================
  // 答え合わせ画面
  // ============================================================
  if (screen === 'reveal' && patient) {
    const correctCount = CAT_KEYS.filter((c) => scores[c] === patient.truth[c]).length
    const userTotal = CAT_KEYS.reduce((sum, c) => sum + (scores[c] ?? 0), 0)
    const trueTotal = CAT_KEYS.reduce((sum, c) => sum + patient.truth[c], 0)
    const StageIcon = patient.stageIcon

    let rank: 'S' | 'A' | 'B' | 'C'
    let rankColor: string
    let rankMsg: string
    if (correctCount >= 7) {
      rank = 'S'
      rankColor = 'from-yellow-400 to-amber-500'
      rankMsg = 'ベテランの観察眼!'
    } else if (correctCount >= 5) {
      rank = 'A'
      rankColor = 'from-emerald-400 to-teal-500'
      rankMsg = '臨床的に十分な観察力'
    } else if (correctCount >= 3) {
      rank = 'B'
      rankColor = 'from-blue-400 to-cyan-500'
      rankMsg = 'もう少し観察を深めよう'
    } else {
      rank = 'C'
      rankColor = 'from-slate-400 to-slate-500'
      rankMsg = '基準を見直して再挑戦!'
    }

    return (
      <div className="mx-auto max-w-lg space-y-4">
        <div
          className={`rounded-xl bg-gradient-to-br ${rankColor} p-6 text-center text-white shadow-xl`}
        >
          <div className="mb-2 text-xs font-bold opacity-90">あなたのランク</div>
          <div className="mb-2 text-7xl font-black drop-shadow-lg">{rank}</div>
          <div className="mb-3 text-sm font-bold">{rankMsg}</div>
          <div className="grid grid-cols-2 gap-3 rounded-xl bg-white/20 p-3 backdrop-blur">
            <div>
              <div className="text-[10px] opacity-80">正答数</div>
              <div className="text-2xl font-black">
                {correctCount}
                <span className="text-sm opacity-80">/8</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] opacity-80">合計スコア</div>
              <div className="text-2xl font-black">
                {userTotal}
                <span className="text-sm opacity-80">→{trueTotal}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h3 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-gray-100">
            <Trophy size={16} className="text-amber-500" />
            カテゴリ別 答え合わせ
          </h3>
          <div className="space-y-2">
            {CAT_KEYS.map((c) => {
              const userS = scores[c]
              const trueS = patient.truth[c]
              const correct = userS === trueS
              const finding = patient.keyFindings.find((f) => f.cat === c)
              return (
                <div
                  key={c}
                  className={`rounded-xl border p-3 ${
                    correct
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40'
                      : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40'
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {correct ? (
                        <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle size={16} className="text-red-600 dark:text-red-400" />
                      )}
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {RULES[c].label}
                      </span>
                      {finding?.importance === 'high' && (
                        <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                          重要
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-gray-500 dark:text-gray-400">
                        あなた:
                        <span className="font-bold text-gray-900 dark:text-gray-100">
                          {userS ?? '-'}
                        </span>
                      </span>
                      <span className="text-gray-300 dark:text-gray-600">→</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        正解:
                        <span className="font-bold text-green-700 dark:text-green-300">
                          {trueS}
                        </span>
                      </span>
                    </div>
                  </div>
                  {finding && (
                    <div className="mt-1.5 pl-6 text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
                      {finding.text}
                    </div>
                  )}
                  <div className="mt-1.5 pl-6 text-[10px] leading-relaxed text-gray-500 dark:text-gray-400">
                    観察のコツ:{RULES[c].observationTip}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white shadow-lg">
          <div className="mb-2 flex items-center gap-2">
            <StageIcon size={20} />
            <h3 className="text-sm font-bold">背景にある真実 ── {patient.stage}</h3>
          </div>
          <p className="text-xs leading-relaxed opacity-95">{patient.background}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-gray-100">
            連携すべき職種
          </h3>
          <div className="space-y-2">
            {patient.consultations.map((cons, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-xl bg-gray-50 p-2.5 dark:bg-gray-800"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 text-xs font-bold text-white">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {cons.who}
                  </div>
                  <div className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
                    {cons.why}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/40">
          <div className="flex items-start gap-2">
            <Lightbulb size={20} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <h3 className="mb-1 text-sm font-bold text-amber-900 dark:text-amber-200">
                今回の学び
              </h3>
              <p className="text-xs leading-relaxed text-amber-900 dark:text-amber-100">
                {patient.insight}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pb-4">
          <button
            onClick={() => startStory(patient.id)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white py-3 text-sm font-bold text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          >
            <RotateCcw size={16} />
            同じ患者でもう一度
          </button>
          <button
            onClick={reset}
            className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98]"
          >
            別の患者に挑戦 →
          </button>
        </div>
      </div>
    )
  }

  return null
}

// =====================================================================
// シーンカード
// =====================================================================

function SceneCard({
  scene,
  patient,
  userScore,
}: {
  scene: Scene
  patient: Patient
  userScore?: Score
}) {
  if (scene.t === 'p') {
    return (
      <div className="flex items-end justify-start gap-2">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${patient.gradient} text-base`}
        >
          {patient.avatar}
        </div>
        <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed text-gray-800 shadow-sm dark:bg-gray-800 dark:text-gray-100">
          {scene.text}
        </div>
      </div>
    )
  }

  if (scene.t === 'n') {
    return (
      <div className="flex items-end justify-end gap-2">
        <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-gradient-to-br from-teal-400 to-cyan-500 px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm">
          {scene.text}
        </div>
      </div>
    )
  }

  if (scene.t === 'nav') {
    return (
      <div className="flex items-start justify-start gap-2">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${NAVI.gradient} text-base shadow-md`}
        >
          {NAVI.avatar}
        </div>
        <div className="flex-1 rounded-2xl rounded-tl-sm border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-3 shadow-sm dark:border-violet-800 dark:from-violet-950/60 dark:to-purple-950/60">
          <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-violet-600 dark:text-violet-300">
            <GraduationCap size={12} />
            {NAVI.name}
          </div>
          <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-100">
            {scene.text}
          </div>
        </div>
      </div>
    )
  }

  if (scene.t === 'obs') {
    return (
      <div className="rounded-2xl border-2 border-cyan-300 bg-gradient-to-br from-cyan-50 to-blue-50 p-3 shadow-sm dark:border-cyan-800 dark:from-cyan-950/60 dark:to-blue-950/60">
        <div className="mb-2 flex items-center gap-1.5">
          <Eye size={16} className="text-cyan-600 dark:text-cyan-300" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
            観察所見
          </span>
        </div>
        <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-100">
          {scene.text}
        </div>
      </div>
    )
  }

  if (scene.t === 'q') {
    const rule = RULES[scene.cat]
    return (
      <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 text-white shadow-xl">
        <div className="mb-2 flex items-center gap-1.5">
          <Sparkles size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">OHAT 評価ポイント</span>
        </div>
        <div className="mb-1 text-lg font-bold">「{rule.label}」</div>
        <div className="mb-2 text-xs opacity-90">
          どのスコアが当てはまる?下のボタンから選んでね
        </div>
        {userScore !== undefined && (
          <div className="mt-2 rounded-xl bg-white/20 p-2 backdrop-blur">
            <span className="text-xs">
              あなたの回答:<span className="text-lg font-black">{userScore}</span>
            </span>
          </div>
        )}
      </div>
    )
  }

  if (scene.t === 'fb') {
    const rule = RULES[scene.cat]
    return <FeedbackCard scene={scene} rule={rule} patient={patient} />
  }

  return null
}

// =====================================================================
// フィードバックカード
// =====================================================================

function FeedbackCard({
  scene,
  rule,
  patient,
}: {
  scene: { t: 'fb'; cat: CatKey; note: string }
  rule: Rule
  patient: Patient
}) {
  const correct = patient.truth[scene.cat]
  const correctLevel = rule.levels.find((l) => l.s === correct)

  return (
    <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 shadow-sm dark:border-emerald-800 dark:from-emerald-950/60 dark:to-teal-950/60">
      <div className="mb-2 flex items-center gap-1.5">
        <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-300" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
          ナビ先生の解説
        </span>
      </div>
      <div className="mb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
        正解は{' '}
        <span className="text-2xl text-emerald-600 dark:text-emerald-300">{correct}</span>(
        <span className="text-emerald-700 dark:text-emerald-300">{correctLevel?.name}</span>)
      </div>
      <div className="mb-2 rounded-xl bg-white/70 p-2.5 dark:bg-gray-900/40">
        <div className="mb-1 text-[10px] font-bold text-gray-500 dark:text-gray-400">
          OHAT-J 評価基準({rule.label})
        </div>
        <div className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
          {rule.full}
        </div>
      </div>
      <div className="mb-2 rounded-xl border border-cyan-200 bg-cyan-50/70 p-2.5 dark:border-cyan-800 dark:bg-cyan-950/40">
        <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-cyan-700 dark:text-cyan-300">
          <Eye size={12} />
          観察のコツ(豊橋医療センター教材より)
        </div>
        <div className="text-[11px] leading-relaxed text-cyan-900 dark:text-cyan-100">
          {rule.observationTip}
        </div>
      </div>
      <div className="mb-2 rounded-xl border border-violet-200 bg-violet-50/70 p-2.5 dark:border-violet-800 dark:bg-violet-950/40">
        <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-violet-700 dark:text-violet-300">
          <GraduationCap size={12} />
          嚥下5期モデルとの関連
        </div>
        <div className="text-[11px] leading-relaxed text-violet-900 dark:text-violet-100">
          {rule.phaseLink}
        </div>
      </div>
      {scene.note && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-2.5 dark:border-amber-800 dark:bg-amber-950/40">
          <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300">
            <Lightbulb size={12} />
            この患者さんの場合
          </div>
          <div className="text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
            {scene.note}
          </div>
        </div>
      )}
    </div>
  )
}

// =====================================================================
// クイズボタン
// =====================================================================

function QuizButtons({ cat, onPick }: { cat: CatKey; onPick: (s: Score) => void }) {
  const rule = RULES[cat]
  const colors = [
    'from-emerald-400 to-teal-500',
    'from-amber-400 to-orange-500',
    'from-rose-400 to-red-500',
  ]

  return (
    <div>
      <div className="mb-2 text-center text-[10px] font-bold text-gray-500 dark:text-gray-400">
        ▼ 「{rule.label}」のスコアを選んでください
      </div>
      <div className="grid grid-cols-3 gap-2">
        {rule.levels.map((lv, i) => (
          <button
            key={lv.s}
            onClick={() => onPick(lv.s)}
            className={`rounded-xl bg-gradient-to-br ${colors[i]} p-2.5 text-white shadow-md transition-all active:scale-95`}
          >
            <div className="text-2xl font-black">{lv.s}</div>
            <div className="text-[10px] font-bold opacity-95">{lv.name}</div>
            <div className="mt-0.5 text-[9px] leading-tight opacity-90">{lv.short}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
