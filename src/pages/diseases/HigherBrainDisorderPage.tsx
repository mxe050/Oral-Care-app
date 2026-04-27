import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowLeft,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Brain,
  Eye,
  MessageSquare,
  Target,
  ChevronDown,
  Hand,
  Lightbulb,
  Volume2,
} from 'lucide-react'
import { TextbookReferenceList } from '../../components/domain/TextbookReferenceList'

interface DisorderSection {
  id: string
  title: string
  subtitle: string
  icon: typeof Brain
  gradient: string
  // 病態
  pathology: { detail: string; cite: string }
  // 摂食・嚥下での注意点
  swallowItems: { title: string; detail: string; reason: string; cite: string }[]
}

const DISORDERS: DisorderSection[] = [
  {
    id: 'usn',
    title: '半側空間無視(USN)',
    subtitle: '右半球(劣位半球)頭頂葉障害',
    icon: Eye,
    gradient: 'from-blue-400 to-cyan-600',
    pathology: {
      detail:
        '半側空間無視(Unilateral Spatial Neglect, USN)は、主に非優位半球(右半球)の頭頂葉(特に下頭頂小葉・縁上回・上側頭回など)障害により、対側(多くは左)空間への注意が向けられなくなる症状。視野欠損とは異なり「見えていても気づかない」のが特徴。中大脳動脈領域の梗塞・出血で頻発する。',
      cite:
        '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 第12章 pp.256-263',
    },
    swallowItems: [
      {
        title: '食事場面で起こること',
        detail:
          '食器の左半分を残す(「食事を半分しか食べない」)。皿の左側に注意が向かない。口の麻痺側に食物が残留(buccal pocketing)。食事中に左側の食器を見落とす。「テマネキ現象」(健側の手で患側方向のものを取ろうとする)が見られる。',
        reason:
          'USNでは「見えているのに気づかない」状態のため、本人は食事を完了したと思い込む。介助者が「左を見て」と促しても、注意の向け方そのものが障害されているため、声かけだけでは改善しにくい。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 p.262 図「左半側空間無視によるテマネキ現象」',
      },
      {
        title: '食器配置:健側に置く + 段階的に患側へ',
        detail:
          '急性期は確実に食べてもらうため、食器をすべて健側(右側)に配置する。回復期に入ったら、視野探索の訓練として徐々に患側(左)にも食器を配置する。食器の色のコントラストを明確にし(白い皿+色の濃い料理)、患側に動的な刺激(ナフキンの色など)を置く。',
        reason:
          '急性期に患側へ食器を置いて食事量が下がると、低栄養→廃用→嚥下機能低下の悪循環に入る。まず確実な摂取を優先し、慢性期に入ってから「食べきれる位置」と「リハビリ位置」を組み合わせる。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.262-263',
      },
      {
        title: '介助者の立ち位置:患側から声かけ',
        detail:
          '介助者は健側ではなく患側に立つ。声かけは患側方向から行い、患者の注意を患側へ誘導する。食事介助時は患者の頭部を健側に回旋させる(健側に向ける)ことで、相対的に視野中央へ食器を寄せる効果が出る。',
        reason:
          '健側からの声かけは「すでに気づいている側」を強化するだけで、無視側の改善につながらない。患側からの声かけ・刺激は注意の半側性を意識的に修正する訓練になる。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.262-263',
      },
      {
        title: '誤嚥のモニタリングを強化',
        detail:
          'USN患者は「むせ込みにも気づかない」可能性がある。SpO₂モニタリング・湿性嗄声の確認・聴診を、毎食・食事中の頻回に行う。食事中の咳の有無だけで「誤嚥なし」と判断しない。',
        reason:
          'USNは「自己への気づき」も障害する(anosognosia=病態失認の合併)。誤嚥していても本人は感じない・自覚しない・訴えないため、介助者が客観所見で代替モニタリングする必要がある。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.262-263 / 内田『姿勢から介入する摂食嚥下』',
      },
    ],
  },
  {
    id: 'apraxia',
    title: '失行(口部顔面失行・観念運動失行)',
    subtitle: '左半球(優位半球)頭頂葉・前頭葉障害',
    icon: Hand,
    gradient: 'from-emerald-400 to-teal-600',
    pathology: {
      detail:
        '失行は、運動麻痺・感覚障害・理解力低下がないにもかかわらず、目的的な運動が遂行できない症状。優位半球(多くは左)の頭頂葉・前頭葉障害で起こる。観念運動失行(命令された動作ができない)、観念失行(道具の使い方がわからない)、口部顔面失行(口や顔面の意図的運動ができない)などに分類される。',
      cite:
        '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-260',
    },
    swallowItems: [
      {
        title: '失行の特徴的サイン',
        detail:
          '「自動的にはできるが命令されるとできない」というディスソシエーション(分離)が特徴。目の前に食物があると食べられるが、スプーンを渡されると使えない。「お口を開けて」と言われると開けないが、食事のにおいで自然に開ける。「噛んで」と言われると噛めないが、食物を入れると自動的に咀嚼する。',
        reason:
          '失行は「随意運動の意図的プログラミング障害」であり、自動運動(無意識下の運動)は保たれる。この特徴を利用して、命令ではなく環境刺激で運動を引き出すのが基本戦略。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-260',
      },
      {
        title: 'ミラーリング(模倣)で動作を誘発',
        detail:
          '介助者が患者の正面で食事動作を実演する(自分でスプーンを口に運び、咀嚼してみせる)。これを「同じようにしてみてください」ではなく、ただ実演する。多くの場合、患者は自然に同じ動作を始める(模倣機能は保たれている)。',
        reason:
          '命令系の理解は障害されているが、視覚-運動模倣の経路は保たれていることが多い。前頭葉ミラーニューロンシステムの機能を利用した自然な動作引き出し。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 p.260',
      },
      {
        title: '触覚的・運動覚的キューイング',
        detail:
          'スプーンを患者の手に持たせ、介助者が患者の手の上から手を添えて口へ導く(hand-over-hand cueing)。最初の数口を共同動作で行うと、その後は自動的に運動が継続することが多い。咀嚼が止まっている時は、頬に軽く触れる、せんべいなど噛みごたえのあるものを口に入れることで咀嚼が再開する。',
        reason:
          '「随意で動かせない」運動でも、外部から始動の刺激(タッチ・受動運動)を与えると自動運動として継続できる。これが「口部顔面失行」を持つ患者でも食事ができる理由。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-260, p.266 図「前頭葉症状や口腔期問題が強い場合のアプローチ手順」',
      },
      {
        title: '食物選択:噛みごたえのあるもの',
        detail:
          'ペースト食より「形のある食物(=咀嚼を要する食物)」の方が、自動運動を引き出しやすい。ただし安全性が確認されてからの選択。せんべい、軟菜、軟らかいパンなどが咀嚼を始動するきっかけになる。',
        reason:
          '咀嚼運動は「食物が口腔内にある」という刺激で自動的に開始される反射性の運動。この自動運動を引き出すには、ある程度の硬さ・形状が必要。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-263',
      },
    ],
  },
  {
    id: 'agnosia',
    title: '失認(食物失認・道具失認)',
    subtitle: '感覚情報の意味理解障害',
    icon: Brain,
    gradient: 'from-violet-400 to-purple-600',
    pathology: {
      detail:
        '失認は、感覚機能(視覚・聴覚・触覚)が保たれているのに、感覚情報を「意味」として理解できない症状。視覚失認では「見えているのに何かわからない」、食物失認では「目の前のものを食べ物と認識できない」状態が起こる。後頭葉・側頭葉・頭頂葉の連合野障害で生じる。',
      cite:
        '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-259',
    },
    swallowItems: [
      {
        title: '食物認識を多感覚で支援',
        detail:
          '視覚情報だけでなく、嗅覚(湯気・香り)・触覚(食器を手に持たせる)・言語(「これはお魚の煮付けです、好きでしたよね」)を組み合わせて食物認識を促す。食事の前に料理を見せて言葉でラベル付けするだけで、食事への取り組みが変わることが多い。',
        reason:
          '失認は「単一感覚モダリティでの意味理解」が障害されているが、複数感覚を併用すれば意味理解が回復することが多い。多感覚刺激は失認の代償戦略の中核。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-259',
      },
      {
        title: '食器の選択:単純化と色のコントラスト',
        detail:
          '複数の食器があると患者は混乱しやすい。単一トレーに食物を載せる、食器の数を減らす、食器と食物のコントラストを明確にする(白い皿+色のある料理、黒い皿+白い豆腐など)。食器のデザイン(模様)はシンプルにする。',
        reason:
          '視覚情報処理が混乱している失認患者にとって、複雑な視覚刺激は意味理解をさらに困難にする。「見るべきもの」を物理的に絞ることで、保たれた認識機能を最大限活用できる。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.262-263',
      },
      {
        title: '言語化(verbal labeling)の活用',
        detail:
          '食事中も「次はお魚です、咀嚼しましょう」「お汁ものを飲みますね」と動作を言葉で実況する。失認があっても言語理解は保たれることが多い(失語と失認は分離障害)。',
        reason:
          '視覚的な意味理解が損なわれていても、言語による意味付けは別系統で処理されているため有効。これは失認に対する標準的代償戦略。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-259',
      },
    ],
  },
  {
    id: 'attention',
    title: '注意障害(覚醒・選択・分配・転換)',
    subtitle: '前頭葉・脳幹網様体・視床障害',
    icon: Target,
    gradient: 'from-amber-400 to-orange-600',
    pathology: {
      detail:
        '注意は ① 覚醒(arousal — 起きていること)、② 選択(selective — 必要な刺激に向ける)、③ 維持(sustained — 継続)、④ 分配(divided — 複数課題)、⑤ 転換(shift — 切り替え)の5要素に分類される。前頭葉・脳幹網様体・視床のいずれかで障害される。覚醒度低下、注意散漫、易疲労性として現れる。',
      cite:
        '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.256-263',
    },
    swallowItems: [
      {
        title: '食事環境の最適化(刺激を減らす)',
        detail:
          'テレビ・ラジオを消す。介助者は1名にする。食卓には食事と必要な道具のみを置く。窓のカーテンを引いて視覚刺激を減らす。同室の他患者の食事と時間をずらせるなら、個別介助を行う。',
        reason:
          '注意の選択性が低下しているため、複数の刺激があると食事に集中できない。「食べる」課題以外のすべての刺激を物理的に取り除くことで、保たれた注意機能を食事に集中させる。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 1 症例4 pp.46-47',
      },
      {
        title: '覚醒度を高めてから食事を始める',
        detail:
          '食事前に車椅子座位への移行(離床)、冷タオルでの清拭、肩・体幹への触覚刺激、声かけ、口腔ケア(歯ブラシ・冷水含嗽)などで覚醒度を上げる。覚醒の高い時間帯(朝〜午前中が多い)に食事を集中させる。',
        reason:
          '覚醒度が低い状態では嚥下反射閾値も上昇し、誤嚥リスクが高まる。離床と感覚刺激は嚥下反射を直接改善する。「食事の準備」と「食事介助」を分けて段階的に行う。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 1 症例4 pp.46-47 / 前田・髙畠『誤嚥性肺炎の包括的アプローチ』',
      },
      {
        title: '一口量・ペース調整・分食',
        detail:
          '一口量を小さく(3〜5g)、介助者が能動的にペースを管理する。注意の維持時間に合わせて、1食20〜30分以内に終わらせる。1日3食を1日4〜5回の分食(間食含む)に変更し、1回あたりの集中時間を短くする。',
        reason:
          '注意の維持が短い(数分〜10分)患者では、長時間の食事は疲労による注意低下を招き、食事後半で誤嚥リスクが急増する。分食は「集中できる短い時間×複数回」で総摂取量を確保する戦略。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 1 症例4 pp.46-47',
      },
      {
        title: '易疲労性に注意',
        detail:
          '前頭葉障害患者は易疲労性が顕著。姿勢保持自体が大きなエネルギー消費となるため、疲労時に食事を続けると急速に誤嚥リスクが上がる。表情・発声・摂食速度の低下を疲労サインとして観察し、その時点で中断する。',
        reason:
          '易疲労性は神経基質の疲労(神経伝達物質枯渇)による現象で、本人の意志で「頑張る」では解決しない。中断と休息で回復する。無理を強いると誤嚥性肺炎の引き金になる。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 1 症例4 p.46',
      },
    ],
  },
  {
    id: 'executive',
    title: '遂行機能障害・記憶障害',
    subtitle: '前頭葉・側頭葉内側障害',
    icon: Lightbulb,
    gradient: 'from-pink-400 to-rose-600',
    pathology: {
      detail:
        '遂行機能(executive function)は計画立案・段取り・優先順位付け・モニタリングを担う前頭葉前頭前野の機能。記憶障害は近時記憶(海馬・側頭葉内側)と作業記憶(前頭葉)に分けられる。両者ともに食事手順の理解・継続を阻害する。',
      cite:
        '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.256-263',
    },
    swallowItems: [
      {
        title: '食事手順の構造化',
        detail:
          '「食器を見る → スプーンを持つ → 食物をすくう → 口に運ぶ → 咀嚼 → 嚥下」の手順を、視覚的に提示する(写真カード・図解)。食事のスタートとエンドを明確にする(エプロンを付ける=スタート、ナプキンで口を拭く=エンド)。',
        reason:
          '遂行機能障害患者は手順の組み立てができないため、外的に手順を構造化する。視覚的に「次は何をするか」を提示することで、内的な計画立案の代償ができる。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-263',
      },
      {
        title: '段取り提示・リマインダー',
        detail:
          '一つひとつの動作を介助者が短い言葉でリマインドする(「噛んで」「ゴックン」「次のスプーンです」)。食事中に話しかけすぎると注意が逸れるため、合図的な短い声かけのみ。',
        reason:
          '作業記憶が低下しているため、「いま何をしているか」を本人が保持できない。介助者がリマインダーとして機能することで、保たれた運動機能を活用できる。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-263',
      },
      {
        title: '丸呑み・かき込み食いへの対応',
        detail:
          '記憶障害+遂行機能障害では「先に食べた食物が口腔内にあるのに、次の食物をかき込む」「咀嚼を中断して飲み込む」が頻発する。介助者がスプーンを管理し(本人に持たせない)、口腔内が空になったことを目視確認してから次の一口を入れる。',
        reason:
          '丸呑みは誤嚥・窒息の最大リスク要因。本人の自己管理能力が低下しているため、外部からのペース管理が必須。「口腔内が空になる」までの待機が重要。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-263 / 症例6 pp.60-69',
      },
      {
        title: '食事ルーチンの固定化',
        detail:
          '食事の場所・時間・席・食器・介助者をできるだけ固定する。「いつもと同じ環境」が記憶の手がかり(retrieval cue)となり、食事行動の自動化を促す。',
        reason:
          '記憶障害があっても、繰り返しの環境刺激と動作は手続き記憶として残存することが多い。環境を固定することで、保たれた手続き記憶を最大限活用できる。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.258-263',
      },
    ],
  },
  {
    id: 'aphasia',
    title: '失語(運動性・感覚性・全失語)',
    subtitle: '優位半球(多くは左)言語野障害',
    icon: MessageSquare,
    gradient: 'from-indigo-400 to-blue-600',
    pathology: {
      detail:
        '失語は優位半球の言語野障害による言語処理障害。Broca失語(運動性、前頭葉下部)では発話困難・理解保たれる、Wernicke失語(感覚性、側頭葉上部)では流暢だが意味不明・理解困難、全失語では発話・理解とも障害される。摂食嚥下機能そのものは温存されることが多いが、コミュニケーションの障害が食事介助を難しくする。',
      cite:
        '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.256-258',
    },
    swallowItems: [
      {
        title: 'Broca失語(運動性):理解は保たれる',
        detail:
          'Broca失語では言語理解は保たれるため、説明はゆっくり明瞭に行う。本人の発話は困難だが、Yes/No質問・うなずきで意思確認できる。「痛みはありますか?」「食べたいですか?」など二択質問を多用する。',
        reason:
          'Broca失語は表出障害が中核で、言語理解(聴覚的言語処理)は別経路で保たれている。理解力に合わせた説明と、表出を簡素化した質問形式で意思疎通が可能。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 p.257',
      },
      {
        title: 'Wernicke失語(感覚性):視覚・触覚に頼る',
        detail:
          'Wernicke失語では言語理解が困難なため、言葉での説明が伝わらない。食事の説明は視覚的に(食物を見せる・におい)、触覚的に(食器を手に持たせる・スプーンを口元へ)行う。実演・模倣が言語より有効。',
        reason:
          'Wernicke失語は受容障害(聴覚的言語処理)が中核。「言葉が音として聞こえているが意味が取れない」状態。言語以外の感覚モダリティ経由のコミュニケーションが必要。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 p.257',
      },
      {
        title: '全失語:ジェスチャー・カード・表情で意思疎通',
        detail:
          '全失語では言語経路すべてが障害されるが、表情・ジェスチャー・指さし・絵カードでの意思疎通が可能なことが多い。食事中の苦痛・拒否・要求を表情と身振りで読み取る。介助者は表情豊かにコミュニケートする。',
        reason:
          '言語野が障害されても、感情処理(扁桃体・帯状回)・身振り(運動野)・表情処理(顔認識回路)は別の脳領域。これらの非言語的コミュニケーション経路を活用することで意思疎通が可能。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.256-258',
      },
      {
        title: '誤嚥の訴えが伝わらない可能性',
        detail:
          '失語のある患者は「むせ」「のどに詰まる」「痛い」を言葉で訴えられない。SpO₂・湿性嗄声・聴診・表情変化を頻回にモニタリングする。表情(顔をしかめる・口を尖らせる)・身振り(喉を押さえる・首を振る)は重要な非言語的サイン。',
        reason:
          '言語的訴えがないからといって苦痛がないわけではない。介助者が客観所見と非言語サインを重ね合わせて「本人の状態」を推定する代償的観察が必須。',
        cite:
          '小山『実践で身につく摂食・嚥下障害へのアプローチ』Part 2 pp.256-263',
      },
    ],
  },
]

