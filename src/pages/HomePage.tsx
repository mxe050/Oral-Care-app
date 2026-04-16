import { Link } from 'react-router-dom'
import { Smile, Utensils, BookOpen } from 'lucide-react'
import { useProgressStore } from '../stores/progress-store'

const modules = [
  {
    to: '/ohat',
    icon: Smile,
    title: 'OHAT-J マスター',
    subtitle: '口を見る力を養う',
    description: '8カテゴリの口腔アセスメントを写真判定クイズで学ぶ',
    color: 'bg-teal-500',
    progressKey: 'ohat',
  },
  {
    to: '/fass',
    icon: Utensils,
    title: 'CORE10 マスター',
    subtitle: '食を助ける力を磨く',
    description: '10項目の食事介助スキルを間違い探しクイズで鍛える',
    color: 'bg-amber-500',
    progressKey: 'fass',
  },
]

export function HomePage() {
  const getCompletionRate = useProgressStore((s) => s.getCompletionRate)

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          OralCare Navi
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          新人看護師のための口腔管理教育アプリ
        </p>
      </div>

      <div className="space-y-4">
        {modules.map(({ to, icon: Icon, title, subtitle, description, color, progressKey }) => {
          const progress = getCompletionRate(progressKey)
          return (
            <Link
              key={to}
              to={to}
              className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md active:scale-[0.98] dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-start gap-4">
                <div className={`${color} flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">{title}</h3>
                  <p className="text-sm font-medium text-primary">{subtitle}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>
                  {progress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>進捗</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-primary transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <Link
        to="/prologue"
        className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-3 text-sm text-gray-500 transition-colors hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-400"
      >
        <BookOpen size={16} />
        なぜ口腔ケアが大切なのか？
      </Link>
    </div>
  )
}
