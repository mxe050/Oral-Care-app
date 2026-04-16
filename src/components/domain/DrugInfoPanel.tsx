import type { DrugInfo } from '../../types/ohat'
import { Pill } from 'lucide-react'

interface Props {
  drugInfo: DrugInfo
}

export function DrugInfoPanel({ drugInfo }: Props) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
      <div className="mb-3 flex items-center gap-2">
        <Pill size={16} className="text-amber-600" />
        <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300">
          {drugInfo.title}
        </h4>
      </div>
      <p className="mb-3 text-xs text-amber-700 dark:text-amber-400">
        発症：投与開始1週間以内 / 回復：中止後約2週間 / 常用量でも発症
      </p>
      <div className="space-y-2">
        {drugInfo.medications.map((med) => (
          <div
            key={med.genericName}
            className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-2 text-xs dark:bg-gray-900/40"
          >
            <div>
              <span className="font-bold text-gray-900 dark:text-gray-100">{med.genericName}</span>
              <span className="ml-2 text-gray-500">({med.category})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
