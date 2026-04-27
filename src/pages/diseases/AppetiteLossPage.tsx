import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Soup,
  AlertCircle,
  CheckCircle2,
  Pill,
  Brain,
  Home,
  HeartPulse,
  Search,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import { TextbookReferenceList } from '../../components/domain/TextbookReferenceList'

interface CauseSection {
  id: string
  title: string
  icon: typeof Pill
  gradient: string
  intro: string
  items: { name: string; detail: string; cite: string }[]
}

const CAUSES: CauseSection[] = [
  {
    id: 'physical',
    title: '身体的原因',
    icon: HeartPulse,
    gradient: 'from-rose-400 to-red-500',
    intro:
      '高齢者では複数の身体疾患が並存することが多く、食欲不振の評価では「単一の原因」ではなく「複数の重なった原因」を仮定する必要がある。可逆的な要因はすべて拾い上げて治療する。',
    items: [
      {
        name: 'がん悪液質(cachexia)',
        detail:
          'がん終末期患者では、悪液質状態に陥り、栄養管理や治療に抵抗、がんの進行に伴う著しい筋肉減少と体重減少を主徴とする代謝異常を示す。代謝異常が軽度な「前悪液質」の段階で早期から栄養サポートを行うことで、栄養不良の進展を遅らせ合併症予防につながる。一方で、進行した悪液質に対する中心静脈栄養や経管栄養による追加的栄養補給が予後を改善したというエビデンスはない。',
        cite: '渡辺ほか『食欲不振のアセスメント』pp.22-25',
      },
      {
        name: '消化管症状(腫瘍増大・転移・腹水)',
        detail:
          '腫瘍の増大や転移による消化管の閉塞、腹水合併から腹部膨満、脳転移による頭蓋内圧亢進・嚥下障害、高Ca血症をはじめとする電解質異常に伴う症状などが、可逆的に治療できる場合がある。',
        cite: '渡辺ほか『食欲不振のアセスメント』pp.22-25',
      },
      {
        name: 'COPD・呼吸不全',
        detail:
          'COPDでは肺過膨張による腹部の圧迫、嚥下に伴う呼吸困難感の増強がみられる。COPD患者は食事中にSpO₂が3%低下するとの報告があり、サイトカイン・レプチン・グレリンといった食欲関連ホルモンの作用も影響する。状態の悪化→呼吸筋の疲労増大→呼吸状態の増悪と悪循環に陥りやすい。栄養療法として間食を勧める、呼吸商の小さいもの(脂質中心)へ摂取内容を工夫する、栄養剤を使用するなどの対応を早めに考慮する。',
        cite: '渡辺ほか『食欲不振のアセスメント』pp.24',
      },
      {
        name: '微量元素・ビタミン欠乏',
        detail:
          'ナトリウム・カリウム・塩素・鉄の不足は食欲低下を招く。特に亜鉛(Zn)欠乏は味覚障害を伴うため、漫然と「年齢のせい」とせず血中亜鉛濃度を測定する。ビタミン類(ビタミンB群・ビタミンA・パントテン酸・ナイアシン)の欠乏も食欲不振をきたす。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23 表2',
      },
      {
        name: '便秘・口腔内乾燥・齲歯・義歯不適合',
        detail:
          '便秘は腹部膨満感から食欲を奪う。口腔内乾燥(薬剤性・脱水・口腔機能低下)は咀嚼・食塊形成を妨げ、味覚低下を招く。齲歯や義歯不適合は咀嚼時痛となり食事を回避させる。可逆的要因は治療可能なので、まず排便コントロール・口腔ケア・歯科介入を優先する。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23',
      },
      {
        name: 'パーキンソン病',
        detail:
          '摂食嚥下障害、on-off現象、自律神経障害、抗パーキンソン病薬の副作用(便秘・悪心・嘔吐)、併発する認知機能・味覚障害などが原因となる。対処法として、訴えがなくても疑いがあれば嚥下評価を行い、抗パーキンソン病薬の調整でon時間を延長させてon時に摂食する、積極的な嚥下訓練と食物形態への介入を行う、必要に応じて補助栄養や経管栄養を考慮する。',
        cite: '渡辺ほか『食欲不振のアセスメント』pp.23-24',
      },
    ],
  },
  {
    id: 'drug',
    title: '薬剤性',
    icon: Pill,
    gradient: 'from-purple-400 to-fuchsia-500',
    intro:
      '高齢者は多剤併用(ポリファーマシー)が多く、薬剤性食欲不振は介入可能性が高い「見逃したくない原因」。新規薬剤開始のタイミングと食欲低下の出現が時間的に一致するかを必ず確認する。',
    items: [
      {
        name: '中枢系・精神系薬剤',
        detail:
          'トランキライザー(向精神薬)、抗ヒスタミン薬は鎮静・口渇・便秘を介して食欲を低下させる。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23 表2',
      },
      {
        name: '消化器系薬剤',
        detail:
          '制吐薬・消化器潰瘍薬・抗コリン薬は胃排出遅延や口渇を生じ、結果として食欲を抑制する。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23 表2',
      },
      {
        name: 'ステロイド・免疫抑制薬',
        detail:
          '一過性に食欲は増進するが、長期使用では味覚異常・粘膜萎縮・易感染性から食欲低下に転じる。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23 表2',
      },
      {
        name: '抗がん薬・筋緩薬・利尿薬・抗不整脈薬',
        detail:
          '抗がん薬は粘膜障害・悪心・味覚異常を、利尿薬は電解質・微量元素喪失を介して食欲を奪う。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23 表2',
      },
    ],
  },
  {
    id: 'mental',
    title: '精神・心理的原因',
    icon: Brain,
    gradient: 'from-indigo-400 to-blue-500',
    intro:
      '終末期患者の40〜70%に悪心・嘔吐の出現があり、その多くにせん妄・うつ・不安が併存する。「食べたくない」の背景には心理的痛みがあり、薬物以前にケアの調整で改善する余地が大きい。',
    items: [
      {
        name: 'うつ・不安',
        detail:
          '終末期がん患者ではせん妄やうつ病の精神症状に伴う食欲低下が多く認められる。喜びを感じる対象としての食事が、嘔気や予期不安(また気持ち悪くなるかも)で苦痛に転じる。SSRI・抗不安薬の検討と並行し、強要しない食卓環境を整える。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23',
      },
      {
        name: 'せん妄',
        detail:
          'せん妄では覚醒度の変動と注意の欠陥のため、食事を「食事」として認識できず、口に運んでも飲み込まない、頬張るなどが起こる。原因薬剤の中止、脱水・電解質異常の補正、夜間の睡眠リズム回復が優先。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23',
      },
      {
        name: '喪失体験',
        detail:
          '配偶者の死別・転居・施設入所などの大きな喪失体験のあとに食欲不振が遷延することがある。「食べたくない」を医学的問題として処理せず、まずグリーフ(悲嘆)反応として受け止める姿勢が必要。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23',
      },
    ],
  },
  {
    id: 'environmental',
    title: '環境的・社会的原因',
    icon: Home,
    gradient: 'from-emerald-400 to-teal-500',
    intro:
      '社会的因子は表2で「貧困、購入不能、調理不能、配食不能、独居、社会的孤立、社会的サポート不足」として明記されている。在宅では特にこれらの調整が栄養介入そのものになる。',
    items: [
      {
        name: '社会的孤立・独居',
        detail:
          '一人での食事(孤食)は食事時間が短く、品数が減り、結果として摂取エネルギーが低下する。共食機会の確保(配食サービス・通所・家族訪問)は心理面と栄養面の両方で有効。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23 表2',
      },
      {
        name: '購入・調理・配食の困難',
        detail:
          '身体機能低下・経済的問題・家族支援不足から、食材の入手と調理ができないと、嗜好に合わない食事になり食欲が下がる。介護保険サービス・配食サービス・地域資源の活用を福祉職と連携して調整する。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23 表2',
      },
      {
        name: '食事環境(におい・温度・配膳)',
        detail:
          '病室・施設では他患の臭気・物音・室温・照度などが食欲を直接抑制する。配膳の段取り、座席の向き、テーブル上の整理、においの管理は薬剤に勝る効果を持ちうる。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.67-72',
      },
    ],
  },
  {
    id: 'dementia',
    title: '認知症固有の原因',
    icon: Brain,
    gradient: 'from-amber-400 to-orange-500',
    intro:
      '認知症高齢者は中核症状(認知機能低下)と BPSD、嚥下機能低下が複合的に進行する。「食べない」の背景にあるのが「食べ物と認識できない」のか「食事リズムの乱れ」なのかで対応は全く異なる。',
    items: [
      {
        name: '食物認識障害(食物失認)',
        detail:
          '認知機能低下によって食事自体を「食べ物」として認識できず、皿を眺めるだけで手を出さない。食事の前に「これは○○さんの好きな煮物ですよ」など、視覚的・言語的に食物であることを伝える、においを嗅がせる、最初の一口を介助して動作を導入することで自動化された咀嚼が始まる。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.67-72',
      },
      {
        name: '注意散漫・注意の選択性低下',
        detail:
          '食事中に注意散漫になり食事が進まないことが多い。テレビを消す、声かけは食事中ではなく食事前に行う、食卓の上は食器のみとし他の物品は片付けるなど、視覚・聴覚刺激を減らして「食べる」課題に集中できる環境を作ることが重要。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.69-70',
      },
      {
        name: '身体不調を訴えられない',
        detail:
          '認知症では身体不調(腹痛・口腔内痛・便秘・脱水)を訴えることが難しい。食欲不振が出現したら、「訴えがなくても」感染・脱水・便秘・口腔内疾患を必ずスクリーニングする。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.69',
      },
      {
        name: '生活リズム・睡眠覚醒の乱れ',
        detail:
          '向精神薬の影響や睡眠・排便のリズムが整わないために食べないということもある。日中の覚醒と日光暴露、夜間の睡眠の質を整えるノンファーマコロジカルな介入を、食事の時間調整より優先する。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.70 / 渡辺ほか『食欲不振のアセスメント』p.24',
      },
      {
        name: '嚥下機能低下による摂食回避',
        detail:
          'むせ・喉のつまり感・誤嚥への恐怖から食事を回避するようになる。RSST・MWST等のスクリーニングで嚥下機能を客観評価し、必要に応じて食形態を変更(学会分類2021に準拠)、姿勢調整を行う。「食欲がない」の背景に嚥下障害があると見抜くことが重要。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.69-71',
      },
    ],
  },
]

