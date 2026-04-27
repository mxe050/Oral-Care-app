import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowLeft,
  Brain,
  AlertCircle,
  CheckCircle2,
  Utensils,
  Eye,
  Hand,
  Volume2,
  Layers,
  ChevronDown,
  HeartPulse,
} from 'lucide-react'
import { TextbookReferenceList } from '../../components/domain/TextbookReferenceList'

interface Section {
  id: string
  title: string
  subtitle: string
  icon: typeof Brain
  gradient: string
  intro: string
  items: { title: string; detail: string; reason: string; cite: string }[]
}

const SECTIONS: Section[] = [
  {
    id: 'pathology',
    title: 'A. 認知症患者の摂食嚥下障害 — 全体像',
    subtitle: '中核症状 × BPSD × 嚥下機能低下の三重複合',
    icon: Brain,
    gradient: 'from-violet-400 to-purple-600',
    intro:
      '認知症高齢者の摂食嚥下障害は、認知機能低下(中核症状)・BPSD・嚥下機能低下が複合的に進行する。「食べない」の背景に「食べたくない」「食べられない」「食べ方を忘れた」「食べ物と認識できない」のいずれがあるかを区別することが起点となる。',
    items: [
      {
        title: '4大認知症で食事困難の特徴が異なる',
        detail:
          'AD(アルツハイマー型):注意障害・空間認知障害・口腔顔面失行で食具操作・咀嚼が止まる。VaD(血管性):意欲低下・無関心、片麻痺で食べこぼし、構音障害。DLB(レビー小体型):幻視・誤認(ふりかけが虫に見える)・パーキンソニズム・覚醒変動・自律神経症状(便秘増悪)。FTD(前頭側頭型):常同行動(同じ時刻に同じものを)・早食い・詰め込み・味覚変化(甘いもの嗜好の出現)。',
        reason:
          '認知症のタイプ別で介入の優先順位が変わる。「環境を変えれば食べる」のはADで有効でも、FTDでは常同パターンを尊重した方が食べる場合がある。タイプ別評価が個別化ケアの前提。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.146 表1',
      },
      {
        title: '摂食困難の3分類',
        detail:
          '① 摂食開始困難(食べ始められない)、② 食べ方の困難(食べこぼし・詰め込み・止まらない)、③ 摂食中断(途中で止まり再開できない)。「食べない」状態≠「食べたくない」状態であり、「食べ始められない」「食べられない」状態であることが多い。',
        reason:
          '本人の「食べたくない」という訴えだけで終わらせず、何が困難なのかを観察と分類で明確化する。これにより環境調整・声かけ・食形態のどこに介入するかが決まる。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.143-145',
      },
      {
        title: 'Person-centered care と誤嚥リスクの関係',
        detail:
          'Liu et al.(2017)の研究では、誤嚥の観察可能な指標は「task-centered(作業中心)」のケア行動の最中・直後にのみ「person-centered(その人中心)」のケア行動より有意に多く発生し、誤嚥オッズは task-centered で約12%上昇したと報告されている。',
        reason:
          '介助者のアプローチそのものが嚥下安全性に影響する。急いで作業をこなす「task-centered」介助は、認知症患者にとって緊張・不安・拒否を生み、結果として咽頭運動の協調を乱す。「あなたに会いに来た」という person-centered の入り方が嚥下安全性そのものに関係する。',
        cite:
          'Gilmore-Bykovskyi AL, Rogus-Pulia N. J Nutr Health Aging. 2017',
      },
    ],
  },
  {
    id: 'recognition',
    title: 'B. 食物認識(認知期)の障害と対策',
    subtitle: '見えても「食べ物」と気づかない',
    icon: Eye,
    gradient: 'from-blue-400 to-cyan-600',
    intro:
      'AD・DLB ともに視空間認知障害があり、「食物として認識できない」「食器の凹凸やクロス模様をこそげ取ろうとして食事を始めない」などが起こる。多感覚刺激での認識補完が中核戦略。',
    items: [
      {
        title: '多感覚刺激で食物認識を引き出す',
        detail:
          '視覚:湯気の立つ料理、色のコントラストが強い盛り付け(白い皿+色濃い料理)。嗅覚:出汁・コーヒー・お茶など匂いの強い食物。聴覚:食器を軽く叩いて音を出す、好きな食事曲。触覚:食器を本人の手で持たせる、利き手に箸/反対手に椀を持つ「食事の構え」。言語:「これは○○さんの好きな煮物ですよ」と最初にラベル付け。',
        reason:
          '失認は単一感覚モダリティの「意味理解」が障害されている状態。複数の感覚から同時に情報を入れることで、保たれた感覚経路から「食事である」という意味理解を引き出せる。Bayne & Shune(2022)の生物心理社会モデルでも、感覚刺激(触覚・聴覚・視覚・嗅覚)は介入の中核として位置づけられる。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.69-70 / Bayne DF, Shune SE. Geriatrics (Basel). 2022',
      },
      {
        title: 'DLBの幻視・誤認・妄想への対応',
        detail:
          '「ふりかけが虫に見える」「毒が入っているという妄想で食べない」など、DLB ではしばしば認知体験そのものが食事を困難にする。事前にふりかけはかけない、盛り付け直して時間を置いて再提示、本人に「食べられない理由」を聞く。DLB は理由を話せることが多い(認知機能の変動)。',
        reason:
          '「妄想・幻視を否定する」「無理に食べさせる」のは禁忌で、不安と拒否を強化するだけ。本人の「認知の世界」に立って原因を探り、刺激そのものを変えるのが有効。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.146 表1, p.147(レビー小体型70歳代女性の症例)',
      },
      {
        title: '使い慣れた本人の食器・食事の構え',
        detail:
          '入院・入所時にも本人の食器を持参してもらう。利き手に食具、反対手に椀を持つ「食事の構え」を作ると、保たれた手続き記憶が引き出されて食事が始まる。お茶器を食卓に置くだけで「お茶でも入れましょうか」と日課のお茶振る舞いの行動が出ることがある。',
        reason:
          '近時記憶が失われても、長年繰り返した手続き記憶(食事動作・お茶を入れる)は最後まで残る。馴染みのある物理的手がかりは、保たれた手続き記憶を呼び覚ます「retrieval cue(想起手がかり)」となる。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.69',
      },
    ],
  },
  {
    id: 'mouth',
    title: 'C. 準備期・口腔期の障害と対策',
    subtitle: '口を開けない・噛まない・止まらない',
    icon: Hand,
    gradient: 'from-emerald-400 to-teal-600',
    intro:
      '口部顔面失行・観念運動失行で「命令されると口を開けないが、食物が来ると自動的に開く」というディスソシエーションがしばしば起こる。命令ではなく、感覚刺激と自動運動の利用が鍵。',
    items: [
      {
        title: '下口唇接触法 — 自動的開口反射の利用',
        detail:
          'スプーンを下口唇に軽く触れて離さない。口唇の緊張が緩むのを待ってスーッと下口唇を滑らせる。下口唇を「つつかない」のがコツ。スプーンに入っている食べ物を視覚情報として最初にしっかり見せてから接触する。',
        reason:
          '口部顔面失行では「随意的開口」が障害されるが、「下口唇に物が触れる→自動的に口が開く」という反射経路は保たれている。命令や叱責ではなくこの反射経路を活用することで、患者を尊重しながら開口を引き出せる。',
        cite:
          '小山『口から食べる幸せをサポート』p.130 治療のTips',
      },
      {
        title: '介助者のミラーリング(模倣動作)',
        detail:
          '介助者が患者の正面で食事動作を実演する(自分でスプーンを口に運び咀嚼してみせる)。これを「同じようにしてみてください」と命令するのではなく、ただ実演する。多くの場合、患者は自然に同じ動作を始める。',
        reason:
          '命令系の理解は障害されていても、視覚-運動模倣の経路(前頭葉ミラーニューロンシステム)は保たれていることが多い。これを利用した自然な動作引き出しが失行への基本戦略。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 第12章 pp.260, 266',
      },
      {
        title: '咀嚼が止まる時の対応',
        detail:
          '咀嚼開始しない/途中で止まる場合は、軽く頬を圧迫、温度刺激(冷たいゼリー)、味覚刺激(酸味・出汁)。せんべい・たくあんなど噛みごたえのある食物を口に入れることで、咀嚼が再開することが多い。',
        reason:
          '咀嚼運動は「食物が口腔内にある」という感覚刺激で自動的に開始される反射性運動。流動食では咀嚼せず嚥下するが、固形物が入ると咀嚼機能が引き出される。「噛んで」という命令より、咀嚼を引き出す物理刺激が有効。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.69 / 小山『口から食べる幸せをサポート』p.114',
      },
      {
        title: 'FTDの早食い・詰め込みへの対応',
        detail:
          'FTD では食物を嚥下前に口中に詰め込む早食い・脱抑制が頻発する。介助者がスプーンを管理(本人に持たせない)、口腔内が空になることを目視確認してから次の一口を入れる。スプーンも小ぶりなものを使い、1口量を物理的に制限。',
        reason:
          '丸呑み・かき込みは誤嚥・窒息の最大リスク要因。本人の自己管理能力が低下しているため、外部からのペース管理が必須。「待って」と言うより、物理的に次の食物を出さないのが確実。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.146 表1 / 小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-263',
      },
    ],
  },
  {
    id: 'pharyngeal',
    title: 'D. 咽頭期の障害と代償手技',
    subtitle: '嚥下反射の遅延・残留・誤嚥',
    icon: Layers,
    gradient: 'from-rose-400 to-red-600',
    intro:
      '認知症進行期では咽頭期の問題が顕在化する。VaD では脳幹の影響で不顕性誤嚥、DLB ではパーキンソニズムによる嚥下反射低下、AD では咀嚼-嚥下協調の乱れ。代償手技を場面ごとに使い分ける。',
    items: [
      {
        title: 'リクライニング30〜45度+頚部前屈',
        detail:
          'リクライニング座位の角度は30〜45度を目安にし、頚部はやや前屈位(下顎-胸骨間で指3本分=3〜4cm)に保つ。背部に大きめのU字型クッションを配置し、頸部後屈・側屈を防ぐ。',
        reason:
          'リクライニング45度は90度よりPAS(誤嚥指標)が有意に低いことが報告されている(Park 2013)。頚部前屈は喉頭蓋の閉鎖を促し、誤嚥が55%減少(Terre 2012)。認知症患者では覚醒度の変動があるため、この角度・前屈位が安全マージンを確保する。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.71 図2 / Park 2013, Terre 2012',
      },
      {
        title: '少量・冷却・酸味で嚥下反射を促通',
        detail:
          '一口量3〜5g(ティースプーン1杯)から開始。冷たい食物(ゼリー・シャーベット)、酸味のある食物(レモン水・梅干し・酢の物の汁)で口腔・咽頭感覚を賦活する。食事の最後はお茶ゼリーで咽頭残留を清掃。',
        reason:
          '嚥下反射の閾値が上昇しているため、温度・酸味・触覚の感覚刺激を意図的に増やす必要がある。冷却は咽頭感覚を一時的に活性化し、嚥下反射の起こしやすさを高める。少量で「誤嚥した時の流入量を最小化」する戦略。',
        cite:
          '小山『口から食べる幸せをサポート』pp.111, 114',
      },
      {
        title: '複数回嚥下・交互嚥下',
        detail:
          '一口につき2〜3回嚥下を繰り返す(複数回嚥下)。固形物とゼリー・とろみ水を交互に摂取(交互嚥下)。咽頭残留があるかどうか本人は感じにくいため、介助者が「もう1回ゴックンしましょう」と声かけして促す。',
        reason:
          '咽頭残留は次の食塊の誤嚥源となる。認知症患者は咽頭残留感が低下していることが多く、「むせない=安全」とは言えない。代償手技で残留を清掃しながら食事を進める。',
        cite:
          '小山『口から食べる幸せをサポート』p.111 / 小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 p.260 表12.6',
      },
    ],
  },
  {
    id: 'environment',
    title: 'E. 食事環境(環境的バリアの除去)',
    subtitle: '照明・騒音・視覚的雑然さは嚥下を悪化させる',
    icon: Volume2,
    gradient: 'from-amber-400 to-orange-600',
    intro:
      '高齢化や認知症による嚥下機能低下は、不十分な照明・騒音・乏しい環境的手がかり・視覚的雑然さといった環境的バリアによって悪化する(Brush 2022)。環境調整は治療計画の一部。',
    items: [
      {
        title: '聴覚刺激を減らす',
        detail:
          'テレビ・ラジオを消す。同室の他患者の食事と時間をずらす。介助者は1名にする。声かけは食事中ではなく食事前に行い、食事中は短い合図的声かけ(「噛んで」「ゴックン」)のみ。',
        reason:
          '認知症患者は選択的注意の障害があり、複数の刺激があると食事に集中できない。「食べる」課題以外の刺激を物理的に取り除くことで、保たれた注意機能を食事に集中させる。Brushの教材では聴覚的雑音は嚥下機能低下の独立因子として明記されている。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.69 / Brush JA. Northern Speech Services 2022 / 栃木県摂食嚥下指導マニュアル',
      },
      {
        title: '視覚的雑然さを減らす',
        detail:
          '食卓の上には食事と必要な道具のみ。複数の食器より単一トレー、食器のデザインはシンプルに。コース料理のように一品ずつ提示する方法も認知症高齢者には有効。',
        reason:
          '視覚情報処理が混乱している失認・USN患者にとって、複雑な視覚刺激は意味理解をさらに困難にする。「見るべきもの」を絞ることで保たれた認識機能を最大限活用できる。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.69 / Brush JA. Northern Speech Services 2022',
      },
      {
        title: '照明と色のコントラスト',
        detail:
          '食卓は明るい照度(自然光が望ましい)、影が顔にかからない位置。食器と食物のコントラストを明確に(白い皿+色のある料理、黒い皿+白い豆腐など)。',
        reason:
          'Brushは食事環境の照度設定が嚥下に影響する具体的データを示している。色のコントラストは認知症患者の食物認識を直接的に助け、「目の前にあるのに気づかない」を減らす。',
        cite:
          'Brush JA. Northern Speech Services 2022',
      },
      {
        title: '生活リズム・覚醒のタイミング',
        detail:
          '認知症終末期では1日16〜18時間の睡眠時間に達することがある。覚醒の高い時間帯(朝〜午前中)に食事を集中させる。1日3食ではなく食欲のペースに同期し、終末期では3〜5日単位で見て1日1〜2食もあり得る。リハ直後は疲労で食べられないため時間帯を検討。',
        reason:
          '認知症ではサーカディアンリズムが乱れ、空腹・覚醒・食事のタイミングが解離する。覚醒不良の時間帯に無理に食べさせると、嚥下反射閾値が高い状態で誤嚥につながる。リズムは「医薬品で食欲を上げる」より効果的かつ非侵襲的。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.70-71 / 小山『口から食べる幸せをサポート』p.131',
      },
    ],
  },
  {
    id: 'comfort',
    title: 'F. 終末期 — Comfort feeding(快適な食事)',
    subtitle: '「食べる喜び」を最後まで支える',
    icon: HeartPulse,
    gradient: 'from-pink-400 to-rose-600',
    intro:
      '認知症終末期では「自分で食べる喜び」から「口から食べる喜び(comfort feeding)」へ、リハの目標が移行する。栄養摂取量を達成する食事から、本人が安楽に楽しめる食事へ。Palecek(2010)が提唱した概念。',
    items: [
      {
        title: 'Comfort feeding only への移行判断',
        detail:
          '認知症終末期(嚥下機能の本質的回復が見込めず、本人・家族の合意がある段階)では、栄養目標を達成するための「目標栄養量に届く食事」から、本人が安楽に楽しめる「careful hand feeding(注意深い手介助)」へ転換する。誤嚥リスクは残るが、誤嚥防止のための強制中止はしない。',
        reason:
          '2015年ESPENガイドラインでは認知症終末期に経腸栄養開始は推奨されていない。経口摂取の継続自体に栄養摂取以上の価値(尊厳・QOL・最期の楽しみ)がある。Palecek EJ et al.(2010)が「Comfort Feeding Only」概念を提唱。',
        cite:
          'Palecek EJ et al. J Am Geriatr Soc. 2010 / 山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.71-72 / 渡辺ほか『食欲不振のアセスメント』p.25',
      },
      {
        title: '好物・嗜好品・少量頻回',
        detail:
          '好物が「食べ始める」きっかけ。コーヒー・炭酸水・チョコレート・たくあん・ふりかけご飯・煮豆など。スイッチできる食品ストックを冷蔵庫に。「毎日家族が差し入れする好物のエクレアを亡くなる直前まで幸せな表情で食べていた」事例(山田)。',
        reason:
          '終末期では栄養確保以上に「食べる喜び」が QOL の核となる。好物は良い思い出を呼び覚まし、自尊心を保つ機会にもなる。「依存できること(介助を受けること)もその人の力」と捉え、嚥下機能を保ち口から食べる喜びを高めることへリハの目標をシフトする。',
        cite:
          '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.71-72 / 小山『口から食べる幸せをサポート』pp.92, 114',
      },
      {
        title: '無理強いしない・本人の意思を尊重',
        detail:
          '心身の消耗が強く食べ物を受け付けない時期は無理強いしない。終末期医療意識調査では患者の57〜78%が中心静脈栄養・経鼻経管栄養・胃ろうを望まず、自然な死を希望と報告されている。本人の意思(推定を含む)と人生についての理解に照らして、最善の道を本人・家族・医療ケアチームで考える。',
        reason:
          '可逆的要因の発見・治療を優先せず人工栄養を先行させると、本人の意思に反する医療となるリスクがある。「食べる喜び」と「無理強いしない」のバランスを、本人・家族と共に決めていく姿勢が求められる。',
        cite:
          '渡辺ほか『食欲不振のアセスメント』pp.22, 24-25 / 山田『認知症高齢者の摂食嚥下障害への次の一手!』p.72',
      },
    ],
  },
]

