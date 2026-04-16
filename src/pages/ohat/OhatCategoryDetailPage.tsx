import { useParams, useNavigate } from 'react-router-dom'
import { OHAT_CATEGORIES } from '../../data/ohat-categories'
import { PhaseModelDiagram } from '../../components/domain/PhaseModelDiagram'
import { DrugInfoPanel } from '../../components/domain/DrugInfoPanel'

const scoreColors = [
  'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950',
  'border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-950',
  'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950',
]

const scoreBadge = [
  'bg-green-500 text-white',
  'bg-yellow-500 text-white',
  'bg-red-500 text-white',
]

export function OhatCategoryDetailPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const category = OHAT_CATEGORIES.find((c) => c.id === categoryId)

  if (!category) {
    return (
      <div className="text-center">
        <p>カテゴリが見つかりません</p>
        <button onClick={() => navigate('/ohat/learn')} className="mt-4 text-primary underline">
          戻る
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{category.name}</h2>
        <p className="mt-1 text-sm text-primary">{category.phaseExplanation}</p>
      </div>

      {/* スコア判定基準 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">判定基準</h3>
        {([0, 1, 2] as const).map((score) => {
          const criteria = category.scoreCriteria[score]
          return (
            <div
              key={score}
              className={`rounded-xl border p-4 ${scoreColors[score]}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${scoreBadge[score]}`}>
                  {score}
                </span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{criteria.label}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{criteria.description}</p>
            </div>
          )
        })}
      </div>

      {/* 嚥下5期モデル */}
      <PhaseModelDiagram
        highlightedPhases={category.swallowingPhases}
        explanation={category.phaseExplanation}
      />

      {/* 薬剤情報（唾液カテゴリのみ） */}
      {category.drugInfo && <DrugInfoPanel drugInfo={category.drugInfo} />}
    </div>
  )
}
