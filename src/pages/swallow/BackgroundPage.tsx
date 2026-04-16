import { useState } from 'react'
import { ChevronDown, Award, CheckCircle } from 'lucide-react'
import { SWALLOWING_BACKGROUND_STAGES as BACKGROUND_STAGES } from '../../data/swallowing-knowledge'
import { ReferenceList } from '../../components/ui/ReferenceList'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'

const stageEmojis = [
  '\uD83D\uDC74', // aging
  '\uD83C\uDFE5', // disease
  '\uD83E\uDDE0', // dementia
  '\uD83D\uDECF\uFE0F', // disuse
  '\uD83D\uDC8A', // medication
]

const stageColors = [
  'border-l-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950',
  'border-l-red-500 hover:bg-red-50 dark:hover:bg-red-950',
  'border-l-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950',
  'border-l-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950',
  'border-l-green-500 hover:bg-green-50 dark:hover:bg-green-950',
]

export function BackgroundPage() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const completedSections = useProgressStore((s) => s.completedSections)
  const markCompleted = useProgressStore((s) => s.markCompleted)
  const addXp = useProgressStore((s) => s.addXp)

  const completedCount = BACKGROUND_STAGES.filter(
    (_: unknown, i: number) => completedSections[`swallow-bg-${i}`],
  ).length

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          背景知識
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          なぜ嚥下障害が起こるか -- 5つの背景要因
        </p>
        <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {completedCount}/{BACKGROUND_STAGES.length} セクション学習済み
        </div>
      </div>

      <div className="space-y-3">
        {BACKGROUND_STAGES.map((stage: any, index: number) => {
          const isExpanded = expanded === index
          const isCompleted = completedSections[`swallow-bg-${index}`]

          return (
            <div
              key={index}
              className={`overflow-hidden rounded-xl border-l-4 ${stageColors[index % stageColors.length]} border border-gray-200 bg-white transition-all dark:border-gray-700 dark:bg-gray-900`}
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : index)}
                className="flex w-full items-center gap-3 p-4 text-left transition-colors"
              >
                <span className="text-2xl">{stageEmojis[index % stageEmojis.length]}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">
                      {stage.title ?? stage.name ?? `ステージ${index + 1}`}
                    </h3>
                    {isCompleted && <CheckCircle size={14} className="text-green-500" />}
                  </div>
                  {stage.summary && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                      {stage.summary}
                    </p>
                  )}
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-4 border-t border-gray-100 px-4 pb-4 pt-4 dark:border-gray-800">
                  {stage.description && (
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {stage.description}
                    </p>
                  )}

                  {stage.mechanisms && (
                    <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                      <h4 className="mb-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                        メカニズム
                      </h4>
                      <ul className="space-y-1">
                        {(stage.mechanisms as string[]).map((m: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <span className="mt-0.5">&#x2022;</span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {stage.nursingActions && (
                    <div className="rounded-xl border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
                      <h4 className="mb-2 text-xs font-bold text-green-700 dark:text-green-300">
                        看護のポイント
                      </h4>
                      <ul className="space-y-1">
                        {(stage.nursingActions as string[]).map((a: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-green-700 dark:text-green-300">
                            <span className="mt-0.5">&#x2022;</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {stage.references && (
                    <ReferenceList references={stage.references} />
                  )}

                  <button
                    onClick={() => {
                      const key = `swallow-bg-${index}`
                      if (!completedSections[key]) {
                        markCompleted(key)
                        addXp(XP_ACTIONS.viewLesson)
                      }
                    }}
                    disabled={isCompleted}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                      isCompleted
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-purple-600 text-white hover:bg-purple-700 active:scale-[0.98]'
                    }`}
                  >
                    {isCompleted ? (
                      <><CheckCircle size={16} /> 学習完了済み</>
                    ) : (
                      <><Award size={16} /> 学習完了 (+{XP_ACTIONS.viewLesson} XP)</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
