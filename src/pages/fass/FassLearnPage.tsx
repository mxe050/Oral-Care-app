import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, CheckCircle, Lightbulb, Award, AlertTriangle, Info, ClipboardCheck } from 'lucide-react'
import { CORE10_ITEMS } from '../../data/core10-items'
import { PhaseModelDiagram } from '../../components/domain/PhaseModelDiagram'
import { ReferenceList } from '../../components/ui/ReferenceList'
import { FlipCard } from '../../components/ui/FlipCard'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'
import type { Core10Group } from '../../types/core10'

const groupInfo: Record<Core10Group, { name: string; description: string; gradient: string; border: string }> = {
  A: { name: 'A群：姿勢の準備', description: '安全な食事のための体位・環境を整える', gradient: 'from-blue-400 to-blue-600', border: 'border-l-blue-500' },
  B: { name: 'B群：食前安全確認', description: '嚥下機能の安全性を事前に確認する', gradient: 'from-amber-400 to-amber-600', border: 'border-l-amber-500' },
  C: { name: 'C群：介助技術', description: '一口ごとの介助における技術を磨く', gradient: 'from-red-400 to-red-600', border: 'border-l-red-500' },
}

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

const groups = (['A', 'B', 'C'] as const).map((g) => ({
  ...groupInfo[g],
  group: g,
  items: CORE10_ITEMS.filter((item) => item.group === g),
}))

export function FassLearnPage() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const completedSections = useProgressStore((s) => s.completedSections)
  const markCompleted = useProgressStore((s) => s.markCompleted)
  const addXp = useProgressStore((s) => s.addXp)

  const completedCount = CORE10_ITEMS.filter(
    (item) => completedSections[`fass-learn-${item.id}`],
  ).length

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id)
  }

  const handleComplete = (itemId: number) => {
    const key = `fass-learn-${itemId}`
    if (!completedSections[key]) {
      markCompleted(key)
      addXp(XP_ACTIONS.viewLesson)
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">CORE10 学習</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          10項目を3群に分けて段階的に学びましょう
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm dark:bg-gray-900">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700 dark:bg-amber-900 dark:text-amber-300">
          {completedCount}/{CORE10_ITEMS.length}
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
            項目学習済み
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-500"
              style={{ width: `${(completedCount / CORE10_ITEMS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Groups */}
      {groups.map(({ name, description, gradient, border, items }) => (
        <div key={name} className="space-y-3">
          {/* Group header */}
          <div className={`rounded-xl bg-gradient-to-r ${gradient} p-4 text-white shadow-sm`}>
            <h3 className="font-bold">{name}</h3>
            <p className="mt-0.5 text-xs opacity-90">{description}</p>
          </div>

          {/* Items */}
          {items.map((item) => {
            const isExpanded = expanded === item.id
            const isCompleted = completedSections[`fass-learn-${item.id}`]

            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-xl border-l-4 ${border} border bg-white transition-all dark:bg-gray-900 ${
                  isCompleted
                    ? 'border-green-200 dark:border-green-800'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {item.id}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {item.title}
                      </h4>
                      {isCompleted && <CheckCircle size={14} className="text-green-500" />}
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                      {item.funFact}
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-4 border-t border-gray-100 px-4 pb-4 pt-4 dark:border-gray-800">
                    {/* Fun fact */}
                    <div className="flex gap-2 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-3 dark:from-amber-950 dark:to-orange-950">
                      <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-500" />
                      <p className="text-xs font-medium text-amber-800 dark:text-amber-300">
                        {item.funFact}
                      </p>
                    </div>

                    {/* Medical rationale */}
                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
                      <div className="mb-1 flex items-center gap-1.5">
                        <Info size={14} className="text-blue-600 dark:text-blue-400" />
                        <h5 className="text-xs font-bold text-blue-700 dark:text-blue-300">
                          なぜ重要か（医学的根拠）
                        </h5>
                      </div>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        {item.medicalRationale}
                      </p>
                    </div>

                    {/* Specific criteria */}
                    {item.specificCriteria && (
                      <div className="rounded-xl border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
                        <div className="mb-1 flex items-center gap-1.5">
                          <ClipboardCheck size={14} className="text-green-600 dark:text-green-400" />
                          <h5 className="text-xs font-bold text-green-700 dark:text-green-300">
                            具体的な基準
                          </h5>
                        </div>
                        <p className="text-xs text-green-700 dark:text-green-300">
                          {item.specificCriteria}
                        </p>
                      </div>
                    )}

                    {/* 3-level scoring with FlipCards */}
                    <div>
                      <h5 className="mb-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                        採点基準（3段階）
                      </h5>
                      <div className="space-y-2">
                        {([0, 1, 2] as const).map((score) => (
                          <FlipCard
                            key={score}
                            front={
                              <div className={`rounded-xl border-2 p-3 ${scoreColorsFront[score]}`}>
                                <div className="flex items-center gap-2">
                                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${scoreBadge[score]}`}>
                                    {score}
                                  </span>
                                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                                    {scoreLabels[score]}
                                  </span>
                                </div>
                              </div>
                            }
                            back={
                              <div className={`rounded-xl border-2 p-3 ${scoreColorsBack[score]}`}>
                                <div className="mb-1 flex items-center gap-2">
                                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${scoreBadge[score]}`}>
                                    {score}
                                  </span>
                                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                                    {scoreLabels[score]}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-700 dark:text-gray-300">
                                  {item.scoreCriteria[score]}
                                </p>
                              </div>
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Phase model */}
                    <PhaseModelDiagram
                      highlightedPhases={item.swallowingPhases}
                      explanation={item.phaseExplanation}
                    />

                    {/* Error consequence */}
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950">
                      <div className="mb-1 flex items-center gap-1.5">
                        <AlertTriangle size={14} className="text-red-600 dark:text-red-400" />
                        <h5 className="text-xs font-bold text-red-700 dark:text-red-300">
                          エラーの結果
                        </h5>
                      </div>
                      <p className="text-xs text-red-700 dark:text-red-300">
                        {item.errorConsequence}
                      </p>
                    </div>

                    {/* References */}
                    <ReferenceList references={item.references} />

                    {/* Complete button */}
                    <button
                      onClick={() => handleComplete(item.id)}
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

                    <Link
                      to={`/fass/learn/${item.id}`}
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
      ))}
    </div>
  )
}
