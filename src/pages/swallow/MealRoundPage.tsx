import { useState } from 'react'
import { Eye, Compass, CheckSquare, Play, ChevronRight, ArrowRight } from 'lucide-react'
import { MEAL_ROUND_SCENARIOS } from '../../data/swallowing-knowledge'
import { ReferenceList } from '../../components/ui/ReferenceList'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'

const oodaConfig = {
  observe: { icon: Eye, label: '観察 (Observe)', color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300' },
  orient: { icon: Compass, label: '状況判断 (Orient)', color: 'from-purple-400 to-purple-600', bg: 'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800', text: 'text-purple-700 dark:text-purple-300' },
  decide: { icon: CheckSquare, label: '意思決定 (Decide)', color: 'from-amber-400 to-amber-600', bg: 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300' },
  act: { icon: Play, label: '実行 (Act)', color: 'from-green-400 to-green-600', bg: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800', text: 'text-green-700 dark:text-green-300' },
}

export function MealRoundPage() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [revealedSteps, setRevealedSteps] = useState<number>(0)
  const [showResult, setShowResult] = useState(false)

  const markCompleted = useProgressStore((s) => s.markCompleted)
  const addXp = useProgressStore((s) => s.addXp)

  const scenario = MEAL_ROUND_SCENARIOS[scenarioIndex]
  const isFinished = scenarioIndex >= MEAL_ROUND_SCENARIOS.length

  if (isFinished) {
    markCompleted('swallow-meal-round')
    return (
      <div className="mx-auto max-w-lg space-y-6 text-center">
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900">
          <div className="mb-3 text-5xl">{'\uD83C\uDF1F'}</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            全シナリオ完了!
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            OODAループによる食事観察の考え方が身につきました。
          </p>
        </div>
        <button
          onClick={() => {
            setScenarioIndex(0)
            setRevealedSteps(0)
            setShowResult(false)
          }}
          className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white transition-all hover:bg-purple-700"
        >
          もう一度
        </button>
      </div>
    )
  }

  if (!scenario) return null

  const handleRevealNext = () => {
    if (revealedSteps < scenario.ooda.length) {
      setRevealedSteps((s) => s + 1)
      addXp(5) // small XP for each step
    }
    if (revealedSteps >= scenario.ooda.length - 1) {
      setShowResult(true)
    }
  }

  const handleNextScenario = () => {
    setScenarioIndex((i) => i + 1)
    setRevealedSteps(0)
    setShowResult(false)
    addXp(XP_ACTIONS.viewLesson)
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          食事ラウンド
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          OODAループで食事観察を実践しよう
        </p>
        <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          シナリオ {scenarioIndex + 1} / {MEAL_ROUND_SCENARIOS.length}
        </div>
      </div>

      {/* OODA Cycle Visual */}
      <div className="flex items-center justify-center gap-2 py-2">
        {(['observe', 'orient', 'decide', 'act'] as const).map((step, i) => {
          const config = oodaConfig[step]
          const isRevealed = i < revealedSteps
          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 ${
                  isRevealed
                    ? `bg-gradient-to-br ${config.color} text-white shadow-md scale-110`
                    : 'bg-gray-200 text-gray-400 dark:bg-gray-700'
                }`}
              >
                <config.icon size={18} />
              </div>
              {i < 3 && (
                <ArrowRight
                  size={14}
                  className={`${isRevealed ? 'text-gray-500' : 'text-gray-300 dark:text-gray-600'}`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Patient case */}
      <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          患者プロファイル
        </div>
        <p className="text-sm text-gray-900 dark:text-gray-100">
          {scenario.patientProfile}
        </p>
        <div className="mt-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
          <div className="mb-1 text-xs font-bold text-gray-600 dark:text-gray-400">
            OHAT所見
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300">
            {scenario.ohatFindings}
          </p>
        </div>
      </div>

      {/* OODA Steps */}
      <div className="space-y-3">
        {scenario.ooda.map((step, i) => {
          const config = oodaConfig[step.step]
          const isRevealed = i < revealedSteps

          return (
            <div
              key={step.step}
              className={`overflow-hidden rounded-xl border transition-all duration-500 ${
                isRevealed
                  ? `${config.bg} opacity-100 translate-y-0`
                  : 'border-gray-200 bg-gray-50 opacity-40 dark:border-gray-700 dark:bg-gray-800'
              }`}
            >
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <config.icon size={16} className={isRevealed ? config.text : 'text-gray-400'} />
                  <span className={`text-sm font-bold ${isRevealed ? config.text : 'text-gray-400'}`}>
                    {config.label}
                  </span>
                </div>
                {isRevealed ? (
                  <div>
                    <p className="mb-2 text-xs text-gray-700 dark:text-gray-300">
                      {step.description}
                    </p>
                    <ul className="space-y-1">
                      {step.examples.map((ex, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <span className="mt-0.5">&#x2022;</span>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">
                    ステップを進めると表示されます
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Reveal / Next button */}
      {!showResult ? (
        <button
          onClick={handleRevealNext}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 font-bold text-white transition-all hover:bg-purple-700 active:scale-[0.98]"
        >
          次のステップへ <ChevronRight size={16} />
        </button>
      ) : (
        <div className="space-y-4">
          {/* Correct actions */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
            <h4 className="mb-2 text-sm font-bold text-green-700 dark:text-green-300">
              正しいアクション
            </h4>
            <ul className="space-y-1">
              {scenario.correctActions.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-green-700 dark:text-green-300">
                  <span className="mt-0.5 text-green-500">&#10003;</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <ReferenceList references={scenario.references} />

          <button
            onClick={handleNextScenario}
            className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white transition-all hover:bg-purple-700"
          >
            次のシナリオへ
          </button>
        </div>
      )}
    </div>
  )
}