interface ApproachSection {
  id: string
  title: string
  icon: typeof Search
  gradient: string
  intro: string
  steps: { title: string; detail: string; reason: string; cite: string }[]
}

const APPROACHES: ApproachSection[] = [
  {
    id: 'assess',
    title: 'A. アセスメント — 評価ツールで「見える化」する',
    icon: Search,
    gradient: 'from-cyan-400 to-blue-600',
    intro:
      '食欲不振は主観的訴えのため、客観的に評価しないと「気のせい」「歳のせい」で片付けられがち。スクリーニングツールを使い、点数で経時的に追うことが介入の根拠になる。',
    steps: [
      {
        title: '日本語版SNAQ(Simplified Nutritional Appetite Questionnaire)',
        detail:
          '4項目(① 食欲、② 満腹感、③ 味覚、④ 食事回数)を1〜5点で評価する簡易質問票。経時的に食欲不振を評価できる。CNAQ(8項目)の簡易版。',
        reason:
          '主観的な「食欲がない」を点数化することで、家族・他職種・経時的変化に共有可能となる。栄養介入の効果判定にも使えるため、初回評価+定期的(週1回など)再評価が望ましい。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23 表1',
      },
      {
        title: '客観的指標を併記する',
        detail:
          '体重減少率・脱水徴候(口腔内乾燥・皮膚ツルゴール・尿量)・ADL低下・心理的意欲の減退も同時に評価する。',
        reason:
          'SNAQは主観評価のため、客観指標と組み合わせることで「気持ちは食べたいが体が受け付けない」「気持ちが食べたくない」を区別できる。介入方針が変わる。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.22',
      },
      {
        title: '原因の鑑別フロー',
        detail:
          '①身体的(可逆的か?)→②薬剤性(中止可能か?)→③精神(うつ・せん妄・不安)→④環境(食事環境・社会的孤立)→⑤認知症固有要因の順に系統的に検討する。',
        reason:
          '可逆的要因(便秘・脱水・薬剤・口腔内疾患)を見落とすと、本来不要な経腸・経静脈栄養を導入してしまう恐れがある。可逆的要因を最初に外しに行くのが原則。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23',
      },
    ],
  },
  {
    id: 'physical',
    title: 'B. 身体的アプローチ — 可逆的要因を全て治療する',
    icon: HeartPulse,
    gradient: 'from-rose-400 to-pink-600',
    intro:
      '可逆的な要因は本人の苦痛を取りつつ食欲も戻す「一石二鳥」の介入。優先順位は ①口腔→②便秘→③脱水→④疼痛→⑤電解質・微量元素 の順。',
    steps: [
      {
        title: '口腔ケア・義歯調整・歯科介入',
        detail:
          '口腔内乾燥には口腔保湿剤・含嗽指導、齲歯・残根は歯科で抜歯または保存処置、義歯不適合は調整・新製。',
        reason:
          '咀嚼時痛と味覚低下は食事忌避に直結する。歯科介入の効果は数日で出ることが多く、最も即効性が高い「身体的アプローチ」。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23',
      },
      {
        title: '排便コントロール',
        detail:
          '3日以上の便秘で腹部膨満感が出る。下剤(酸化マグネシウム・センノシド・モビコール等)、生活面の工夫(水分・食物繊維・運動)を組み合わせる。',
        reason:
          '便秘は早朝や食前に腹部膨満感を強め、食事の最初の一口を入りにくくする。排便を整えることで食欲評価そのものが意味を持つようになる。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23',
      },
      {
        title: '疼痛管理',
        detail:
          '骨折・がん・関節リウマチなどの慢性疼痛がある場合、食事姿勢で痛みが増す可能性。座位移行時にレスキュー鎮痛を投与する、食前30分で鎮痛薬の効果が最大になるよう調整する。',
        reason:
          '痛みは交感神経を優位にし、食欲を抑制する内臓血流分布を生む。痛みを取らない限り食欲評価は無効。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23',
      },
      {
        title: '脱水・電解質補正',
        detail:
          '高Ca血症・低Na血症は食欲低下の典型。発見次第ゆっくり補正する(急速補正は中枢神経合併症)。',
        reason:
          '電解質異常は食欲中枢の機能を直接抑制する可逆要因。血液検査で発見できる。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23',
      },
      {
        title: '微量元素(亜鉛など)の補充',
        detail:
          '味覚低下を訴える場合は血中亜鉛(Zn)濃度を測定。低値ならポラプレジンク製剤等で補充する。',
        reason:
          '味覚障害により「何を食べてもおいしくない」状態が続くと、食事の楽しみそのものが失われる。亜鉛補充で2〜3週で改善することが多い。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23 表2',
      },
    ],
  },
  {
    id: 'drug-adjust',
    title: 'C. 薬剤調整 — 中止候補を出す',
    icon: Pill,
    gradient: 'from-violet-400 to-purple-600',
    intro:
      '薬剤性食欲不振は中止すれば数日〜2週で改善する。多剤併用がある場合は処方医と連携して系統的に減薬を試みる。',
    steps: [
      {
        title: '中止候補薬の検討',
        detail:
          '抗コリン薬・抗ヒスタミン薬・SSRI(初期)・抗がん薬・利尿薬・ジゴキシン中毒・三環系抗うつ薬は食欲不振を起こしやすい。直近30日以内に新規開始した薬剤と症状の出現タイミングを照合する。',
        reason:
          '減薬による副作用減少は、新規薬剤の追加よりも速やかかつ確実な介入。STOPP/START基準やBeers基準が参考になる。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.23 表2',
      },
      {
        title: '食欲増進を期待する漢方・薬剤',
        detail:
          '六君子湯(りっくんしとう)はグレリン分泌促進作用が報告されており、機能性ディスペプシア・がん化学療法による食欲不振に処方されることがある。一過性にステロイド少量(プレドニゾロン5〜10mg/日)が使われることもある。',
        reason:
          '進行がんに合併した食欲不振にステロイドは効果があるとされるが、予後やPSの改善効果は明確ではない。中心静脈栄養・経管栄養による予後改善エビデンスもないため、QOL目的の限定的処方とする。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.24',
      },
    ],
  },
  {
    id: 'environment',
    title: 'D. 食事環境・食事内容の工夫',
    icon: Home,
    gradient: 'from-emerald-400 to-teal-600',
    intro:
      '医薬品より先に試すべきは環境調整。「同じ食事」でも食卓の整え方、食器、姿勢、声かけで摂取量が大きく変わる。',
    steps: [
      {
        title: '食事姿勢を整える',
        detail:
          '椅子に深く腰掛け、足底接地、テーブル高さは肘が90度になる位置。前傾15〜20度で頭部はやや前屈。リクライニング車椅子の場合は60〜90度の範囲で本人が安楽な角度を選ぶ。',
        reason:
          '姿勢が整うと体幹が安定し、上肢操作・咀嚼・嚥下のすべてが効率化する。逆に骨盤後傾位・足底未接地では誤嚥リスクと疲労が増し、3口で食事を諦める原因になる。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.71 図2',
      },
      {
        title: '食事環境を整える',
        detail:
          'テレビ・ラジオを消す、食卓の上に食事と必要な道具のみを置く、明るい照度、においの管理。介助者は患者の正面ではなく斜め隣に座る。',
        reason:
          '認知症高齢者では選択的注意の障害があり、雑多な刺激の中では「食べる」課題に集中できない。視覚・聴覚刺激を減らすことで食事に意識を集中できる。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.69-70',
      },
      {
        title: '食器・量・盛り付け',
        detail:
          '小ぶりな食器に少量盛り、食べきれた達成感を得られるようにする。色のコントラスト(白い皿に色のある料理)を意識する。一気に大量を出さない。',
        reason:
          '食欲不振では「目の前の量に圧倒される」だけで食べられなくなる。少量でも完食できれば自己効力感が回復し、次回の摂取意欲につながる。色のコントラストは認知症の食物認識を助ける。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.69',
      },
      {
        title: '少量頻回食(5〜6回/日)・嗜好品の活用',
        detail:
          '1日3食にこだわらず、間食を含めて5〜6回に分けて摂取する。本人が好きだったもの(甘いもの・果物・冷菓・スープ)を遠慮なく出す。栄養補助食品(ONS)は1日200〜400kcalを補完する。',
        reason:
          '1食量を減らせば「食べきれる」という心理的ハードルが下がる。嗜好品は最後まで残ることが多く、食べる楽しみそのものが残存機能のリハビリ刺激となる。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.25 / 山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.70-71',
      },
      {
        title: '食事の温度・形態',
        detail:
          '温かいものは温かく、冷たいものは冷たく提供。咀嚼・嚥下機能に応じて学会分類2021のコードを選択(嚥下障害の合併がある場合)。',
        reason:
          '適切な温度は唾液分泌・口腔内感覚を賦活する。常温の食事ばかりが続くと「ぼんやりした味」となり食欲を奪う。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.70-71',
      },
    ],
  },
  {
    id: 'dementia-care',
    title: 'E. 認知症患者への対応 — Comfort feeding という最終解',
    icon: Brain,
    gradient: 'from-amber-400 to-orange-600',
    intro:
      '認知症終末期では「自分で食べる喜び」を支える段階から、「口から食べる喜び(comfort feeding)」を支える段階へとリハビリテーションの目標が移行する。「最期まで食べる喜び」を最優先する考え方。',
    steps: [
      {
        title: '食物認識を助ける視覚・嗅覚刺激',
        detail:
          '食事の前に「これはお魚の煮付けです」「あなたの好きだった煮物ですよ」と言葉でラベル付けする。湯気が立つ料理を出し、香りを嗅がせる。最初の一口を介助して咀嚼を始動させる。',
        reason:
          '認知症では「目の前のものが食べ物である」という前提認知が崩れる。多感覚刺激(視覚・嗅覚・触覚・言語)を併用することで、保たれている自動的咀嚼運動を引き出せる。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.69-70',
      },
      {
        title: '食事リズムの再建',
        detail:
          '日中の覚醒(光・離床・会話)、夜間睡眠の質の改善、食事時間の固定化。空腹を感じる時刻に食事を出す。',
        reason:
          '認知症ではサーカディアンリズムが乱れ、空腹・覚醒・食事のタイミングが解離する。食事リズムは「医薬品で食欲を上げる」より効果的かつ非侵襲的。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』p.70',
      },
      {
        title: 'BPSDによる拒否への非薬物的対応',
        detail:
          '食事中の拒否行動には、まず体調(疼痛・便秘・脱水・口腔内疾患)を確認。次に環境(騒音・介助者の交代)を見直す。声かけは肯定的・短く、強制はしない。',
        reason:
          '「食べたくない」という拒否は、本人なりの理由(身体不調・環境・関係性)が必ず存在する。鎮静薬で押し切ると食欲・覚醒・嚥下機能のすべてが落ちる悪循環になる。',
        cite: '山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.69-70',
      },
      {
        title: 'Comfort feeding(快適な食事)へ移行する判断',
        detail:
          '認知症終末期(嚥下機能の本質的回復が見込めず、本人・家族の合意がある段階)では、栄養目標を達成するための「目標栄養量に届く食事」から、本人が安楽に楽しめる「comfort feeding」へ転換する。誤嚥リスクは残るが、誤嚥防止のための強制中止はしない。',
        reason:
          '2015年のESPENガイドラインでは、認知症終末期に経腸栄養を開始することは推奨しないとされている。経口摂取の継続自体に栄養摂取以上の価値(尊厳・QOL・最期の楽しみ)がある。',
        cite: '渡辺ほか『食欲不振のアセスメント』p.25 / 山田『認知症高齢者の摂食嚥下障害への次の一手!』pp.71-72',
      },
    ],
  },
]

