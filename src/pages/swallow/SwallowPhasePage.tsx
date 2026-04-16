import { useState } from 'react'
import { Lightbulb, Award, CheckCircle } from 'lucide-react'
import { SWALLOWING_PHASE_DETAILS as SWALLOWING_PHASES } from '../../data/swallowing-knowledge'
import { ReferenceList } from '../../components/ui/ReferenceList'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'
import type { SwallowingPhase } from '../../types/ohat'

const phaseGradients: Record<SwallowingPhase, string> = {
  anticipatory: 'from-blue-400 to-blue-600',
  preparatory: 'from-green-400 to-green-600',
  oral: 'from-yellow-400 to-yellow-600',
  pharyngeal: 'from-orange-400 to-orange-600',
  esophageal: 'from-red-400 to-red-600',
}

const phaseLightColors: Record<SwallowingPhase, string> = {
  anticipatory: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
  preparatory: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
  oral: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800',
  pharyngeal: 'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800',
  esophageal: 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
}

export function SwallowPhasePage() {
  const [selectedPhase, setSelectedPhase] = useState<SwallowingPhase>('anticipatory')
  const completedSections = useProgressStore((s) => s.completedSections)
  const markCompleted = useProgressStore((s) => s.markCompleted)
  const addXp = useProgressStore((s) => s.addXp)

  const phase = SWALLOWING_PHASES.find((p) => p.phase === selectedPhase)
  const completedCount = SWALLOWING_PHASES.filter(
    (p) => completedSections[`swallow-phase-${p.phase}`],
  ).length

  const handleComplete = (phaseId: SwallowingPhase) => {
    const key = `swallow-phase-${phaseId}`
    if (!completedSections[key]) {
      markCompleted(key)
      addXp(XP_ACTIONS.viewLesson)
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          嚥下5相モデル
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          食べ物が口から胃に届くまでの5つのフェーズ
        </p>
        <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {completedCount}/{SWALLOWING_PHASES.length} フェーズ学習済み
        </div>
      </div>

      {/* Phase selector - large interactive diagram */}
      <div className="flex gap-1.5">
        {SWALLOWING_PHASES.map((p) => {
          const isSelected = selectedPhase === p.phase
          const isCompleted = completedSections[`swallow-phase-${p.phase}`]

          return (
            <button
              key={p.phase}
              onClick={() => setSelectedPhase(p.phase)}
              className={`relative flex-1 rounded-xl p-3 text-center transition-all duration-300 ${
                isSelected
                  ? `bg-gradient-to-br ${phaseGradients[p.phase]} text-white shadow-lg scale-105`
                  : `${phaseLightColors[p.phase]} border hover:scale-102`
              }`}
            >
              {isCompleted && (
                <span className="absolute -right-1 -top-1 text-green-500">
                  <CheckCircle size={14} />
                </span>
              )}
              <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                {p.nameJa}
              </div>
              <div className={`mt-0.5 text-[10px] ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                {p.nameEn.split(' ')[0]}
              </div>
            </button>
          )
        })}
      </div>

      {/* Arrow connector */}
      <div className="flex items-center justify-center gap-1 text-gray-300 dark:text-gray-600">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`h-2 w-2 rounded-full ${i === SWALLOWING_PHASES.findIndex((p) => p.phase === selectedPhase) ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
            {i < 4 && <div className="h-px w-4 bg-gray-300 dark:bg-gray-600" />}
          </div>
        ))}
      </div>

      {/* Phase detail */}
      {phase && (
        <div className="space-y-4">
          <div className={`rounded-xl border p-5 ${phaseLightColors[phase.phase]}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {phase.nameJa} ({phase.nameEn})
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              所要時間: {phase.duration}
            </p>
          </div>

          {/* Fun fact */}
          <div className="flex gap-2 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-3 dark:from-amber-950 dark:to-orange-950">
            <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-500" />
            <p className="text-xs font-medium text-amber-800 dark:text-amber-300">
              {phase.funFact}
            </p>
          </div>

          {/* Key structures */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <h4 className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
              主要構造
            </h4>
            <div className="flex flex-wrap gap-2">
              {phase.keyStructures.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Cranial nerves */}
          {phase.cranialNerves.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <h4 className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                関連脳神経
              </h4>
              <div className="flex flex-wrap gap-2">
                {phase.cranialNerves.map((n) => (
                  <span
                    key={n}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Observation signs */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
            <h4 className="mb-2 text-sm font-bold text-amber-700 dark:text-amber-300">
              観察ポイント
            </h4>
            <ul className="space-y-1">
              {phase.observationSigns.map((s) => (
                <li key={s} className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-300">
                  <span className="mt-0.5">&#x2022;</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Common disorders */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
            <h4 className="mb-2 text-sm font-bold text-red-700 dark:text-red-300">
              よくある障害
            </h4>
            <ul className="space-y-1">
              {phase.commonDisorders.map((d) => (
                <li key={d} className="flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
                  <span className="mt-0.5">&#x2022;</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Assessment methods */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
            <h4 className="mb-2 text-sm font-bold text-blue-700 dark:text-blue-300">
              評価方法
            </h4>
            <ul className="space-y-1">
              {phase.assessmentMethods.map((m) => (
                <li key={m} className="flex items-start gap-2 text-xs text-blue-700 dark:text-blue-300">
                  <span className="mt-0.5">&#x2022;</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Nursing points */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
            <h4 className="mb-2 text-sm font-bold text-green-700 dark:text-green-300">
              看護のポイント
            </h4>
            <ul className="space-y-1">
              {phase.nursingPoints.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-green-700 dark:text-green-300">
                  <span className="mt-0.5">&#x2022;</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* References */}
          <ReferenceList references={phase.references} />

          {/* Complete button */}
          <button
            onClick={() => handleComplete(phase.phase)}
            disabled={completedSections[`swallow-phase-${phase.phase}`]}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
              completedSections[`swallow-phase-${phase.phase}`]
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-purple-600 text-white hover:bg-purple-700 active:scale-[0.98]'
            }`}
          >
            {completedSections[`swallow-phase-${phase.phase}`] ? (
              <><CheckCircle size={16} /> 学習完了済み</>
            ) : (
              <><Award size={16} /> 学習完了 (+{XP_ACTIONS.viewLesson} XP)</>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
