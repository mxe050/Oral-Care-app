import type { SwallowingPhase } from '../../types/ohat'
import { PHASE_MODEL } from '../../data/phase-model'

interface Props {
  highlightedPhases: SwallowingPhase[]
  explanation: string
}

const phaseColors: Record<SwallowingPhase, string> = {
  anticipatory: 'bg-blue-500',
  preparatory: 'bg-green-500',
  oral: 'bg-yellow-500',
  pharyngeal: 'bg-orange-500',
  esophageal: 'bg-red-500',
}

const phaseColorsLight: Record<SwallowingPhase, string> = {
  anticipatory: 'bg-blue-100 dark:bg-blue-900',
  preparatory: 'bg-green-100 dark:bg-green-900',
  oral: 'bg-yellow-100 dark:bg-yellow-900',
  pharyngeal: 'bg-orange-100 dark:bg-orange-900',
  esophageal: 'bg-red-100 dark:bg-red-900',
}

export function PhaseModelDiagram({ highlightedPhases, explanation }: Props) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">
        嚥下5期モデルとの関連
      </h4>
      <div className="flex gap-1">
        {PHASE_MODEL.map((phase) => {
          const isHighlighted = highlightedPhases.includes(phase.id)
          return (
            <div
              key={phase.id}
              className={`flex-1 rounded-lg p-2 text-center text-xs transition-all ${
                isHighlighted
                  ? `${phaseColors[phase.id]} text-white font-bold shadow-md scale-105`
                  : `${phaseColorsLight[phase.id]} text-gray-500 dark:text-gray-400 opacity-60`
              }`}
            >
              <div>{phase.name}</div>
            </div>
          )
        })}
      </div>
      <p className="rounded-lg bg-gray-100 p-3 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
        {explanation}
      </p>
    </div>
  )
}
