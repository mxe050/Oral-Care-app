import { useProgressStore } from '../../stores/progress-store'

interface Props {
  compact?: boolean
}

export function StreakDisplay({ compact = false }: Props) {
  const currentStreak = useProgressStore((s) => s.currentStreak)

  if (currentStreak === 0 && compact) return null

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-xs">
        <span className={currentStreak > 0 ? 'animate-pulse' : ''}>
          {currentStreak > 0 ? '\uD83D\uDD25' : '\u2744\uFE0F'}
        </span>
        <span className="font-bold text-orange-600 dark:text-orange-400">
          {currentStreak}日
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 dark:border-orange-800 dark:from-orange-950 dark:to-amber-950">
      <span className={`text-2xl ${currentStreak > 0 ? 'animate-pulse' : ''}`}>
        {currentStreak > 0 ? '\uD83D\uDD25' : '\u2744\uFE0F'}
      </span>
      <div>
        <div className="text-sm font-bold text-orange-800 dark:text-orange-200">
          {currentStreak > 0
            ? `${currentStreak}日連続!`
            : '今日から始めよう!'}
        </div>
        <div className="text-xs text-orange-600 dark:text-orange-400">
          {currentStreak >= 7
            ? 'すごい! 継続は力なり!'
            : currentStreak >= 3
              ? 'いい調子! 続けていこう!'
              : '毎日の学習でストリークを伸ばそう'}
        </div>
      </div>
    </div>
  )
}
