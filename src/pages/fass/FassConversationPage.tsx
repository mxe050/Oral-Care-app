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
  Activity,
  Eye,
  GraduationCap,
  AlertCircle,
  Utensils,
} from 'lucide-react'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'

// =====================================================================
// FASS (Feeding Assistance Skill Score) 評価基準
// 出典: Nagano A, Maeda K et al. Eur Geriatr Med. 2024;15:1437-45
// 各項目を 0=していない / 1=不十分 / 2=十分にできている で評価
// =====================================================================

type ItemKey =
  | 'i1_trunk'
  | 'i2_feet'
  | 'i3_neck'
  | 'i4_voice'
  | 'i5_scoopVisible'
  | 'i6_handSide'
  | 'i7_chinUp'
  | 'i8_upperLip'
  | 'i9_foodVisible'
  | 'i10_pace'

type Score = 0 | 1 | 2

interface Level {
  s: Score
  name: string
  short: string
}

interface Rule {
  no: number
  label: string
  group: '姿勢の準備' | '嚥下準備の確認' | 'スプーン操作' | '食物認知・ペース'
  levels: [Level, Level, Level]
  full: string
  rationale: string
  evidence: string
  notInFass?: boolean
}

const RULES: Record<ItemKey, Rule> = {
  i1_trunk: {
    no: 1,
    label: '体が左右に傾いていない',
    group: '姿勢の準備',
    levels: [
      { s: 0, name: 'していない', short: '明らかに左右に傾く' },
      { s: 1, name: '不十分', short: 'やや傾きが残る' },
      { s: 2, name: 'できている', short: '体幹がまっすぐ保たれている' },
    ],
    full:
      '0:体幹が左右どちらかに明らかに傾いている / 1:わずかに傾きがあり完全には修正されていない / 2:体幹がまっすぐで左右の傾きがない',
    rationale:
      '体幹の傾きは咽頭の解剖学的構造を歪め、食塊が一側に偏る → 不顕性誤嚥のリスク上昇。仙骨座り(滑り座り)→骨盤後傾→頸部過伸展の連鎖は誤嚥性肺炎の直接的原因。',
    evidence: 'FASS項目1。AC1=0.443(中等度信頼性)で確定。Nagano 2024.',
  },
  i2_feet: {
    no: 2,
    label: '足底が床またはフットレストに接地している',
    group: '姿勢の準備',
    levels: [
      { s: 0, name: 'していない', short: '足が宙に浮いている' },
      { s: 1, name: '不十分', short: '片足のみ接地、不完全' },
      { s: 2, name: 'できている', short: '両足底がしっかり接地' },
    ],
    full:
      '0:両足とも床/足台に接地していない / 1:片足のみ接地など不完全 / 2:両足底がしっかり床またはフットレストに接地',
    rationale:
      '足底接地は骨盤を安定させ体幹前傾位を保ちやすくする。Uesugi 2019では足底接地により舌骨上筋・胸鎖乳突筋の嚥下時活動が有意に増加。不安定な足は全身筋緊張に影響し舌骨上筋群の協調運動を阻害。',
    evidence:
      'FASS項目2。AC1=1.000(完全一致)。研究者間で最も一致しやすい客観指標の一つ。',
  },
  i3_neck: {
    no: 3,
    label: '頭頸部がやや前屈位(チンタック)',
    group: '姿勢の準備',
    levels: [
      { s: 0, name: 'していない', short: '頸部伸展(あご上げ)' },
      { s: 1, name: '不十分', short: '中間位で前屈不十分' },
      { s: 2, name: 'できている', short: 'やや前屈位が保てている' },
    ],
    full:
      '0:頸部が伸展または明らかに後屈 / 1:中間位で前屈が不十分 / 2:あごを引いた軽度前屈位が維持できている',
    rationale:
      '頸部伸展は喉頭蓋の閉鎖を妨げ気道防御機構を無効化、CORE10で最も深刻なエラーの一つ。Hanamoto 2014:頸部伸展+開口は嚥下能力を著明に低下させる。チンタック位は誤嚥リスクを約50%低減(Shanahan 1993)。',
    evidence: 'FASS項目3。AC1=0.454。Speyer 2010でも姿勢介入の代表項目。',
  },
  i4_voice: {
    no: 4,
    label: '食前に発声させ唾液・痰の貯留を確認',
    group: '嚥下準備の確認',
    levels: [
      { s: 0, name: 'していない', short: '声掛けや発声確認なし' },
      { s: 1, name: '不十分', short: '声掛けは行うが反応の確認が浅い' },
      { s: 2, name: 'できている', short: '発声を促し湿性嗄声の有無を確認' },
    ],
    full:
      '0:発声や湿性嗄声の確認をせず開始 / 1:声掛けはあるが応答の質を評価していない / 2:「あー」と発声を促し湿性嗄声・痰絡みの有無を確認している',
    rationale:
      '湿性嗄声(wet voice)は咽頭残留や喉頭侵入の鋭敏なサイン(Murugappan 2010)。食前の喀痰排出/吸引で誤嚥リスクを下げられる。FASS唯一の安全項目で、論文でも「choking防止の観点でさらなる検証が必要」と限界として明記。',
    evidence: 'FASS項目4。AC1=0.876(高信頼性)。Nagano 2024.',
  },
  i5_scoopVisible: {
    no: 5,
    label: '食事をすくう動作が被介助者から見えている',
    group: '食物認知・ペース',
    levels: [
      { s: 0, name: 'していない', short: '本人の視野外ですくっている' },
      { s: 1, name: '不十分', short: '部分的にしか見えていない' },
      { s: 2, name: 'できている', short: '本人の前方ですくう動作を見せている' },
    ],
    full:
      '0:本人の視界に入らない位置(横や後ろ)ですくう / 1:すくう動作の一部しか見えない / 2:本人の正面〜やや下方ですくう動作を視認させている',
    rationale:
      '食物視認は嚥下5期モデルの「先行期」を発動させ、唾液分泌・嚥下反射の準備を促進(Palmer 2015)。Liu 2021:食物認知の有無は食事摂取量と有意に相関。',
    evidence: 'FASS項目5。AC1=0.876。「Scooping in a position visible」として確定。',
  },
  i6_handSide: {
    no: 6,
    label: 'スプーンを持つ手が介助側に正しく対応',
    group: 'スプーン操作',
    levels: [
      { s: 0, name: 'していない', short: '逆手で介助している' },
      { s: 1, name: '不十分', short: '一部の動作で逆手になる' },
      { s: 2, name: 'できている', short: '右介助は右手、左介助は左手' },
    ],
    full:
      '0:介助側と逆の手でスプーンを持っている / 1:時々逆手になる / 2:右側からの介助は右手、左側からは左手で持つ',
    rationale:
      '介助側と同側の手で持つことで、被介助者の口腔正面にスプーンを水平に進入できる。逆手は手首がねじれ、スプーンが斜めに入って口角や歯列に接触し、食塊送り込みが乱れる。',
    evidence: 'FASS項目6。AC1=1.000(完全一致)。最も客観的に判定しやすい項目。',
  },
  i7_chinUp: {
    no: 7,
    label: 'スプーンの運びで被介助者のあごが上がらない',
    group: 'スプーン操作',
    levels: [
      { s: 0, name: 'していない', short: 'あごが明らかに上がる' },
      { s: 1, name: '不十分', short: 'わずかにあごが上がる場面あり' },
      { s: 2, name: 'できている', short: 'あごが上がらない高さで運ぶ' },
    ],
    full:
      '0:口に入れる時に頸部が伸展してあごが上がる / 1:時々あごが上がる場面がある / 2:スプーンの軌道が常に被介助者の口より下方からで、あごが上がらない',
    rationale:
      '高い位置からスプーンを運ぶと被介助者は無意識にあごを上げ、頸部伸展位で嚥下することになり誤嚥リスク激増。介助者は被介助者と同じ目線か、やや下に座るのが基本。',
    evidence: 'FASS項目7。AC1=0.723。Logemann 2008.',
  },
  i8_upperLip: {
    no: 8,
    label: 'スプーンを抜く時に上唇でこすり取らせる',
    group: 'スプーン操作',
    levels: [
      { s: 0, name: 'していない', short: '上方へ引き抜き上唇でこすらない' },
      { s: 1, name: '不十分', short: 'こするが圧が弱い' },
      { s: 2, name: 'できている', short: '上唇でしっかりこすり取らせる' },
    ],
    full:
      '0:スプーンをそのまま上方へ引き抜く / 1:軽く上唇に触れるが取り込み動作を引き出せていない / 2:上唇に押し当て、唇を閉じる動作を引き出してから水平に抜く',
    rationale:
      '上唇でこすり取る動作は口唇閉鎖→食塊形成→送り込みの一連の口腔期運動を能動的に引き出す。これを省くと食物が上口蓋に張り付いたまま残り、咀嚼・嚥下準備が始まらない。',
    evidence: 'FASS項目8。AC1=0.788。Logemann 2008. 嚥下5期の「準備期」発動の鍵。',
  },
  i9_foodVisible: {
    no: 9,
    label: '食べている食品が被介助者から見えている',
    group: '食物認知・ペース',
    levels: [
      { s: 0, name: 'していない', short: '皿が視野外、食物が見えない' },
      { s: 1, name: '不十分', short: '一部の皿のみ見えている' },
      { s: 2, name: 'できている', short: '食器全体が本人の視野内' },
    ],
    full:
      '0:食器が本人の視界に入っていない / 1:一部の食器しか見えない / 2:食器・食物全体が本人の視界に入る配置',
    rationale:
      '食物視認は先行期の中核。Chang 2008(認知症の食事困難):食物が見えないと「食事である」という認知が成立せず、開口・咀嚼・嚥下の一連が起動しない。認知症高齢者では特に重要。',
    evidence: 'FASS項目9。AC1=0.557。Mealtime Engagement Scaleとも整合。',
  },
  i10_pace: {
    no: 10,
    label: '次の一口が食事ペースを乱さない',
    group: '食物認知・ペース',
    levels: [
      { s: 0, name: 'していない', short: '次々詰め込み追い立てる' },
      { s: 1, name: '不十分', short: '時々ペースが速い' },
      { s: 2, name: 'できている', short: '嚥下確認後に次を準備' },
    ],
    full:
      '0:嚥下を待たずに次の一口を入れる / 1:時々早すぎる場面がある / 2:嚥下完了(喉頭挙上の確認)を待ってから次の一口を準備',
    rationale:
      '嚥下未完了時に次を入れると咽頭残留+追加食塊で誤嚥。Robbins 2008:介助ペースの最適化は誤嚥性肺炎発症率を有意に低下。1口ごとに「ごっくん」を確認するのが鉄則。',
    evidence: 'FASS項目10。AC1=0.402。FASSの最終項目。',
  },
}

