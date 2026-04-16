import { useEffect, useState } from 'react'
import { LEVELS } from '../../types/common'
import { useProgressStore } from '../../stores/progress-store'

interface Props {
  compact?: boolean
}

export function XpDisplay({ compact = false }: Props) {
  const totalXp = useProgressStore((s) => s.totalXp)
  const getLevel = useProgressStore((s) => s.getLevel)
  const levelInfo = getLevel()

  const [displayXp, setDisplayXp] = useState(0)

  // Find next level threshold
  const nextLevel = LEVELS.find((l) => l.minXp > levelInfo.minXp)
  const xpInLevel = totalXp - levelInfo.minXp
  const xpForNext = nextLevel ? nextLevel.minXp - levelInfo.minXp : 1
  const progress = nextLevel ? Math.min((xpInLevel / xpForNext) * 100, 100) : 100

  useEffect(() => {
    const timer = setTimeout(() => setDisplayXp(totalXp), 100)
    return () => clearTimeout(timer)
  }, [totalXp])

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-xs">
        <span>{levelInfo.emoji}</span>
        <span className="font-bold text-teal-700 dark:text-teal-300">
          Lv.{levelInfo.level}
        </span>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{levelInfo.emoji}</span>
          <div>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Lv.{levelInfo.level} {levelInfo.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {displayXp} XP
            </div>
          </div>
        </div>
        {nextLevel && (
          <div className="text-right text-xs text-gray-400 dark:text-gray-500">
            次のレベルまで
            <br />
            <span className="font-bold text-teal-600 dark:text-teal-400">
              {nextLevel.minXp - totalXp} XP
            </span>
          </div>
        )}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
