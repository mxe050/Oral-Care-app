import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight, Newspaper, Apple } from 'lucide-react'

const newsItems = [
  {
    to: '/news/nutrition-intervention-2026',
    icon: Apple,
    title: '栄養リスクのある入院高齢者を対象とした経口栄養介入:2026',
    description:
      'Cochrane Systematic Review (2026)。経口栄養補助食品(ONS)の死亡・重篤有害事象低減効果を、個別参加者データのネットワークメタ解析で検証。',
    gradient: 'from-emerald-400 to-teal-600',
  },
] as const

export function NewsHubPage() {
  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="ホームへ戻る"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            その他の最新情報
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            口腔ケア・摂食嚥下に関連する最新の臨床エビデンス・トピック
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-sky-200 bg-gradient-to-r from-sky-50 to-cyan-50 p-3 dark:border-sky-900/40 dark:from-sky-950/40 dark:to-cyan-950/40">
        <div className="flex items-center gap-2 text-xs">
          <Newspaper size={14} className="text-sky-600 dark:text-sky-300" />
          <span className="font-bold text-sky-700 dark:text-sky-300">
            最新の論文・臨床トピックをお届け
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {newsItems.map((d) => {
          const Icon = d.icon
          return (
            <Link
              key={d.to}
              to={d.to}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md active:scale-[0.98] dark:border-gray-700 dark:bg-gray-900"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${d.gradient} text-white shadow-sm`}
              >
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {d.title}
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                  {d.description}
                </p>
              </div>
              <ChevronRight size={18} className="text-gray-400 dark:text-gray-500" />
            </Link>
          )
        })}
      </div>

      <div className="rounded-xl bg-white/70 p-4 text-xs leading-relaxed text-gray-600 dark:bg-gray-900/60 dark:text-gray-300">
        <p className="font-bold text-gray-700 dark:text-gray-200">今後追加予定</p>
        <p className="mt-1">
          口腔ケア・摂食嚥下・誤嚥性肺炎・サルコペニア・低栄養などに関する最新エビデンスを順次追加していきます。
        </p>
      </div>
    </div>
  )
}
