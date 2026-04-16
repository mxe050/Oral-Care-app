import { Link } from 'react-router-dom'
import { BookOpen, HelpCircle, ClipboardList, Users } from 'lucide-react'

const sections = [
  {
    to: '/ohat/learn',
    icon: BookOpen,
    title: '学ぶ',
    description: '8カテゴリの判定基準と嚥下5期モデルとの関連を学ぶ',
    color: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
  },
  {
    to: '/ohat/quiz',
    icon: HelpCircle,
    title: '写真判定クイズ',
    description: '症例写真を見てスコアを判定するトレーニング',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  },
  {
    to: '/ohat/clinical',
    icon: ClipboardList,
    title: '臨床記録',
    description: 'OHAT-J評価フォームで記録・スコア推移を確認',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  },
  {
    to: '/ohat/next-action',
    icon: Users,
    title: '多職種連携クイズ',
    description: 'スコアに応じた適切な相談先を判断するクイズ',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  },
]

export function OhatHubPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          OHAT-J マスター
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          口腔アセスメントの「見る目」を養う
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
