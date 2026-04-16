import { useState } from 'react'
import { CORE10_ITEMS } from '../../data/core10-items'
import { Save, CheckCircle } from 'lucide-react'
import { db } from '../../db/database'
import type { Core10ItemId, Core10Score, Core10Evaluation } from '../../types/core10'

const scoreButtons = [
  { score: 0 as Core10Score, label: 'していない', color: 'border-red-300 text-red-700', active: 'bg-red-500 text-white border-red-500' },
  { score: 1 as Core10Score, label: '不十分', color: 'border-yellow-300 text-yellow-700', active: 'bg-yellow-500 text-white border-yellow-500' },
  { score: 2 as Core10Score, label: 'している', color: 'border-green-300 text-green-700', active: 'bg-green-500 text-white border-green-500' },
]

export function FassSelfCheckPage() {
  const [scores, setScores] = useState<Partial<Record<Core10ItemId, Core10Score>>>({})
  const [saved, setSaved] = useState(false)

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
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">CORE10 セルフチェック</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          自分の食事介助を振り返り、各項目を評価してください
        </p>
      </div>

      <div className="space-y-3">
        {CORE10_ITEMS.map((item) => {
          const currentScore = scores[item.id]
          return (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold dark:bg-gray-700">
                  {item.id}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{item.title}</span>
              </div>
              <div className="flex gap-2">
                {scoreButtons.map(({ score, label, color, active }) => {
                  const isActive = currentScore === score
                  return (
                    <button
                      key={score}
                      onClick={() => handleScore(item.id, score)}
                      className={`flex-1 rounded-lg border-2 py-1.5 text-xs font-bold transition-all ${isActive ? active : color}`}
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

      {/* 合計スコア */}
      <div className="rounded-xl bg-white p-5 text-center shadow dark:bg-gray-900">
        <div className="text-sm text-gray-500">合計スコア</div>
        <div className={`text-4xl font-bold ${totalScore >= 16 ? 'text-green-600' : totalScore >= 10 ? 'text-yellow-600' : 'text-red-600'}`}>
          {allScored ? totalScore : '—'} <span className="text-lg text-gray-400">/ 20</span>
        </div>
      </div>

      {/* 改善ポイント */}
      {Object.entries(scores).filter(([, s]) => s === 0).length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <h3 className="mb-2 text-sm font-bold text-red-700 dark:text-red-300">改善が必要な項目</h3>
          <ul className="space-y-1">
            {Object.entries(scores)
              .filter(([, s]) => s === 0)
              .map(([id]) => {
                const item = CORE10_ITEMS.find((i) => i.id === Number(id))
                return (
                  <li key={id} className="text-xs text-red-700 dark:text-red-300">
                    項目{id}: {item?.title}
                  </li>
                )
              })}
          </ul>
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={!allScored || saved}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white ${
          saved ? 'bg-green-500' : allScored ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
        }`}
      >
        {saved ? <><CheckCircle size={18} /> 保存しました</> : <><Save size={18} /> 記録を保存</>}
      </button>
    </div>
  )
}
