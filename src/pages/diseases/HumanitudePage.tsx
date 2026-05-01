import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  Eye,
  MessageCircle,
  Hand,
  ArrowUp,
  BookOpen,
  ExternalLink,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

interface Reference {
  authors: string
  title: string
  journal: string
  year: number
  volume?: string
  pages?: string
  doi?: string
  pmid?: string
  url: string
  keyFinding: string
}

const REFERENCES: Reference[] = [
  {
    authors: 'Gineste Y, Marescotti R',
    title:
      "Interest of the philosophy of humanitude in caring for patients with Alzheimer's disease (L'intérêt de la philosophie de l'humanitude dans la prise en soins des patients atteints de la maladie d'Alzheimer)",
    journal: 'Soins Gérontologie',
    year: 2010,
    volume: '85',
    pages: '26-27',
    pmid: '21137489',
    url: 'https://pubmed.ncbi.nlm.nih.gov/21137489/',
    keyFinding:
      'ユマニチュード哲学の創始者2名による原著。アルツハイマー病患者ケアにおける人間性の哲学を提示。',
  },
  {
    authors: 'Henriques LVL, Dourado MARF, Melo RCCP, Tanaka LH',
    title:
      'Implementation of the Humanitude Care Methodology: contribution to the quality of health care',
    journal: 'Revista Latino-Americana de Enfermagem',
    year: 2019,
    volume: '27',
    pages: 'e3123',
    doi: '10.1590/1518-8345.2430-3123',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6336364/',
    keyFinding:
      'ポルトガルの療養施設での実装研究。研修を受けた医療者の100%が「ケアの困難さを軽減する」と評価。',
  },
  {
    authors: 'Kobayashi M, Honda M',
    title:
      'The effect of a multimodal comprehensive care methodology for family caregivers of people with dementia',
    journal: 'BMC Geriatrics',
    year: 2021,
    volume: '21',
    pages: '434',
    doi: '10.1186/s12877-021-02373-w',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8296621/',
    keyFinding:
      '日本の家族介護者向け研修プログラムの効果検証。4要素(視線・話しかけ・触れる・立位介助)の包括的ケア技法を導入し介護負担感を有意に軽減。',
  },
  {
    authors: 'Sumioka H, Shiomi M, Honda M, Nakazawa A',
    title:
      'Technical Challenges for Smooth Interaction With Seniors With Dementia: Lessons From Humanitude™',
    journal: 'Frontiers in Robotics and AI',
    year: 2021,
    volume: '8',
    pages: '650906',
    doi: '10.3389/frobt.2021.650906',
    url: 'https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2021.650906/full',
    keyFinding:
      'ユマニチュードの認知症高齢者との円滑な相互作用に関する技術的特徴を分析。視線・触れ方・声掛けの定量的記述。',
  },
  {
    authors:
      'Fukuyasu Y, Kataoka HU, Honda M, Iwase T, Ogawa H, Sato M, Watanabe M, Fujii C, Wada J, DeSantis J, Hojat M, Gonnella JS',
    title:
      'The effect of Humanitude care methodology on improving empathy: a six-year longitudinal study of medical students in Japan',
    journal: 'BMC Medical Education',
    year: 2021,
    volume: '21',
    pages: '316',
    doi: '10.1186/s12909-021-02773-x',
    pmid: '34088308',
    url: 'https://link.springer.com/article/10.1186/s12909-021-02773-x',
    keyFinding:
      '岡山大学医学生115名の6年間追跡。Jefferson Empathy Scaleで共感性が有意に向上。ユマニチュードは医療者教育にも有効。',
  },
  {
    authors: 'Araujo JP, Luz H, Melo R, Van Son C',
    title:
      'Effectiveness of Humanitude Training on Care Refusal in Dementia: A Pre-Post Study',
    journal: 'Journal of Long-Term Care',
    year: 2025,
    pages: '182-193',
    doi: '10.31389/jltc.425',
    url: 'https://journal.ilpnetwork.org/articles/10.31389/jltc.425',
    keyFinding:
      '米国の認知症ケアユニット4施設での前後比較研究。ケア拒否行動(RoCIS)が有意に改善(Cohen\'s d=1.33の大きな効果量)。',
  },
]