export function DementiaSwallowingPage() {
  const [openId, setOpenId] = useState<string | null>(SECTIONS[0].id)

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="flex items-center gap-2">
        <Link
          to="/diseases/dementia"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="認知症患者へ戻る"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            認知症患者の咀嚼・嚥下(一般)
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            中核症状 × BPSD × 嚥下機能低下に対する包括的アプローチ
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-4 dark:border-violet-900/40 dark:from-violet-950/40 dark:to-purple-950/40">
        <div className="mb-2 flex items-center gap-2">
          <Utensils size={16} className="text-violet-600 dark:text-violet-300" />
          <h3 className="text-sm font-bold text-violet-700 dark:text-violet-200">
            このページのねらい
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-gray-800 dark:text-gray-100">
          認知症患者の摂食嚥下障害は、{' '}
          <strong>「食べたくない」ではなく「食べ始められない」「食べ方がわからない」「食べ物と認識できない」</strong>{' '}
          であることが多々あります。本ページでは病態の理解(A) → 認知期(B) → 口腔期(C) → 咽頭期(D) → 環境調整(E) → 終末期 Comfort feeding(F)
          までを、各記述に「{' '}
          <strong>なぜそうするのか</strong>」と参考文献を付けて解説します。
        </p>
      </div>

      <div className="space-y-3">
        {SECTIONS.map((s) => {
          const Icon = s.icon
          const isOpen = openId === s.id
          return (
            <div
              key={s.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : s.id)}
                className={`flex w-full items-center gap-3 bg-gradient-to-r ${s.gradient} p-3 text-left text-white transition-all`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold leading-tight">{s.title}</div>
                  <div className="text-[10px] italic opacity-90">{s.subtitle}</div>
                </div>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="space-y-3 p-4">
                  <p className="rounded-lg bg-gray-50 p-3 text-[11px] leading-relaxed text-gray-700 dark:bg-gray-800/50 dark:text-gray-200">
                    {s.intro}
                  </p>
                  {s.items.map((it, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div className="mb-1 flex items-start gap-1.5">
                        <CheckCircle2
                          size={12}
                          className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                        />
                        <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                          {i + 1}. {it.title}
                        </h4>
                      </div>
                      <p className="pl-4 text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">
                        {it.detail}
                      </p>
                      <div className="ml-4 mt-2 rounded-lg border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-950/40">
                        <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
                          なぜそうするのか
                        </div>
                        <p className="text-[10px] leading-relaxed text-amber-900 dark:text-amber-100">
                          {it.reason}
                        </p>
                      </div>
                      <p className="ml-4 mt-1.5 text-[10px] italic text-gray-500 dark:text-gray-400">
                        [出典: {it.cite}]
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-amber-800 dark:text-amber-200">
          <AlertCircle size={14} />
          実践上の注意
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
          <li>• 「食べない」を「食べたくない」と短絡させない。3分類(摂食開始困難・食べ方の困難・摂食中断)で整理する。</li>
          <li>• 4大認知症で介入の優先順位が変わる。タイプ別評価が個別化ケアの前提。</li>
          <li>• Person-centered の入り方は嚥下安全性そのものに関係する(Liu/Gilmore-Bykovskyi 2017)。</li>
          <li>• 認知症終末期では ESPEN 2015 で経腸栄養開始は推奨されていない。Comfort feeding only への移行を主治医・家族と合意の上で検討する。</li>
          <li>• 環境的バリア(照明・騒音・視覚的雑然さ)は嚥下機能低下の独立因子。治療計画の一部として整える。</li>
        </ul>
      </div>

      <div>
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-gray-100">
          外部参考文献(査読論文・学会一次資料)
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">
          <li>
            • Gilmore-Bykovskyi AL, Rogus-Pulia N. Temporal Associations between Caregiving Approach, Behavioral Symptoms and Observable Indicators of Aspiration in Nursing Home Residents with Dementia. <em>J Nutr Health Aging</em>. 2017.{' '}
            <a className="text-violet-600 underline dark:text-violet-300" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5830143/" target="_blank" rel="noopener noreferrer">PMC5830143</a>
          </li>
          <li>
            • Bayne DF, Shune SE. A Biopsychosocial Model of Mealtime Management in Persons with Dementia, an Asset-Based Approach to Patient-Centered Care. <em>Geriatrics (Basel)</em>. 2022.{' '}
            <a className="text-violet-600 underline dark:text-violet-300" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9601353/" target="_blank" rel="noopener noreferrer">PMC9601353</a>
          </li>
          <li>
            • Brush JA. Dysphagia, Dementia And Meal Time Interventions. Northern Speech Services.{' '}
            <a className="text-violet-600 underline dark:text-violet-300" href="https://www.northernspeech.com/dysphagia-assessment-adult/making-the-most-of-mealtime-helping-older-adults-compensate-for-sensory-impairment-during-meals/" target="_blank" rel="noopener noreferrer">教材ページ</a>
          </li>
          <li>
            • Palecek EJ et al. Comfort Feeding Only: A Proposal to Bring Clarity to Decision-Making Regarding Difficulty with Eating for Persons with Advanced Dementia. <em>J Am Geriatr Soc</em>. 2010.
          </li>
          <li>
            • 栃木県・栃木県歯科医師会『摂食嚥下指導マニュアル』.{' '}
            <a className="text-violet-600 underline dark:text-violet-300" href="https://tochigi-da.or.jp/assets/files/pdf/dysphagia_manual.pdf" target="_blank" rel="noopener noreferrer">PDF</a>
          </li>
        </ul>
      </div>

      <TextbookReferenceList
        citedIds={[
          'yamada_ninchisho',
          'koyama_kuchi',
          'koyama_jissen2',
          'watanabe_shokuyoku',
          'wakabayashi_koreisha',
        ]}
      />
    </div>
  )
}
