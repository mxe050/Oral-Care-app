import { useState } from 'react'
import { NEXT_ACTION_QUIZ } from '../../data/ohat-next-action'

export function OhatNextActionQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const questions = NEXT_ACTION_QUIZ
  const question = questions[currentIndex]
  const isFinished = currentIndex >= questions.length

  if (isFinished) {
    return (
      <div className="mx-auto max-w-lg space-y-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">クイズ完了</h2>
        <div className="rounded-2xl bg-white p-8 shadow dark:bg-gray-900">
          <div className="text-5xl font-bold text-primary">{correctCount}/{questions.length}</div>
          <p className="mt-2 text-sm text-gray-500">正解数</p>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            多職種連携の判断力が{correctCount === questions.length ? '素晴らしいです！' : '向上しています。繰り返し学習しましょう。'}
          </p>
        </div>
        <button
          onClick={() => { setCurrentIndex(0); setCorrectCount(0); setSelectedId(null); setShowFeedback(false) }}
          className="rounded-xl bg-primary px-8 py-3 font-bold text-white"
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
    if (question.correctAnswerIds.includes(optionId)) setCorrectCount((c) => c + 1)
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
        <span className="text-sm text-gray-500">{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-900">
        <p className="text-base text-gray-900 dark:text-gray-100">{question.prompt}</p>
      </div>

      <div className="space-y-3">
        {question.options.map((opt) => {
          let style = 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
          if (showFeedback) {
            if (opt.isCorrect) style = 'border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950'
            else if (opt.id === selectedId && !opt.isCorrect) style = 'border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-950'
          }
          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={showFeedback}
              className={`w-full rounded-xl border p-4 text-left text-sm transition-all ${style}`}
            >
              {opt.text}
            </button>
          )
        })}
      </div>

      {showFeedback && (
        <div className={`rounded-xl p-4 ${isCorrect ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
          <p className={`text-sm font-bold ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {isCorrect ? '正解！' : '不正解'}
          </p>
          <p className="mt-2 text-xs text-gray-700 dark:text-gray-300">
            {isCorrect ? question.narrativeFeedback.correct : question.narrativeFeedback.incorrect}
          </p>
          <p className="mt-2 text-xs text-gray-500">{question.explanation}</p>
          <button onClick={handleNext} className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-bold text-white">
            次の問題へ
          </button>
        </div>
      )}
    </div>
  )
}
