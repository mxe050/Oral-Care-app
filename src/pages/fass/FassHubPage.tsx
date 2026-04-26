import { Link } from 'react-router-dom'
import { BookOpen, Search, Video, BarChart3, Trophy, Star, PlayCircle, AlertCircle, MessageCircleHeart } from 'lucide-react'
import { useProgressStore } from '../../stores/progress-store'
import { BADGES } from '../../types/common'
import { VideoLinkList, type VideoLink } from '../../components/ui/VideoLinkList'

const core10Videos: VideoLink[] = [
  { label: 'Core10とは', url: 'https://www.youtube.com/watch?v=avR3CxZt_D8' },
  { label: 'Core10解説', url: 'https://www.youtube.com/watch?v=X7P_rAsfgT8' },
]

const sections = [
  {
    to: '/fass/learn',
    icon: BookOpen,
    title: '学ぶ',
    description: 'CORE10の10項目を3群に分けて段階的に学習',
    gradient: 'from-amber-400 to-amber-600',
    sectionKey: 'fass-learn',
  },
  {
    to: '/fass/mistake-quiz',
    icon: Search,
    title: '間違い探しクイズ',
    description: '食事介助場面の問題点を見つけるトレーニング',
    gradient: 'from-red-400 to-red-600',
    sectionKey: 'fass-mistake-quiz',
  },
  {
    to: '/fass/ng-quiz',
    icon: AlertCircle,
    title: '食事介助 NGクイズ',
    description: '基本編・ベテラン編全30問でNG行動を見抜く力を鍛える',
    gradient: 'from-emerald-400 to-emerald-600',
    sectionKey: 'fass-ng-quiz',
  },
  {
    to: '/fass/conversation',
    icon: MessageCircleHeart,
    title: '会話で学ぶ (FASS)',
    description: '患者との会話・観察からFASS 10項目を判定するストーリー学習',
    gradient: 'from-pink-400 to-rose-500',
    sectionKey: 'fass-conversation',
  },
  {
    to: '/fass/self-check',
    icon: Video,
    title: 'バーチャル介助評価',
    description: '他者の介助場面をCORE10で判定し、専門家と見比べて学ぶ',
    gradient: 'from-green-400 to-green-600',
    sectionKey: 'fass-self-check',
  },
  {
    to: '/fass/evidence',
    icon: BarChart3,
    title: 'エビデンス',
    description: 'FASS研究の重要な知見とデータ',
    gradient: 'from-blue-400 to-blue-600',
    sectionKey: 'fass-evidence',
  },
]

export function FassHubPage() {
  const completedSections = useProgressStore((s) => s.completedSections)
  const getCompletionRate = useProgressStore((s) => s.getCompletionRate)
  const badges = useProgressStore((s) => s.badges)
  const progress = getCompletionRate('fass')

  const nextRecommended = sections.find((s) => !completedSections[s.sectionKey])

  const fassBadges = badges.filter((b) =>
    ['core10Complete', 'perfectQuiz'].includes(b.id),
  )

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          FASS・CORE10 マスター
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          食事介助の「手の技」を客観的に評価・向上させる
        </p>
        {progress > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>モジュール進捗</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{progress}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-700"
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
                <span className="absolute -top-2 right-3 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
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

      {/* 独立ボタン: 動画で学ぶ Core10 評価トレーニング（エビデンスの下） */}
      <Link
        to="/fass/video-training"
        className="flex items-center gap-4 rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4 transition-all hover:border-amber-500 hover:shadow-md active:scale-[0.98] dark:border-amber-700 dark:from-amber-950 dark:to-orange-950 dark:hover:border-amber-500"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
          <PlayCircle size={22} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-gray-100">動画で学ぶ Core10 評価トレーニング</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            実際の食事介助動画4本を観察し、Core 10 で判定する実践学習
          </p>
        </div>
      </Link>

      {/* Video learning links */}
      <VideoLinkList links={core10Videos} accent="amber" />

      {fassBadges.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-2 flex items-center gap-2">
            <Trophy size={14} className="text-amber-500" />
            <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300">獲得バッジ</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {fassBadges.map((b) => {
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
