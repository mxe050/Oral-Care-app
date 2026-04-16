import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Save, CheckCircle } from 'lucide-react'
import { CORE10_ITEMS } from '../../data/core10-items'
import { db } from '../../db/database'
import { AnimatedScore } from '../../components/ui/AnimatedScore'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'
import type { Core10ItemId, Core10Score, Core10Evaluation } from '../../types/core10'

const scoreButtons = [
  {
    score: 0 as Core10Score,
    label: 'していない',
    normal: 'border-red-300 text-red-700 dark:border-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950',
    active: 'bg-red-500 text-white border-red-500 shadow-md shadow-red-200 dark:shadow-red-900 scale-105',
    bar: 'bg-red-400',
  },
  {
    score: 1 as Core10Score,
    label: '不十分',
    normal: 'border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950',
    active: 'bg-yellow-500 text-white border-yellow-500 shadow-md shadow-yellow-200 dark:shadow-yellow-900 scale-105',
    bar: 'bg-yellow-400',
  },
  {
    score: 2 as Core10Score,
    label: 'している',
    normal: 'border-green-300 text-green-700 dark:border-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950',
    active: 'bg-green-500 text-white border-green-500 shadow-md shadow-green-200 dark:shadow-green-900 scale-105',
    bar: 'bg-green-400',
  },
]

export function FassSelfCheckPage() {
  const [scores, setScores] = useState<Partial<Record<Core10ItemId, Core10Score>>>({})
  const [saved, setSaved] = useState(false)

  const addXp = useProgressStore((s) => s.addXp)
  const markCompleted = useProgressStore((s) => s.markCompleted)

  const allScored = CORE10_ITEMS.every((item) => scores[item.id] !== undefined)
  const totalScore = Object.values(scores).reduce<number>((sum, s) => sum + (s ?? 0), 0)

  const handleScore = (itemId: Core10ItemId, score: Core10Score) => {
    setScores((prev) => ({ ...prev, [itemId]: score }))
    setSaved(false)
  }

  const handleSave = async () => {
    if (!allScored) return
    const improvementAreas = Object.entries(scores)
      .filter(([, s]) => s === 0)
      .map(([id]) => Number(id) as Core10ItemId)

    const evaluation: Core10Evaluation = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      scores: scores as Record<Core10ItemId, Core10Score>,
      totalScore,
      improvementAreas,
    }
    await db.core10Evaluations.add(evaluation)
    setSaved(true)
    markCompleted('fass-self-check')
    addXp(XP_ACTIONS.clinicalSave)
  }

  // Group scores for visualization
  const groupedScores = (['A', 'B', 'C'] as const).map((g) => {
    const groupItems = CORE10_ITEMS.filter((i) => i.group === g)
    const groupScore = groupItems.reduce(
      (sum, item) => sum + (scores[item.id] ?? 0),
      0,
    )
    const maxGroupScore = groupItems.length * 2
    return { group: g, score: groupScore, max: maxGroupScore, items: groupItems }
  })

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          CORE10 セルフチェック
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          自分の食事介助を振り返り、各項目を評価してください
        </p>
      </div>

      <div className="space-y-3">
        {CORE10_ITEMS.map((item) => {
          const currentScore = scores[item.id]
          return (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold dark:bg-gray-700">
                  {item.id}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {item.title}
                </span>
              </div>
              <div className="flex gap-2">
                {scoreButtons.map(({ score, label, normal, active }) => {
                  const isActive = currentScore === score
                  return (
                    <button
                      key={score}
                      onClick={() => handleScore(item.id, score)}
                      className={`flex-1 rounded-lg border-2 py-2 text-xs font-bold transition-all duration-200 active:scale-95 ${
                        isActive ? active : normal
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Total score */}
      <div className="rounded-xl bg-white p-6 text-center shadow-sm dark:bg-gray-900">
        <AnimatedScore
          score={allScored ? totalScore : 0}
          maxScore={20}
          label="合計スコア"
        />
      </div>

      {/* Grouped bar visualization */}
      {allScored && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <h3 className="mb-3 text-sm font-bold text-gray-700 dark:text-gray-300">
            群別スコア
          </h3>
          <div className="space-y-3">
            {groupedScores.map(({ group, score, max }) => {
              const pct = max > 0 ? (score / max) * 100 : 0
              const color =
                group === 'A'
                  ? 'bg-blue-400'
                  : group === 'B'
                    ? 'bg-amber-400'
                    : 'bg-red-400'
              return (
                <div key={group}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      {group}群
                    </span>
                    <span className="text-gray-500">
                      {score}/{max}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Improvement suggestions */}
      {Object.entries(scores).filter(([, s]) => s === 0).length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <h3 className="mb-2 text-sm font-bold text-red-700 dark:text-red-300">
            改善が必要な項目
          </h3>
          <ul className="space-y-2">
            {Object.entries(scores)
              .filter(([, s]) => s === 0)
              .map(([id]) => {
                const item = CORE10_ITEMS.find((i) => i.id === Number(id))
                return (
                  <li key={id}>
                    <Link
                      to={`/fass/learn/${id}`}
                      className="flex items-center gap-2 text-xs text-red-700 hover:underline dark:text-red-300"
                    >
                      <span className="font-bold">項目{id}:</span>
                      <span>{item?.title}</span>
                      <span className="ml-auto text-teal-600 dark:text-teal-400">学ぶ →</span>
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={!allScored || saved}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white transition-all ${
          saved
            ? 'bg-green-500'
            : allScored
              ? 'bg-teal-600 hover:bg-teal-700 active:scale-[0.98]'
              : 'bg-gray-300 dark:bg-gray-700'
        }`}
      >
        {saved ? (
          <>
            <CheckCircle size={18} /> 保存しました (+{XP_ACTIONS.clinicalSave} XP)
          </>
        ) : (
          <>
            <Save size={18} /> 記録を保存
          </>
        )}
      </button>
    </div>
  )
}
