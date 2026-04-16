import { useParams, useNavigate, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Lightbulb, Award, CheckCircle } from 'lucide-react'
import { OHAT_CATEGORIES } from '../../data/ohat-categories'
import { PhaseModelDiagram } from '../../components/domain/PhaseModelDiagram'
import { DrugInfoPanel } from '../../components/domain/DrugInfoPanel'
import { ReferenceList } from '../../components/ui/ReferenceList'
import { FlipCard } from '../../components/ui/FlipCard'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'

const scoreColors = [
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

export function OhatCategoryDetailPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const completedSections = useProgressStore((s) => s.completedSections)
  const markCompleted = useProgressStore((s) => s.markCompleted)
  const addXp = useProgressStore((s) => s.addXp)

  const categoryIndex = OHAT_CATEGORIES.findIndex((c) => c.id === categoryId)
  const category = OHAT_CATEGORIES[categoryIndex]

  if (!category) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <p className="text-gray-500">カテゴリが見つかりません</p>
        <button
          onClick={() => navigate('/ohat/learn')}
          className="mt-4 text-sm text-teal-600 underline"
        >
          戻る
        </button>
      </div>
    )
  }

  const prevCategory = categoryIndex > 0 ? OHAT_CATEGORIES[categoryIndex - 1] : null
  const nextCategory = categoryIndex < OHAT_CATEGORIES.length - 1 ? OHAT_CATEGORIES[categoryIndex + 1] : null
  const sectionKey = `ohat-learn-${category.id}`
  const isCompleted = completedSections[sectionKey]

  const handleComplete = () => {
    if (!isCompleted) {
      markCompleted(sectionKey)
      addXp(XP_ACTIONS.viewLesson)
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {category.name}
            </h2>
            <p className="text-sm text-teal-600 dark:text-teal-400">
              {category.phaseExplanation.split('\u2015')[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Fun fact callout */}
      <div className="flex gap-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:from-amber-950 dark:to-orange-950">
        <Lightbulb size={20} className="mt-0.5 shrink-0 text-amber-500" />
        <div>
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            豆知識
          </div>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            {category.funFact}
          </p>
        </div>
      </div>

      {/* Score criteria with FlipCards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">判定基準</h3>
        {([0, 1, 2] as const).map((score) => {
          const criteria = category.scoreCriteria[score]
          return (
            <FlipCard
              key={score}
              front={
                <div className={`rounded-xl border-2 p-4 ${scoreColors[score]}`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${scoreBadge[score]}`}>
                      {score}
                    </span>
                    <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                      {criteria.label}
                    </span>
                  </div>
                </div>
              }
              back={
                <div className={`rounded-xl border-2 p-4 ${scoreColorsBack[score]}`}>
                  <div className="mb-2 flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${scoreBadge[score]}`}>
                      {score}
                    </span>
                    <span className="text-base font-bold text-gray-900 dark:text-gray-100">
                      {criteria.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {criteria.description}
                  </p>
                </div>
              }
            />
          )
        })}
      </div>

      {/* Phase model diagram */}
      <PhaseModelDiagram
        highlightedPhases={category.swallowingPhases}
        explanation={category.phaseExplanation}
      />

      {/* Drug info */}
      {category.drugInfo && <DrugInfoPanel drugInfo={category.drugInfo} />}

      {/* References */}
      <ReferenceList references={category.references} />

      {/* Complete button */}
      <button
        onClick={handleComplete}
        disabled={isCompleted}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
          isCompleted
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-[0.98]'
        }`}
      >
        {isCompleted ? (
          <><CheckCircle size={16} /> 学習完了済み</>
        ) : (
          <><Award size={16} /> 学習完了 (+{XP_ACTIONS.viewLesson} XP)</>
        )}
      </button>

      {/* Navigation */}
      <div className="flex gap-3">
        {prevCategory ? (
          <Link
            to={`/ohat/learn/${prevCategory.id}`}
            className="flex flex-1 items-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <ChevronLeft size={16} />
            <span className="truncate">{prevCategory.name}</span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextCategory ? (
          <Link
            to={`/ohat/learn/${nextCategory.id}`}
            className="flex flex-1 items-center justify-end gap-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <span className="truncate">{nextCategory.name}</span>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  )
}
