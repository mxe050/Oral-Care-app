import { useMemo, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Info,
  Check,
  Star,
} from 'lucide-react'
import {
  MEAL_CARE_BASIC,
  MEAL_CARE_ADVANCED,
  type MealCareQuizItem,
} from '../../data/meal-care-quiz'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'

type Tab = 'basic' | 'advanced'

const TAB_STYLE: Record<
  Tab,
  {
    m: string
    mh: string
    tm: string
    bl: string
    bd: string
    heading: string
    hoverOpt: string
  }
> = {
  basic: {
    m: 'bg-emerald-700',
    mh: 'hover:bg-emerald-800',
    tm: 'text-emerald-800 dark:text-emerald-300',
    bl: 'border-emerald-100 dark:border-emerald-900',
    bd: 'bg-emerald-900',
    heading: '基本編',
    hoverOpt:
      'hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950',
  },
  advanced: {
    m: 'bg-rose-700',
    mh: 'hover:bg-rose-800',
    tm: 'text-rose-900 dark:text-rose-300',
    bl: 'border-rose-200 dark:border-rose-900',
    bd: 'bg-rose-900',
    heading: 'ベテラン編（超難問）',
    hoverOpt: 'hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950',
  },
}

interface Answer {
  qid: number
  ok: boolean
  sel: number
}

