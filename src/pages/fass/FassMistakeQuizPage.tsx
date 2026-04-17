import { useMemo, useState } from 'react'
import { Search, CheckCircle, XCircle } from 'lucide-react'
import { MISTAKE_SCENARIOS } from '../../data/fass-mistakes'
import { AnimatedScore } from '../../components/ui/AnimatedScore'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'
import type { MistakeCategory } from '../../types/core10'

const categoryLabels: Record<MistakeCategory, string> = {
  posture: '姿勢',
  technique: '手技',
  timing: 'タイミング',
  environment: '環境',
}

const categoryEmoji: Record<MistakeCategory, string> = {
  posture: '\uD83E\uDDD1\u200D\uD83E\uDDBD',
  technique: '\u270B',
  timing: '\u23F0',
  environment: '\uD83C\uDFE5',
}

const categoryColors: Record<MistakeCategory, string> = {
  posture: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  technique: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  timing: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  environment: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
}

interface QuizItem {
  id: string
  category: MistakeCategory
  description: string
  explanation: string
  isMistake: boolean
}

export function FassMistakeQuizPage() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showResult, setShowResult] = useState(false)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  const addXp = useProgressStore((s) => s.addXp)
  const markCompleted = useProgressStore((s) => s.markCompleted)

  const scenario = MISTAKE_SCENARIOS[scenarioIndex]
  const isFinished = scenarioIndex >= MISTAKE_SCENARIOS.length

  // Merge mistakes + correct behaviors into a single item list.
  // Sorted by id so the order is stable across renders but still mixes categories.
  const items: QuizItem[] = useMemo(() => {
    if (!scenario) return []
    const mistakeItems: QuizItem[] = scenario.mistakes.map((m) => ({
      id: m.id,
      category: m.category,
      description: m.description,
      explanation: m.explanation,
      isMistake: true,
    }))
    const correctItems: QuizItem[] = scenario.correctBehaviors.map((c) => ({
      id: c.id,
      category: c.category,
      description: c.description,
      explanation: c.explanation,
      isMistake: false,
    }))
    return [...mistakeItems, ...correctItems].sort((a, b) => a.id.localeCompare(b.id))
  }, [scenario])

  if (isFinished) {
    markCompleted('fass-mistake-quiz')

    return (
      <div className="mx-auto max-w-lg space-y-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
            全シナリオ完了!
          </h2>
          <AnimatedScore
            score={totalCorrect}
            maxScore={totalItems}
            label="正しい判断"
          />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            食事介助場面の問題点と正しい行動を見分ける力が養われています。
          </p>
        </div>
        <button
          onClick={() => {
            setScenarioIndex(0)
            setSelectedIds(new Set())
            setShowResult(false)
            setTotalCorrect(0)
            setTotalItems(0)
          }}
          className="w-full rounded-xl bg-teal-600 py-3 font-bold text-white transition-all hover:bg-teal-700"
        >
          もう一度
        </button>
      </div>
    )
  }

  if (!scenario) return null

  const toggleItem = (id: string) => {
    if (showResult) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSubmit = () => {
    setShowResult(true)
    // Correct decision: mistake -> selected, correct-behavior -> not selected
    const correctCount = items.filter((it) =>
      it.isMistake ? selectedIds.has(it.id) : !selectedIds.has(it.id),
    ).length
    setTotalCorrect((t) => t + correctCount)
    setTotalItems((t) => t + items.length)
    // Award XP per correctly-identified mistake (kept as before)
    const mistakesCaught = items.filter((it) => it.isMistake && selectedIds.has(it.id)).length
    addXp(mistakesCaught * XP_ACTIONS.quizCorrect)
  }

  const handleNext = () => {
    setScenarioIndex((i) => i + 1)
    setSelectedIds(new Set())
    setShowResult(false)
  }

  const correctCountThisScenario = items.filter((it) =>
    it.isMistake ? selectedIds.has(it.id) : !selectedIds.has(it.id),
  ).length

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

      {/* Item selection — mix of mistakes and correct behaviors */}
      <div className="space-y-2">
        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
          問題のある行動だけを選んでください
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          ※ 正しい行動も混ざっています。選ばないのが正解です。
        </p>
        {items.map((item) => {
          const isSelected = selectedIds.has(item.id)
          // Decision is correct when:
          //  - item.isMistake && isSelected  → mistake properly flagged
          //  - !item.isMistake && !isSelected → correct behavior properly left alone
          const decisionCorrect = item.isMistake ? isSelected : !isSelected

          let cardStyle =
            'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 hover:border-gray-300'
          if (showResult) {
            cardStyle = decisionCorrect
              ? 'border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950'
              : 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950'
          } else if (isSelected) {
            cardStyle =
              'border-teal-400 bg-teal-50 dark:border-teal-500 dark:bg-teal-950 shadow-sm'
          }

          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              disabled={showResult}
              className={`w-full rounded-xl border-2 p-3 text-left transition-all ${cardStyle}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{categoryEmoji[item.category]}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${categoryColors[item.category]}`}
                >
                  {categoryLabels[item.category]}
                </span>
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  {item.description}
                </span>
                {showResult && (
                  <span className="ml-auto">
                    {decisionCorrect ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <XCircle size={16} className="text-red-400" />
                    )}
                  </span>
                )}
              </div>
              {showResult && (
                <div className="mt-2 space-y-1">
                  <div
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      item.isMistake
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    }`}
                  >
                    {item.isMistake ? '問題のある行動' : '正しい行動'}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {item.explanation}
                  </p>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {!showResult ? (
        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-teal-600 py-3 font-bold text-white transition-all hover:bg-teal-700 active:scale-[0.98]"
        >
          回答する
        </button>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-5 text-center shadow-sm dark:bg-gray-900">
            <AnimatedScore
              score={correctCountThisScenario}
              maxScore={items.length}
              label="正しい判断"
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
