import { useState } from 'react'
import { Search, CheckCircle, XCircle } from 'lucide-react'
import { MISTAKE_SCENARIOS } from '../../data/fass-mistakes'
import { AnimatedScore } from '../../components/ui/AnimatedScore'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'

const categoryLabels: Record<string, string> = {
  posture: '姿勢',
  technique: '手技',
  timing: 'タイミング',
  environment: '環境',
}

const categoryEmoji: Record<string, string> = {
  posture: '\uD83E\uDDD1\u200D\uD83E\uDDBD',
  technique: '\u270B',
  timing: '\u23F0',
  environment: '\uD83C\uDFE5',
}

const categoryColors: Record<string, string> = {
  posture: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  technique: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  timing: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  environment: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
}

export function FassMistakeQuizPage() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [selectedMistakes, setSelectedMistakes] = useState<Set<string>>(new Set())
  const [showResult, setShowResult] = useState(false)
  const [totalFound, setTotalFound] = useState(0)
  const [totalPossible, setTotalPossible] = useState(0)

  const addXp = useProgressStore((s) => s.addXp)
  const markCompleted = useProgressStore((s) => s.markCompleted)

  const scenario = MISTAKE_SCENARIOS[scenarioIndex]
  const isFinished = scenarioIndex >= MISTAKE_SCENARIOS.length

  if (isFinished) {
    markCompleted('fass-mistake-quiz')

    return (
      <div className="mx-auto max-w-lg space-y-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
            全シナリオ完了!
          </h2>
          <AnimatedScore
            score={totalFound}
            maxScore={totalPossible}
            label="問題点発見数"
          />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            食事介助場面の問題点を見つける力が養われています。
          </p>
        </div>
        <button
          onClick={() => {
            setScenarioIndex(0)
            setSelectedMistakes(new Set())
            setShowResult(false)
            setTotalFound(0)
            setTotalPossible(0)
          }}
          className="w-full rounded-xl bg-teal-600 py-3 font-bold text-white transition-all hover:bg-teal-700"
        >
          もう一度
        </button>
      </div>
    )
  }

  if (!scenario) return null

  const toggleMistake = (id: string) => {
    if (showResult) return
    setSelectedMistakes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSubmit = () => {
    setShowResult(true)
    const found = scenario.mistakes.filter((m) => selectedMistakes.has(m.id)).length
    setTotalFound((t) => t + found)
    setTotalPossible((t) => t + scenario.mistakes.length)
    addXp(found * XP_ACTIONS.quizCorrect)
  }

  const handleNext = () => {
    setScenarioIndex((i) => i + 1)
    setSelectedMistakes(new Set())
    setShowResult(false)
  }

  const foundCount = scenario.mistakes.filter((m) => selectedMistakes.has(m.id)).length

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">間違い探し</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {scenarioIndex + 1} / {MISTAKE_SCENARIOS.length}
        </span>
      </div>

      {/* Progress */}
      <div className="h-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-300"
          style={{ width: `${((scenarioIndex + 1) / MISTAKE_SCENARIOS.length) * 100}%` }}
        />
      </div>

      {/* Scenario as story card */}
      <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <div className="mb-2 flex items-center gap-2">
          <Search size={18} className="text-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
            シナリオ
          </span>
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
          {scenario.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {scenario.description}
        </p>
      </div>

      {/* Mistake selection */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
          問題点を全て選んでください（{scenario.mistakes.length}個）
        </p>
        {scenario.mistakes.map((mistake) => {
          const isSelected = selectedMistakes.has(mistake.id)
          let cardStyle =
            'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 hover:border-gray-300'
          if (showResult) {
            cardStyle = isSelected
              ? 'border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950'
              : 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950'
          } else if (isSelected) {
            cardStyle =
              'border-teal-400 bg-teal-50 dark:border-teal-500 dark:bg-teal-950 shadow-sm'
          }

          return (
            <button
              key={mistake.id}
              onClick={() => toggleMistake(mistake.id)}
              disabled={showResult}
              className={`w-full rounded-xl border-2 p-3 text-left transition-all ${cardStyle}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {categoryEmoji[mistake.category] ?? '\u2753'}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${categoryColors[mistake.category]}`}
                >
                  {categoryLabels[mistake.category]}
                </span>
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  {mistake.description}
                </span>
                {showResult && (
                  <span className="ml-auto">
                    {isSelected ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <XCircle size={16} className="text-red-400" />
                    )}
                  </span>
                )}
              </div>
              {showResult && (
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                  {mistake.explanation}
                </p>
              )}
            </button>
          )
        })}
      </div>

      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={selectedMistakes.size === 0}
          className={`w-full rounded-xl py-3 font-bold text-white transition-all ${
            selectedMistakes.size > 0
              ? 'bg-teal-600 hover:bg-teal-700 active:scale-[0.98]'
              : 'bg-gray-300 dark:bg-gray-700'
          }`}
        >
          回答する
        </button>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-5 text-center shadow-sm dark:bg-gray-900">
            <AnimatedScore
              score={foundCount}
              maxScore={scenario.mistakes.length}
              label="問題点を発見"
              size={100}
            />
          </div>
          <button
            onClick={handleNext}
            className="w-full rounded-xl bg-teal-600 py-3 font-bold text-white transition-all hover:bg-teal-700"
          >
            次のシナリオへ
          </button>
        </div>
      )}
    </div>
  )
}
