import { useEffect, useState } from 'react'

interface Props {
  score: number
  maxScore: number
  label?: string
  size?: number
}

export function AnimatedScore({ score, maxScore, label, size = 120 }: Props) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const percentage = maxScore > 0 ? (animatedScore / maxScore) * 100 : 0

  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const color =
    percentage >= 80
      ? 'text-green-500'
      : percentage >= 50
        ? 'text-yellow-500'
        : 'text-red-500'

  const strokeColor =
    percentage >= 80
      ? '#22c55e'
      : percentage >= 50
        ? '#eab308'
        : '#ef4444'

  useEffect(() => {
    const duration = 1000
    const start = performance.now()
    const startValue = 0

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = Math.round(startValue + (score - startValue) * eased)
      setAnimatedScore(current)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [score])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Animated circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${color}`}>
            {animatedScore}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            / {maxScore}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </span>
      )}
    </div>
  )
}
