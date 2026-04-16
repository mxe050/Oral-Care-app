import { useState } from 'react'
import { MISTAKE_SCENARIOS } from '../../data/fass-mistakes'
const categoryLabels = {
  posture: '姿勢',
  technique: '手技',
  timing: 'タイミング',
  environment: '環境',
}

const categoryColors = {
  posture: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  technique: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  timing: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  environment: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
}

export function FassMistakeQuizPage() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [selectedMistakes, setSelectedMistakes] = useState<Set<string>>(new Set())
  const [showResult, setShowResult] = useState(false)

  const scenario = MISTAKE_SCENARIOS[scenarioIndex]
  const isFinished = scenarioIndex >= MISTAKE_SCENARIOS.length

  if (isFinished) {
    return (
      <div className="mx-auto max-w-lg space-y-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">全シナリオ完了</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          食事介助場面の問題点を見つける力が養われています。
        </p>
        <button
          onClick={() => { setScenarioIndex(0); setSelectedMistakes(new Set()); setShowResult(false) }}
          className="rounded-xl bg-primary px-8 py-3 font-bold text-white"
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

  const handleSubmit = () => setShowResult(true)

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
        <span className="text-sm text-gray-500">{scenarioIndex + 1} / {MISTAKE_SCENARIOS.length}</span>
      </div>

      <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-900">
        <h3 className="font-bold text-gray-900 dark:text-gray-100">{scenario.title}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{scenario.description}</p>
      </div>

      {/* 間違い選択 */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
          問題点を全て選んでください（{scenario.mistakes.length}個）
        </p>
        {scenario.mistakes.map((mistake) => {
          const isSelected = selectedMistakes.has(mistake.id)
          let cardStyle = 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
          if (showResult) {
            cardStyle = isSelected
              ? 'border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950'
              : 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950'
          } else if (isSelected) {
            cardStyle = 'border-primary bg-teal-50 dark:border-teal-500 dark:bg-teal-950'
          }

          return (
            <button
              key={mistake.id}
              onClick={() => toggleMistake(mistake.id)}
              disabled={showResult}
              className={`w-full rounded-xl border-2 p-3 text-left transition-all ${cardStyle}`}
            >
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${categoryColors[mistake.category]}`}>
                  {categoryLabels[mistake.category]}
                </span>
                <span className="text-sm text-gray-900 dark:text-gray-100">{mistake.description}</span>
              </div>
              {showResult && (
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{mistake.explanation}</p>
              )}
            </button>
          )
        })}
      </div>

      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={selectedMistakes.size === 0}
          className={`w-full rounded-xl py-3 font-bold text-white ${selectedMistakes.size > 0 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
        >
          回答する
        </button>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-4 text-center shadow dark:bg-gray-900">
            <div className="text-3xl font-bold text-primary">{foundCount} / {scenario.mistakes.length}</div>
            <p className="mt-1 text-sm text-gray-500">問題点を発見</p>
          </div>
          <button onClick={handleNext} className="w-full rounded-xl bg-primary py-3 font-bold text-white">
            次のシナリオへ
          </button>
        </div>
      )}
    </div>
  )
}
