import { Link } from 'react-router-dom'
import { OHAT_CATEGORIES } from '../../data/ohat-categories'

const scoreColors = ['bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-red-100 text-red-800']
const scoreColorsDark = ['dark:bg-green-900 dark:text-green-300', 'dark:bg-yellow-900 dark:text-yellow-300', 'dark:bg-red-900 dark:text-red-300']

export function OhatLearnPage() {
  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">OHAT-J 8カテゴリ</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          各カテゴリの判定基準と嚥下5期モデルとの関連を学びましょう
        </p>
      </div>

      <div className="space-y-3">
        {OHAT_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/ohat/learn/${cat.id}`}
            className="block rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md active:scale-[0.98] dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">{cat.name}</h3>
              <span className="text-xs text-primary">{cat.phaseExplanation.split('：')[0]}</span>
            </div>
            <div className="flex gap-2">
              {([0, 1, 2] as const).map((score) => (
                <div
                  key={score}
                  className={`flex-1 rounded-lg px-2 py-1.5 text-center text-xs ${scoreColors[score]} ${scoreColorsDark[score]}`}
                >
                  <div className="font-bold">{score}</div>
                  <div className="mt-0.5">{cat.scoreCriteria[score].label}</div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