export function FassNgQuizPage() {
  const [tab, setTab] = useState<Tab>('basic')
  const [qi, setQi] = useState(0)
  const [sel, setSel] = useState<number | null>(null)
  const [showFb, setShowFb] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [ans, setAns] = useState<Answer[]>([])

  const addXp = useProgressStore((s) => s.addXp)
  const markCompleted = useProgressStore((s) => s.markCompleted)

  const qs: MealCareQuizItem[] =
    tab === 'basic' ? MEAL_CARE_BASIC : MEAL_CARE_ADVANCED
  const q = qs[qi]
  const pct = ((qi + 1) / qs.length) * 100
  const style = TAB_STYLE[tab]

  const reset = () => {
    setQi(0)
    setSel(null)
    setShowFb(false)
    setScore(0)
    setDone(false)
    setAns([])
  }

  const switchTab = (t: Tab) => {
    if (t === tab) return
    setTab(t)
    reset()
  }

  const pick = (i: number) => {
    if (showFb) return
    setSel(i)
    setShowFb(true)
    const ok = i === q.answer
    if (ok) {
      setScore((s) => s + 1)
      addXp(XP_ACTIONS.quizCorrect)
    }
    setAns((a) => [...a, { qid: q.id, ok, sel: i }])
  }

  const next = () => {
    if (qi < qs.length - 1) {
      setQi((i) => i + 1)
      setSel(null)
      setShowFb(false)
    } else {
      setDone(true)
      markCompleted(`fass-ng-${tab}`)
    }
  }

  const prev = () => {
    if (qi > 0) {
      setQi((i) => i - 1)
      setSel(null)
      setShowFb(false)
    }
  }

  const retry = () => {
    setShowFb(false)
    setSel(null)
    const last = ans.find((a) => a.qid === q.id)
    if (last && last.ok) setScore((s) => s - 1)
    setAns((a) => a.filter((x) => x.qid !== q.id))
  }

  const finishMsg = useMemo(() => {
    if (score === qs.length)
      return `パーフェクト！素晴らしい理解度です。あなたは${qs.length}の食事介助ポイントすべてをしっかり理解できています。ぜひこの知識を現場で活かし、他のスタッフにも広めてください！`
    if (score >= 10)
      return 'よくできています！多くのポイントを理解できています。間違えた部分を復習し、コア10の技術と＋αの工夫を完璧にして、患者さんの「美味しい」を引き出しましょう。'
    return '今回は少し難しかったかもしれませんね。まずは「コア10（CORE10/FASS）」の基礎技術からしっかりと復習し、一つずつ確実な介助技術を身につけていきましょう。'
  }, [score, qs.length])

  // ===== 結果画面 =====
  if (done) {
    return (
      <div className="mx-auto max-w-lg space-y-5">
        <div className={`overflow-hidden rounded-2xl shadow-lg ${style.m}`}>
          <div className="p-6 text-center text-white">
            <h2 className="text-xl font-bold">学習完了！（{style.heading}）</h2>
            <p className="mt-1 text-sm opacity-90">
              食事介助の{qs.length}のNG行動を振り返りましょう
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-gray-900">
          <div
            className={`inline-flex h-28 w-28 items-center justify-center rounded-full border-4 bg-gray-50 dark:bg-gray-800 ${
              score === qs.length ? 'border-green-500' : 'border-orange-500'
            }`}
          >
            <span
              className={`text-3xl font-bold ${
                score === qs.length ? 'text-green-600' : 'text-orange-600'
              }`}
            >
              {score}/{qs.length}
            </span>
          </div>
          <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-bold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            {finishMsg}
          </p>
        </div>

        {/* Review */}
        <div className="space-y-3">
          <h3 className="border-b border-gray-200 pb-2 text-base font-bold text-gray-900 dark:border-gray-700 dark:text-gray-100">
            振り返り
          </h3>
          {qs.map((qq) => {
            const a = ans.find((x) => x.qid === qq.id)
            const ok = a ? a.ok : false
            return (
              <div
                key={qq.id}
                className={`rounded-lg border-l-4 p-4 ${
                  ok
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : 'border-red-500 bg-red-50 dark:bg-red-950'
                }`}
              >
                <div className="flex items-start gap-3">
                  {ok ? (
                    <CheckCircle2
                      className="mt-1 shrink-0 text-green-500"
                      size={20}
                    />
                  ) : (
                    <XCircle className="mt-1 shrink-0 text-red-500" size={20} />
                  )}
                  <div className="w-full">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      Point {qq.id}: {qq.title}
                    </h4>
                    {!ok && (
                      <div className="mt-2 space-y-2 rounded border bg-white p-3 text-xs shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <p>
                          <span className="font-semibold text-red-600 dark:text-red-400">
                            NGな状況:{' '}
                          </span>
                          {qq.ngSituation}
                        </p>
                        <p className="whitespace-pre-wrap">
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            解説:{' '}
                          </span>
                          {qq.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className={`flex-1 ${style.m} ${style.mh} flex items-center justify-center gap-2 rounded-xl py-3 font-bold text-white transition-colors`}
          >
            <RotateCcw size={18} />
            もう一度
          </button>
        </div>
      </div>
    )
  }

  // ===== クイズ画面 =====
  if (!q) return null
  return (
    <div className="mx-auto max-w-lg space-y-5">
      {/* Tabs */}
      <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
        {(['basic', 'advanced'] as const).map((t) => {
          const active = t === tab
          const activeClass =
            t === 'basic'
              ? 'bg-white text-emerald-700 dark:bg-gray-900 dark:text-emerald-300'
              : 'bg-white text-rose-700 dark:bg-gray-900 dark:text-rose-300'
          return (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex flex-1 items-center justify-center gap-1.5 border-t-4 py-3 text-sm font-bold transition-colors ${
                active
                  ? `${activeClass} ${t === 'basic' ? 'border-t-emerald-600' : 'border-t-rose-600'}`
                  : 'border-t-transparent text-gray-500 dark:text-gray-400'
              }`}
            >
              {active &&
                (t === 'basic' ? <Check size={16} /> : <AlertCircle size={16} />)}
              {t === 'basic' ? '基本編' : 'ベテラン編(超難問)'}
            </button>
          )
        })}
      </div>

      {/* Header */}
      <div className={`rounded-xl ${style.m} p-4 text-white`}>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {qi > 0 && (
              <button
                onClick={prev}
                className="rounded-full bg-white/20 p-1 transition-colors hover:bg-white/30"
                title="前の問題へ"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <h1 className="text-base font-bold">食事介助 NG行動チェック</h1>
          </div>
          <span
            className={`${style.bd} rounded-full px-2.5 py-0.5 text-xs font-medium`}
          >
            Point {q.id}/{qs.length}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-black/20">
          <div
            className="h-full rounded-full bg-white transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-4 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <h2
          className={`border-b-2 pb-2 text-lg font-bold ${style.tm} ${style.bl}`}
        >
          {q.title}
        </h2>

        {/* CORE10 related tags */}
        {q.core10 && q.core10.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {q.core10.map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200"
              >
                <Star size={10} />
                CORE10: {c}
              </span>
            ))}
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200">
            <AlertCircle
              size={20}
              className={tab === 'advanced' ? 'text-rose-600' : 'text-emerald-600'}
            />
            <span>こんな状況、どこがNG？</span>
          </div>
          <p className="text-base font-medium leading-relaxed text-gray-800 dark:text-gray-100">
            {q.ngSituation}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {q.options.map((o, i) => {
            let bs = `bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 ${style.hoverOpt} text-gray-700 dark:text-gray-200`
            if (showFb) {
              if (i === q.answer)
                bs =
                  'bg-green-100 dark:bg-green-900 border-2 border-green-500 text-green-800 dark:text-green-100 font-bold shadow-sm'
              else if (i === sel)
                bs =
                  'bg-red-100 dark:bg-red-900 border-2 border-red-500 text-red-800 dark:text-red-100'
              else
                bs =
                  'bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 opacity-60'
            }
            return (
              <button
                key={i}
                disabled={showFb}
                onClick={() => pick(i)}
                className={`flex w-full items-start gap-3 rounded-xl p-3.5 text-left transition-all ${bs}`}
              >
                <span className="mt-0.5 shrink-0">
                  {showFb && i === q.answer && (
                    <CheckCircle2 className="text-green-600" size={18} />
                  )}
                  {showFb && i === sel && i !== q.answer && (
                    <XCircle className="text-red-600" size={18} />
                  )}
                  {!showFb && (
                    <span className="block h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                  )}
                </span>
                <span className="text-sm leading-snug">{o}</span>
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {showFb && (
          <div
            className={`rounded-xl p-4 ${
              sel === q.answer
                ? 'border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                : 'border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950'
            }`}
          >
            <div className="mb-2 flex items-center gap-2 border-b border-gray-200/50 pb-2 dark:border-gray-700">
              {sel === q.answer ? (
                <>
                  <CheckCircle2 className="text-green-600" />
                  <span className="text-base font-bold text-green-800 dark:text-green-300">
                    正解！
                  </span>
                </>
              ) : (
                <>
                  <Info className="text-orange-600" />
                  <span className="text-base font-bold text-orange-800 dark:text-orange-300">
                    解説
                  </span>
                </>
              )}
            </div>
            <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed text-gray-800 dark:text-gray-100">
              {q.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      {showFb && (
        <div className="flex flex-col gap-2 rounded-xl border-t border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800 sm:flex-row">
          {qi > 0 && (
            <button
              onClick={prev}
              className="flex items-center justify-center gap-1 rounded-xl bg-gray-200 py-2.5 px-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <ArrowLeft size={16} />
              前へ
            </button>
          )}
          <button
            onClick={retry}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <RotateCcw size={16} />
            問題に戻る
          </button>
          <button
            onClick={next}
            className={`flex-1 ${style.m} ${style.mh} flex items-center justify-center gap-2 rounded-xl py-2.5 text-base font-bold text-white shadow-md transition-colors`}
          >
            {qi < qs.length - 1 ? '次のポイントへ' : '結果を見る'}
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
