import { useState } from 'react'
import { Save, CheckCircle, Clock } from 'lucide-react'
import { OHAT_CATEGORIES } from '../../data/ohat-categories'
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

const categoryProfessionalMap: Record<OhatCategoryId, string> = {
  lips: '看護師・医師',
  tongue: '歯科医師',
  gums_mucosa: '歯科医師',
  saliva: '薬剤師',
  natural_teeth: '歯科医師',
  dentures: '歯科医師',
  oral_cleanliness: '歯科衛生士',
  dental_pain: '歯科医師',
}

interface CriticalAdvice {
  emoji: string
  reason: string
  immediateActions: string[]
  narrative: string
}

const criticalAdvice: Record<OhatCategoryId, CriticalAdvice> = {
  lips: {
    emoji: '\uD83E\uDE79',
    reason: '腫脹・潰瘍・出血・口角びらんは感染・栄養不良・薬剤反応のサイン。まず看護師が応急対応し医師へ。',
    immediateActions: [
      'ワセリンまたはリップクリームで保湿し乾燥を防ぐ',
      '口角びらんはカンジダ症の可能性 → 医師へ相談',
      '発熱・全身倦怠感などの随伴症状を観察',
    ],
    narrative: '口唇は体で最も薄い皮膚（3〜5層）。あなたの気づきが全身状態の早期発見につながります。',
  },
  tongue: {
    emoji: '\uD83D\uDC45',
    reason: '白色パッチは口腔カンジダ症、潰瘍は前癌病変の可能性。専門的評価が必要です。',
    immediateActions: [
      '食事摂取状況と疼痛の有無を記録',
      '抗菌薬・ステロイド・免疫抑制薬の使用歴を確認',
      '舌ブラシでの清掃は愛護的に（強擦NG）',
    ],
    narrative: '舌の異常は見落とされがち。定期観察が口腔がんの早期発見につながります。',
  },
  gums_mucosa: {
    emoji: '\uD83E\uDE78',
    reason: '歯肉出血・腫脹・白色パッチは歯周病や粘膜病変の精査対象です。',
    immediateActions: [
      '出血時は愛護的に圧迫止血',
      '柔らかい歯ブラシ・スポンジブラシでケア',
      '抗凝固薬服用歴を確認し医師と共有',
    ],
    narrative: '歯周病は心内膜炎・誤嚥性肺炎の原因にも。早期介入で全身を守ります。',
  },
  saliva: {
    emoji: '\uD83D\uDC8A',
    reason: '抗精神病薬・抗不安薬など50種以上が口腔乾燥を引き起こします。薬剤性の可能性大。',
    immediateActions: [
      '保湿ジェル／スプレーで口腔を保湿',
      '服用中の薬剤リストを薬剤師と確認',
      'こまめな水分補給（とろみ濃度確認）',
    ],
    narrative: '薬剤中止後約2週間で回復することも。諦めず多職種で薬剤見直しを。',
  },
  natural_teeth: {
    emoji: '\uD83E\uDDB7',
    reason: '4本以上のう蝕・破折・残根は感染源となり全身状態にも影響します。',
    immediateActions: [
      '残根は痛みがなくても感染源と認識',
      '食形態の一時的調整を管理栄養士と相談',
      '疼痛出現時は歯科医に緊急紹介',
    ],
    narrative: '残存歯20本未満でフレイル発症2.4倍（Watanabe 2017）。1本1本が命綱です。',
  },
  dentures: {
    emoji: '\uD83E\uDDD1\u200D\u2695\uFE0F',
    reason: '不適合・未使用の義歯は咀嚼効率を60%以上低下させ、低栄養を招きます。',
    immediateActions: [
      '義歯に名前を記入し紛失防止',
      '使用していない理由を患者に傾聴',
      '義歯下の粘膜発赤・潰瘍を毎日観察',
    ],
    narrative: 'OHAT導入で歯科介入までの日数が8日→2日に短縮（Matsunaga 2025）。',
  },
  oral_cleanliness: {
    emoji: '\uD83E\uDEA5',
    reason: 'プラーク1mgに細菌1億個。誤嚥性肺炎の独立したリスク因子です。',
    immediateActions: [
      '歯科衛生士に専門的口腔ケアを依頼',
      '毎食後＋就寝前のブラッシング徹底',
      '保湿剤・含嗽液を適切に選択',
    ],
    narrative: '専門的口腔ケアで肺炎発症率約40%減（Yoneyama 2002）。',
  },
  dental_pain: {
    emoji: '\u26A1',
    reason: '疼痛の身体的徴候は歯科緊急紹介の適応。認知症では非言語サインに注意。',
    immediateActions: [
      'NRS／FPSなどの疼痛スケールで評価',
      '顔しかめ・食事拒否など非言語サインも記録',
      '鎮痛対応の指示を医師に確認',
    ],
    narrative: '認知症患者の47%に未治療疼痛あり（Delwel 2017）。気づきが救いに。',
  },
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
        const id = catId as OhatCategoryId
        return {
          categoryId: id,
          professional: categoryProfessionalMap[id],
          reason: criticalAdvice[id].reason,
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
              {/* Show category-specific critical advice for score 2 */}
              {currentScore === 2 && (
                <div className="mt-3 overflow-hidden rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 dark:border-red-800 dark:from-red-950 dark:to-orange-950">
                  <div className="flex items-start gap-3 p-3">
                    <span className="text-2xl" aria-hidden="true">
                      {criticalAdvice[cat.id].emoji}
                    </span>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-red-700 dark:text-red-300">
                        <span className="rounded-full bg-red-200 px-2 py-0.5 text-[10px] text-red-800 dark:bg-red-800 dark:text-red-100">
                          相談先
                        </span>
                        {categoryProfessionalMap[cat.id]}
                      </div>
                      <p className="text-xs text-red-700 dark:text-red-300">
                        {criticalAdvice[cat.id].reason}
                      </p>
                      <div className="rounded-lg bg-white p-2.5 dark:bg-gray-900">
                        <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                          {'\uD83E\uDE7A'} 今すぐできること
                        </div>
                        <ul className="space-y-1">
                          {criticalAdvice[cat.id].immediateActions.map((a, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5 text-xs text-gray-700 dark:text-gray-300"
                            >
                              <span className="mt-0.5 text-teal-500">&#10003;</span>
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="rounded-md bg-white/70 px-2 py-1.5 text-[11px] italic text-gray-600 dark:bg-gray-900/40 dark:text-gray-400">
                        {'\uD83D\uDCAC '}
                        {criticalAdvice[cat.id].narrative}
                      </p>
                    </div>
                  </div>
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