const ITEM_KEYS: ItemKey[] = [
  'i1_trunk',
  'i2_feet',
  'i3_neck',
  'i4_voice',
  'i5_scoopVisible',
  'i6_handSide',
  'i7_chinUp',
  'i8_upperLip',
  'i9_foodVisible',
  'i10_pace',
]

// =====================================================================
// FASS には含まれないが重要な補足ポイント(論文の18項目案で除外された項目)
// =====================================================================

interface NotInFassNote {
  topic: string
  detail: string
}

const NOT_IN_FASS: Record<string, NotInFassNote> = {
  environment: {
    topic: '食事に集中できる環境(TVを消す等)',
    detail:
      'FASS試案ではAC1=0.194(信頼性低)で除外されたが、Liu 2021(MES)・Palmer 2015で食事摂取量と有意に相関。臨床現場では必ずチェックすべき項目です。',
  },
  noClutter: {
    topic: 'テーブル上に食事以外のものを置かない',
    detail:
      'AC1=0.318で除外されたが、認知症高齢者では食事認知を阻害する要因として重要。',
  },
  menuExplain: {
    topic: 'メニューを本人が分かるように説明',
    detail:
      'AC1=0.344で除外されたが、先行期の認知促進には極めて有効。',
  },
  utensilSelect: {
    topic: '嚥下能力に合わせたスプーン・食器選択',
    detail:
      'AC1=0.205で除外。実際は浅く小さいスプーン(ボール部容量3-5cc)が誤嚥リスクを下げる(Logemann)。',
  },
  biteSize: {
    topic: '一口量の調整',
    detail:
      'AC1=0.163で除外。Robbins 2008:一口5ccが標準、誤嚥リスクの高い症例では3cc以下に。',
  },
  noChat: {
    topic: '嚥下前に話しかけすぎない',
    detail:
      'AC1=0.193で除外。発話開始は声門閉鎖を解除し誤嚥のトリガーになる。「ごっくんしてからお話しましょうね」が原則。',
  },
  scoopHorizontal: {
    topic: 'スプーンを水平に挿入',
    detail:
      'AC1=0.620と高信頼性だったが、項目7(あごが上がらない)と内容重複のため統合・除外。',
  },
  lipClose: {
    topic: 'スプーン抜く前に口唇閉鎖を促す',
    detail:
      'AC1=0.652と中等度信頼性だが、項目8(上唇でこすり取る)に統合。',
  },
}

