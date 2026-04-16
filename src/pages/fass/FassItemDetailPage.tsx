import { useParams, useNavigate } from 'react-router-dom'
import { CORE10_ITEMS } from '../../data/core10-items'
import { PhaseModelDiagram } from '../../components/domain/PhaseModelDiagram'
import { AlertTriangle } from 'lucide-react'

const scoreBadge = [
  'bg-red-500 text-white',
  'bg-yellow-500 text-white',
  'bg-green-500 text-white',
]

const scoreLabels = ['していない', '不十分', 'している']

export function FassItemDetailPage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const item = CORE10_ITEMS.find((i) => i.id === Number(itemId))

  if (!item) {
    return (
      <div className="text-center">
        <p>項目が見つかりません</p>
        <button onClick={() => navigate('/fass/learn')} className="mt-4 text-primary underline">戻る</button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{item.groupName} / 項目{item.id}</span>
        <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">{item.title}</h2>
      </div>

      <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-900">
        <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
      </div>

      {/* 医学的根拠 */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <h3 className="mb-2 text-sm font-bold text-blue-700 dark:text-blue-300">なぜ重要か（医学的根拠）</h3>
        <p className="text-xs text-blue-700 dark:text-blue-300">{item.medicalRationale}</p>
      </div>

      {/* 具体的基準 */}
      {item.specificCriteria && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
          <h3 className="mb-2 text-sm font-bold text-green-700 dark:text-green-300">具体的な基準</h3>
          <p className="text-xs text-green-700 dark:text-green-300">{item.specificCriteria}</p>
        </div>
      )}

      {/* 3段階スコア */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">採点基準（3段階）</h3>
        {([0, 1, 2] as const).map((score) => (
          <div key={score} className="flex items-start gap-3 rounded-lg bg-white p-3 dark:bg-gray-900">
            <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${scoreBadge[score]}`}>
              {score}
            </span>
            <div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{scoreLabels[score]}</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.scoreCriteria[score]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 嚥下5期モデル */}
      <PhaseModelDiagram
        highlightedPhases={item.swallowingPhases}
        explanation={item.phaseExplanation}
      />

      {/* エラーの結果 */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-600" />
          <h3 className="text-sm font-bold text-red-700 dark:text-red-300">エラーの結果</h3>
        </div>
        <p className="text-xs text-red-700 dark:text-red-300">{item.errorConsequence}</p>
      </div>
    </div>
  )
}