export function HigherBrainDisorderPage() {
  const [openId, setOpenId] = useState<string | null>(DISORDERS[0].id)

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="flex items-center gap-2">
        <Link
          to="/diseases"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="疾患一覧へ戻る"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">高次障害</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            高次脳機能障害の病態と、咀嚼・嚥下での注意点
          </p>
        </div>
      </div>

      {/* 概要 — 病態 */}
      <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-4 dark:border-indigo-900/40 dark:from-indigo-950/40 dark:to-blue-950/40">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-600 dark:text-indigo-300" />
          <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-200">
            高次脳機能障害とは
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-gray-800 dark:text-gray-100">
          脳卒中・外傷・脳炎などの後遺症として現れる、{' '}
          <strong>言語・記憶・注意・遂行機能・空間認知などの「高次脳機能」の障害</strong>{' '}
          の総称です。麻痺・感覚障害がなくても食事行動が困難になります。 「食べる」という行為は{' '}
          <strong>認知 → 計画 → 実行 → モニタリング</strong>{' '}
          の連続作業であり、いずれの過程の障害でも食事介助に固有の戦略が必要となります。
          本ページでは6つの主要症候について、病態と摂食・嚥下での具体的な対応を、根拠と理由とともに解説します。
        </p>
      </div>

      {/* 6症候 */}
      <div className="space-y-3">
        {DISORDERS.map((d) => {
          const Icon = d.icon
          const isOpen = openId === d.id
          return (
            <div
              key={d.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : d.id)}
                className={`flex w-full items-center gap-3 bg-gradient-to-r ${d.gradient} p-3 text-left text-white transition-all`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold leading-tight">{d.title}</div>
                  <div className="text-[10px] italic opacity-90">{d.subtitle}</div>
                </div>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="space-y-3 p-4">
                  {/* 病態 */}
                  <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3 dark:border-indigo-900/40 dark:bg-indigo-950/40">
                    <div className="mb-1 flex items-center gap-1.5">
                      <Brain size={14} className="text-indigo-600 dark:text-indigo-300" />
                      <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-200">
                        病態
                      </h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
                      {d.pathology.detail}
                    </p>
                    <p className="mt-1.5 text-[10px] italic text-indigo-700 dark:text-indigo-300">
                      [出典: {d.pathology.cite}]
                    </p>
                  </div>

                  {/* 咀嚼・嚥下での注意点 */}
                  <div>
                    <div className="mb-2 flex items-center gap-1.5">
                      <Volume2 size={14} className="text-emerald-600" />
                      <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                        咀嚼・嚥下での注意点
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {d.swallowItems.map((it, i) => (
                        <div
                          key={i}
                          className="rounded-lg border border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
                        >
                          <div className="mb-1 flex items-start gap-1.5">
                            <CheckCircle2
                              size={12}
                              className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                            />
                            <h5 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                              {i + 1}. {it.title}
                            </h5>
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
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 共通原則 */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 size={14} />
          高次脳機能障害患者の食事介助 — 共通原則
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-emerald-900 dark:text-emerald-100">
          <li>• 「自動的にできるが命令されるとできない」=失行を疑う → ミラーリング・触覚キューを使う</li>
          <li>• 「片側を残す・気づかない」= USNを疑う → 健側に置きつつ患側からの声かけで誘導</li>
          <li>• 「食べ物と認識しない」= 失認を疑う → 嗅覚・触覚・言葉で多感覚刺激</li>
          <li>• 「集中できない・疲れやすい」= 注意障害 → 環境刺激を減らし、分食で対応</li>
          <li>• 「手順がわからない」= 遂行機能障害 → 短いリマインダー・ルーチン固定</li>
          <li>• 「言葉が伝わらない」= 失語 → 視覚・身振り・表情で代替</li>
          <li>• <strong>共通:</strong> 誤嚥は「むせがある」だけで判定せず、SpO₂・湿性嗄声・聴診を毎食モニタ</li>
        </ul>
      </div>

      {/* 注意 */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-amber-800 dark:text-amber-200">
          <AlertCircle size={14} />
          実践上の注意
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
          <li>• 高次脳機能障害は「単独」で出現することは少なく、複数の症候が重なる(例: USN+注意障害+失行)。</li>
          <li>• 麻痺がなくても食事困難はある。「動けるから一人で食べられる」とは限らない。</li>
          <li>• 失行・失認・USNの代償戦略は「保たれた機能を最大化する」発想。命令や叱責は逆効果。</li>
          <li>• 病態失認(自分の障害を認識しない)が合併すると、本人の自己管理に頼れない。客観的観察が中心。</li>
          <li>• 急性期から回復期にかけて症状は変化する。1〜3か月ごとに再評価し、戦略を更新する。</li>
        </ul>
      </div>

      <TextbookReferenceList
        citedIds={[
          'koyama_jissen2',
          'koyama_jissen1',
          'uchida_shinkei',
          'uchida_shisei',
          'koyama_kuchi',
          'wakabayashi_koreisha',
        ]}
      />

      <div className="rounded-xl bg-white/70 p-4 text-[10px] leading-relaxed text-gray-500 dark:bg-gray-900/60 dark:text-gray-400">
        <p>
          本ページは小山珠美 編『実践で身につく!摂食・嚥下障害へのアプローチ』(学研メディカル秀潤社)Part 1・Part 2、内田学(編著)の各書を主参考文献としてまとめた学習補助です。実際の臨床応用は、神経内科医・リハビリテーション専門医・臨床心理士・言語聴覚士など多職種の評価に基づいて行ってください。
        </p>
      </div>
    </div>
  )
}