interface Pillar {
  no: number
  name: string
  enName: string
  icon: typeof Eye
  gradient: string
  principle: string
  techniques: { title: string; detail: string }[]
  cite: number[]
}

const PILLARS: Pillar[] = [
  {
    no: 1,
    name: '見る (視線)',
    enName: 'Regarder / Gaze',
    icon: Eye,
    gradient: 'from-blue-400 to-cyan-500',
    principle:
      'ユマニチュードの視線は「水平・正面・近く・長く」が4要素。立位の人を見下ろす、正面ではなく横から、遠くから一瞥するなどは「人間として見ていない」というメッセージとして伝わる。',
    techniques: [
      {
        title: '水平 (axial / horizontal)',
        detail:
          '相手の目線と自分の目線を同じ高さに合わせる。寝ている人なら膝をついてしゃがむ、座っている人なら椅子に座るか膝をつく。立っている介助者が寝ている認知症患者を上から覗き込むのは「見下ろす」という非言語メッセージとなり威圧感を生む。',
      },
      {
        title: '正面 (frontal / axial)',
        detail:
          '相手の真正面、視野の中心(0°)に自分の顔を入れる。横や斜め後ろから話しかけると、認知症患者は声の発生源を視覚で同定できず、不安・混乱が増す。',
      },
      {
        title: '近く (proche / near)',
        detail:
          '20cm以内まで顔を近づけてアイコンタクトを取る。物理的距離の近さは親密さ・信頼・愛情の非言語シグナル。社会的距離(75-120cm)からのアプローチは事務的で冷たい印象を与える。',
      },
      {
        title: '長く (long)',
        detail:
          '一瞥(1秒未満)ではなく、数秒以上の持続的アイコンタクトを保つ。Sumioka 2021ではユマニチュード熟練者の視線時間は非熟練者より有意に長く、結果的に患者の凝視・微笑・発話が増加。',
      },
    ],
    cite: [0, 3],
  },
  {
    no: 2,
    name: '話す',
    enName: 'Parler / Speech',
    icon: MessageCircle,
    gradient: 'from-amber-400 to-orange-500',
    principle:
      '声がない場所では人間性が失われる。認知症患者が無反応でも会話を絶やさず、ケアの一連の動作をすべて言葉で実況する「オートフィードバック」が中核技法。低めの・穏やかな・前向きな声を使う。',
    techniques: [
      {
        title: 'オートフィードバック (Auto-feedback)',
        detail:
          '相手から返事がなくても、自分が今行っているケアを実況中継する。「今からあなたの右腕をきれいにしますね」「お湯がかかります、温かいですよ」「タオルでやさしく拭きますよ」など、動作の実況を3秒以上の沈黙が続かないよう続ける。これにより相手は予測可能な世界の中にいられ、不安・拒否反応が大幅に減少する(Henriques 2019)。',
      },
      {
        title: '低い・穏やかな声 (low pitch, soothing)',
        detail:
          '高めの声・早口・命令口調は脅威として知覚される。低めの音域、ゆったりしたテンポ、メロディアスな抑揚を意識する。',
      },
      {
        title: '前向きな言葉 (positive reinforcement)',
        detail:
          '「立てないでしょ」「拒否しないで」など否定形は避け、「立ってくださってありがとうございます」「ご協力ありがとうございます」と肯定表現で。一動作ごとに感謝・賞賛を言葉にする。',
      },
      {
        title: '指示でなく招待',
        detail:
          '「歯を磨きます」と命じるのではなく「歯磨きを一緒にしませんか?」と招待する形に。介助者と被介助者は対等な関係であることを言葉で示す。',
      },
    ],
    cite: [1, 2, 5],
  },
  {
    no: 3,
    name: '触れる',
    enName: 'Toucher / Touch',
    icon: Hand,
    gradient: 'from-emerald-400 to-teal-500',
    principle:
      '触れ方には「優しい触れ方」と「掴む触れ方」がある。腕や手首を掴む・つねる・押さえつけるのは攻撃と知覚され、認知症患者の防衛的反応(BPSD)を引き出す。広く・ゆっくり・包むように触れる。',
    techniques: [
      {
        title: '広い接触面 (large surface)',
        detail:
          '指先や爪先など狭い面で触れない。手のひら全体、腕全体など面積の広い部分で接触する。指でつまむ・つねる動作は痛みを誘発するだけでなく「掴まれた」と知覚されパニックを引き起こす。',
      },
      {
        title: 'ゆっくり (slow)',
        detail:
          '触れるスピード、移動するスピードのいずれもゆっくりと。素早い動作は驚き反射を誘発し、自己防衛のための拒否動作を引き出す。',
      },
      {
        title: '優しく・包むように (gentle, enveloping)',
        detail:
          '圧は弱く、相手を包み込むように触れる。掴まない・引っ張らない・押さえつけない。腕を取る時は下から手を添えて持ち上げる(掴むのではなく支える)。',
      },
      {
        title: 'ピアノタッチ (piano touch)',
        detail:
          '初めて触れる時は、ピアノの鍵盤を弾くように1本指で軽く・短くタッチして「これから触れます」と予告する。次に手のひら全体でゆっくり触れる。突然手のひらで掴むのは禁忌。',
      },
      {
        title: '機能的部位は避ける (avoid functional zones)',
        detail:
          '初対面では顔・口・性器・肛門など侵襲的な部位ではなく、肩・背中・上腕など中性的な部位から接触する。信頼関係ができてから機能的部位へ移行する。',
      },
    ],
    cite: [3, 5],
  },
  {
    no: 4,
    name: '立つ (立位の保持)',
    enName: 'Verticalité / Verticality',
    icon: ArrowUp,
    gradient: 'from-violet-400 to-purple-600',
    principle:
      'ヒトは二足歩行する種である。立位を失うことは人間性の喪失を意味する。寝たきりにしない、1日合計20分以上の立位を確保するのがユマニチュードの目標。立位は身体機能だけでなく自尊心・認知機能の維持に直結する。',
    techniques: [
      {
        title: '1日20分の立位を目標に',
        detail:
          '医学的に許容される範囲で、1日合計20分以上の立位時間を確保する。連続でなくてもよく、洗面・排泄・着替え・歯磨きなど日常動作の中で「立つ機会」を作る。寝たままケアを完結させない。',
      },
      {
        title: '座位→立位への移行',
        detail:
          '車椅子からの立ち上がり、ベッド端座位からの立位を、毎回のケア機会に組み込む。介助者は「立ってください」と命じるのではなく、相手の手を取り「一緒に立ちましょう」と招待する。',
      },
      {
        title: '寝たままの清拭は最小限に',
        detail:
          '寝たまま全身清拭・歯磨き・髭剃りを行うと、被介助者は「自分は何もできない」というメッセージを受け取り続け、自尊心が低下し抑うつ・無気力・廃用が進行する。可能な限り立位または座位で行う。',
      },
      {
        title: '歩行の機会を毎日',
        detail:
          '室内10mでもよいので毎日歩く機会を作る。介助者は前ではなく相手の斜め後ろを歩き、相手の主体性を尊重する。',
      },
    ],
    cite: [1, 2],
  },
]

