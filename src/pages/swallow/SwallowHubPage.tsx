import { Link } from 'react-router-dom'
import { Brain, Eye, HelpCircle, BookOpen, Trophy, Star } from 'lucide-react'
import { useProgressStore } from '../../stores/progress-store'
import { BADGES } from '../../types/common'

const sections = [
  {
    to: '/swallow/phases',
    icon: Brain,
    title: '嚥下5相モデル',
    description: '食べ物の旅を追え -- 5つのフェーズを学ぶ',
    gradient: 'from-purple-400 to-purple-600',
    emoji: '\uD83E\uDDE0',
    sectionKey: 'swallow-phases',
  },
  {
    to: '/swallow/meal-round',
    icon: Eye,
    title: '食事ラウンド：考えるOODA',
    description: '観察結果から状況判断→意思決定→実行を自分で考える',
    gradient: 'from-blue-400 to-blue-600',
    emoji: '\uD83D\uDC41\uFE0F',
    sectionKey: 'swallow-meal-round',
  },
  {
    to: '/swallow/quiz',
    icon: HelpCircle,
    title: '嚥下クイズ',
    description: '嚥下の知識をテストしよう',
    gradient: 'from-teal-400 to-teal-600',
    emoji: '\u2753',
    sectionKey: 'swallow-quiz',
  },
  {
    to: '/swallow/background',
    icon: BookOpen,
    title: '背景知識',
    description: 'なぜ嚥下障害が起こるか',
    gradient: 'from-amber-400 to-amber-600',
    emoji: '\uD83D\uDCDA',
    sectionKey: 'swallow-background',
  },
]

export function SwallowHubPage() {
  const completedSections = useProgressStore((s) => s.completedSections)
  const getCompletionRate = useProgressStore((s) => s.getCompletionRate)
  const badges = useProgressStore((s) => s.badges)
  const progress = getCompletionRate('swallow')

  const nextRecommended = sections.find((s) => !completedSections[s.sectionKey])

  const swallowBadges = badges.filter((b) =>
    ['swallowMaster'].includes(b.id),
  )

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          嚥下の知識
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          食べ物の旅路を理解し、安全な食事支援を学ぶ
        </p>
        {progress > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>モジュール進捗</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">{progress}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {sections.map(({ to, icon: Icon, title, description, gradient, emoji, sectionKey }) => {
          const isCompleted = completedSections[sectionKey]
          const isRecommended = nextRecommended?.sectionKey === sectionKey

          return (
            <Link
              key={to}
              to={to}
              className={`relative flex items-center gap-4 rounded-xl border bg-white p-4 transition-all hover:shadow-md active:scale-[0.98] dark:bg-gray-900 ${
                isCompleted
                  ? 'border-green-200 dark:border-green-800'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {isRecommended && (
                <span className="absolute -top-2 right-3 flex items-center gap-1 rounded-full bg-purple-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  <Star size={10} /> おすすめ
                </span>
              )}
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">{title}</h3>
                  {isCompleted && (
                    <span className="text-green-500">&#10003;</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
              </div>
              <span className="text-xl">{emoji}</span>
            </Link>
          )
        })}
      </div>

      {swallowBadges.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-2 flex items-center gap-2">
            <Trophy size={14} className="text-amber-500" />
            <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300">獲得バッジ</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {swallowBadges.map((b) => {
              const info = BADGES[b.id as keyof typeof BADGES]
              return (
                <span
                  key={b.id}
                  className="rounded-full bg-gray-100 px-2.5 py-1 text-xs dark:bg-gray-800"
                >
                  {info?.emoji} {info?.name}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
