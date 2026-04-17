import { useState, useMemo } from 'react'
import {
  CheckCircle,
  XCircle,
  Trophy,
  ArrowRight,
  RotateCcw,
  Award,
  User,
} from 'lucide-react'
import { CORE10_ITEMS } from '../../data/core10-items'
import { CORE10_CASES } from '../../data/core10-cases'
import { AnimatedScore } from '../../components/ui/AnimatedScore'
import { ReferenceList } from '../../components/ui/ReferenceList'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'
import type { Core10ItemId, Core10Score } from '../../types/core10'

/**
 * バーチャル介助評価クイズ
 * - 学んだ CORE10 項目を「他者の介助場面」に当てはめて判定する
 * - 専門家評価と比較して判定眼を鍛える
 * - 自分のスキル自己申告ではなく、介助の構成要素を見抜く力を養う
 */

const scoreButton: Record<Core10Score, { normal: string; active: string; label: string }> = {
  0: {
    normal:
      'border-red-300 text-red-700 dark:border-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950',
    active:
      'bg-red-500 text-white border-red-500 shadow-md shadow-red-200 dark:shadow-red-900 scale-105',
    label: 'していない',
  },
  1: {
    normal:
      'border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950',
    active:
      'bg-yellow-500 text-white border-yellow-500 shadow-md shadow-yellow-200 dark:shadow-yellow-900 scale-105',
    label: '不十分',
  },
  2: {
    normal:
      'border-green-300 text-green-700 dark:border-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950',
    active:
      'bg-green-500 text-white border-green-500 shadow-md shadow-green-200 dark:shadow-green-900 scale-105',
    label: 'している',
  },
}

