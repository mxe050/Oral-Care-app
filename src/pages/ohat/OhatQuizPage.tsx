import { useState } from 'react'
import { OHAT_QUIZ_ITEMS } from '../../data/ohat-quiz-items'
import type { DifficultyLevel } from '../../types/quiz'

const difficultyLabels: Record<DifficultyLevel, string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
}

const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export function OhatQuizPage() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const questions = difficulty
    ? OHAT_QUIZ_ITEMS.filter((q) => q.difficulty === difficulty)
    : []
  const question = questions[currentIndex]
  const isFinished = difficulty && currentIndex >= questions.length

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
              className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:shadow-md active:scale-[0.98] dark:border-gray-700 dark:bg-gray-900"
            >
              <span className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${difficultyColors[d]}`}>
                {difficultyLabels[d]}
              </span>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {d === 'beginner' && '典型的な症例で基本を学ぶ'}
                {d === 'intermediate' && '境界例の判定力を鍛える'}
                {d === 'advanced' && '複合所見・臨床判断を含む'}
              </p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="mx-auto max-w-lg space-y-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">クイズ完了</h2>
        <div className="rounded-2xl bg-white p-8 shadow dark:bg-gray-900">
          <div className="text-5xl font-bold text-primary">
            {correctCount}/{questions.length}
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">正解数</p>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            {correctCount === questions.length
              ? 'パーフェクト！素晴らしい判定力です。'
              : '間違えた問題を復習して、判定力を高めましょう。'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setDifficulty(null); setCurrentIndex(0); setCorrectCount(0) }}
            className="flex-1 rounded-xl bg-gray-200 py-3 font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          >
            難易度選択に戻る
          </button>
          <button
            onClick={() => { setCurrentIndex(0); setCorrectCount(0); setSelectedId(null); setShowFeedback(false) }}
            className="flex-1 rounded-xl bg-primary py-3 font-bold text-white"
          >
            もう一度
          </button>
        </div>
      </div>
    )
  }

  if (!question) return null

  const handleSelect = (optionId: string) => {
    if (showFeedback) return
    setSelectedId(optionId)
    setShowFeedback(true)
    if (question.correctAnswerIds.includes(optionId)) {
      setCorrectCount((c) => c + 1)
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
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${difficultyColors[difficulty]}`}>
          {difficultyLabels[difficulty]}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-900">
        <p className="text-base font-medium text-gray-900 dark:text-gray-100">{question.prompt}</p>
      </div>

      <div className="space-y-3">
        {question.options.map((opt) => {
          let style = 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
          if (showFeedback) {
            if (opt.isCorrect) style = 'border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950'
            else if (opt.id === selectedId && !opt.isCorrect) style = 'border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-950'
          } else if (opt.id === selectedId) {
            style = 'border-primary bg-teal-50 dark:bg-teal-950'
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
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{question.explanation}</p>
          <button
            onClick={handleNext}
            className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-bold text-white"
          >
            次の問題へ
          </button>
        </div>
      )}
    </div>
  )
}
