import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CheckCircle2,
  AlertCircle,
  Info,
  PlayCircle,
  RefreshCcw,
  ChevronRight,
} from 'lucide-react'
import {
  MEAL_CARE_EVAL_ITEMS,
  MEAL_CARE_VIDEOS,
  type MealCareScore,
  type MealCareVideo,
} from '../../data/meal-care-videos'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'

type Mode = 'intro' | 'evaluate' | 'explain'

const SCORE_OPTIONS: {
  value: MealCareScore
  label: string
  colorOn: string
  colorOff: string
}[] = [
  {
    value: 2,
    label: 'できている',
    colorOn:
      'bg-blue-100 text-blue-800 border-blue-500 ring-blue-500 dark:bg-blue-900 dark:text-blue-100',
    colorOff: 'hover:bg-blue-50 dark:hover:bg-blue-950',
  },
  {
    value: 1,
    label: '不十分',
    colorOn:
      'bg-amber-100 text-amber-800 border-amber-500 ring-amber-500 dark:bg-amber-900 dark:text-amber-100',
    colorOff: 'hover:bg-amber-50 dark:hover:bg-amber-950',
  },
  {
    value: 0,
    label: 'できていない',
    colorOn:
      'bg-rose-100 text-rose-800 border-rose-500 ring-rose-500 dark:bg-rose-900 dark:text-rose-100',
    colorOff: 'hover:bg-rose-50 dark:hover:bg-rose-950',
  },
  {
    value: -1,
    label: '評価できない',
    colorOn:
      'bg-slate-200 text-slate-800 border-slate-500 ring-slate-500 dark:bg-slate-700 dark:text-slate-100',
    colorOff: 'hover:bg-slate-50 dark:hover:bg-slate-800',
  },
]

function scoreLabel(s: MealCareScore) {
  switch (s) {
    case 2:
      return 'できている'
    case 1:
      return '不十分'
    case 0:
      return 'できていない'
    case -1:
      return '評価できない'
    default:
      return '—'
  }
}

function scoreBadge(s: MealCareScore) {
  switch (s) {
    case 2:
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
    case 1:
      return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
    case 0:
      return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  }
}

