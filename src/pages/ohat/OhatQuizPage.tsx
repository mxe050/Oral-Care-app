import { useState, useCallback } from 'react'
import { OHAT_QUIZ_ITEMS } from '../../data/ohat-quiz-items'
import { QuizFeedback } from '../../components/ui/QuizFeedback'
import { AnimatedScore } from '../../components/ui/AnimatedScore'
import { BadgePopup } from '../../components/ui/BadgePopup'
import { useProgressStore } from '../../stores/progress-store'
import { BADGES, XP_ACTIONS } from '../../types/common'
import type { DifficultyLevel } from '../../types/quiz'

const difficultyLabels: Record<DifficultyLevel, string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
}

const difficultyDescriptions: Record<DifficultyLevel, string> = {
  beginner: '典型的な症例で基本を学ぶ -- まずはここから',
  intermediate: '境界例の判定力を鍛える -- 実践的な問題',
  advanced: '複合所見・臨床判断を含む -- 腕試し',
}

const difficultyGradients: Record<DifficultyLevel, string> = {
  beginner: 'from-green-400 to-green-600',
  intermediate: 'from-yellow-400 to-yellow-600',
  advanced: 'from-red-400 to-red-600',
}

export function OhatQuizPage() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel | null>(null)
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

  const questions = difficulty
    ? OHAT_QUIZ_ITEMS.filter((q) => q.difficulty === difficulty)
    : []
  const question = questions[currentIndex]
  const isFinished = difficulty !== null && currentIndex >= questions.length

  const handleSelect = useCallback(
    (optionId: string) => {
      if (showFeedback || !question) return
      setSelectedId(optionId)
      setShowFeedback(true)
      const isCorrect = question.correctAnswerIds.includes(optionId)
      if (isCorrect) {
        setCorrectCount((c) => c + 1)
        setStreak((s) => s + 1)
        addXp(XP_ACTIONS.quizCorrect)

        // Check streak badges
        const newStreak = streak + 1
        if (newStreak === 3 && !badges.some((b) => b.id === 'quizStreak3')) {
          addBadge('quizStreak3', BADGES.quizStreak3.name)
          setShowBadge(BADGES.quizStreak3)
        }
        if (newStreak === 5 && !badges.some((b) => b.id === 'quizStreak5')) {
          addBadge('quizStreak5', BADGES.quizStreak5.name)
          setShowBadge(BADGES.quizStreak5)
        }
      } else {
        setStreak(0)
      }
    },
    [showFeedback, question, streak, addXp, addBadge, badges],
  )

  const handleNext = () => {
    setSelectedId(null)
    setShowFeedback(false)
    setCurrentIndex((i) => i + 1)
  }

  const handleFinish = useCallback(() => {
    if (difficulty) {
      markCompleted(`ohat-quiz-${difficulty}`)
      if (correctCount === questions.length && questions.length > 0) {
        addXp(XP_ACTIONS.quizPerfect)
        if (!badges.some((b) => b.id === 'perfectQuiz')) {
          addBadge('perfectQuiz', BADGES.perfectQuiz.name)
          setShowBadge(BADGES.perfectQuiz)
        }
      }
    }
  }, [difficulty, correctCount, questions.length, markCompleted, addXp, addBadge, badges])

  const resetQuiz = (newDifficulty?: DifficultyLevel | null) => {
    setDifficulty(newDifficulty ?? null)
    setCurrentIndex(0)
    setCorrectCount(0)
    setStreak(0)
    setSelectedId(null)
    setShowFeedback(false)
  }

  // Difficulty selection
  if (!difficulty) {
    return (
      <div className="mx-auto max-w-lg space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">写真判定クイズ</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">難易度を選んでください</p>
        </div>
        <div className="space-y-3">
          {(['beginner', 'intermediate', 'advanced'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left transition-all hover:shadow-md active:scale-[0.98] dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${difficultyGradients[d]} text-lg font-bold text-white`}>
                  {d === 'beginner' ? '1' : d === 'intermediate' ? '2' : '3'}
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-gray-100">
                    {difficultyLabels[d]}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {difficultyDescriptions[d]}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Results
  if (isFinished) {
    // Trigger finish on first render
    if (currentIndex === questions.length) handleFinish()

    const isPerfect = correctCount === questions.length
    const earnedXp =
      correctCount * XP_ACTIONS.quizCorrect +
      (isPerfect ? XP_ACTIONS.quizPerfect : 0)

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
          <div className="mt-4 rounded-xl bg-teal-50 p-3 dark:bg-teal-950">
            <div className="text-lg font-bold text-teal-700 dark:text-teal-300">
              +{earnedXp} XP
            </div>
            <div className="text-xs text-teal-600 dark:text-teal-400">獲得経験値</div>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {isPerfect
              ? 'パーフェクト! 素晴らしい判定力です。'
              : correctCount >= questions.length * 0.7
                ? '良い成績です! もう少しで完璧です。'
                : '間違えた問題を復習して、判定力を高めましょう。'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => resetQuiz(difficulty)}
            className="flex-1 rounded-xl bg-white py-3 font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
          >
            もう一度
          </button>
          <button
            onClick={() => resetQuiz(null)}
            className="flex-1 rounded-xl bg-teal-600 py-3 font-bold text-white transition-all hover:bg-teal-700"
          >
            別の難易度に挑戦
          </button>
        </div>
        {showBadge && (
          <BadgePopup badge={showBadge} onClose={() => setShowBadge(null)} />
        )}
      </div>
    )
  }

  if (!question) return null

  const isCorrect = selectedId ? question.correctAnswerIds.includes(selectedId) : false

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {/* Header with streak */}
      <div className="flex items-center justify-between">
        <span className={`rounded-xl bg-gradient-to-r ${difficultyGradients[difficulty]} px-3 py-1 text-xs font-bold text-white`}>
          {difficultyLabels[difficulty]}
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

      {/* Progress bar */}
      <div className="h-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-teal-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <p className="text-base font-medium text-gray-900 dark:text-gray-100">
          {question.prompt}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt) => {
          let style = 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 hover:border-teal-300 hover:shadow-sm'
          if (showFeedback) {
            if (opt.isCorrect)
              style = 'border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950 ring-2 ring-green-300 dark:ring-green-700'
            else if (opt.id === selectedId && !opt.isCorrect)
              style = 'border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-950'
            else style = 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 opacity-60'
          } else if (opt.id === selectedId) {
            style = 'border-teal-400 bg-teal-50 dark:border-teal-600 dark:bg-teal-950'
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

      {/* Feedback */}
      {showFeedback && (
        <QuizFeedback
          correct={isCorrect}
          explanation={
            isCorrect
              ? question.narrativeFeedback.correct
              : `${question.narrativeFeedback.incorrect}\n\n${question.explanation}`
          }
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
