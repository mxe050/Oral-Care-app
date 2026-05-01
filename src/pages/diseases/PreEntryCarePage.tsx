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
  PlayCircle,
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
    title: '出会いの準備 — 「見る」「触れる」「話す」の2つを必ず使う',
    detail:
      'ベッドサイドに到着したら、相手の視野に正面から入り、同じ高さで目を合わせる(見る)、肩や手の甲に予告のピアノタッチで優しく触れる(触れる)、低めの落ち着いたトーンで「○○さん、おはようございます」と名前を丁寧に呼ぶ(話す)。このうち最低2つを組み合わせる。これは口腔ケア時も食事介助時もまったく同じ。',
    reason:
      'ユマニチュード4本の柱は「同時」に一貫したメッセージとして提示するのが原則。一つだけ・矛盾メッセージでは効果が限定的。事務的な「○○さーん」だけだと作業の予告にしかならず、口腔ケアでの開口拒否や食事介助での咽頭緊張につながる。複数チャネルで「あなたに会いに来た」を伝えると、口腔は自然と緩み、嚥下の準備も整う。',
  },
  {
    title: 'ケアの準備 — 同意を得てから始める(口腔ケア・食事ともに)',
    detail:
      '口腔ケアなら「これからお口のお手入れを一緒にしましょう、よろしいですか?」、食事なら「お食事を一緒にしましょう、よろしいですか?」と尋ねる。うなずき・笑顔・口を開けるなど非言語的同意を待つ。同意がなければ無理に開始しない。3分以内なら別の話題で関係を作り直し、再度提案。',
    reason:
      '「同意がない=ケアを開始しない」がユマニチュードの原則。強制的な口腔ケアは噛みしめ反射・拒否を強化し、強制的な食事介助は誤嚥リスクを高める(task-centered ケアでの誤嚥オッズ約12%上昇:Gilmore-Bykovskyi & Rogus-Pulia 2017)。同意を待つ「3分」が結果として、安全で短いケアにつながる。',
  },
  {
    title: 'オートフィードバック — 動作の実況を続ける',
    detail:
      'ケア中は2秒以上の沈黙を作らないよう、自分が今行っている動作をすべて実況する。口腔ケアでは「これから歯ブラシを当てますよ」「奥歯の方を磨きますね」「うがいの水をお持ちしました」。食事介助では「お味噌汁を温かいうちに召し上がりましょう」「次はお魚です、骨を取りますね」「もう一度ゴックンしてください」。声のトーンは終始、最初の「○○さん」と同じ穏やかさを保つ。',
    reason:
      '声がない場所では人間性が失われる。実況中継により、本人は「予測可能な世界」の中にいられ、不安・拒否反応が大幅に減る。口腔内に物が入る瞬間、スプーンが口元に来る瞬間 —— どちらも「予告」があるかないかで、口腔・咽頭の緊張度がまったく違う。Henriques(2019)では医療者の100%が「ケアの困難さを軽減する」と評価。',
  },
  {
    title: '触れる時は広く・ゆっくり・包むように',
    detail:
      '指先や爪先など狭い面で触れない。手のひら全体・腕全体など面積の広い部分で接触する。ピアノタッチ(初めて触れる時はピアノの鍵盤を弾くように1本指で軽く・短くタッチして予告)→次に手のひら全体でゆっくり触れる。口腔ケアで頬や口唇に触れる時、食事介助でスプーンを下口唇に近づける時、共通する原則。',
    reason:
      '指でつまむ・つねる・突然の手のひら接触は「掴まれた」「攻撃された」と知覚され、防衛的反応(噛みしめ・口を強く閉じる・首を振る)を引き出す。これは認知症患者の「拒否」と呼ばれている行動の多くの正体。「優しい触れ方」と「掴む触れ方」を意識的に区別する。',
  },
  {
    title: '感情の固定 — ケア後にポジティブな言葉を残す',
    detail:
      'ケアが終わるタイミングで、ポジティブな感情体験を意識的に「言語化」して残す。口腔ケア後は「○○さん、お口がさっぱりしましたね、ありがとうございます」、食事後は「今日もとても素敵に召し上がれましたね」。声のトーンは最初の「○○さん」と同じく穏やかに、しかし喜びが伝わる温かさで。',
    reason:
      'エピソード記憶が障害されていても、感情記憶は最後まで残る。ここで作られたポジティブな感情記憶が、次回の口腔ケア・食事介助の拒否を予防する。「次のケア」を作っているのは「今のケアの終わり方」。これがあるかないかで、翌朝の口の開き方が変わる。',
  },
  {
    title: '再会の約束 — 次にいつ来るかを具体的に告げる',
    detail:
      '退室時に「○時にまたお口のケアに伺います」「夕方5時にもう一度お会いしましょう」と具体的な時間で告げる。「また」「すぐに」など曖昧な約束ではなく、具体的時刻で。そして実際にその時刻に来ることで、「約束を守る人」として身体に記憶される。',
    reason:
      '次回への期待・連続性の感覚は安心の基盤。「あの人がまた来てくれる」という感情記憶が、口腔ケア・食事介助の拒否を継続的に減らす。この効果は認知症終末期まで一貫して持続する。',
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
            ノック・声のトーン・雰囲気づくりが、口腔ケアと食事介助の質を決める
          </p>
        </div>
      </div>

      {/* 入室前からを実践している動画(まず視聴) */}
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
            入室前からを実践している動画
          </div>
          <div className="text-[11px] font-semibold leading-relaxed text-red-700 dark:text-red-300">
            ユマニチュード紹介動画・まずこれを視聴して
          </div>
        </div>
        <ExternalLink size={14} className="shrink-0 text-gray-400" />
      </a>

      {/* 概要 */}
      <div className="rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-4 dark:border-rose-900/40 dark:from-rose-950/40 dark:to-pink-950/40">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-rose-600 dark:text-rose-300" />
          <h3 className="text-sm font-bold text-rose-700 dark:text-rose-200">
            口腔のケア・食事介助は、現場の前から、始まっている
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-gray-800 dark:text-gray-100">
          口腔ケアも食事介助も、{' '}
          <strong>道具を手に取る瞬間や、スプーンを口に運ぶ瞬間から始まるのではありません</strong>。
          ベッドサイドに到着するよりずっと前 ——{' '}
          <strong>廊下を歩いている自分の足音、ドアの前で深呼吸して整える表情、ノックの強さ、最初の声のトーン</strong>{' '}
          —— その一つひとつが、もうすでに「ケアの一部」として相手に届いています。
          <br />
          <br />
          同じ「失礼します」「○○さん」という言葉でも、{' '}
          <strong>言い方ひとつで、相手の身体に届く優しさがまったく違う</strong>{' '}
          ということを、現場で経験された方は多いはずです。気軽に、普通の業務トーンで「○○さーん、お口のケアしますね」と言うのと、ほんの少し声を低く・穏やかに整え、相手の名前を「丁寧に呼ぶこと自体がひとつのケア」であるかのように発するのとでは、相手の表情、呼吸、口の開き方、唾液分泌、咽頭の緊張度、すべてが変わってきます。「あの人が来ると、なぜか落ち着く」「あの人に呼ばれると、自然と口が開く」—— そうした方が、必ず職場にいるはずです。
          <br />
          <br />
          <strong>その雰囲気は、技術や知識の上にあるのではなく、技術や知識より「先に」相手に届いています。</strong>{' '}
          だからこそ、私たちはまずその「人」を真似て、声のトーンから演出して、自分自身を作り上げる必要があります。スキルや手技の上達と同じように、 ——
          いえ、それ以上に、{' '}
          <strong>非言語的な部分(声・視線・姿勢・触れ方・間)</strong>{' '}
          を意識的に磨くことが、口腔ケアでの開口拒否を減らし、食事介助での誤嚥を減らす最も基本的な土台になります。
          <br />
          <br />
          Gilmore-Bykovskyi & Rogus-Pulia(2017)の研究は、それを科学的にも支えています。{' '}
          <strong>person-centered(その人中心)ではなく task-centered(作業中心)のケア行動の最中・直後に、誤嚥の観察可能な指標が有意に多く発生</strong>{' '}
          (誤嚥オッズ約12%上昇)。「作業を済ませに来た人」の声と「あなたに会いに来た人」の声 —— 認知症高齢者の身体は、その違いを正確に感じ取り、咽頭運動の協調そのものに反映してしまいます。{' '}
          <strong>声のトーン・呼びかけ方・雰囲気は、嚥下安全性そのものに関係する</strong>{' '}
          ということです。
          <br />
          <br />
          ユマニチュードの5ステップ(出会いの準備→ケアの準備→知覚の連結→感情の固定→再会の約束)は、これを構造化したものです。「食事に招かれて友人の家を訪れる時」になぞらえ、{' '}
          <strong>呼び鈴を鳴らし挨拶を交わすのが①出会いの準備・②ケアの準備、ケア(口腔ケア・食事)自体が③知覚の連結</strong>{' '}
          にあたります。本ページではその全工程を、{' '}
          <strong>声のトーンから演出する「自分づくり」を起点に</strong>{' '}
          解説します。
        </p>
      </div>

      {/* 声のトーン・雰囲気づくり(独立セクション) */}
      <div className="rounded-xl border border-amber-300 bg-gradient-to-br from-amber-50 to-rose-50 p-4 dark:border-amber-700 dark:from-amber-950/40 dark:to-rose-950/40">
        <div className="mb-2 flex items-center gap-2">
          <MessageCircle size={16} className="text-amber-600 dark:text-amber-300" />
          <h3 className="text-sm font-bold text-amber-800 dark:text-amber-200">
            声のトーンから演出する — 「自分」を作り上げる
          </h3>
        </div>
        <ul className="space-y-2 text-[11px] leading-relaxed text-gray-800 dark:text-gray-100">
          <li>
            <strong>① 「○○さん」の呼び方を磨く</strong>
            <br />
            気軽に「○○さーん」と業務口調で呼ぶのではなく、ほんの少し声を低く整え、相手の名前そのものを「ケア」として丁寧に発する。同じ言葉でも、呼ばれた側の身体の緊張がまったく変わる。職場に「あの人に呼ばれると安心する」という方がいれば、その人を意識的に真似ることから始める。
          </li>
          <li>
            <strong>② 「失礼します」のトーンを整える</strong>
            <br />
            事務的な「失礼しまーす」ではなく、低めの・穏やかな・少しゆっくりとした「失礼します」。これだけで、入室の瞬間に相手の交感神経の高まりを抑えられる。声は最も早く相手の身体に届く非言語メッセージ。
          </li>
          <li>
            <strong>③ 自分自身を「作り上げる」</strong>
            <br />
            技術や知識の上達と同じレベルで、{' '}
            <strong>声・表情・歩き方・触れ方・間の取り方</strong>{' '}
            を意識的に磨く。「自然体でやるのが一番」ではなく、{' '}
            <strong>「ケアにふさわしい自分」をひとつの作品として作り上げる</strong>{' '}
            くらいの意識で。これは認知症高齢者ほど鋭く感じ取る部分。
          </li>
          <li>
            <strong>④ ドアの前で「整える」一呼吸</strong>
            <br />
            前の業務の緊張・苛立ち・急ぎを、ドアの前で一度リセットする。深呼吸ひとつで、表情・声・歩幅すべてが変わる。これを習慣化することが、{' '}
            <strong>「現場に入る前のケア」</strong>{' '}
            の最初の一歩。
          </li>
          <li>
            <strong>⑤ スキルではなく「人」を伝える</strong>
            <br />
            上手な手技は重要だが、{' '}
            <strong>非言語的な部分(声のトーン・視線・触れ方・間)が伝えるメッセージは、それ以上に重い</strong>。「ケアをしに来た」のではなく「あなたに会いに来た」が、声・表情・最初の触れ方すべてから一致して伝わるように。
          </li>
        </ul>
        <p className="mt-3 rounded-lg bg-white/60 p-2 text-[10px] leading-relaxed text-amber-900 dark:bg-amber-950/60 dark:text-amber-100">
          <strong>なぜここまでこだわるのか:</strong>{' '}
          認知症高齢者・嚥下障害患者は、こちらの声のトーン・表情・触れ方を、健常者よりはるかに敏感に感じ取ります。「作業中心の人」が来ると緊張で口が開かず、咽頭が硬くなり、誤嚥が増える。「あなたに会いに来た」が一致して伝わる人が来ると、自然と口が開き、咽頭が柔らかくなり、嚥下が整う。これは比喩ではなく、Gilmore-Bykovskyi 2017 で観察された臨床事実です。
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

      {/* 口腔ケア・食事介助の6つのキーポイント */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900 dark:text-gray-100">
          <Heart size={16} className="text-rose-500" />
          口腔ケア・配膳・食事介助 — 6つの実践ポイント
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
