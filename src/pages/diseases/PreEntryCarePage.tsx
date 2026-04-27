import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  DoorOpen,
  Hand,
  AlertCircle,
  CheckCircle2,
  Eye,
  MessageCircle,
  Heart,
  ExternalLink,
  Sparkles,
} from 'lucide-react'

interface KnockStep {
  no: number
  title: string
  detail: string
  reason: string
}

const KNOCK_PROTOCOL: KnockStep[] = [
  {
    no: 1,
    title: '3回ノック',
    detail:
      'ドアの外から3回ノックする。中に届く程度の確かな音で、しかし大きすぎない強さ。',
    reason:
      '1回ではなく3回にすることで、聴覚的注意が低下している認知症高齢者でも「人の気配」と認識できる。リズムのある3連打は環境音と区別されやすい。',
  },
  {
    no: 2,
    title: '3秒待つ',
    detail:
      'ノック後、3秒間は反応を待つ。返事があればその時点で「失礼します」と入室。',
    reason:
      '高齢者は反応に時間がかかる。即座に押し入ると「許可なく自分の領域に侵入された」というメッセージが伝わり、緊張・不安・拒否反応の引き金になる。',
  },
  {
    no: 3,
    title: '再度3回ノック → 3秒待つ',
    detail:
      '反応がなければ、もう一度3回ノックして3秒待つ。これで合計6回・約6秒の予告となる。',
    reason:
      '段階的な合図で覚醒水準を徐々に高める効果がある。一気にではなく、波状に近づくことで本人の認知が状況に追いつく時間を作る。',
  },
  {
    no: 4,
    title: '反応がなければ「失礼します」と声をかけて入室',
    detail:
      '声に出して入室を告げる。視野の正面側からゆっくり近づき、足音も予告的に。',
    reason:
      '言葉の予告は、聴覚的にも「人が来た」を意味づける。突然視界に介助者が現れる経験は驚き反射(startle reflex)を誘発し、緊張で全身筋緊張が上がる。',
  },
  {
    no: 5,
    title: 'ベッドに近づいたらベッドボードを1回ノック',
    detail:
      '足元のベッドボード(寝たきりの場合は枕元)を軽く1回ノック。「ここに来ました」と物理的距離の予告。',
    reason:
      '臥床中の患者にとってベッドは「最後のプライベート空間」。ベッドボードへのノックは、「今からあなたの距離に入ります」という最後の許可を求める動作。これがあるとないでは触れた瞬間の反応がまったく異なる。',
  },
  {
    no: 6,
    title: '正面・水平・近距離で目を合わせる',
    detail:
      '視線は相手と「同じ高さ・正面・近く・長く」。立位で見下ろさない。膝をつくか椅子に座る。20cm以内まで顔を近づけて数秒以上のアイコンタクト。',
    reason:
      '「同じ目線」は対等性の非言語シグナル。立位で見下ろされると、認知症高齢者にとって「権威者から命令される」関係性となり、ケアへの拒否が増える。水平・正面の視線は信頼関係の起点。',
  },
]

interface MealItem {
  title: string
  detail: string
  reason: string
}

