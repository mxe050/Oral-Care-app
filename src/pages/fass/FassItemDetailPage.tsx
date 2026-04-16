import { useParams, useNavigate, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, AlertTriangle, Lightbulb, Info, ClipboardCheck, Award, CheckCircle } from 'lucide-react'
import { CORE10_ITEMS } from '../../data/core10-items'
import { PhaseModelDiagram } from '../../components/domain/PhaseModelDiagram'
import { ReferenceList } from '../../components/ui/ReferenceList'
import { FlipCard } from '../../components/ui/FlipCard'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'

const scoreBadge = [
  'bg-red-500 text-white',
  'bg-yellow-500 text-white',
  'bg-green-500 text-white',
]
const scoreLabels = ['していない', '不十分', 'している']
const scoreColorsFront = [
  'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950',
  'border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-950',
  'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950',
]
const scoreColorsBack = [
  'border-red-400 bg-red-100 dark:border-red-600 dark:bg-red-900',
  'border-yellow-400 bg-yellow-100 dark:border-yellow-600 dark:bg-yellow-900',
  'border-green-400 bg-green-100 dark:border-green-600 dark:bg-green-900',
]

export function FassItemDetailPage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const completedSections = useProgressStore((s) => s.completedSections)
  const markCompleted = useProgressStore((s) => s.markCompleted)
  const addXp = useProgressStore((s) => s.addXp)

  const itemIndex = CORE10_ITEMS.findIndex((i) => i.id === Number(itemId))
  const item = CORE10_ITEMS[itemIndex]

  if (!item) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <p className="text-gray-500">項目が見つかりません</p>
        <button
          onClick={() => navigate('/fass/learn')}
          className="mt-4 text-sm text-teal-600 underline"
        >
          戻る
        </button>
      </div>
    )
  }

  const prevItem = itemIndex > 0 ? CORE10_ITEMS[itemIndex - 1] : null
  const nextItem = itemIndex < CORE10_ITEMS.length - 1 ? CORE10_ITEMS[itemIndex + 1] : null
  const sectionKey = `fass-learn-${item.id}`
  const isCompleted = completedSections[sectionKey]

  const handleComplete = () => {
    if (!isCompleted) {
      markCompleted(sectionKey)
      addXp(XP_ACTIONS.viewLesson)
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {item.groupName} / 項目{item.id}
        </span>
        <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">
          {item.title}
        </h2>
      </div>

      {/* Fun fact */}
      <div className="flex gap-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:from-amber-950 dark:to-orange-950">
        <Lightbulb size={20} className="mt-0.5 shrink-0 text-amber-500" />
        <div>
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            豆知識
          </div>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            {item.funFact}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
      </div>

      {/* Medical rationale */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <div className="mb-2 flex items-center gap-2">
          <Info size={16} className="text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm font-bold text-blue-700 dark:text-blue-300">
            なぜ重要か（医学的根拠）
          </h3>
        </div>
        <p className="text-xs text-blue-700 dark:text-blue-300">{item.medicalRationale}</p>
      </div>

      {/* Specific criteria */}
      {item.specificCriteria && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
          <div className="mb-2 flex items-center gap-2">
            <ClipboardCheck size={16} className="text-green-600 dark:text-green-400" />
            <h3 className="text-sm font-bold text-green-700 dark:text-green-300">具体的な基準</h3>
          </div>
          <p className="text-xs text-green-700 dark:text-green-300">{item.specificCriteria}</p>
        </div>
      )}

      {/* FlipCard scoring */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
          採点基準（3段階）
        </h3>
        {([0, 1, 2] as const).map((score) => (
          <FlipCard
            key={score}
            front={
              <div className={`rounded-xl border-2 p-4 ${scoreColorsFront[score]}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${scoreBadge[score]}`}>
                    {score}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    {scoreLabels[score]}
                  </span>
                </div>
              </div>
            }
            back={
              <div className={`rounded-xl border-2 p-4 ${scoreColorsBack[score]}`}>
                <div className="mb-2 flex items-center gap-3">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${scoreBadge[score]}`}>
                    {score}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    {scoreLabels[score]}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {item.scoreCriteria[score]}
                </p>
              </div>
            }
          />
        ))}
      </div>

      {/* Phase model */}
      <PhaseModelDiagram
        highlightedPhases={item.swallowingPhases}
        explanation={item.phaseExplanation}
      />

      {/* Error consequence */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-600" />
          <h3 className="text-sm font-bold text-red-700 dark:text-red-300">
            エラーの結果
          </h3>
        </div>
        <p className="text-xs text-red-700 dark:text-red-300">{item.errorConsequence}</p>
      </div>

      {/* References */}
      <ReferenceList references={item.references} />

      {/* Complete button */}
      <button
        onClick={handleComplete}
        disabled={isCompleted}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
          isCompleted
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            : 'bg-amber-500 text-white hover:bg-amber-600 active:scale-[0.98]'
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
        {prevItem ? (
          <Link
            to={`/fass/learn/${prevItem.id}`}
            className="flex flex-1 items-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <ChevronLeft size={16} />
            <span className="truncate">項目{prevItem.id}</span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextItem ? (
          <Link
            to={`/fass/learn/${nextItem.id}`}
            className="flex flex-1 items-center justify-end gap-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >
            <span className="truncate">項目{nextItem.id}</span>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  )
}
