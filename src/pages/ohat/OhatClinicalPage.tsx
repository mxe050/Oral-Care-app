import { useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { OHAT_CATEGORIES } from '../../data/ohat-categories'
import { PROFESSIONAL_MAP } from '../../data/professional-map'
import { db } from '../../db/database'
import type { OhatCategoryId, OhatScore, OhatRecord } from '../../types/ohat'

const scoreButtonStyles: Record<OhatScore, { normal: string; active: string }> = {
  0: {
    normal: 'border-green-300 text-green-700 dark:border-green-700 dark:text-green-400',
    active: 'bg-green-500 text-white border-green-500',
  },
  1: {
    normal: 'border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-400',
    active: 'bg-yellow-500 text-white border-yellow-500',
  },
  2: {
    normal: 'border-red-300 text-red-700 dark:border-red-700 dark:text-red-400',
    active: 'bg-red-500 text-white border-red-500',
  },
}

const categoryProfessionalMap: Partial<Record<OhatCategoryId, string>> = {
  dentures: '歯科医師',
  saliva: '薬剤師',
  oral_cleanliness: '歯科衛生士',
  dental_pain: '歯科医師',
  natural_teeth: '歯科医師',
  gums_mucosa: '歯科医師',
}

export function OhatClinicalPage() {
  const [scores, setScores] = useState<Partial<Record<OhatCategoryId, OhatScore>>>({})
  const [saved, setSaved] = useState(false)
  const [notes, setNotes] = useState('')

  const allScored = OHAT_CATEGORIES.every((c) => scores[c.id] !== undefined)
  const totalScore = Object.values(scores).reduce<number>((sum, s) => sum + (s ?? 0), 0)

  const handleScore = (categoryId: OhatCategoryId, score: OhatScore) => {
    setScores((prev) => ({ ...prev, [categoryId]: score }))
    setSaved(false)
  }

  const handleSave = async () => {
    if (!allScored) return
    const recommendedActions = Object.entries(scores)
      .filter(([, score]) => score === 2)
      .map(([catId]) => {
        const professional = categoryProfessionalMap[catId as OhatCategoryId] ?? '歯科医師'
        const ref = PROFESSIONAL_MAP.find((p) => p.professional === professional)
        return {
          categoryId: catId as OhatCategoryId,
          professional,
          reason: ref?.reason ?? '',
        }
      })

    const record: OhatRecord = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      scores: scores as Record<OhatCategoryId, OhatScore>,
      totalScore,
      notes: notes || undefined,
      recommendedActions,
    }

    await db.ohatRecords.add(record)
    setSaved(true)
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">OHAT-J 臨床記録</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">各カテゴリを0-2で評価してください</p>
      </div>

      <div className="space-y-3">
        {OHAT_CATEGORIES.map((cat) => {
          const currentScore = scores[cat.id]
          return (
            <div
              key={cat.id}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="mb-2 font-bold text-gray-900 dark:text-gray-100">{cat.name}</div>
              <div className="flex gap-2">
                {([0, 1, 2] as const).map((score) => {
                  const isActive = currentScore === score
                  const style = isActive
                    ? scoreButtonStyles[score].active
                    : scoreButtonStyles[score].normal
                  return (
                    <button
                      key={score}
                      onClick={() => handleScore(cat.id, score)}
                      className={`flex-1 rounded-lg border-2 py-2 text-center text-sm font-bold transition-all ${style}`}
                    >
                      <div>{score}</div>
                      <div className="mt-0.5 text-xs font-normal">{cat.scoreCriteria[score].label}</div>
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
        <div className="text-sm text-gray-500 dark:text-gray-400">合計スコア</div>
        <div className={`text-4xl font-bold ${totalScore <= 3 ? 'text-green-600' : totalScore <= 8 ? 'text-yellow-600' : 'text-red-600'}`}>
          {allScored ? totalScore : '—'} <span className="text-lg text-gray-400">/ 16</span>
        </div>
        {allScored && totalScore > 0 && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {totalScore <= 3 ? '口腔状態は概ね良好です' : totalScore <= 8 ? '一部に要注意項目があります' : '早急な歯科介入が必要です'}
          </p>
        )}
      </div>

      {/* スコア2のカテゴリの推奨アクション */}
      {Object.entries(scores).filter(([, s]) => s === 2).length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <h3 className="mb-2 text-sm font-bold text-red-700 dark:text-red-300">推奨アクション</h3>
          <ul className="space-y-2">
            {Object.entries(scores)
              .filter(([, s]) => s === 2)
              .map(([catId]) => {
                const cat = OHAT_CATEGORIES.find((c) => c.id === catId)
                const professional = categoryProfessionalMap[catId as OhatCategoryId] ?? '歯科医師'
                return (
                  <li key={catId} className="text-xs text-red-700 dark:text-red-300">
                    <span className="font-bold">{cat?.name}</span>: {professional}に相談
                  </li>
                )
              })}
          </ul>
        </div>
      )}

      {/* メモ */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="メモ（任意）"
        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        rows={3}
      />

      {/* 保存ボタン */}
      <button
        onClick={handleSave}
        disabled={!allScored || saved}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white transition-all ${
          saved ? 'bg-green-500' : allScored ? 'bg-primary active:scale-[0.98]' : 'bg-gray-300 dark:bg-gray-700'
        }`}
      >
        {saved ? <><CheckCircle size={18} /> 保存しました</> : <><Save size={18} /> 記録を保存</>}
      </button>
    </div>
  )
}
