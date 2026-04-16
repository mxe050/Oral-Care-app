import { Link } from 'react-router-dom'
import { CORE10_ITEMS } from '../../data/core10-items'

const groupInfo = {
  A: { name: 'A群：姿勢の準備', color: 'border-l-blue-500', bg: 'bg-blue-50 dark:bg-blue-950' },
  B: { name: 'B群：食前安全確認', color: 'border-l-amber-500', bg: 'bg-amber-50 dark:bg-amber-950' },
  C: { name: 'C群：介助技術', color: 'border-l-red-500', bg: 'bg-red-50 dark:bg-red-950' },
} as const

const groups = (['A', 'B', 'C'] as const).map((g) => ({
  ...groupInfo[g],
  group: g,
  items: CORE10_ITEMS.filter((item) => item.group === g),
}))

export function FassLearnPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">CORE10 学習</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          10項目を3群に分けて段階的に学びましょう
        </p>
      </div>

      {groups.map(({ name, color, items }) => (
        <div key={name}>
          <h3 className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">{name}</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/fass/learn/${item.id}`}
                className={`block rounded-xl border-l-4 ${color} bg-white p-4 transition-all hover:shadow-md active:scale-[0.98] dark:bg-gray-900`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {item.id}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">{item.title}</h4>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{item.phaseExplanation.split('：')[0]}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
