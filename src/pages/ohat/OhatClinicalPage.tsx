import { useState } from 'react'
import { Save, CheckCircle, Clock } from 'lucide-react'
import { OHAT_CATEGORIES } from '../../data/ohat-categories'
import { PROFESSIONAL_MAP } from '../../data/professional-map'
import { db } from '../../db/database'
import { AnimatedScore } from '../../components/ui/AnimatedScore'
import { BadgePopup } from '../../components/ui/BadgePopup'
import { useProgressStore } from '../../stores/progress-store'
import { BADGES, XP_ACTIONS } from '../../types/common'
import type { OhatCategoryId, OhatScore, OhatRecord } from '../../types/ohat'

const scoreButtonStyles: Record<OhatScore, { normal: string; active: string }> = {
  0: {
    normal: 'border-green-300 text-green-700 dark:border-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950',
    active: 'bg-green-500 text-white border-green-500 shadow-md shadow-green-200 dark:shadow-green-900 scale-105',
  },
  1: {
    normal: 'border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950',
    active: 'bg-yellow-500 text-white border-yellow-500 shadow-md shadow-yellow-200 dark:shadow-yellow-900 scale-105',
  },
  2: {
    normal: 'border-red-300 text-red-700 dark:border-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950',
    active: 'bg-red-500 text-white border-red-500 shadow-md shadow-red-200 dark:shadow-red-900 scale-105',
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

const severityConfig = (score: number) => {
  if (score <= 4)
    return {
      label: '概ね良好',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
    }
  if (score <= 8)
    return {
      label: '要注意',
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800',
    }
  return {
    label: '要介入',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
  }
}

export function OhatClinicalPage() {
  const [scores, setScores] = useState<Partial<Record<OhatCategoryId, OhatScore>>>({})
  const [saved, setSaved] = useState(false)
  const [notes, setNotes] = useState('')
  const [showBadge, setShowBadge] = useState<{ name: string; emoji: string; description: string } | null>(null)

  const addXp = useProgressStore((s) => s.addXp)
  const addBadge = useProgressStore((s) => s.addBadge)
  const markCompleted = useProgressStore((s) => s.markCompleted)
  const badges = useProgressStore((s) => s.badges)

  const allScored = OHAT_CATEGORIES.every((c) => scores[c.id] !== undefined)
  const totalScore = Object.values(scores).reduce<number>((sum, s) => sum + (s ?? 0), 0)
  const severity = severityConfig(totalScore)
  const now = new Date()

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
    markCompleted('ohat-clinical')
    addXp(XP_ACTIONS.clinicalSave)

    // First clinical badge
    if (!badges.some((b) => b.id === 'clinicalFirst')) {
      addBadge('clinicalFirst', BADGES.clinicalFirst.name)
      setShowBadge(BADGES.clinicalFirst)
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">OHAT-J 臨床記録</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          各カテゴリを0-2で評価してください
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
          <Clock size={12} />
          {now.toLocaleDateString('ja-JP')} {now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div className="space-y-3">
        {OHAT_CATEGORIES.map((cat) => {
          const currentScore = scores[cat.id]
          return (
            <div
              key={cat.id}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{cat.name}</span>
              </div>
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
                      className={`flex-1 rounded-lg border-2 py-2.5 text-center text-sm font-bold transition-all duration-200 active:scale-95 ${style}`}
                    >
                      <div>{score}</div>
                      <div className="mt-0.5 text-xs font-normal">
                        {cat.scoreCriteria[score].label}
                      </div>
                    </button>
                  )
                })}
              </div>
              {/* Show recommendation for score 2 */}
              {currentScore === 2 && (
                <div className="mt-2 rounded-lg bg-red-50 p-2 text-xs text-red-700 dark:bg-red-950 dark:text-red-300">
                  <span className="font-bold">
                    {categoryProfessionalMap[cat.id] ?? '歯科医師'}に相談
                  </span>
                  {' -- '}
                  {PROFESSIONAL_MAP.find(
                    (p) => p.professional === (categoryProfessionalMap[cat.id] ?? '歯科医師'),
                  )?.reason ?? '専門的な評価・介入が必要です'}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Total score with AnimatedScore */}
      <div className={`rounded-xl border p-5 text-center ${allScored ? severity.bg : 'bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700'}`}>
        <AnimatedScore
          score={allScored ? totalScore : 0}
          maxScore={16}
          label="合計スコア"
        />
        {allScored && (
          <div className={`mt-3 text-sm font-bold ${severity.color}`}>
            {severity.label}
          </div>
        )}
      </div>

      {/* Memo */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="メモ（任意）"
        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm transition-colors focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:ring-teal-900"
        rows={3}
      />

      {/* Save button */}
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

      {showBadge && (
        <BadgePopup badge={showBadge} onClose={() => setShowBadge(null)} />
      )}
    </div>
  )
}