const MEAL_PROTOCOL: MealItem[] = [
  {
    title: '配膳前 — 「見る」「触れる」「話す」の2つを必ず使う',
    detail:
      '配膳の段階で、相手の視野に正面から入り目を合わせる(見る)、肩や手の甲に優しく触れる(触れる)、穏やかな声で「お食事をお持ちしました」(話す)のうち最低2つを組み合わせる。',
    reason:
      'ユマニチュードの「ケアの準備」では、4本の柱を「同時に」一貫したメッセージとして提示することが原則。一つだけだと「事務的な配膳」になり、本人の覚醒・安心感を引き出せない。複数チャネルで「あなたに会いに来た」を伝える。',
  },
  {
    title: '同意を得てから食事を開始する',
    detail:
      '「これからお食事を一緒にしましょう、よろしいですか?」と尋ねる。うなずき・笑顔・口を開けるなど非言語的同意を待つ。同意がなければ無理に開始しない。3分以内なら別の話題で関係を作り直し、再度提案。',
    reason:
      '「同意がない=ケアを開始しない」がユマニチュードの原則。強制的な食事介助は誤嚥リスクそのものを高める(task-centered ケアでの誤嚥オッズ約12%上昇:Gilmore-Bykovskyi 2017)。同意を待つ時間が結果として安全な食事につながる。',
  },
  {
    title: 'オートフィードバック(動作の実況)を続ける',
    detail:
      'ケア中は2秒以上の沈黙を作らないよう、自分が今行っている動作を実況する。「お味噌汁を温かいうちに召し上がりましょう」「次はお魚です、骨を取りますね」「もう一度ゴックンしてください」。',
    reason:
      '声がない場所では人間性が失われる。実況中継により、本人は「予測可能な世界」の中にいられ、不安・拒否反応が大幅に減る。Henriques(2019)の実装研究では、医療者の100%が「ケアの困難さを軽減する」と評価。',
  },
  {
    title: '触れる時は広く・ゆっくり・包むように',
    detail:
      '指先や爪先など狭い面で触れない。手のひら全体・腕全体など面積の広い部分で接触する。ピアノタッチ(初めて触れる時はピアノの鍵盤を弾くように1本指で軽く・短くタッチして予告)→次に手のひら全体でゆっくり触れる。',
    reason:
      '指でつまむ・つねる動作は痛みを誘発するだけでなく「掴まれた」と知覚され、防衛的反応(BPSD)を引き出す。ユマニチュード4本の柱の「触れる」では「優しい触れ方」と「掴む触れ方」を厳密に区別する。',
  },
  {
    title: '感情の固定 — ケア後にポジティブな言葉を残す',
    detail:
      'ケアが終わるタイミングで、ポジティブな感情体験を意識的に「言語化」して残す。「○○さん、今日もとても素敵に召し上がれましたね」「ご協力ありがとうございました」。',
    reason:
      'エピソード記憶が障害されていても、感情記憶は最後まで残る。ここで作られたポジティブな感情記憶が、次回のケアの拒否を予防する。「次の食事」を作っているのは「今の食事の終わり方」。',
  },
  {
    title: '再会の約束 — 次にいつ来るかを具体的に告げる',
    detail:
      '退室時に「○時にまたお食事のお手伝いに来ます」「夕方5時にもう一度お会いしましょう」と具体的な時間で告げる。「また」「すぐに」など曖昧な約束ではなく、具体的時刻で。',
    reason:
      '次回への期待・連続性の感覚は安心の基盤。実際にその時刻に来ることで、「約束を守る存在」として記憶される。これは認知症終末期まで一貫して効果を持つ。',
  },
]

interface RefItem {
  no: number
  title: string
  authorOrSource: string
  url: string
  note: string
}