export function AppetiteLossPage() {
  const [openCause, setOpenCause] = useState<string | null>(CAUSES[0].id)
  const [openApproach, setOpenApproach] = useState<string | null>(APPROACHES[0].id)

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
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">食欲不振・拒否</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            原因の鑑別フローと、身体・薬剤・精神・環境別の対処法
          </p>
        </div>
      </div>

      {/* 概要 */}
      <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-4 dark:border-orange-900/40 dark:from-orange-950/40 dark:to-amber-950/40">
        <div className="mb-2 flex items-center gap-2">
          <Soup size={16} className="text-orange-600 dark:text-orange-300" />
          <h3 className="text-sm font-bold text-orange-700 dark:text-orange-200">
            「食欲がない」を見たら最初にすること
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-gray-800 dark:text-gray-100">
          高齢者・終末期患者の食欲不振は、{' '}
          <strong>単一の原因ではなく、複数の可逆的要因が重なっている</strong>{' '}
          ことがほとんどです。 まず日本語版SNAQ(4項目)で重症度を点数化し、
          ① 身体的(便秘・脱水・口腔内・痛み・電解質・微量元素) → ② 薬剤性 → ③ 精神(うつ・せん妄・不安) →
          ④ 環境(食卓・社会的孤立) → ⑤ 認知症固有要因{' '}
          の順に系統的に拾い上げます。
          可逆的要因をすべて治療してから、初めて経管・経静脈栄養や食欲増進薬の検討に進みます。
        </p>
        <p className="mt-2 rounded-lg bg-white/60 p-2 text-[11px] leading-relaxed text-orange-900 dark:bg-orange-950/60 dark:text-orange-100">
          <strong>なぜそうするのか:</strong> 終末期医療意識調査では、患者の57〜78%が中心静脈栄養・経鼻経管栄養・胃ろうを望まず、自然な死を希望していると報告されています。
          可逆的要因の発見・治療を優先せず人工栄養を先行させると、本人の意思に反する医療となるリスクがあります。
          <span className="text-[10px] opacity-70">[渡辺ほか『食欲不振のアセスメント』p.22]</span>
        </p>
      </div>

      {/* 1. 食欲不振・拒否の原因 */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-100">
          <AlertCircle size={16} className="text-rose-500" />
          食欲不振・拒否の原因(5つのカテゴリ)
        </h3>
        <div className="space-y-3">
          {CAUSES.map((c) => {
            const Icon = c.icon
            const isOpen = openCause === c.id
            return (
              <div
                key={c.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <button
                  type="button"
                  onClick={() => setOpenCause(isOpen ? null : c.id)}
                  className={`flex w-full items-center gap-3 bg-gradient-to-r ${c.gradient} p-3 text-left text-white transition-all`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-bold">{c.title}</div>
                    <div className="text-[11px] opacity-90">{c.items.length} 項目</div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="space-y-3 p-4">
                    <p className="rounded-lg bg-gray-50 p-3 text-[11px] leading-relaxed text-gray-700 dark:bg-gray-800/50 dark:text-gray-200">
                      {c.intro}
                    </p>
                    {c.items.map((it, i) => (
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
                            {it.name}
                          </h4>
                        </div>
                        <p className="pl-4 text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">
                          {it.detail}
                        </p>
                        <p className="mt-1.5 pl-4 text-[10px] italic text-gray-500 dark:text-gray-400">
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
      </div>

      {/* 2. 食欲不振・拒否の対処法 */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-100">
          <CheckCircle2 size={16} className="text-emerald-500" />
          食欲不振・拒否の対処法(5つのアプローチ)
        </h3>
        <div className="space-y-3">
          {APPROACHES.map((a) => {
            const Icon = a.icon
            const isOpen = openApproach === a.id
            return (
              <div
                key={a.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <button
                  type="button"
                  onClick={() => setOpenApproach(isOpen ? null : a.id)}
                  className={`flex w-full items-center gap-3 bg-gradient-to-r ${a.gradient} p-3 text-left text-white transition-all`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-bold leading-tight">{a.title}</div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="space-y-3 p-4">
                    <p className="rounded-lg bg-gray-50 p-3 text-[11px] leading-relaxed text-gray-700 dark:bg-gray-800/50 dark:text-gray-200">
                      {a.intro}
                    </p>
                    {a.steps.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
                      >
                        <h4 className="mb-1 text-xs font-bold text-gray-900 dark:text-gray-100">
                          {i + 1}. {s.title}
                        </h4>
                        <p className="text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">
                          {s.detail}
                        </p>
                        <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-950/40">
                          <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
                            なぜそうするのか
                          </div>
                          <p className="text-[10px] leading-relaxed text-amber-900 dark:text-amber-100">
                            {s.reason}
                          </p>
                        </div>
                        <p className="mt-1.5 text-[10px] italic text-gray-500 dark:text-gray-400">
                          [出典: {s.cite}]
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 注意 */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-amber-800 dark:text-amber-200">
          <AlertCircle size={14} />
          実践上の注意
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
          <li>• 食欲不振の原因は単一ではなく複数が重なる。「これかな?」と思った原因を治療しても改善しない場合、別の原因の見落としを疑う。</li>
          <li>• 中心静脈栄養・経管栄養による予後改善のエビデンスは進行がん・認知症終末期では確立していない。可逆的要因を全て外してから検討する。</li>
          <li>
            • 認知症終末期では2015年ESPENガイドラインで経腸栄養開始は推奨されていない。本人・家族・医療チームで「最善の道」を共有する。
          </li>
          <li>• 食欲不振に「効く薬」はない。漢方薬・ステロイドは限定的な効果。環境調整・原因治療が本質。</li>
        </ul>
      </div>

      <TextbookReferenceList citedIds={['watanabe_shokuyoku', 'yamada_ninchisho']} />

      <div className="rounded-xl bg-white/70 p-4 text-[10px] leading-relaxed text-gray-500 dark:bg-gray-900/60 dark:text-gray-400">
        <p>
          本ページは学習補助を目的とした要約です。引用は教科書・専門誌の記載に基づきますが、実際の臨床応用は患者個別の状況・施設方針・主治医の判断に従ってください。
        </p>
      </div>
    </div>
  )
}
