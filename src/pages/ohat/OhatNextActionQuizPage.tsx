import { useState } from 'react'
import { Users, Stethoscope, Pill, Sparkles as Teeth } from 'lucide-react'
import { NEXT_ACTION_QUIZ } from '../../data/ohat-next-action'
import { QuizFeedback } from '../../components/ui/QuizFeedback'
import { AnimatedScore } from '../../components/ui/AnimatedScore'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'

const professionalIcons: Record<string, typeof Users> = {
  '歯科医師': Teeth,
  '歯科衛生士': Stethoscope,
  '薬剤師': Pill,
}

export function OhatNextActionQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)

  const addXp = useProgressStore((s) => s.addXp)
  const markCompleted = useProgressStore((s) => s.markCompleted)

  const questions = NEXT_ACTION_QUIZ
  const question = questions[currentIndex]
  const isFinished = currentIndex >= questions.length

  if (isFinished) {
    const earnedXp = correctCount * XP_ACTIONS.quizCorrect
    markCompleted('ohat-next-action')

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
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {correctCount === questions.length
              ? '素晴らしい! 多職種連携の判断力が高いです!'
              : '多職種連携の判断力が向上しています。繰り返し学習しましょう。'}
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentIndex(0)
            setCorrectCount(0)
            setStreak(0)
            setSelectedId(null)
            setShowFeedback(false)
          }}
          className="w-full rounded-xl bg-teal-600 py-3 font-bold text-white transition-all hover:bg-teal-700"
        >
          もう一度
        </button>
      </div>
    )
  }

  if (!question) return null

  const handleSelect = (optionId: string) => {
    if (showFeedback) return
    setSelectedId(optionId)
    setShowFeedback(true)
    const isCorrect = question.correctAnswerIds.includes(optionId)
    if (isCorrect) {
      setCorrectCount((c) => c + 1)
      setStreak((s) => s + 1)
      addXp(XP_ACTIONS.quizCorrect)
    } else {
      setStreak(0)
    }
  }

  const handleNext = () => {
    setSelectedId(null)
    setShowFeedback(false)
    setCurrentIndex((i) => i + 1)
  }

  const isCorrect = selectedId ? question.correctAnswerIds.includes(selectedId) : false

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">多職種連携クイズ</h2>
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <span className="animate-pulse rounded-full bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700 dark:bg-orange-900 dark:text-orange-300">
              {'\uD83D\uDD25'} {streak}連続
            </span>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-teal-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
        <div className="mb-2 flex items-center gap-2">
          <Users size={18} className="text-amber-500" />
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">シナリオ</span>
        </div>
        <p className="text-base text-gray-900 dark:text-gray-100">{question.prompt}</p>
      </div>

      <div className="space-y-3">
        {question.options.map((opt) => {
          // Try to find an icon for the professional
          const ProfIcon = Object.entries(professionalIcons).find(([key]) =>
            opt.text.includes(key),
          )?.[1] ?? Users

          let style = 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 hover:border-teal-300'
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
              className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left text-sm transition-all ${style}`}
            >
              <ProfIcon size={20} className="shrink-0 text-gray-400 dark:text-gray-500" />
              {opt.text}
            </button>
          )
        })}
      </div>

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
    </div>
  )
}