interface Step {
  no: number
  name: string
  enName: string
  detail: string
  examples: string[]
}

const FIVE_STEPS: Step[] = [
  {
    no: 1,
    name: '出会いの準備',
    enName: 'Préparation de la rencontre',
    detail:
      'ケアを始める前に「来訪を告げる」段階。いきなり部屋に入ってベッドに近づくのではなく、外から3回ノックし、3秒待つ。返事がなくてもさらに3回ノックして3秒待つ。それから部屋に入り、ベッドサイドで再度名前を呼んで自分の存在を伝える。',
    examples: [
      'ドアを3回ノックして3秒待つ',
      '返事がなければさらに3回ノックして3秒待つ',
      '入室時「○○さん、看護師の△△です」と名乗る',
      'いきなり処置に入らず、相手が認識する時間を3〜5秒確保する',
    ],
  },
  {
    no: 2,
    name: 'ケアの準備',
    enName: 'Préparation du soin',
    detail:
      'ケアの内容を「合意のもとに」開始する段階。これから何をするかを言葉で説明し、相手の同意を得てから始める。「同意がない=ケアを開始しない」が原則。同意は言葉だけでなく、表情・しぐさで示されることもある。',
    examples: [
      '「これから歯磨きを一緒にしましょう、よろしいですか?」と尋ねる',
      'うなずき・笑顔・腕を出すなどの非言語的同意を待つ',
      '同意が得られなければ無理に開始せず、3分以内なら別の話題で関係を作り直してから再度提案',
      '3分かけても合意が得られなければ、医学的緊急性がない限り中止する',
    ],
  },
  {
    no: 3,
    name: '知覚の連結',
    enName: 'Connexion sensorielle',
    detail:
      '4本の柱(見る・話す・触れる・立つ)を「同時に」一貫したメッセージとして提示する。視線で「あなたを尊敬する」、声で「あなたを愛する」、触れ方で「あなたは安全」、立位で「あなたは人間」と伝える。これらが矛盾すると認知症患者は混乱する(例:優しく話しながら腕を強く掴む=不一致メッセージ)。',
    examples: [
      'ケア中は2秒以上沈黙しないようオートフィードバックを続ける',
      '触れる前に必ず視線を合わせる',
      '声・視線・触れ方すべてが「肯定的・尊重的」なメッセージとして一致するよう同時に整える',
      'ケアの動作はすべて言葉でアナウンスしてから実行(予測可能性を保つ)',
    ],
  },
  {
    no: 4,
    name: '感情の固定',
    enName: 'Consolidation émotionnelle',
    detail:
      'ケアが終わるタイミングで、ポジティブな感情体験を意識的に「言語化」して残す段階。エピソード記憶が障害されていても、感情記憶は最後まで残るため、ここで作られたポジティブな感情記憶が次回のケアの拒否を予防する。',
    examples: [
      '「○○さん、今日もとても素敵に過ごせました」',
      '「ご協力ありがとうございました、おかげでお口がきれいになりました」',
      '「またお会いするのを楽しみにしています」',
      '相手の表情・反応を見ながら、肯定的な短い文を3〜4個重ねる',
    ],
  },
  {
    no: 5,
    name: '再会の約束',
    enName: 'Promesse de revoir',
    detail:
      'ケアを終了するときに「次はいつ会いに来るか」を明確に伝える。次回への期待・連続性の感覚は安心の基盤となる。「また」「すぐに」「明日また」などの曖昧な約束ではなく、具体的な時間で告げる。',
    examples: [
      '「○時にまたお食事のお手伝いに来ます」',
      '「夕方5時にもう一度お会いしましょう」',
      '退室時にもう一度視線を合わせ、笑顔で告げる',
      '実際にその時刻に来ることで「約束を守る」存在として記憶される',
    ],
  },
]