const EXTERNAL_REFERENCES: RefItem[] = [
  {
    no: 1,
    title: '誰もが学べ、実践できるユマニチュード。5つのステップで患者の心に近づく',
    authorOrSource: 'HELPMAN JAPAN',
    url: 'https://helpmanjapan.com/article/5140',
    note:
      '本田美和子先生・ジネスト先生への取材記事。5つのステップを「食事に招かれて友人の家を訪れる時」になぞらえ、呼び鈴・挨拶を①出会いの準備・②ケアの準備に対応させて解説。',
  },
  {
    no: 2,
    title: 'ユマニチュードとは?(食事介助での実装事例)',
    authorOrSource: 'トラストガーデン(リゾートトラスト)',
    url: 'https://www.trustgarden.jp/column/humanitude/',
    note:
      '介護付有料老人ホームでの食事介助実装。出会いの準備で「ノックして見える距離から近づき同じ目線・同じ高さで対面」、ケアの準備で「見る・触れる・話す」のうち2つ以上を組み合わせる方針を提示。',
  },
  {
    no: 3,
    title: 'ユマニチュードとは(公式)',
    authorOrSource: '日本ユマニチュード学会',
    url: 'https://jhuma.org/humanitude/',
    note:
      '学会一次情報。①出会いの準備(自分の来訪を告げ、相手の領域に入って良いと許可を得る)から⑤再会の約束までの5ステップを定義。食事介助を含むすべてのケアに適用。',
  },
  {
    no: 4,
    title: 'ノックはなぜ必要か',
    authorOrSource: '本田 美和子(日本ユマニチュード学会代表)/みんなのミシマガジン',
    url: 'https://www.mishimaga.com/books/amayadori/005644.html',
    note:
      '4人部屋もそこに住まう人にとってのプライベート空間。ノックは「私が来ました。入っても良いですか?」を尋ねる行動で、本人の唯一性とプライバシーを尊重する哲学。',
  },
  {
    no: 5,
    title: 'ユマニチュードを実践するための5つのステップ',
    authorOrSource: 'アズミエン(介護の便利帖)',
    url: 'https://www.azumien.jp/contents/method/00038.html',
    note:
      'ノック手順を最も具体的に記載。3回→3秒→3回→3秒→失礼しますと入室→ベッドボードを1回ノックの段階的プロトコル。複数回ノックは覚醒水準を徐々に高める効果。',
  },
  {
    no: 6,
    title: '摂食嚥下指導マニュアル',
    authorOrSource: '栃木県・栃木県歯科医師会',
    url: 'https://tochigi-da.or.jp/assets/files/pdf/dysphagia_manual.pdf',
    note:
      '食事の環境づくりに章を割いた公式マニュアル。家族友人と食事を伴にすることで楽しい雰囲気が生まれ食欲も増加するが、認知症などでは集中力への配慮が必要と指摘。',
  },
  {
    no: 7,
    title:
      '認知症高齢者に対するユマニチュードの有効性 ― 日本語文献によるシステマティック・レビュー',
    authorOrSource: '四国医学雑誌(Shikoku Acta Medica)',
    url: 'https://www.jstage.jst.go.jp/article/shikokuactamedica/79/5.6/79_221/_article/-char/ja',
    note:
      '2014〜2022年の日本語文献を医中誌・CiNii・Google Scholarで検索した7件の症例研究のシステマティック・レビュー。ユマニチュードが認知症患者と介護者にプラスの効果をもたらす可能性を示す。',
  },
  {
    no: 8,
    title:
      'Temporal Associations between Caregiving Approach, Behavioral Symptoms and Observable Indicators of Aspiration in Nursing Home Residents with Dementia',
    authorOrSource: 'Gilmore-Bykovskyi AL, Rogus-Pulia N. J Nutr Health Aging. 2017',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5830143/',
    note:
      'Person-centered と task-centered のケア行動を比較。誤嚥の観察可能な指標は task-centered ケアの最中・直後に有意に多く発生し、誤嚥オッズが約12%上昇。介助アプローチと嚥下安全性を直結させた重要論文。',
  },
  {
    no: 9,
    title:
      'A Biopsychosocial Model of Mealtime Management in Persons with Dementia',
    authorOrSource: 'Bayne DF, Shune SE. Geriatrics (Basel). 2022',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9601353/',
    note:
      '認知症患者の食事支援を生物心理社会モデルで包括化。介助者は患者の行動を疾患だけでなく社会的・環境的プロセスの結果として捉える asset-based(残存機能を活用する)アプローチを提唱。',
  },
  {
    no: 10,
    title: 'Dysphagia, Dementia And Meal Time Interventions',
    authorOrSource: 'Brush JA. Northern Speech Services',
    url: 'https://www.northernspeech.com/dysphagia-assessment-adult/making-the-most-of-mealtime-helping-older-adults-compensate-for-sensory-impairment-during-meals/',
    note:
      '食事環境(照明・騒音・視覚的雑然さ)が嚥下機能低下を悪化させる独立因子であることを臨床教材として整理。ASHAのCEU教材。',
  },
]