// =====================================================================
// 患者データ
// =====================================================================

interface KeyFinding {
  item: ItemKey
  text: string
  importance: 'high' | 'mid'
}

interface Patient {
  id: 'D' | 'E' | 'F'
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
  truth: Record<ItemKey, Score>
  keyFindings: KeyFinding[]
  background: string
  consultations: { who: string; why: string }[]
  insight: string
}

const PATIENTS: Patient[] = [
  {
    id: 'D',
    name: '鈴木太郎',
    age: 80,
    sex: '男性',
    room: '402',
    avatar: '👴',
    gradient: 'from-blue-400 to-cyan-500',
    bgGradient:
      'from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40',
    summary: '左被殻出血後の右片麻痺。リハ転院2週目。「うまく食べられない」と訴え。',
    stage: 'ステージ:脳卒中後遺症',
    stageIcon: Activity,
    difficulty: 3,
    truth: {
      i1_trunk: 1,
      i2_feet: 0,
      i3_neck: 0,
      i4_voice: 2,
      i5_scoopVisible: 2,
      i6_handSide: 2,
      i7_chinUp: 1,
      i8_upperLip: 1,
      i9_foodVisible: 2,
      i10_pace: 2,
    },
    keyFindings: [
      {
        item: 'i2_feet',
        text: '足が車椅子のフットサポートから外れて宙に浮いている',
        importance: 'high',
      },
      {
        item: 'i3_neck',
        text: '頭部が後ろにもたれ頸部が伸展位、リクライニング角度45°だが頸部支持なし',
        importance: 'high',
      },
      {
        item: 'i1_trunk',
        text: '右片麻痺側に体幹がやや傾く(クッションで部分的に補正)',
        importance: 'mid',
      },
    ],
    background:
      '左被殻出血で右片麻痺・軽度の構音障害あり。嚥下機能は保たれているがポジショニングが不十分なまま食事介助されている典型例。「うまく食べられない」=本人の問題ではなく姿勢調整の問題。FASSの姿勢3項目(1〜3)で減点が連鎖しやすい症例。',
    consultations: [
      { who: '理学療法士', why: 'ポジショニング指導(車椅子調整・足台選定)' },
      { who: '言語聴覚士', why: '頸部前屈位での嚥下評価・代償法指導' },
      { who: '看護師リーダー', why: '病棟全員でのポジショニング統一' },
    ],
    insight:
      '片麻痺患者の食事介助は「姿勢の準備」(FASS項目1〜3)が9割。スプーン操作の前にポジショニングを徹底することが誤嚥予防の最大の介入。',
  },
  {
    id: 'E',
    name: '中村節子',
    age: 86,
    sex: '女性',
    room: '405',
    avatar: '👵',
    gradient: 'from-violet-400 to-purple-500',
    bgGradient:
      'from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40',
    summary: 'レビー小体型認知症。「ご飯が分からない」と途中で食事を中断する。',
    stage: 'ステージ:認知症(食事認知障害)',
    stageIcon: Brain,
    difficulty: 4,
    truth: {
      i1_trunk: 2,
      i2_feet: 2,
      i3_neck: 2,
      i4_voice: 1,
      i5_scoopVisible: 0,
      i6_handSide: 2,
      i7_chinUp: 2,
      i8_upperLip: 2,
      i9_foodVisible: 0,
      i10_pace: 0,
    },
    keyFindings: [
      {
        item: 'i9_foodVisible',
        text: '食器が介助者の手元(本人の視野外)に置かれ、本人からは見えていない',
        importance: 'high',
      },
      {
        item: 'i5_scoopVisible',
        text: '介助者は本人の右真横に座り、すくう動作が見えない',
        importance: 'high',
      },
      {
        item: 'i10_pace',
        text: '嚥下を待たずに次々スプーンを口元に運ぶ(早食い介助)',
        importance: 'high',
      },
    ],
    background:
      'レビー小体型認知症は注意・覚醒度の変動が著明で、食事認知(先行期)障害が中核症状。「ご飯が分からない」は本人の認知症の表れではなく、視覚情報が届いていないことが大きい。FASSの食物認知2項目(5・9)+ペース項目(10)で著しい減点。さらにFASSには含まれないが、テレビをつけたままや余計な物をテーブルに置くことも注意散漫の要因。',
    consultations: [
      { who: '言語聴覚士', why: '食事認知促進の介助手法指導' },
      { who: '管理栄養士', why: '彩りのある食器・盛り付けの工夫' },
      { who: '介護職員', why: '食事環境の統一(テレビoff・余計な物撤去)' },
    ],
    insight:
      '認知症患者の食事介助は「見せる」「待つ」が基本。介助者は被介助者の正面に座り、すくう動作と食器を必ず視界に入れる。1口ごとに嚥下を待つ。',
  },
  {
    id: 'F',
    name: '伊藤敏夫',
    age: 75,
    sex: '男性',
    room: '407',
    avatar: '👴',
    gradient: 'from-amber-400 to-orange-500',
    bgGradient:
      'from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40',
    summary: '慢性閉塞性肺疾患・慢性嚥下障害あり。誤嚥性肺炎で入退院を繰り返す。',
    stage: 'ステージ:慢性嚥下障害',
    stageIcon: AlertCircle,
    difficulty: 5,
    truth: {
      i1_trunk: 2,
      i2_feet: 2,
      i3_neck: 2,
      i4_voice: 0,
      i5_scoopVisible: 2,
      i6_handSide: 2,
      i7_chinUp: 2,
      i8_upperLip: 0,
      i9_foodVisible: 2,
      i10_pace: 1,
    },
    keyFindings: [
      {
        item: 'i4_voice',
        text: '食前の発声確認なし、湿性嗄声の有無未評価のまま開始',
        importance: 'high',
      },
      {
        item: 'i8_upperLip',
        text: 'スプーンをそのまま上方へ引き抜く操作で、上唇でこすり取る動作を引き出せていない',
        importance: 'high',
      },
      {
        item: 'i10_pace',
        text: '時々嚥下確認前に次の一口を準備する場面あり',
        importance: 'mid',
      },
    ],
    background:
      'COPD+加齢性嚥下障害(presbyphagia)。誤嚥性肺炎による入退院を繰り返している。姿勢条件は整っているが、安全性に直結する「食前の湿性嗄声確認(項目4)」と「上唇でこすり取る送り込み動作(項目8)」が抜けている。FASS論文でも「choking防止の観点で安全項目が1つしかない」のが限界として明記されており、この症例ではFASSに含まれない「一口量」「嚥下後の咳・声質再確認」も併せて評価すべき。',
    consultations: [
      { who: '言語聴覚士', why: 'VE/VFによる嚥下動態評価の依頼' },
      { who: '医師', why: '誤嚥性肺炎の再発予防カンファレンス' },
      { who: '歯科衛生士', why: '口腔ケア強化(誤嚥性肺炎の最大の修正可能因子)' },
    ],
    insight:
      '慢性嚥下障害患者では「姿勢が整っているから大丈夫」と油断しない。食前の湿性嗄声確認と1口ごとの嚥下完了確認が誤嚥性肺炎を防ぐ最後の砦。FASSに含まれない一口量・口腔ケアも統合的に評価する。',
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
// シーン型
// =====================================================================

type Scene =
  | { t: 'p'; text: string }
  | { t: 'n'; text: string }
  | { t: 'nav'; text: string }
  | { t: 'obs'; text: string }
  | { t: 'q'; item: ItemKey }
  | { t: 'fb'; item: ItemKey; note: string; notInFassKey?: keyof typeof NOT_IN_FASS }

const STORIES: Record<'D' | 'E' | 'F', Scene[]> = {
  // ===========================
  // 症例D: 鈴木太郎(片麻痺)
  // ===========================
  D: [
    { t: 'p', text: '看護師さん、おはようさん。今日も飯の時間か…うまく食えなくてなぁ。' },
    { t: 'n', text: '鈴木さん、おはようございます。今日も朝食お手伝いさせてくださいね。' },
    {
      t: 'nav',
      text:
        '鈴木さんは2週間前に左被殻出血。右片麻痺と軽い構音障害があります。「うまく食べられない」という訴えの背景には、姿勢調整の問題が隠れていることが多い症例。FASS 10項目を順番に評価していきましょう。',
    },
    {
      t: 'obs',
      text:
        '車椅子でリクライニング45°に設定されている。背もたれと体幹の間に小さなクッションが1つ挟まれているが、麻痺側(右)に体幹がやや傾く。',
    },
    { t: 'q', item: 'i1_trunk' },
    {
      t: 'fb',
      item: 'i1_trunk',
      note:
        '麻痺側にやや傾いていますがクッションで部分的に補正されておりスコア1。完全な体幹中間位ではないので2ではありません。片麻痺患者は健側にバスタオルなどを追加して左右対称を作るのが基本。',
    },
    {
      t: 'obs',
      text:
        '足は車椅子のフットサポートに乗っていない。両足が宙に浮き、ぶらぶらと不安定。',
    },
    { t: 'q', item: 'i2_feet' },
    {
      t: 'fb',
      item: 'i2_feet',
      note:
        '両足が宙に浮いており明確にスコア0。Uesugi 2019で足底接地は嚥下時の舌骨上筋活動を有意に増加させると報告。フットサポートを正しい高さに調整するか足台を使用すべき場面です。',
    },
    {
      t: 'obs',
      text:
        '頭部はリクライニング背もたれに後ろにもたれ、頸部は伸展位。あごが上がっている。頸部支持枕は使用されていない。',
    },
    { t: 'q', item: 'i3_neck' },
    {
      t: 'fb',
      item: 'i3_neck',
      note:
        '頸部が伸展しあごが上がっているのでスコア0。Hanamoto 2014で頸部伸展は嚥下能力を著明に低下させる。タオルを後頭部下に当ててやや前屈位を作るのが基本対応。これは「ただちに修正」が必要なレベル。',
    },
    { t: 'n', text: '鈴木さん、ちょっと「あー」って言ってもらえますか?' },
    { t: 'p', text: 'あー…' },
    {
      t: 'obs',
      text: '声はクリア、湿性嗄声なし。痰絡みも認めない。介助者は応答の質を確認してから食事を開始する。',
    },
    { t: 'q', item: 'i4_voice' },
    {
      t: 'fb',
      item: 'i4_voice',
      note:
        '発声を促し湿性嗄声がないことを確認しているのでスコア2。FASSで唯一の「安全項目」。Murugappan 2010で湿性嗄声は咽頭残留・喉頭侵入の鋭敏なサイン。',
    },
    {
      t: 'nav',
      text:
        'ここがポイント! 鈴木さんは姿勢項目(1〜3)で大幅に減点していますが、嚥下機能自体は保たれています。「うまく食べられない」のは本人の問題ではなく、私たち介助者の姿勢設定の問題。',
    },
    {
      t: 'obs',
      text:
        '介助者は鈴木さんの正面やや左に座り、お盆から食物をすくう動作が本人の視野に入る。',
    },
    { t: 'q', item: 'i5_scoopVisible' },
    {
      t: 'fb',
      item: 'i5_scoopVisible',
      note:
        'すくう動作が本人の視野内で行われておりスコア2。先行期の認知プロセスを発動させる重要なポイント。Palmer 2015で食物視認は嚥下反射準備を促進。',
    },
    {
      t: 'obs',
      text:
        '介助者は鈴木さんの左側からアプローチし、左手でスプーンを持っている。',
    },
    { t: 'q', item: 'i6_handSide' },
    {
      t: 'fb',
      item: 'i6_handSide',
      note:
        '左側からの介助で左手保持、スコア2。介助側と同側の手で持つことで口腔正面に水平にスプーンを進入できる。逆手は手首がねじれて誤嚥リスクが上がる。',
    },
    {
      t: 'obs',
      text:
        'スプーンは口元の高さで運ばれているが、頸部伸展位のため結果的にあごが上がった状態で受け入れている。',
    },
    { t: 'q', item: 'i7_chinUp' },
    {
      t: 'fb',
      item: 'i7_chinUp',
      note:
        'スプーン軌道は適切でも、頸部が伸展しているため結果的にあごが上がった状態。スコア1(不十分)。項目3の頸部前屈ができていれば項目7も連動して改善する典型例。',
    },
    {
      t: 'obs',
      text:
        'スプーンを口に入れた後、軽く上唇に触れさせるが、唇閉鎖を待たず比較的早めに引き抜く。',
    },
    { t: 'q', item: 'i8_upperLip' },
    {
      t: 'fb',
      item: 'i8_upperLip',
      note:
        '上唇に触れているが唇閉鎖を引き出す前に抜いているのでスコア1(不十分)。口唇閉鎖→食塊形成の能動的動作を引き出すには、もう一呼吸待つ必要があります。',
    },
    {
      t: 'obs',
      text: '食器(主菜・副菜・汁物)はオーバーテーブル上、本人の視界内に並んでいる。',
    },
    { t: 'q', item: 'i9_foodVisible' },
    {
      t: 'fb',
      item: 'i9_foodVisible',
      note: '食器全体が本人の視野内、スコア2。',
    },
    {
      t: 'obs',
      text: '次の一口は前の嚥下後の喉頭挙上を確認してから準備されている。慌てない。',
    },
    { t: 'q', item: 'i10_pace' },
    {
      t: 'fb',
      item: 'i10_pace',
      note:
        '嚥下確認後に次を準備しスコア2。Robbins 2008で介助ペース最適化は誤嚥性肺炎発症率を有意に低下。',
    },
    {
      t: 'nav',
      text: '10項目評価終了!鈴木さんの背景にある真実と、改善ポイントを確認しましょう。',
    },
  ],

  // ===========================
  // 症例E: 中村節子(レビー小体型認知症)
  // ===========================
  E: [
    { t: 'p', text: '…(食堂を見回している)あら…ここはどこかしら?' },
    { t: 'n', text: '中村さん、こんにちは。お昼ごはんの時間ですよ。' },
    { t: 'p', text: '…ご飯?…うーん…' },
    {
      t: 'nav',
      text:
        '中村さんはレビー小体型認知症。注意・覚醒度の変動が著明で、食事認知(嚥下5期の先行期)に障害があります。「ご飯が分からない」と言われるたび、私たち介助者の関わり方を見直す必要があります。',
    },
    {
      t: 'obs',
      text:
        '食堂の椅子に座り、両足は床にしっかり接地。体幹は中間位で傾きなし。',
    },
    { t: 'q', item: 'i1_trunk' },
    { t: 'fb', item: 'i1_trunk', note: '体幹中間位で傾きなし、スコア2。' },
    { t: 'q', item: 'i2_feet' },
    { t: 'fb', item: 'i2_feet', note: '両足底が床に接地、スコア2。' },
    {
      t: 'obs',
      text: '頭頸部はやや前屈位。あごは引かれている。',
    },
    { t: 'q', item: 'i3_neck' },
    {
      t: 'fb',
      item: 'i3_neck',
      note: 'あごが軽く引かれた前屈位、スコア2。姿勢条件は整っています。',
    },
    { t: 'n', text: '中村さん、「あー」って言えますか?' },
    { t: 'p', text: '…あー(声に張りなし、わずかにガラガラした感じ)' },
    {
      t: 'obs',
      text:
        '声に若干のガラガラ感あり。介助者は気づくが「いつもこんな感じ」と判断し、追加の咳払いや痰排出を促さず食事を開始。',
    },
    { t: 'q', item: 'i4_voice' },
    {
      t: 'fb',
      item: 'i4_voice',
      note:
        '発声は確認したが軽度の湿性嗄声を見過ごしているためスコア1(不十分)。「いつものこと」で済ませず、咳払いや嚥下空打ちでクリアにしてから食事開始すべきでした。',
    },
    {
      t: 'obs',
      text:
        '介助者は中村さんの右真横に座り、お盆を介助者側に置いてすくっている。中村さんからはすくう動作がほぼ見えない。',
    },
    { t: 'q', item: 'i5_scoopVisible' },
    {
      t: 'fb',
      item: 'i5_scoopVisible',
      note:
        'すくう動作が本人の視野外でスコア0。これは「重要所見」── 認知症患者では先行期の認知が起動せず、開口・咀嚼・嚥下の一連が始まらない原因になる。介助者は本人の正面〜やや斜めに座り直すべき。',
    },
    {
      t: 'nav',
      text:
        'ここがポイント! 「ご飯が分からない」と言うのは、認知症が進んだからではなく、視覚情報が届いていないことが原因かもしれません。介助者の位置を変えるだけで食事認知が劇的に改善する症例は多い。',
    },
    {
      t: 'obs',
      text: '右側からの介助で右手でスプーンを保持。',
    },
    { t: 'q', item: 'i6_handSide' },
    { t: 'fb', item: 'i6_handSide', note: '介助側と同側の手、スコア2。' },
    {
      t: 'obs',
      text: 'スプーンは口元の高さで水平に運ばれ、あごは上がらない。',
    },
    { t: 'q', item: 'i7_chinUp' },
    { t: 'fb', item: 'i7_chinUp', note: 'あごの上昇なし、スコア2。' },
    {
      t: 'obs',
      text:
        'スプーンを上唇に押し当て、唇閉鎖を待ってから水平に抜く操作ができている。',
    },
    { t: 'q', item: 'i8_upperLip' },
    {
      t: 'fb',
      item: 'i8_upperLip',
      note:
        '上唇でこすり取らせる操作ができておりスコア2。口腔期の能動的動作を引き出している。',
    },
    {
      t: 'obs',
      text:
        '食器は介助者の手元(本人視野外)に置かれており、本人からは食物が見えていない。テーブル上にはティッシュ箱とコップだけ。',
    },
    { t: 'q', item: 'i9_foodVisible' },
    {
      t: 'fb',
      item: 'i9_foodVisible',
      note:
        '食器全体が本人の視野外、スコア0。「重要所見」── 認知症患者では食物が見えないと「食事である」という認知が成立しない(Chang 2008)。食器を本人の前に並べ、何を食べているかを毎回伝えるのが基本。',
      notInFassKey: 'menuExplain',
    },
    {
      t: 'obs',
      text:
        '中村さんがまだ口の中で咀嚼している間に、介助者は次の一口をスプーンですくい口元に運ぶ。',
    },
    { t: 'q', item: 'i10_pace' },
    {
      t: 'fb',
      item: 'i10_pace',
      note:
        '嚥下完了を待たずに次の一口を運んでおりスコア0。「重要所見」── 咽頭残留+追加食塊で誤嚥リスク激増。1口ごとに「ごっくん」を確認するのが鉄則です。',
      notInFassKey: 'noChat',
    },
    {
      t: 'nav',
      text: '10項目評価終了!中村さんの認知症と食事介助の真実、見ていきましょう。',
    },
  ],

  // ===========================
  // 症例F: 伊藤敏夫(慢性嚥下障害)
  // ===========================
  F: [
    { t: 'p', text: '看護師さん…おはよう…(声がやや擦れている)' },
    { t: 'n', text: '伊藤さん、おはようございます。今日も朝ごはん見させていただきますね。' },
    {
      t: 'nav',
      text:
        '伊藤さんは慢性閉塞性肺疾患+加齢性嚥下障害(presbyphagia)で、誤嚥性肺炎による入退院を繰り返しています。姿勢条件は概ね整っていますが、「最後の砦」となる安全項目で減点が起きやすい症例です。',
    },
    { t: 'obs', text: 'ベッド上ギャッジアップ60°、体幹は中間位で傾きなし。' },
    { t: 'q', item: 'i1_trunk' },
    { t: 'fb', item: 'i1_trunk', note: '体幹中間位、スコア2。' },
    {
      t: 'obs',
      text: '足元には足台クッションが置かれ、両足底が接地している。',
    },
    { t: 'q', item: 'i2_feet' },
    {
      t: 'fb',
      item: 'i2_feet',
      note: '両足底接地でスコア2。ベッド上でも足台で接地を作るのは正しい対応。',
    },
    {
      t: 'obs',
      text: '後頭部に枕が当てられ、頭頸部は軽度前屈位。あごが軽く引かれている。',
    },
    { t: 'q', item: 'i3_neck' },
    { t: 'fb', item: 'i3_neck', note: '軽度前屈位でスコア2。' },
    {
      t: 'obs',
      text:
        '介助者は食事内容を本人に伝え、すぐにスプーンを取って食事を開始。発声を促す行為は行われていない。',
    },
    { t: 'q', item: 'i4_voice' },
    {
      t: 'fb',
      item: 'i4_voice',
      note:
        '発声確認なくスタートしておりスコア0。「重要所見」── 伊藤さんは慢性嚥下障害+COPDで、開始時の声に擦れがあり湿性嗄声の可能性。FASS唯一の安全項目を抜くと誤嚥性肺炎再発のリスクが大幅に上がります。「あー」発声→クリアな声を確認→食事開始が鉄則。',
    },
    {
      t: 'nav',
      text:
        'ここがポイント! 開始時の声「(やや擦れている)」を聞き逃さないこと。COPDや慢性嚥下障害患者は常に湿性嗄声のリスクがある。「あー」発声で痰絡みを確認するだけで誤嚥は劇的に減ります。',
    },
    {
      t: 'obs',
      text: '介助者は伊藤さんの正面やや左、すくう動作が本人の視野内に入る。',
    },
    { t: 'q', item: 'i5_scoopVisible' },
    { t: 'fb', item: 'i5_scoopVisible', note: 'すくう動作の視認可、スコア2。' },
    {
      t: 'obs',
      text: '左側からの介助、左手でスプーン保持。',
    },
    { t: 'q', item: 'i6_handSide' },
    { t: 'fb', item: 'i6_handSide', note: '介助側と同側、スコア2。' },
    {
      t: 'obs',
      text: 'スプーンは口元と同じ高さで運ばれ、あごは上がらない。',
    },
    { t: 'q', item: 'i7_chinUp' },
    { t: 'fb', item: 'i7_chinUp', note: 'あごの上昇なし、スコア2。' },
    {
      t: 'obs',
      text:
        'スプーンを口に入れた後、上唇に触れずそのまま上方へ引き抜く動作。唇閉鎖を引き出していない。',
    },
    { t: 'q', item: 'i8_upperLip' },
    {
      t: 'fb',
      item: 'i8_upperLip',
      note:
        '上唇でこすり取る動作なし、スコア0。「重要所見」── 食物が上口蓋に張り付いたまま残り、口腔期の能動的取り込みが起動しない。慢性嚥下障害患者では1回1回の口腔操作の質が誤嚥予防の鍵。',
      notInFassKey: 'lipClose',
    },
    {
      t: 'obs',
      text: '食器全体が本人の視野内に並ぶ。',
    },
    { t: 'q', item: 'i9_foodVisible' },
    { t: 'fb', item: 'i9_foodVisible', note: '食器全体視認可、スコア2。' },
    {
      t: 'obs',
      text:
        '基本的には嚥下を待つが、4〜5口に1回程度、嚥下確認前に次の一口を準備する場面がある。',
    },
    { t: 'q', item: 'i10_pace' },
    {
      t: 'fb',
      item: 'i10_pace',
      note:
        '時々早すぎる場面があるためスコア1(不十分)。Robbins 2008でペース最適化は誤嚥性肺炎発症率を有意に低下。慢性嚥下障害患者では完全に1口ずつ嚥下完了を確認するべきです。',
      notInFassKey: 'biteSize',
    },
    {
      t: 'nav',
      text:
        '10項目評価終了!伊藤さんの「最後の砦」が抜けている問題、確認しましょう。FASSには含まれない安全要素も併せて見ます。',
    },
  ],
}

// =====================================================================
// メインコンポーネント
// =====================================================================

type Screen = 'select' | 'story' | 'reveal'

export function FassConversationPage() {
  const [screen, setScreen] = useState<Screen>('select')
  const [patientId, setPatientId] = useState<'D' | 'E' | 'F' | null>(null)
  const [sceneIdx, setSceneIdx] = useState(0)
  const [scores, setScores] = useState<Partial<Record<ItemKey, Score>>>({})
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

  const startStory = (id: 'D' | 'E' | 'F') => {
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
      markCompleted('fass-conversation')
      addXp(XP_ACTIONS.viewLesson)
    }
  }

  const submitScore = (item: ItemKey, score: Score) => {
    setScores((prev) => ({ ...prev, [item]: score }))
    setSceneIdx((i) => Math.min(i + 1, story.length - 1))
    if (sceneIdx === story.length - 1) {
      setScreen('reveal')
      markCompleted('fass-conversation')
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
            to="/fass"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="戻る"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              会話で学ぶ (FASS)
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              患者との会話・観察から FASS 10項目を判定
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-3 dark:border-pink-900/40 dark:from-pink-950/40 dark:to-rose-950/40">
          <div className="flex items-center gap-2 text-xs">
            <Sparkles size={14} className="text-rose-500" />
            <span className="font-bold text-rose-700 dark:text-rose-300">
              ストーリーを読み進めながら、FASS 10項目を判定する練習
            </span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-rose-900/80 dark:text-rose-200/80">
            出典:Nagano A, Maeda K et al. Eur Geriatr Med. 2024;15:1437-45 / 各項目 0(していない)/ 1(不十分)/ 2(できている)で評価
          </p>
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
            「次へ」ボタンを押すとストーリーが進みます。観察ポイントが出てきたら、FASSの基準に従って 0(していない)/ 1(不十分)/ 2(できている)で採点。ナビ先生が即座に解説してくれます。FASSに含まれていない重要ポイント(環境調整・一口量など)は黄色の囲みで補足します。
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
          <div className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 dark:border-amber-800 dark:bg-amber-950">
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
              FASS {evalCount}/10
            </span>
          </div>
        </div>

        {/* シーン表示エリア */}
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto border-x border-gray-200 bg-gradient-to-b from-amber-50 to-orange-50 px-3 py-4 dark:border-gray-700 dark:from-gray-900 dark:to-gray-950"
        >
          {visibleScenes.map((sc, i) => (
            <SceneCard
              key={i}
              scene={sc}
              patient={patient}
              userScore={sc.t === 'q' ? scores[sc.item] : undefined}
            />
          ))}
        </div>

        {/* アクションボタン */}
        <div className="flex-shrink-0 rounded-b-xl border border-t-0 border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {isQuiz && currentScene?.t === 'q' ? (
            <QuizButtons
              item={currentScene.item}
              onPick={(s) => submitScore(currentScene.item, s)}
            />
          ) : (
            <button
              onClick={next}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 font-bold text-white shadow-md transition-all active:scale-[0.98]"
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
    const correctCount = ITEM_KEYS.filter((k) => scores[k] === patient.truth[k]).length
    const userTotal = ITEM_KEYS.reduce((sum, k) => sum + (scores[k] ?? 0), 0)
    const trueTotal = ITEM_KEYS.reduce((sum, k) => sum + patient.truth[k], 0)
    const StageIcon = patient.stageIcon

    let rank: 'S' | 'A' | 'B' | 'C'
    let rankColor: string
    let rankMsg: string
    if (correctCount >= 9) {
      rank = 'S'
      rankColor = 'from-yellow-400 to-amber-500'
      rankMsg = '介助スキル評価のエキスパート!'
    } else if (correctCount >= 7) {
      rank = 'A'
      rankColor = 'from-emerald-400 to-teal-500'
      rankMsg = '臨床的に十分な評価力'
    } else if (correctCount >= 4) {
      rank = 'B'
      rankColor = 'from-blue-400 to-cyan-500'
      rankMsg = 'もう少し基準を見直そう'
    } else {
      rank = 'C'
      rankColor = 'from-slate-400 to-slate-500'
      rankMsg = 'FASS 10項目の基準を再学習!'
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
                <span className="text-sm opacity-80">/10</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] opacity-80">合計FASS</div>
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
            項目別 答え合わせ
          </h3>
          <div className="space-y-2">
            {ITEM_KEYS.map((k) => {
              const userS = scores[k]
              const trueS = patient.truth[k]
              const correct = userS === trueS
              const finding = patient.keyFindings.find((f) => f.item === k)
              const rule = RULES[k]
              return (
                <div
                  key={k}
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
                      <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                        {rule.no}.{rule.label}
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
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-4 text-white shadow-lg">
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
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-bold text-white">
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
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98]"
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
        <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-gradient-to-br from-amber-400 to-orange-500 px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm">
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
    const rule = RULES[scene.item]
    return (
      <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-4 text-white shadow-xl">
        <div className="mb-2 flex items-center gap-1.5">
          <Utensils size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">
            FASS 評価ポイント #{rule.no}
          </span>
        </div>
        <div className="mb-1 text-base font-bold leading-tight">「{rule.label}」</div>
        <div className="mb-2 inline-block rounded-full bg-white/30 px-2 py-0.5 text-[10px] font-bold backdrop-blur">
          {rule.group}
        </div>
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
    const rule = RULES[scene.item]
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
  scene: { t: 'fb'; item: ItemKey; note: string; notInFassKey?: keyof typeof NOT_IN_FASS }
  rule: Rule
  patient: Patient
}) {
  const correct = patient.truth[scene.item]
  const correctLevel = rule.levels.find((l) => l.s === correct)
  const notInFass = scene.notInFassKey ? NOT_IN_FASS[scene.notInFassKey] : null

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
          FASS {rule.no} 評価基準({rule.label})
        </div>
        <div className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
          {rule.full}
        </div>
      </div>
      <div className="mb-2 rounded-xl border border-cyan-200 bg-cyan-50/70 p-2.5 dark:border-cyan-800 dark:bg-cyan-950/40">
        <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-cyan-700 dark:text-cyan-300">
          <Eye size={12} />
          根拠 (なぜこれが大事か)
        </div>
        <div className="text-[11px] leading-relaxed text-cyan-900 dark:text-cyan-100">
          {rule.rationale}
        </div>
      </div>
      <div className="mb-2 rounded-xl border border-violet-200 bg-violet-50/70 p-2.5 dark:border-violet-800 dark:bg-violet-950/40">
        <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-violet-700 dark:text-violet-300">
          <GraduationCap size={12} />
          エビデンス
        </div>
        <div className="text-[11px] leading-relaxed text-violet-900 dark:text-violet-100">
          {rule.evidence}
        </div>
      </div>
      {scene.note && (
        <div className="mb-2 rounded-xl border border-amber-200 bg-amber-50 p-2.5 dark:border-amber-800 dark:bg-amber-950/40">
          <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300">
            <Lightbulb size={12} />
            この患者さんの場合
          </div>
          <div className="text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
            {scene.note}
          </div>
        </div>
      )}
      {notInFass && (
        <div className="rounded-xl border-2 border-yellow-400 bg-yellow-50 p-2.5 dark:border-yellow-600 dark:bg-yellow-950/40">
          <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-yellow-800 dark:text-yellow-300">
            <AlertCircle size={12} />
            ここは重要ですが、FASSには含まれていません
          </div>
          <div className="text-[11px] font-bold text-yellow-900 dark:text-yellow-100">
            {notInFass.topic}
          </div>
          <div className="mt-1 text-[11px] leading-relaxed text-yellow-900 dark:text-yellow-100">
            {notInFass.detail}
          </div>
        </div>
      )}
    </div>
  )
}

// =====================================================================
// クイズボタン
// =====================================================================

function QuizButtons({ item, onPick }: { item: ItemKey; onPick: (s: Score) => void }) {
  const rule = RULES[item]
  const colors = [
    'from-rose-400 to-red-500',
    'from-amber-400 to-orange-500',
    'from-emerald-400 to-teal-500',
  ]

  return (
    <div>
      <div className="mb-2 text-center text-[10px] font-bold text-gray-500 dark:text-gray-400">
        ▼ FASS #{rule.no}「{rule.label}」のスコアを選択
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