const YOUTUBE = {
  channel: '一般社団法人日本ユマニチュード学会',
  url: 'https://www.youtube.com/@%E4%B8%80%E8%88%AC%E7%A4%BE%E5%9B%A3%E6%B3%95%E4%BA%BA%E6%97%A5%E6%9C%AC%E3%83%A6%E3%83%9E%E3%83%8B%E3%83%81',
  description:
    '日本ユマニチュード学会(2019年設立、東京医療センター内)の公式チャンネル。実技デモ・解説動画あり。',
} as const

export function HumanitudePage() {
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
            ユマニチュード(Humanitude®)
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            知覚・感情・言語による包括的コミュニケーションケア技法
          </p>
        </div>
      </div>

      {/* 概要 */}
      <div className="rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-4 dark:border-rose-900/40 dark:from-rose-950/40 dark:to-pink-950/40">
        <div className="mb-2 flex items-center gap-2">
          <Heart size={16} className="text-rose-600 dark:text-rose-300" />
          <h3 className="text-sm font-bold text-rose-700 dark:text-rose-200">概要</h3>
        </div>
        <p className="text-xs leading-relaxed text-gray-800 dark:text-gray-100">
          ユマニチュード(Humanitude®)は、フランスの体育学教師 <strong>Yves Gineste</strong> と <strong>Rosette Marescotti</strong> が <strong>1979年</strong>に開発した、認知症患者など高齢者へのコミュニケーション・ケア技法。「人間らしさを取り戻す」ことを目的とし、約150の具体的技法から構成される(Gineste &amp; Marescotti 2010)。 ヨーロッパで600以上の病院・施設に導入され、攻撃的行動の88.5%減少、向精神薬使用の有意な減少、SROI 4.07(投資収益)が報告されている(Henriques 2019)。日本では2012年に医療現場に導入され、2019年に日本ユマニチュード学会が設立された。
        </p>
      </div>

      {/* 紹介動画(まず視聴) */}
      <a
        href="https://www.youtube.com/watch?v=C7V03-Mhkdw"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl border-2 border-red-400 bg-gradient-to-br from-red-50 to-rose-100 p-3 shadow-sm transition-all hover:shadow-md active:scale-[0.98] dark:border-red-700 dark:from-red-950/50 dark:to-rose-900/40"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white">
          <PlayCircle size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
            ユマニチュード紹介動画
          </div>
          <div className="text-[11px] font-semibold leading-relaxed text-red-700 dark:text-red-300">
            まずこれを視聴してください
          </div>
        </div>
        <ExternalLink size={14} className="shrink-0 text-gray-400" />
      </a>

      {/* 4本の柱 */}
      <div>
        <h3 className="mb-3 text-base font-bold text-gray-900 dark:text-gray-100">
          4本の柱(Four Pillars)
        </h3>
        <p className="mb-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          関係性の3要素(見る・話す・触れる)と、人間性の1要素(立つ)から構成される。これらは「同時に」「一貫して」提示することで効果を発揮する。
        </p>
        <div className="space-y-3">
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.no}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <div
                  className={`flex items-center gap-3 bg-gradient-to-r ${p.gradient} p-3 text-white`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs opacity-90">柱 {p.no}</div>
                    <div className="text-base font-bold">{p.name}</div>
                    <div className="text-[10px] italic opacity-80">{p.enName}</div>
                  </div>
                </div>
                <div className="space-y-3 p-4">
                  <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-200">
                    {p.principle}
                  </p>
                  <div className="space-y-2">
                    {p.techniques.map((t, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-gray-100 bg-gray-50 p-2.5 dark:border-gray-800 dark:bg-gray-800/40"
                      >
                        <div className="mb-1 flex items-start gap-1.5">
                          <CheckCircle2
                            size={12}
                            className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                          />
                          <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                            {t.title}
                          </h4>
                        </div>
                        <p className="pl-4 text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">
                          {t.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg bg-violet-50 p-2 text-[10px] leading-relaxed text-violet-800 dark:bg-violet-950/40 dark:text-violet-200">
                    <strong>参照文献:</strong>{' '}
                    {p.cite.map((idx) => `[${idx + 1}]`).join(' ')}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 5ステップ */}
      <div>
        <h3 className="mb-3 text-base font-bold text-gray-900 dark:text-gray-100">
          ケアの5ステップ(具体的手順)
        </h3>
        <p className="mb-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          すべてのケア(食事介助・口腔ケア・清拭・更衣など)で必ず順番に実施する5段階。「省略してはいけない」のが原則。
        </p>
        <div className="space-y-3">
          {FIVE_STEPS.map((s) => (
            <div
              key={s.no}
              className="rounded-xl border border-violet-200 bg-white p-4 shadow-sm dark:border-violet-900/40 dark:bg-gray-900"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-600 text-sm font-black text-white">
                  {s.no}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {s.name}
                  </div>
                  <div className="text-[10px] italic text-gray-500 dark:text-gray-400">
                    {s.enName}
                  </div>
                </div>
              </div>
              <p className="mb-2 text-xs leading-relaxed text-gray-700 dark:text-gray-200">
                {s.detail}
              </p>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5 dark:border-amber-800 dark:bg-amber-950/40">
                <div className="mb-1 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                  具体例
                </div>
                <ul className="space-y-1 text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
                  {s.examples.map((ex, i) => (
                    <li key={i} className="flex gap-1.5">
                      <span className="text-amber-500">•</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 効果のエビデンス */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 size={14} />
          効果のエビデンス(検証済み文献より)
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-emerald-900 dark:text-emerald-100">
          <li>• 攻撃的行動 88.5%減少、向精神薬使用の有意な減少(Henriques 2019)</li>
          <li>
            • ケア拒否行動(RoCIS)が前後比較で有意に改善、効果量Cohen's d=1.33(Araujo 2025)
          </li>
          <li>• 家族介護者の介護負担感が研修後に有意に低下(Kobayashi &amp; Honda 2021)</li>
          <li>
            • 医学生の共感性(Jefferson Empathy Scale)が6年間で有意に向上(Fukuyasu 2021)
          </li>
          <li>• 投資収益率(SROI)4.07 — 1単位の投資が4倍のリターン(Henriques 2019)</li>
        </ul>
      </div>

      {/* 注意点 */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-amber-800 dark:text-amber-200">
          <AlertCircle size={14} />
          実践上の注意
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
          <li>
            • ユマニチュードは「Humanitude®」として商標登録された技法であり、正式な研修・認定制度がある。本ページは学習用要約で、実技習得には日本ユマニチュード学会の研修受講を推奨。
          </li>
          <li>
            • 4本の柱は「同時提示」が原則。視線だけ・声だけ・触れるだけでは効果が限定的。
          </li>
          <li>
            • 5ステップは「省略不可」。同意が得られない場合は中止し、医学的緊急性がない限り無理強いしない。
          </li>
          <li>
            • 効果には個人差があり、認知症の進行度・併存疾患・既往により反応は異なる。
          </li>
        </ul>
      </div>

      {/* YouTube */}
      <div>
        <h3 className="mb-2 text-sm font-bold text-gray-900 dark:text-gray-100">
          動画で学ぶ(ここから)
        </h3>
        <p className="mb-2 text-[11px] leading-relaxed text-gray-600 dark:text-gray-400">
          以下は学術論文ではなく実技デモ・解説動画です。視覚的に理解する補助として活用してください。
        </p>
        <a
          href={YOUTUBE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border-2 border-red-300 bg-gradient-to-br from-red-50 to-rose-50 p-3 transition-all hover:shadow-md active:scale-[0.98] dark:border-red-800 dark:from-red-950/40 dark:to-rose-950/40"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white">
            <PlayCircle size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {YOUTUBE.channel}
            </div>
            <div className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
              {YOUTUBE.description}
            </div>
          </div>
          <ExternalLink size={14} className="shrink-0 text-gray-400" />
        </a>
      </div>

      {/* 参考文献 */}
      <div>
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-gray-100">
          <BookOpen size={14} />
          参考文献(査読付き、2026年4月時点で実在確認済み)
        </h3>
        <div className="space-y-2">
          {REFERENCES.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-gray-200 bg-white p-3 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="mb-1 flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-600 text-[10px] font-black text-white">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold leading-tight text-gray-900 dark:text-gray-100">
                    {r.title}
                  </div>
                  <div className="mt-0.5 text-[10px] text-gray-600 dark:text-gray-400">
                    {r.authors}.
                  </div>
                  <div className="mt-0.5 text-[10px] text-gray-700 dark:text-gray-300">
                    <em>{r.journal}</em>. {r.year}
                    {r.volume ? `;${r.volume}` : ''}
                    {r.pages ? `:${r.pages}` : ''}.
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px]">
                    {r.doi && (
                      <span className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                        DOI: {r.doi}
                      </span>
                    )}
                    {r.pmid && (
                      <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-mono text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                        PMID: {r.pmid}
                      </span>
                    )}
                    <ExternalLink size={10} className="text-gray-400" />
                  </div>
                  <div className="mt-1.5 text-[10px] leading-relaxed text-gray-600 dark:text-gray-400">
                    {r.keyFinding}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white/70 p-4 text-[10px] leading-relaxed text-gray-500 dark:bg-gray-900/60 dark:text-gray-400">
        <p>
          本ページは学習補助を目的とした要約です。実際の臨床応用にあたっては、日本ユマニチュード学会(<a
            href="https://jhuma.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 hover:underline dark:text-rose-400"
          >
            jhuma.org
          </a>
          )による正式な研修・認定プログラムの受講を推奨します。文献は2026年4月時点で実在確認済みですが、リンク切れの場合はDOI/PMIDで検索してください。
        </p>
      </div>
    </div>
  )
}
