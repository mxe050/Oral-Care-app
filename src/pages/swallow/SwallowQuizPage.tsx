import { useState, useMemo } from 'react'
import { SWALLOWING_QUIZ_ITEMS as SWALLOWING_QUIZ } from '../../data/swallowing-quiz'
import { QuizFeedback } from '../../components/ui/QuizFeedback'
import { AnimatedScore } from '../../components/ui/AnimatedScore'
import { BadgePopup } from '../../components/ui/BadgePopup'
import { useProgressStore } from '../../stores/progress-store'
import { BADGES, XP_ACTIONS } from '../../types/common'

export function SwallowQuizPage() {
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showBadge, setShowBadge] = useState<{ name: string; emoji: string; description: string } | null>(null)

  const addXp = useProgressStore((s) => s.addXp)
  const addBadge = useProgressStore((s) => s.addBadge)
  const markCompleted = useProgressStore((s) => s.markCompleted)
  const badges = useProgressStore((s) => s.badges)

  // Shuffle questions once on start
  const questions = useMemo(() => {
    if (!started) return []
    return [...SWALLOWING_QUIZ].sort(() => Math.random() - 0.5)
  }, [started])

  const question = questions[currentIndex]
  const isFinished = started && currentIndex >= questions.length

  if (!started) {
    return (
      <div className="mx-auto max-w-lg space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">嚥下クイズ</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            嚥下の知識をテストしましょう
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-gray-900">
          <div className="mb-3 text-5xl">{'\uD83E\uDDE0'}</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            嚥下知識クイズ
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            嚥下5相モデルに関する{SWALLOWING_QUIZ.length}問のクイズです。
            各フェーズの知識をテストしましょう。
          </p>
          <button
            onClick={() => setStarted(true)}
            className="mt-4 rounded-xl bg-purple-600 px-8 py-3 font-bold text-white transition-all hover:bg-purple-700 active:scale-[0.98]"
          >
            クイズを始める
          </button>
        </div>
      </div>
    )
  }

  if (isFinished) {
    markCompleted('swallow-quiz')
    const isPerfect = correctCount === questions.length
    const earnedXp = correctCount * XP_ACTIONS.quizCorrect + (isPerfect ? XP_ACTIONS.quizPerfect : 0)

    return (
      <div className="mx-auto max-w-lg space-y-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
            クイズ完了!
          </h2>
          <AnimatedScore
            score={correctCount}
            maxScore={questions.length}
            label="正解数"
          />
          <div className="mt-4 rounded-xl bg-purple-50 p-3 dark:bg-purple-950">
            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
              +{earnedXp} XP
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {isPerfect
              ? 'パーフェクト! 嚥下の知識が素晴らしいです!'
              : '嚥下の知識が深まりました。復習して更に理解を深めましょう。'}
          </p>
        </div>
        <button
          onClick={() => {
            setStarted(false)
            setCurrentIndex(0)
            setCorrectCount(0)
            setStreak(0)
            setSelectedId(null)
            setShowFeedback(false)
          }}
          className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white transition-all hover:bg-purple-700"
        >
          もう一度
        </button>
        {showBadge && (
          <BadgePopup badge={showBadge} onClose={() => setShowBadge(null)} />
        )}
      </div>
    )
  }

  if (!question) return null

  const handleSelect = (optionId: string) => {
    if (showFeedback) return
    setSelectedId(optionId)
    setShowFeedback(true)
    const correct = question.options.find((o) => o.id === optionId)?.isCorrect ?? false
    if (correct) {
      setCorrectCount((c) => c + 1)
      setStreak((s) => s + 1)
      addXp(XP_ACTIONS.quizCorrect)

      const newStreak = streak + 1
      if (newStreak === 3 && !badges.some((b) => b.id === 'quizStreak3')) {
        addBadge('quizStreak3', BADGES.quizStreak3.name)
        setShowBadge(BADGES.quizStreak3)
      }
    } else {
      setStreak(0)
    }
  }

  const handleNext = () => {
    setSelectedId(null)
    setShowFeedback(false)
    setCurrentIndex((i) => i + 1)
  }

  const selectedOption = question.options.find((o) => o.id === selectedId)
  const isCorrect = selectedOption?.isCorrect ?? false

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="flex items-center justify-between">
        <span className="rounded-xl bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 dark:bg-purple-900 dark:text-purple-300">
          嚥下クイズ
        </span>
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <span className="animate-pulse rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700 dark:bg-orange-900 dark:text-orange-300">
              {'\uD83D\uDD25'} {streak}連続
            </span>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-purple-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <p className="text-base font-medium text-gray-900 dark:text-gray-100">
          {question.prompt}
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((opt) => {
          let style = 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 hover:border-purple-300'
          if (showFeedback) {
            if (opt.isCorrect)
              style = 'border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950 ring-2 ring-green-300 dark:ring-green-700'
            else if (opt.id === selectedId && !opt.isCorrect)
              style = 'border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-950'
            else style = 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 opacity-60'
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={showFeedback}
              className={`w-full rounded-xl border-2 p-4 text-left text-sm transition-all ${style}`}
            >
              {opt.text}
            </button>
          )
        })}
      </div>

      {showFeedback && (
        <QuizFeedback
          correct={isCorrect}
          explanation={question.explanation}
          reference={question.reference}
          streakCount={isCorrect ? streak : 0}
          onNext={handleNext}
        />
      )}

      {showBadge && (
        <BadgePopup badge={showBadge} onClose={() => setShowBadge(null)} />
      )}
    </div>
  )
}