export function FassVideoTrainingPage() {
  const [selectedVideo, setSelectedVideo] = useState<MealCareVideo>(
    MEAL_CARE_VIDEOS[0],
  )
  const [scores, setScores] = useState<Record<number, MealCareScore>>({})
  const [mode, setMode] = useState<Mode>('intro')
  const videoRef = useRef<HTMLVideoElement>(null)
  const addXp = useProgressStore((s) => s.addXp)
  const markCompleted = useProgressStore((s) => s.markCompleted)

  // 動画切替時にスコアリセット
  useEffect(() => {
    setScores({})
    setMode((prev) => (prev === 'intro' ? 'intro' : 'evaluate'))
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {
        /* autoplay blocked - ignore */
      })
    }
  }, [selectedVideo])

  const handleScoreChange = (itemId: number, score: MealCareScore) => {
    setScores((prev) => ({ ...prev, [itemId]: score }))
  }

  const isAllAnswered = useMemo(
    () =>
      MEAL_CARE_EVAL_ITEMS.every(
        (item) => scores[item.id] !== undefined && scores[item.id] !== null,
      ),
    [scores],
  )

  const handleFinish = () => {
    setMode('explain')
    addXp(XP_ACTIONS.quizCorrect * 2)
    markCompleted(`fass-video-${selectedVideo.id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setScores({})
    setMode('evaluate')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const videoSrc = `${import.meta.env.BASE_URL}${selectedVideo.src}`

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
            動画で学ぶ
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          食事介助動画 × Core 10 評価トレーニング
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          実際の介助場面の動画を観察し、Core 10 の10項目であなたが判定してみましょう
        </p>
      </div>

      {/* Sticky Video Player (evaluate/explain modes) */}
      {mode !== 'intro' && (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-lg">
          <video
            ref={videoRef}
            src={videoSrc}
            className="aspect-video w-full bg-black object-contain"
            loop
            autoPlay
            muted
            playsInline
            controls
          >
            お使いのブラウザは動画タグをサポートしていません。
          </video>
          {/* Video selector */}
          <div className="flex gap-2 overflow-x-auto bg-slate-900 p-3">
            {MEAL_CARE_VIDEOS.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVideo(v)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedVideo.id === v.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Intro mode */}
      {mode === 'intro' && (
        <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-lg md:p-8">
          <h3 className="mb-6 text-xl font-bold leading-snug tracking-tight text-emerald-400 md:text-2xl">
            すべての食事支援に関わるプロフェッショナルへ
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-slate-200 md:text-base">
            本モジュールは、食事介助の基本評価指標である「Core
            10」を実践的に学ぶための学習ツールです。ここでは「これが完璧な正解である」という唯一解は示しません。
          </p>
          <p className="mb-6 text-sm font-medium leading-relaxed text-slate-200 md:text-base">
            なぜなら、患者さん一人ひとりの状態や環境によって、最適な食事支援の形は常に変化するからです。ここにある動画からの気づきを出発点とし、Core
            10の基準を満たすだけでなく、その先にある
            <span className="font-bold text-emerald-300">
              「目の前の方に寄り添った、さらに工夫を凝らした食事支援」
            </span>
            を探求・実践してください。
          </p>

          <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/80 p-5">
            <h4 className="mb-3 flex items-center gap-2 font-bold text-emerald-300">
              <Info className="h-5 w-5" /> 参考動画リンク（外部・任意）
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.youtube.com/watch?v=X7P_rAsfgT8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 transition-colors hover:text-blue-300"
                >
                  <PlayCircle className="h-5 w-5" /> （1）Core 10 とは
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=avR3CxZt_D8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 transition-colors hover:text-blue-300"
                >
                  <PlayCircle className="h-5 w-5" /> （2）Core 10 解説
                </a>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              setMode('evaluate')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-emerald-500 active:scale-[0.98]"
          >
            動画の評価に進む <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Evaluate mode */}
      {mode === 'evaluate' && (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-100">
              <PlayCircle className="h-6 w-6 text-emerald-600" />
              評価モード
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              上のループ動画を観察し、以下の「Core 10」の10項目について評価してください。
              すべての項目を評価すると、解説モードに進むことができます。
            </p>
          </div>

          <div className="space-y-4">
            {MEAL_CARE_EVAL_ITEMS.map((item, index) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                <p className="mb-4 text-base font-medium leading-relaxed text-slate-800 dark:text-slate-100 md:text-lg">
                  <span className="mr-2 text-xl font-black text-emerald-600">
                    Q{index + 1}.
                  </span>
                  {item.text}
                </p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                  {SCORE_OPTIONS.map((opt) => {
                    const selected = scores[item.id] === opt.value
                    return (
                      <button
                        key={String(opt.value)}
                        onClick={() =>
                          handleScoreChange(item.id, opt.value)
                        }
                        className={`rounded-xl border-2 px-2 py-3 text-sm font-bold transition-all md:text-base ${
                          selected
                            ? `${opt.colorOn} ring-2 ring-offset-2`
                            : `border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 ${opt.colorOff}`
                        }`}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 pb-8">
            <button
              onClick={handleFinish}
              disabled={!isAllAnswered}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold shadow-lg transition-all ${
                isAllAnswered
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98]'
                  : 'cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500'
              }`}
            >
              {isAllAnswered
                ? '評価を終了して解説を見る'
                : 'すべての項目を評価してください'}
              {isAllAnswered && <ChevronRight className="h-6 w-6" />}
            </button>
          </div>
        </>
      )}

      {/* Explain mode */}
      {mode === 'explain' && (
        <>
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-800 dark:bg-emerald-950">
            <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0 text-emerald-600" />
            <div>
              <h3 className="mb-1 text-lg font-bold text-emerald-800 dark:text-emerald-300">
                評価完了・解説モード
              </h3>
              <p className="text-sm leading-relaxed text-emerald-700 dark:text-emerald-200">
                お疲れ様でした。各項目の解説と、食事介助で注意したい「15のポイント」との関連を確認しましょう。
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm dark:border-rose-800 dark:bg-rose-950 md:p-6">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-rose-800 dark:text-rose-300 md:text-xl">
              <AlertCircle className="h-6 w-6" />
              この動画（{selectedVideo.title}）の具体的な問題点
            </h3>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-rose-900 dark:text-rose-100 md:text-base">
              {selectedVideo.explanation}
            </p>
          </div>

          <div className="space-y-4">
            {MEAL_CARE_EVAL_ITEMS.map((item, index) => {
              const score = scores[item.id] as MealCareScore
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-6"
                >
                  <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <h4 className="flex-1 text-base font-bold leading-relaxed text-slate-800 dark:text-slate-100 md:text-lg">
                      <span className="mr-2 text-xl font-black text-emerald-600">
                        Q{index + 1}.
                      </span>
                      {item.text}
                    </h4>
                    <div
                      className={`shrink-0 self-start rounded-full border px-4 py-1.5 text-sm font-bold ${scoreBadge(score)}`}
                    >
                      あなたの評価: {scoreLabel(score)}
                    </div>
                  </div>

                  {selectedVideo.itemExplanations?.[item.id] && (
                    <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm leading-relaxed text-rose-900 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-100 md:p-5 md:text-base">
                      <p className="mb-2 flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300">
                        <AlertCircle className="h-5 w-5 text-rose-600" /> この動画での具体的な問題点
                      </p>
                      <p>{selectedVideo.itemExplanations[item.id]}</p>
                    </div>
                  )}

                  <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 md:p-5 md:text-base">
                    <p className="mb-2 flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
                      <Info className="h-5 w-5 text-emerald-600" /> Core 10 解説
                    </p>
                    {score === -1 && (
                      <p className="mb-3 rounded-lg bg-slate-200 p-3 font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        ※ この動画では見えない・確認できませんが、本来は以下の状態が望ましいです。
                      </p>
                    )}
                    <p>{item.explanation}</p>
                  </div>

                  {item.related15Points.length > 0 && (
                    <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm text-orange-900 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-100 md:p-5 md:text-base">
                      <p className="mb-2 flex items-center gap-2 font-bold">
                        <AlertCircle className="h-5 w-5 text-orange-600" /> 15のポイント関連
                      </p>
                      <ul className="ml-1 list-inside list-disc space-y-1">
                        {item.related15Points.map((pt, i) => (
                          <li key={i} className="font-medium">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="pt-4 pb-8">
            <button
              onClick={handleReset}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-800 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-slate-700 active:scale-[0.98]"
            >
              <RefreshCcw className="h-5 w-5" />
              もう一度評価する
            </button>
          </div>
        </>
      )}
    </div>
  )
}
