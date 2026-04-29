import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Smile, Brain, Utensils, BookOpen, Trophy, Sparkles, ChevronDown, Droplets, AlertTriangle, Stethoscope, ChevronRight, DoorOpen, Newspaper } from 'lucide-react'
import { useProgressStore } from '../stores/progress-store'
import { XpDisplay } from '../components/ui/XpDisplay'
import { StreakDisplay } from '../components/ui/StreakDisplay'
import { QuizFeedback } from '../components/ui/QuizFeedback'
import { OHAT_QUIZ_ITEMS } from '../data/ohat-quiz-items'
import { BADGES, XP_ACTIONS } from '../types/common'

const modules = [
  {
    to: '/ohat',
    icon: Smile,
    title: 'OHAT-J マスター',
    subtitle: '口を見る力を養う',
    description: '8カテゴリの口腔アセスメントを学ぶ',
    gradient: 'from-teal-400 to-teal-600',
    progressKey: 'ohat',
  },
  {
    to: '/oral-care',
    icon: Droplets,
    title: '口腔のケア',
    subtitle: 'ケアの手順を実践で学ぶ',
    description: '手技・注意点をインタラクティブに',
    gradient: 'from-cyan-400 to-cyan-600',
    progressKey: 'oral-care',
  },
  {
    to: '/swallow',
    icon: Brain,
    title: '嚥下の知識',
    subtitle: '食べ物の旅を追え',
    description: '嚥下5相モデルと食事観察を学ぶ',
    gradient: 'from-purple-400 to-purple-600',
    progressKey: 'swallow',
  },
  {
    to: '/fass',
    icon: Utensils,
    title: 'FASS・CORE10 マスター',
    subtitle: '食を助ける力を磨く',
    description: '10項目の食事介助スキルを鍛える',
    gradient: 'from-amber-400 to-amber-600',
    progressKey: 'fass',
  },
]