export function FassSelfCheckPage() {
  const [caseIndex, setCaseIndex] = useState(0)
  const [userScores, setUserScores] = useState<Partial<Record<Core10ItemId, Core10Score>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [allDone, setAllDone] = useState(false)

  const addXp = useProgressStore((s) => s.addXp)
  const markCompleted = useProgressStore((s) => s.markCompleted)

  const currentCase = CORE10_CASES[caseIndex]

  const allScored = CORE10_ITEMS.every((item) => userScores[item.id] !== undefined)

  const correctCount = useMemo(() => {
    if (!submitted) return 0
    return CORE10_ITEMS.filter(
      (item) => userScores[item.id] === currentCase.findings[item.id].expertScore,
    ).length
  }, [submitted, userScores, currentCase])

  const userTotalScore = CORE10_ITEMS.reduce(
    (sum, item) => sum + (userScores[item.id] ?? 0),
    0,
  )
  const expertTotalScore = CORE10_ITEMS.reduce(
    (sum, item) => sum + currentCase.findings[item.id].expertScore,
    0,
  )

  const handleScore = (id: Core10ItemId, score: Core10Score) => {
    if (submitted) return
    setUserScores((prev) => ({ ...prev, [id]: score }))
  }

  const handleSubmit = () => {
    if (!allScored) return
    setSubmitted(true)
    const correct = CORE10_ITEMS.filter(
      (item) => userScores[item.id] === currentCase.findings[item.id].expertScore,
    ).length
    addXp(correct * 5)
    if (correct === CORE10_ITEMS.length) {
      addXp(XP_ACTIONS.quizPerfect)
    }
  }

  const handleNextCase = () => {
    if (caseIndex + 1 >= CORE10_CASES.length) {
      setAllDone(true)
      markCompleted('fass-self-check')
      addXp(XP_ACTIONS.completeCategory)
    } else {
      setCaseIndex((i) => i + 1)
      setUserScores({})
      setSubmitted(false)
    }
  }

  const handleRestart = () => {
    setCaseIndex(0)
    setUserScores({})
    setSubmitted(false)
    setAllDone(false)
  }

  if (allDone) {
    return (
      <div className="mx-auto max-w-lg space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 p-8 text-center text-white shadow-lg">
          <Trophy size={48} className="mx-auto mb-3" />
          <h2 className="text-2xl font-bold">全症例クリア！</h2>
          <p className="mt-2 text-sm text-teal-50">
            介助場面を分析する「目」が鍛えられました
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-teal-500 bg-white py-3 font-bold text-teal-600 transition-all hover:bg-teal-50 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          <RotateCcw size={18} />
          もう一度挑戦
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-bold text-teal-700 dark:bg-teal-900 dark:text-teal-300">
            症例 {caseIndex + 1} / {CORE10_CASES.length}
          </span>
          {submitted && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-900 dark:text-amber-300">
              正答 {correctCount} / {CORE10_ITEMS.length}
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          バーチャル介助評価
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          他者の介助場面を観察し、CORE10 で判定してみましょう
        </p>
      </div>

      {/* Case info */}
      <div className="overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 dark:border-teal-800 dark:from-teal-950 dark:to-emerald-950">
        <div className="p-4">
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            {currentCase.title}
          </div>
          <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
            {currentCase.scenarioSetup}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-lg bg-white/70 p-3 dark:bg-gray-900/40">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <User size={10} /> 介助者
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {currentCase.careStaffProfile}
              </p>
            </div>
            <div className="rounded-lg bg-white/70 p-3 dark:bg-gray-900/40">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <User size={10} /> 患者
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {currentCase.patientContext}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Each CORE10 item with observation */}
      <div className="space-y-3">
        {CORE10_ITEMS.map((item) => {
          const finding = currentCase.findings[item.id]
          const userScore = userScores[item.id]
          const expertScore = finding.expertScore
          const isCorrect = submitted && userScore === expertScore

          return (
            <div
              key={item.id}
              className={`rounded-xl border bg-white p-4 transition-all dark:bg-gray-900 ${
                submitted
                  ? isCorrect
                    ? 'border-green-300 dark:border-green-700'
                    : 'border-red-300 dark:border-red-700'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Item header */}
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold dark:bg-gray-700">
                  {item.id}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {item.title}
                </span>
                {submitted && (
                  <span className="ml-auto">
                    {isCorrect ? (
                      <CheckCircle size={18} className="text-green-500" />
                    ) : (
                      <XCircle size={18} className="text-red-500" />
                    )}
                  </span>
                )}
              </div>

              {/* Observation */}
              <div className="mb-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  介助場面で観察された行動
                </div>
                <p className="text-xs text-gray-800 dark:text-gray-200">
                  {finding.observation}
                </p>
              </div>

              {/* Score buttons */}
              <div className="flex gap-2">
                {([0, 1, 2] as const).map((score) => {
                  const style = scoreButton[score]
                  const isActive = userScore === score
                  const isExpert = submitted && expertScore === score
                  const isWrongPick = submitted && isActive && score !== expertScore

                  let cls = isActive ? style.active : style.normal
                  if (submitted) {
                    if (isExpert) {
                      cls = `${style.active} ring-2 ring-offset-2 ring-teal-400`
                    } else if (isWrongPick) {
                      cls = 'bg-red-100 text-red-700 border-red-400 dark:bg-red-950 dark:text-red-300'
                    } else {
                      cls = 'bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700'
                    }
                  }

                  return (
                    <button
                      key={score}
                      onClick={() => handleScore(item.id, score)}
                      disabled={submitted}
                      className={`flex-1 rounded-lg border-2 py-2 text-center text-xs font-bold transition-all duration-200 ${cls} ${submitted ? 'cursor-default' : 'active:scale-95'}`}
                    >
                      <div>{score}</div>
                      <div className="mt-0.5 text-[10px] font-normal">
                        {style.label}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Feedback after submission */}
              {submitted && (
                <div className="mt-3 space-y-2">
                  <div className="rounded-lg border border-teal-200 bg-teal-50 p-3 dark:border-teal-800 dark:bg-teal-950">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                      <Award size={12} /> 専門家の判断（正解 = {expertScore}）
                    </div>
                    <p className="text-xs text-gray-800 dark:text-gray-200">
                      {finding.expertRationale}
                    </p>
                  </div>
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      改善/活かすポイント
                    </div>
                    <p className="text-xs text-gray-800 dark:text-gray-200">
                      {finding.tip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allScored}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white transition-all ${
            allScored
              ? 'bg-teal-600 hover:bg-teal-700 active:scale-[0.98]'
              : 'bg-gray-300 dark:bg-gray-700'
          }`}
        >
          採点する
          <ArrowRight size={18} />
        </button>
      )}

      {submitted && (
        <>
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-3 text-center text-sm font-bold text-gray-700 dark:text-gray-300">
              合計スコアの比較
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  あなた
                </div>
                <AnimatedScore score={userTotalScore} maxScore={20} label="" />
              </div>
              <div className="text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  専門家
                </div>
                <AnimatedScore score={expertTotalScore} maxScore={20} label="" />
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-teal-50 p-3 text-xs text-gray-800 dark:bg-teal-950 dark:text-gray-200">
              <span className="font-bold">全体評価：</span>
              {currentCase.overallAssessment}
            </div>
          </div>

          <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950">
            <h3 className="mb-2 text-sm font-bold text-purple-800 dark:text-purple-200">
              この症例からの学び
            </h3>
            <ul className="space-y-1.5">
              {currentCase.keyLearnings.map((l, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-purple-900 dark:text-purple-100"
                >
                  <span className="mt-0.5 text-purple-500">&#10003;</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <ReferenceList references={currentCase.references} />

          <button
            onClick={handleNextCase}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3.5 font-bold text-white transition-all hover:bg-teal-700 active:scale-[0.98]"
          >
            {caseIndex + 1 >= CORE10_CASES.length ? '結果を見る' : '次の症例へ'}
            <ArrowRight size={18} />
          </button>
        </>
      )}
    </div>
  )
}
