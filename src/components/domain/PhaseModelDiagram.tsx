import { useState } from 'react'
import type { SwallowingPhase } from '../../types/ohat'
import { PHASE_MODEL } from '../../data/phase-model'

interface Props {
  highlightedPhases: SwallowingPhase[]
  explanation: string
  onPhaseSelect?: (phase: SwallowingPhase) => void
}

const phaseGradients: Record<SwallowingPhase, string> = {
  anticipatory: 'from-blue-400 to-blue-600',
  preparatory: 'from-green-400 to-green-600',
  oral: 'from-yellow-400 to-yellow-600',
  pharyngeal: 'from-orange-400 to-orange-600',
  esophageal: 'from-red-400 to-red-600',
}

const phaseColorsLight: Record<SwallowingPhase, string> = {
  anticipatory: 'bg-blue-100 text-blue-400 dark:bg-blue-900/30 dark:text-blue-600',
  preparatory: 'bg-green-100 text-green-400 dark:bg-green-900/30 dark:text-green-600',
  oral: 'bg-yellow-100 text-yellow-400 dark:bg-yellow-900/30 dark:text-yellow-600',
  pharyngeal: 'bg-orange-100 text-orange-400 dark:bg-orange-900/30 dark:text-orange-600',
  esophageal: 'bg-red-100 text-red-400 dark:bg-red-900/30 dark:text-red-600',
}

export function PhaseModelDiagram({ highlightedPhases, explanation, onPhaseSelect }: Props) {
  const [selectedPhase, setSelectedPhase] = useState<SwallowingPhase | null>(null)

  const handlePhaseClick = (phaseId: SwallowingPhase) => {
    setSelectedPhase(selectedPhase === phaseId ? null : phaseId)
    onPhaseSelect?.(phaseId)
  }

  const selectedInfo = selectedPhase
    ? PHASE_MODEL.find((p) => p.phase === selectedPhase)
    : null

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">
        嚥下5期モデルとの関連
      </h4>

      <div className="flex gap-1.5">
        {PHASE_MODEL.map((phase) => {
          const isHighlighted = highlightedPhases.includes(phase.phase)
          const isSelected = selectedPhase === phase.phase

          return (
            <button
              key={phase.phase}
              onClick={() => handlePhaseClick(phase.phase)}
              className={`flex-1 rounded-xl p-2.5 text-center text-xs transition-all duration-300 ${
                isHighlighted
                  ? `bg-gradient-to-br ${phaseGradients[phase.phase]} text-white font-bold shadow-md ${
                      isSelected ? 'scale-110 ring-2 ring-white/50 shadow-lg' : 'scale-105'
                    }`
                  : `${phaseColorsLight[phase.phase]} opacity-60 ${
                      isSelected ? 'scale-105 opacity-80' : ''
                    }`
              }`}
            >
              <div className="font-bold">{phase.nameJa}</div>
              <div className={`mt-0.5 text-[10px] ${isHighlighted ? 'text-white/80' : 'opacity-70'}`}>
                {phase.nameEn.split(' ')[0]}
              </div>
            </button>
          )
        })}
      </div>

      {selectedInfo && (
        <div className="animate-in slide-in-from-top rounded-xl border border-gray-200 bg-white p-3 text-xs shadow-sm transition-all dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-2 font-bold text-gray-800 dark:text-gray-200">
            {selectedInfo.nameJa} ({selectedInfo.nameEn})
          </div>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            {selectedInfo.funFact}
          </p>
          {selectedInfo.keyStructures.length > 0 && (
            <div className="mb-1">
              <span className="font-bold text-gray-700 dark:text-gray-300">主要構造: </span>
              <span className="text-gray-600 dark:text-gray-400">
                {selectedInfo.keyStructures.join(', ')}
              </span>
            </div>
          )}
          {selectedInfo.observationSigns.length > 0 && (
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">観察ポイント: </span>
              <span className="text-gray-600 dark:text-gray-400">
                {selectedInfo.observationSigns.join(', ')}
              </span>
            </div>
          )}
        </div>
      )}

      <p className="rounded-xl bg-gray-100 p-3 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
        {explanation}
      </p>
    </div>
  )
}
