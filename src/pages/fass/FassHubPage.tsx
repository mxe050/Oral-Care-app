import { Link } from 'react-router-dom'
import { BookOpen, Search, Video, BarChart3 } from 'lucide-react'

const sections = [
  {
    to: '/fass/learn',
    icon: BookOpen,
    title: '学ぶ',
    description: 'CORE10の10項目を3群に分けて段階的に学習',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  },
  {
    to: '/fass/mistake-quiz',
    icon: Search,
    title: '間違い探しクイズ',
    description: '食事介助場面の問題点を見つけるトレーニング',
    color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  },
  {
    to: '/fass/self-check',
    icon: Video,
    title: 'セルフチェック',
    description: 'CORE10チェックリストで自分の介助スキルを評価',
    color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  },
  {
    to: '/fass/evidence',
    icon: BarChart3,
    title: 'エビデンス',
    description: 'FASS研究の重要な知見とデータ',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  },
]

export function FassHubPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          CORE10 マスター
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          食事介助の「手の技」を客観的に評価・向上させる
        </p>
      </div>

      <div className="space-y-3">
        {sections.map(({ to, icon: Icon, title, description, color }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md active:scale-[0.98] dark:border-gray-700 dark:bg-gray-900"
          >
            <div className={`${color} flex h-10 w-10 shrink-0 items-center justify-center rounded-lg`}>
              <Icon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">{title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
