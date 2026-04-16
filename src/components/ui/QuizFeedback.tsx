import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import type { Reference } from '../../types/common'

interface Props {
  correct: boolean
  explanation: string
  reference?: Reference
  streakCount?: number
  onNext?: () => void
}

export function QuizFeedback({ correct, explanation, reference, streakCount = 0, onNext }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  return (
    <div
      className={`overflow-hidden rounded-xl transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${
        correct
          ? 'border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
          : 'border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
      }`}
    >
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          {correct ? (
            <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
          ) : (
            <XCircle size={20} className="text-red-600 dark:text-red-400" />
          )}
          <span
            className={`text-lg font-bold ${
              correct
                ? 'text-green-700 dark:text-green-300'
                : 'text-red-700 dark:text-red-300'
            }`}
          >
            {correct ? '正解!' : '不正解'}
          </span>

          {correct && streakCount >= 3 && (
            <span className="ml-auto animate-bounce rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700 dark:bg-orange-900 dark:text-orange-300">
              {'\uD83D\uDD25'} {streakCount}連続正解!
            </span>
          )}
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          {explanation}
        </p>

        {reference && (
          <div className="mt-3 rounded-lg bg-white/60 p-2 text-xs text-gray-500 dark:bg-gray-900/40 dark:text-gray-400">
            <span className="font-medium">{reference.authors}</span> ({reference.year}).{' '}
            <span className="italic">{reference.title}</span>.{' '}
            {reference.doi && (
              <a
                href={`https://doi.org/${reference.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-teal-600 hover:underline dark:text-teal-400"
              >
                <ExternalLink size={10} />
                DOI
              </a>
            )}
          </div>
        )}

        {onNext && (
          <button
            onClick={onNext}
            className="mt-4 w-full rounded-lg bg-teal-600 py-2 text-sm font-bold text-white transition-colors hover:bg-teal-700"
          >
            次の問題へ
          </button>
        )}
      </div>
    </div>
  )
}