export function HomePage() {
  const getCompletionRate = useProgressStore((s) => s.getCompletionRate)
  const badges = useProgressStore((s) => s.badges)
  const checkStreak = useProgressStore((s) => s.checkStreak)
  const addXp = useProgressStore((s) => s.addXp)

  // Check streak on home load
  useMemo(() => {
    checkStreak()
  }, [checkStreak])

  // Daily challenge: pick a random quiz question
  const dailyChallenge = useMemo(() => {
    const today = new Date().toDateString()
    const seed = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    return OHAT_QUIZ_ITEMS[seed % OHAT_QUIZ_ITEMS.length]
  }, [])

  const [challengeOpen, setChallengeOpen] = useState(false)
  const [challengeSelectedId, setChallengeSelectedId] = useState<string | null>(null)
  const challengeAnswered = challengeSelectedId !== null
  const challengeIsCorrect = challengeAnswered && dailyChallenge
    ? dailyChallenge.correctAnswerIds.includes(challengeSelectedId!)
    : false

  const handleChallengeSelect = (optionId: string) => {
    if (challengeAnswered || !dailyChallenge) return
    setChallengeSelectedId(optionId)
    const isCorrect = dailyChallenge.correctAnswerIds.includes(optionId)
    if (isCorrect) addXp(XP_ACTIONS.quizCorrect)
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {/* 注意書き（免責） */}
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
        <div className="flex gap-3">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="flex-1 text-xs leading-relaxed text-amber-900 dark:text-amber-100">
            <p className="font-bold">本アプリは学習補助ツールです</p>
            <p className="mt-1">
              内容に間違いが含まれている可能性があります。
              教育使用の前に、必ず責任者が内容を確認してください。
            </p>
          </div>
        </div>
      </div>

      {/* XP & Streak */}
      <XpDisplay />
      <StreakDisplay />

      {/* Daily Challenge - inline answerable */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-lg">
        <button
          type="button"
          onClick={() => setChallengeOpen((v) => !v)}
          className="block w-full p-5 text-left transition-all hover:shadow-xl active:scale-[0.99]"
        >
          <div className="mb-2 flex items-center gap-2">
            <Sparkles size={18} />
            <span className="text-sm font-bold uppercase tracking-wider opacity-90">
              今日のチャレンジ
            </span>
            <ChevronDown
              size={18}
              className={`ml-auto transition-transform duration-300 ${challengeOpen ? 'rotate-180' : ''}`}
            />
          </div>
          <p className="text-sm leading-relaxed opacity-95">
            {dailyChallenge?.prompt ?? 'クイズに挑戦して知識を試そう!'}
          </p>
          {!challengeOpen && (
            <div className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold backdrop-blur">
              挑戦する →
            </div>
          )}
        </button>

        {challengeOpen && dailyChallenge && (
          <div className="space-y-3 bg-white/10 p-5 backdrop-blur">
            {dailyChallenge.options.map((opt) => {
              let style = 'border-white/40 bg-white/20 hover:bg-white/30'
              if (challengeAnswered) {
                if (opt.isCorrect)
                  style = 'border-green-300 bg-green-500/30 ring-2 ring-green-300'
                else if (opt.id === challengeSelectedId)
                  style = 'border-red-300 bg-red-500/30'
                else style = 'border-white/20 bg-white/10 opacity-60'
              } else if (opt.id === challengeSelectedId) {
                style = 'border-white bg-white/30'
              }
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleChallengeSelect(opt.id)}
                  disabled={challengeAnswered}
                  className={`w-full rounded-xl border-2 p-3 text-left text-sm font-medium text-white transition-all ${style}`}
                >
                  {opt.text}
                </button>
              )
            })}

            {challengeAnswered && (
              <div className="rounded-xl bg-white/95 p-1 text-gray-900">
                <QuizFeedback
                  correct={challengeIsCorrect}
                  explanation={
                    challengeIsCorrect
                      ? dailyChallenge.narrativeFeedback.correct
                      : `${dailyChallenge.narrativeFeedback.incorrect}\n\n${dailyChallenge.explanation}`
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Module Cards */}
      <div className="space-y-4">
        {modules.map(({ to, icon: Icon, title, subtitle, description, gradient, progressKey }) => {
          const progress = getCompletionRate(progressKey)
          const circumference = 2 * Math.PI * 20
          const strokeDashoffset = circumference - (progress / 100) * circumference

          return (
            <Link
              key={to}
              to={to}
              className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md active:scale-[0.98] dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  {/* Progress ring */}
                  <svg width={52} height={52} className="-rotate-90">
                    <circle
                      cx={26}
                      cy={26}
                      r={20}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-gray-100 dark:text-gray-800"
                    />
                    {progress > 0 && (
                      <circle
                        cx={26}
                        cy={26}
                        r={20}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="text-teal-500 transition-all duration-700"
                      />
                    )}
                  </svg>
                  <div className={`absolute inset-0 flex items-center justify-center`}>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white`}>
                      <Icon size={18} />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">{title}</h3>
                  <p className="text-sm font-medium text-teal-600 dark:text-teal-400">{subtitle}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>
                  {progress > 0 && (
                    <div className="mt-2 text-xs font-bold text-teal-600 dark:text-teal-400">
                      {progress}% 完了
                    </div>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* 疾患から学ぼう - 独立ボタン */}
      <Link
        to="/diseases"
        className="flex items-center gap-4 rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 transition-all hover:border-emerald-500 hover:shadow-md active:scale-[0.98] dark:border-emerald-700 dark:from-emerald-950 dark:to-teal-950 dark:hover:border-emerald-500"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-sm">
          <Stethoscope size={22} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-gray-100">疾患から学ぼう</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            疾患別のケア技法・コミュニケーション戦略を体系的に学ぶ
          </p>
        </div>
        <ChevronRight size={20} className="text-gray-400 dark:text-gray-500" />
      </Link>

      {/* 勝負は病室入室前から - 独立ボタン */}
      <Link
        to="/diseases/pre-entry"
        className="flex items-center gap-4 rounded-2xl border-2 border-rose-300 bg-gradient-to-br from-rose-50 to-pink-50 p-4 transition-all hover:border-rose-500 hover:shadow-md active:scale-[0.98] dark:border-rose-700 dark:from-rose-950 dark:to-pink-950 dark:hover:border-rose-500"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 text-white shadow-sm">
          <DoorOpen size={22} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-gray-100">勝負は病室入室前から</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ノック・声のトーン・雰囲気づくりが、口腔ケアと食事介助の質を決める
          </p>
        </div>
        <ChevronRight size={20} className="text-gray-400 dark:text-gray-500" />
      </Link>

      {/* その他の最新情報 - 独立ボタン */}
      <Link
        to="/news"
        className="flex items-center gap-4 rounded-2xl border-2 border-sky-300 bg-gradient-to-br from-sky-50 to-cyan-50 p-4 transition-all hover:border-sky-500 hover:shadow-md active:scale-[0.98] dark:border-sky-700 dark:from-sky-950 dark:to-cyan-950 dark:hover:border-sky-500"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-600 text-white shadow-sm">
          <Newspaper size={22} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-gray-100">その他の最新情報</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            口腔ケア・摂食嚥下に関連する最新の臨床エビデンス・トピック
          </p>
        </div>
        <ChevronRight size={20} className="text-gray-400 dark:text-gray-500" />
      </Link>

      {/* Earned Badges */}
      {badges.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-3 flex items-center gap-2">
            <Trophy size={16} className="text-amber-500" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">獲得バッジ</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => {
              const badgeInfo = BADGES[b.id as keyof typeof BADGES]
              return (
                <div
                  key={b.id}
                  className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs dark:bg-gray-800"
                  title={badgeInfo?.description}
                >
                  <span>{badgeInfo?.emoji ?? '🏅'}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {badgeInfo?.name ?? b.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Prologue Link */}
      <Link
        to="/prologue"
        className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-500 transition-all hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700 dark:border-gray-600 dark:text-gray-400 dark:hover:border-teal-600 dark:hover:bg-teal-950 dark:hover:text-teal-300"
      >
        <BookOpen size={16} />
        なぜ口腔ケアが大切なのか?
      </Link>
    </div>
  )
}