export function PreEntryCarePage() {
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
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            勝負は病室入室前から
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ノック・出会い・配膳までで、食事の安全性は決まっている
          </p>
        </div>
      </div>

      {/* 概要 */}
      <div className="rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-4 dark:border-rose-900/40 dark:from-rose-950/40 dark:to-pink-950/40">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-rose-600 dark:text-rose-300" />
          <h3 className="text-sm font-bold text-rose-700 dark:text-rose-200">
            食事介助は「スプーンを口に運ぶ瞬間」から始まらない
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-gray-800 dark:text-gray-100">
          食事介助の安全性を決めるのは、{' '}
          <strong>病室の扉をノックする瞬間から始まる「雰囲気づくり」</strong>{' '}
          です。 ユマニチュードの5ステップ(出会いの準備→ケアの準備→知覚の連結→感情の固定→再会の約束)では、5つを「食事に招かれて友人の家を訪れる時」になぞらえます。{' '}
          <strong>呼び鈴を鳴らし挨拶を交わすのが①出会いの準備・②ケアの準備、食事自体が③知覚の連結</strong>{' '}
          にあたります。
          <br />
          <br />
          Gilmore-Bykovskyi & Rogus-Pulia(2017)の研究では、{' '}
          <strong>person-centered ではなく task-centered(作業中心)のケア行動の最中・直後に、誤嚥の観察可能な指標が有意に多く発生</strong>{' '}
          (誤嚥オッズ約12%上昇)と報告されています。{' '}
          <strong>「あなたに会いに来た」という入り方は、嚥下安全性そのものに関係する</strong>{' '}
          ということです。
        </p>
      </div>

      {/* 入室プロトコル */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-100">
          <DoorOpen size={16} className="text-rose-500" />
          入室の段階的プロトコル(ノック手順)
        </h3>
        <div className="space-y-3">
          {KNOCK_PROTOCOL.map((s) => (
            <div
              key={s.no}
              className="rounded-xl border border-rose-200 bg-white p-4 shadow-sm dark:border-rose-900/40 dark:bg-gray-900"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-600 text-sm font-black text-white">
                  {s.no}
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {s.title}
                </h4>
              </div>
              <p className="mb-2 text-[11px] leading-relaxed text-gray-700 dark:text-gray-200">
                {s.detail}
              </p>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-950/40">
                <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
                  なぜそうするのか
                </div>
                <p className="text-[10px] leading-relaxed text-amber-900 dark:text-amber-100">
                  {s.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 p-3 text-[11px] leading-relaxed text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100">
          <strong>哲学:</strong>{' '}
          4人の相部屋であっても、それは4人で分かち合っているプライベートな空間です。「私が来ました。入っても良いですか?」と尋ねるノックは、相手の唯一性とプライバシーを尊重する行動。
          <br />
          <span className="text-[10px] opacity-80">[出典: 本田美和子『ノックはなぜ必要か』みんなのミシマガジン]</span>
        </div>
      </div>

      {/* 食事介助の6つのキーポイント */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-100">
          <Heart size={16} className="text-rose-500" />
          配膳から退室までの6つの実践ポイント
        </h3>
        <div className="space-y-3">
          {MEAL_PROTOCOL.map((it, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="mb-1.5 flex items-start gap-2">
                <CheckCircle2
                  size={14}
                  className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                />
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {it.title}
                </h4>
              </div>
              <p className="pl-6 text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">
                {it.detail}
              </p>
              <div className="ml-6 mt-2 rounded-lg border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-950/40">
                <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
                  なぜそうするのか
                </div>
                <p className="text-[10px] leading-relaxed text-amber-900 dark:text-amber-100">
                  {it.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4本の柱(同時提示) */}
      <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/40 dark:bg-violet-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-violet-800 dark:text-violet-200">
          <Sparkles size={14} />
          4本の柱は「同時」に提示する(原則)
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-violet-900 dark:text-violet-100">
          <li className="flex gap-2">
            <Eye size={12} className="mt-0.5 shrink-0 text-blue-500" />
            <span>
              <strong>見る</strong>:水平・正面・近く・長く。立位の患者を見下ろさない。20cm以内まで近づき数秒以上のアイコンタクト。
            </span>
          </li>
          <li className="flex gap-2">
            <MessageCircle size={12} className="mt-0.5 shrink-0 text-amber-500" />
            <span>
              <strong>話す</strong>:低めの・穏やかな・前向きな声で。沈黙を2秒以上作らないオートフィードバック。命令ではなく招待形。
            </span>
          </li>
          <li className="flex gap-2">
            <Hand size={12} className="mt-0.5 shrink-0 text-emerald-500" />
            <span>
              <strong>触れる</strong>:広い接触面で・ゆっくり・包むように。ピアノタッチで予告→手のひら全体。掴まない・引っ張らない・押さえつけない。
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-violet-500" />
            <span>
              <strong>立つ</strong>:可能な限り食事は座位・立位で。寝たままケアを完結させない。「人間性の保持」と嚥下機能の両方に寄与。
            </span>
          </li>
        </ul>
        <p className="mt-2 text-[10px] leading-relaxed text-violet-800 dark:text-violet-200">
          <strong>同時に提示しないと矛盾メッセージになる</strong>:優しく話しながら腕を強く掴む=不一致メッセージ。認知症患者は混乱し、結果として拒否・防衛反応が出る。
        </p>
      </div>

      {/* 環境的バリア */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-blue-800 dark:text-blue-200">
          <Eye size={14} />
          食事環境のバリアを取り除いて入室する
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-blue-900 dark:text-blue-100">
          <li>• 入室前に廊下のテレビ音量・隣室の物音を意識する。可能なら時間帯をずらす。</li>
          <li>• 病室のテレビ・ラジオを消すか音量を下げる。介助者は1名にし、視線を集中させる。</li>
          <li>• 食卓には食事と必要な道具のみ。視覚的雑然さを取り除く。</li>
          <li>• 照明は明るく、影が顔にかからない位置。色のコントラストの強い盛り付け(白い皿+色の濃い料理)。</li>
          <li>
            • <strong>環境調整は治療計画の一部</strong>(Brush JA. Northern Speech Services / 栃木県摂食嚥下指導マニュアル)。
          </li>
        </ul>
      </div>

      {/* エビデンス要約 */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 size={14} />
          エビデンス・主要知見
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-emerald-900 dark:text-emerald-100">
          <li>
            • Person-centered ケアは task-centered ケアに比べ、誤嚥の観察可能な指標を有意に減らす(誤嚥オッズ約12%減)。
            <span className="text-[10px] opacity-70">[Gilmore-Bykovskyi & Rogus-Pulia. J Nutr Health Aging. 2017]</span>
          </li>
          <li>
            • ユマニチュード実装で攻撃的行動 88.5%減少、向精神薬使用の有意な減少、SROI 4.07。
            <span className="text-[10px] opacity-70">[Henriques et al. 2019]</span>
          </li>
          <li>
            • 認知症ケア拒否(RoCIS)が前後比較で有意に改善、Cohen's d=1.33の大きな効果量。
            <span className="text-[10px] opacity-70">[Araujo et al. 2025]</span>
          </li>
          <li>
            • 認知症高齢者に対するユマニチュードの有効性は7件の症例研究のシステマティック・レビューで支持(RCTは必要)。
            <span className="text-[10px] opacity-70">[四国医学雑誌 79巻 2024]</span>
          </li>
          <li>
            • 食事環境のバリア(照明・騒音・視覚的雑然さ)は嚥下機能低下の独立因子。
            <span className="text-[10px] opacity-70">[Brush JA. Northern Speech Services]</span>
          </li>
        </ul>
      </div>

      {/* 注意 */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-950/40">
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-amber-800 dark:text-amber-200">
          <AlertCircle size={14} />
          実践上の注意
        </h3>
        <ul className="space-y-1.5 text-[11px] leading-relaxed text-amber-900 dark:text-amber-100">
          <li>• ノック→3秒待つ→入室の手順は、医療緊急時(急変・救命)を除いて全患者・全場面で適用する。</li>
          <li>• 4本の柱は「同時に」提示することで効果を発揮。一つだけ・矛盾メッセージは効果が限定的。</li>
          <li>• 「同意がない=ケアを開始しない」が原則。3分かけても合意が得られなければ、医学的緊急性がない限り中止する。</li>
          <li>• ユマニチュードは商標登録された技法。実技習得には日本ユマニチュード学会の研修受講が推奨される。</li>
          <li>• 本ページは公開情報の要約。臨床応用は施設の方針・主治医の判断に従ってください。</li>
        </ul>
      </div>

      {/* 参考文献(外部URL) */}
      <div>
        <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-gray-100">
          参考文献(外部資料・査読論文)
        </h3>
        <div className="space-y-2">
          {EXTERNAL_REFERENCES.map((r) => (
            <a
              key={r.no}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-gray-200 bg-white p-3 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="mb-1 flex items-start gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-600 text-[10px] font-black text-white">
                  {r.no}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-1">
                    <div className="text-[12px] font-bold leading-tight text-gray-900 dark:text-gray-100">
                      {r.title}
                    </div>
                    <ExternalLink size={11} className="mt-0.5 shrink-0 text-gray-400" />
                  </div>
                  <div className="mt-0.5 text-[10px] text-gray-600 dark:text-gray-400">
                    {r.authorOrSource}
                  </div>
                  <div className="mt-1 text-[10px] leading-relaxed text-gray-700 dark:text-gray-300">
                    {r.note}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white/70 p-4 text-[10px] leading-relaxed text-gray-500 dark:bg-gray-900/60 dark:text-gray-400">
        <p>
          本ページはユマニチュード・摂食嚥下に関する公開情報・査読論文の要約です。Humanitude®は商標登録された技法であり、正式な実技習得には{' '}
          <a
            href="https://jhuma.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 underline hover:underline dark:text-rose-400"
          >
            日本ユマニチュード学会
          </a>
          の研修・認定プログラムの受講を推奨します。
        </p>
      </div>
    </div>
  )
}
