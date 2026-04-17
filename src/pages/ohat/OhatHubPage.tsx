import { Link } from 'react-router-dom'
import { BookOpen, HelpCircle, ClipboardList, Users, Trophy, Star } from 'lucide-react'
import { useProgressStore } from '../../stores/progress-store'
import { BADGES } from '../../types/common'
import { VideoLinkList } from '../../components/ui/VideoLinkList'

const ohatVideos = [
  { label: 'OHAT導入の意味', url: 'https://www.youtube.com/watch?v=xos9DBK-67M' },
  { label: '松尾先生解説', url: 'https://www.youtube.com/watch?v=Un7R1UjkCD0' },
  { label: '瀧内先生解説', url: 'https://www.youtube.com/watch?v=y0jRuWpuDZI' },
  { label: 'OHAT海外の動画', url: 'https://www.youtube.com/watch?v=rqrnP_K5Drw' },
] as const

const sections = [
  {
    to: '/ohat/learn',
    icon: BookOpen,
    title: '学ぶ',
    description: '8カテゴリの判定基準と嚥下5期モデルとの関連を学ぶ',
    gradient: 'from-teal-400 to-teal-600',
    sectionKey: 'ohat-learn',
  },
  {
    to: '/ohat/quiz',
    icon: HelpCircle,
    title: '写真判定クイズ',
    description: '症例写真を見てスコアを判定するトレーニング',
    gradient: 'from-blue-400 to-blue-600',
    sectionKey: 'ohat-quiz',
  },
  {
    to: '/ohat/clinical',
    icon: ClipboardList,
    title: 'バーチャル症例評価',
    description: '実症例の所見を読み、あなたの判定と専門家の判定を比べて学ぶ',
    gradient: 'from-purple-400 to-purple-600',
    sectionKey: 'ohat-clinical',
  },
  {
    to: '/ohat/next-action',
    icon: Users,
    title: '多職種連携クイズ',
    description: 'スコアに応じた適切な相談先を判断するクイズ',
    gradient: 'from-amber-400 to-amber-600',
    sectionKey: 'ohat-next-action',
  },
]

export function OhatHubPage() {
  const completedSections = useProgressStore((s) => s.completedSections)
  const getCompletionRate = useProgressStore((s) => s.getCompletionRate)
  const badges = useProgressStore((s) => s.badges)
  const progress = getCompletionRate('ohat')

  // Find next recommended section
  const nextRecommended = sections.find((s) => !completedSections[s.sectionKey])

  // OHAT-related badges
  const ohatBadges = badges.filter((b) =>
    ['ohatComplete', 'perfectQuiz', 'clinicalFirst', 'quizStreak3', 'quizStreak5'].includes(b.id),
  )

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          OHAT-J マスター
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          口腔アセスメントの「見る目」を養う
        </p>
        {progress > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>モジュール進捗</span>
              <span className="font-bold text-teal-600 dark:text-teal-400">{progress}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {sections.map(({ to, icon: Icon, title, description, gradient, sectionKey }) => {
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
                <span className="absolute -top-2 right-3 flex items-center gap-1 rounded-full bg-teal-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
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
            </Link>
          )
        })}
      </div>

      {/* Video learning links */}
      <VideoLinkList links={[...ohatVideos]} accent="teal" />

      {/* Earned badges for this module */}
      {ohatBadges.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-2 flex items-center gap-2">
            <Trophy size={14} className="text-amber-500" />
            <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300">獲得バッジ</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {ohatBadges.map((b) => {
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
