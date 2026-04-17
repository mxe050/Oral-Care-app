import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, CheckCircle, Lightbulb, Award } from 'lucide-react'
import { OHAT_CATEGORIES } from '../../data/ohat-categories'
import { PhaseModelDiagram } from '../../components/domain/PhaseModelDiagram'
import { DrugInfoPanel } from '../../components/domain/DrugInfoPanel'
import { ReferenceList } from '../../components/ui/ReferenceList'
import { FlipCard } from '../../components/ui/FlipCard'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'

const scoreColorsFront = [
  'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950',
  'border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-950',
  'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950',
]

const scoreColorsBack = [
  'border-green-400 bg-green-100 dark:border-green-600 dark:bg-green-900',
  'border-yellow-400 bg-yellow-100 dark:border-yellow-600 dark:bg-yellow-900',
  'border-red-400 bg-red-100 dark:border-red-600 dark:bg-red-900',
]

const scoreBadge = [
  'bg-green-500 text-white',
  'bg-yellow-500 text-white',
  'bg-red-500 text-white',
]

export function OhatLearnPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const completedSections = useProgressStore((s) => s.completedSections)
  const markCompleted = useProgressStore((s) => s.markCompleted)
  const addXp = useProgressStore((s) => s.addXp)

  const completedCount = OHAT_CATEGORIES.filter(
    (c) => completedSections[`ohat-learn-${c.id}`],
  ).length

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id)
  }

  const handleComplete = (categoryId: string) => {
    const key = `ohat-learn-${categoryId}`
    if (!completedSections[key]) {
      markCompleted(key)
      addXp(XP_ACTIONS.viewLesson)
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">OHAT-J 8カテゴリ</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          各カテゴリの判定基準と嚥下5期モデルとの関連を学びましょう
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm dark:bg-gray-900">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700 dark:bg-teal-900 dark:text-teal-300">
          {completedCount}/{OHAT_CATEGORIES.length}
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
            カテゴリ学習済み
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-teal-500 transition-all duration-500"
              style={{ width: `${(completedCount / OHAT_CATEGORIES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category cards */}
      <div className="space-y-3">
        {OHAT_CATEGORIES.map((cat) => {
          const isExpanded = expanded === cat.id
          const isCompleted = completedSections[`ohat-learn-${cat.id}`]

          return (
            <div
              key={cat.id}
              className={`overflow-hidden rounded-xl border bg-white transition-all dark:bg-gray-900 ${
                isCompleted
                  ? 'border-green-200 dark:border-green-800'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Card header */}
              <button
                onClick={() => toggleExpand(cat.id)}
                className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">{cat.name}</h3>
                    {isCompleted && (
                      <CheckCircle size={16} className="text-green-500" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {cat.funFact}
                  </p>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Expanded content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-4 border-t border-gray-100 px-4 pb-4 pt-4 dark:border-gray-800">
                  {/* Fun fact callout */}
                  <div className="flex gap-2 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-3 dark:from-amber-950 dark:to-orange-950">
                    <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-500" />
                    <p className="text-xs font-medium text-amber-800 dark:text-amber-300">
                      {cat.funFact}
                    </p>
                  </div>

                  {/* Score criteria as FlipCards */}
                  <div>
                    <h4 className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                      判定基準
                    </h4>
                    <div className="space-y-2">
                      {([0, 1, 2] as const).map((score) => {
                        const criteria = cat.scoreCriteria[score]
                        return (
                          <FlipCard
                            key={score}
                            front={
                              <div className={`rounded-xl border-2 p-3 ${scoreColorsFront[score]}`}>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${scoreBadge[score]}`}
                                  >
                                    {score}
                                  </span>
                                  <span className="font-bold text-gray-900 dark:text-gray-100">
                                    {criteria.label}
                                  </span>
                                </div>
                              </div>
                            }
                            back={
                              <div className={`rounded-xl border-2 p-3 ${scoreColorsBack[score]}`}>
                                <div className="mb-1 flex items-center gap-2">
                                  <span
                                    className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${scoreBadge[score]}`}
                                  >
                                    {score}
                                  </span>
                                  <span className="font-bold text-gray-900 dark:text-gray-100">
                                    {criteria.label}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {criteria.description}
                                </p>
                              </div>
                            }
                          />
                        )
                      })}
                    </div>
                  </div>

                  {/* Phase model diagram */}
                  <PhaseModelDiagram
                    highlightedPhases={cat.swallowingPhases}
                    explanation={cat.phaseExplanation}
                  />

                  {/* Drug info if applicable */}
                  {cat.drugInfo && <DrugInfoPanel drugInfo={cat.drugInfo} />}

                  {/* References */}
                  <ReferenceList references={cat.references} />

                  {/* Complete button */}
                  <button
                    onClick={() => handleComplete(cat.id)}
                    disabled={isCompleted}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                      isCompleted
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-[0.98]'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle size={16} /> 学習完了済み
                      </>
                    ) : (
                      <>
                        <Award size={16} /> 学習完了 (+{XP_ACTIONS.viewLesson} XP)
                      </>
                    )}
                  </button>

                  {/* Link to detail page */}
                  <Link
                    to={`/ohat/learn/${cat.id}`}
                    className="block text-center text-xs text-teal-600 hover:underline dark:text-teal-400"
                  >
                    詳細ページを見る →
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
