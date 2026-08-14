import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  HeartHandshake,
  List,
  Pill,
  Search,
  ShieldAlert,
  Stethoscope,
  Utensils,
} from 'lucide-react'

type Phase = {
  label: string
  title: string
  description: string
  action: string
  items: string[]
  tone: string
  iconTone: string
  icon: typeof Search
}

const phases: Phase[] = [
  {
    label: 'Phase 0',
    title: '緊急性を最初に除外する',
    description:
      '次の徴候が一つでもあれば、食事介助の工夫より救急対応を優先します。',
    action:
      '飲食物・内服薬を口から入れず、院内の緊急手順または119番へ。',
    items: [
      '呼吸できない・話せない、顔色が青い、窒息、吸気性喘鳴',
      '唾液も飲み込めず、よだれが流れる',
      '呼びかけに反応しない、異常に眠く起こせない',
      '突然の顔のゆがみ、片麻痺、ろれつ不良など脳卒中を疑う徴候',
      '急激で激しい腹痛、吐血、排ガス・排便の停止',
      '冷感、意識混乱、呼吸促迫を伴う重い脱水・ショックの疑い',
    ],
    tone: 'border-rose-300 bg-rose-50 dark:border-rose-900/60 dark:bg-rose-950/30',
    iconTone: 'bg-rose-700 text-white',
    icon: ShieldAlert,
  },
  {
    label: '分岐',
    title: '「急に」か「じわじわ」か',
    description:
      '発症速度を確認してから、各原因を並行して探します。',
    action:
      '数日以内の急な低下は急性疾患を優先。週〜月単位なら慢性原因も含めて評価。',
    items: [
      '急性：感染症、脱水、便秘・尿閉、薬剤変更、せん妄、脳卒中など',
      '慢性：口腔問題、悪液質、サルコペニア、うつ、認知症進行など',
      '慢性に見えても急な悪化が重なることがあるため、緊急徴候は毎回確認',
    ],
    tone: 'border-amber-300 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/30',
    iconTone: 'bg-amber-600 text-white',
    icon: Stethoscope,
  },
  {
    label: 'Phase 1',
    title: '治療できる病気・口の痛みを探す',
    description:
      '認知症や加齢のせいと決めつけず、本人が言葉にしにくい不快を行動から探します。',
    action:
      '見つかった原因を治療し、必要に応じて歯科・医科・嚥下専門職へ。',
    items: [
      '口・歯：義歯不適合、むし歯・残根、口内炎、カンジダ、強い口腔乾燥',
      '消化器：便塞栓、腸閉塞、逆流、吐き気、少量での満腹',
      '感染・代謝：尿路感染、誤嚥性肺炎、電解質異常、臓器不全',
      '痛み・体位：関節痛、褥瘡、座位保持の疲労、濡れたパッドの不快',
    ],
    tone: 'border-sky-300 bg-sky-50 dark:border-sky-900/60 dark:bg-sky-950/30',
    iconTone: 'bg-sky-700 text-white',
    icon: Search,
  },
  {
    label: 'Phase 2',
    title: '薬剤と処方変更を照合する',
    description:
      '食べなくなった日と、新規処方・増量・減量の日を同じ時間軸で確認します。',
    action:
      '自己判断で中止せず、処方医・薬剤師に目的、代替、減量の可否を相談。',
    items: [
      '抗コリン作用、鎮静、口腔乾燥、吐き気、便秘を起こす薬',
      '抗精神病薬、抗うつ薬、オピオイド、鉄剤、利尿薬、NSAIDsなど',
      'コリンエステラーゼ阻害薬など認知症治療薬の食欲・消化器症状',
      '薬を好物に無断で混ぜる、粉砕する、急に中止することは避ける',
    ],
    tone: 'border-violet-300 bg-violet-50 dark:border-violet-900/60 dark:bg-violet-950/30',
    iconTone: 'bg-violet-700 text-white',
    icon: Pill,
  },
  {
    label: 'Phase 3',
    title: '認知・気分・機能・病期から型を見立てる',
    description:
      '「食べない」という結果だけでなく、どの段階で止まっているかを観察します。',
    action:
      '食欲、認識、開始動作、注意、咀嚼・嚥下、不安・妄想、本人の意思に分けて記録。',
    items: [
      'うつ、アパシー、せん妄、不安、被害・毒の妄想',
      '食べ物と認識できない、食具を使えない、途中で注意がそれる',
      '口にためる、むせる、疲れる、吐き出す',
      'がん悪液質、重い臓器不全、進行認知症、終末期の生理的低下',
    ],
    tone: 'border-fuchsia-300 bg-fuchsia-50 dark:border-fuchsia-900/60 dark:bg-fuchsia-950/30',
    iconTone: 'bg-fuchsia-700 text-white',
    icon: ClipboardCheck,
  },
  {
    label: 'Phase 4',
    title: '本人に合わせた介入を一つずつ試す',
    description:
      '本人の受け入れを確認し、一度に複数を変えず、どの工夫が役立ったかを見えるようにします。',
    action:
      '強要せず、苦痛や強い拒否、むせ、疲労があれば中断して再評価。',
    items: [
      '介助：短い声かけ、見守り、必要最小限の手助け、介助者の変更',
      '提示：少量・一品ずつ、好み、温度、香り、食器との見分けやすさ',
      '姿勢・嚥下：覚醒、安定した座位、食形態は専門評価に基づき個別化',
      'Comfort feeding：量の達成より、苦痛を避け、好きな物を受け入れられる範囲で',
    ],
    tone: 'border-emerald-300 bg-emerald-50 dark:border-emerald-900/60 dark:bg-emerald-950/30',
    iconTone: 'bg-emerald-700 text-white',
    icon: Utensils,
  },
  {
    label: 'Phase 5',
    title: '記録して再評価する',
    description:
      '一食の完食率だけで結論を出さず、変化と負担を同時に追います。',
    action:
      '有効だった条件を短く申し送り、悪化や赤旗があれば前のPhaseへ戻る。',
    items: [
      '食事・水分量、食べ始めたきっかけ、拒否の言葉と非言語サイン',
      '体重、尿量・口渇など脱水徴候、むせ・湿った声・発熱',
      '痛み、疲労、覚醒、便通、処方変更との時間関係',
      '本人の希望、家族の理解、チームで決めたケア目標',
    ],
    tone: 'border-teal-300 bg-teal-50 dark:border-teal-900/60 dark:bg-teal-950/30',
    iconTone: 'bg-teal-700 text-white',
    icon: CheckCircle2,
  },
]

export function AppetiteLossAlgorithmPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <header className="flex items-start gap-2">
        <Link
          to="/diseases/appetite-loss/qa"
          className="mt-0.5 shrink-0 rounded-lg p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          aria-label="総合的具体的方法Q&Aへ戻る"
        >
          <ArrowLeft size={22} />
        </Link>
        <div>
          <p className="text-xs font-bold tracking-wide text-indigo-700 dark:text-indigo-300">
            Clinical Algorithm
          </p>
          <h2 className="mt-1 text-2xl font-bold leading-9 tracking-tight text-gray-950 dark:text-white">
            包括的食欲不振・食事拒否
            <br />
            鑑別＆介入アルゴリズム
          </h2>
        </div>
      </header>

      <section className="border-l-4 border-indigo-600 bg-indigo-50 px-4 py-4 dark:bg-indigo-950/30">
        <h3 className="font-bold text-indigo-950 dark:text-indigo-100">
          使い方
        </h3>
        <p className="mt-1 text-sm leading-6 text-indigo-950/90 dark:text-indigo-100/90">
          Phase 0から順に確認します。ただし、原因は一つとは限りません。急な変化を見逃さず、口・痛み・便秘・薬・気分・嚥下・環境を並行して確かめます。
        </p>
      </section>

      <div aria-label="食欲不振・食事拒否の臨床アルゴリズム">
        {phases.map((phase, index) => {
          const Icon = phase.icon

          return (
            <div key={`${phase.label}-${phase.title}`}>
              <section className={`rounded-2xl border-2 p-4 shadow-sm ${phase.tone}`}>
                <div className="flex items-start gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${phase.iconTone}`}>
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                      {phase.label}
                    </p>
                    <h3 className="mt-1 text-lg font-bold leading-7 text-gray-950 dark:text-white">
                      {phase.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-base leading-7 text-gray-700 dark:text-gray-200">
                  {phase.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-700 dark:text-gray-200">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 size={17} aria-hidden="true" className="mt-1 shrink-0 text-gray-600 dark:text-gray-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-black/10 pt-3 dark:border-white/10">
                  <p className="flex items-start gap-2 text-sm font-bold leading-6 text-gray-950 dark:text-white">
                    <HeartHandshake size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
                    <span>次の行動：{phase.action}</span>
                  </p>
                </div>
              </section>
              {index < phases.length - 1 && (
                <div className="flex h-12 items-center justify-center text-gray-400" aria-hidden="true">
                  <ArrowDown size={24} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <section className="border-l-4 border-amber-500 bg-amber-50 px-4 py-4 dark:bg-amber-950/30">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-300" />
          <div>
            <h3 className="font-bold text-amber-950 dark:text-amber-100">
              一律の手順にしない
            </h3>
            <p className="mt-1 text-sm leading-6 text-amber-950/90 dark:text-amber-100/90">
              とろみ、食形態、姿勢、水分・栄養量、薬剤、人工栄養は、病状と本人の希望に応じて個別に決めます。拒否があるときは、本人の言葉だけでなく顔を背ける、口を閉じる、押し返すなどの意思表示も尊重します。
            </p>
          </div>
        </div>
      </section>

      <Link
        to="/diseases/appetite-loss/qa"
        className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-indigo-700 px-5 py-4 text-center text-base font-bold text-white shadow-md transition-colors hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
      >
        <List size={21} aria-hidden="true" />
        全161問のQ&A一覧へ
      </Link>
    </div>
  )
}
