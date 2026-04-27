import { Link } from 'react-router-dom'
import { ArrowLeft, Brain, ChevronRight, Stethoscope, Activity, Wind, Sparkles, Soup } from 'lucide-react'

const diseases = [
  {
    to: '/diseases/dementia',
    icon: Brain,
    title: '認知症患者',
    description: 'BPSDへの非薬物的アプローチ・コミュニケーションケア技法',
    gradient: 'from-violet-400 to-purple-600',
    available: true,
  },
  {
    to: '/diseases/stroke',
    icon: Activity,
    title: '脳卒中',
    description: '障害部位別の摂食嚥下障害と、姿勢・食形態・介助のポイント',
    gradient: 'from-red-400 to-rose-600',
    available: true,
  },
  {
    to: '/diseases/aspiration-pneumonia',
    icon: Wind,
    title: '誤嚥性肺炎',
    description: '早期経口摂取の根拠・タイミング・段階的食上げの実践',
    gradient: 'from-sky-400 to-cyan-600',
    available: true,
  },
  {
    to: '/diseases/higher-brain',
    icon: Sparkles,
    title: '高次障害',
    description: '失語・失行・失認・半側空間無視・注意障害と摂食嚥下',
    gradient: 'from-indigo-400 to-blue-600',
    available: true,
  },
  {
    to: '/diseases/appetite-loss',
    icon: Soup,
    title: '食欲不振・拒否',
    description: '原因の鑑別フローと、身体・精神・環境別の対処法',
    gradient: 'from-orange-400 to-amber-600',
    available: true,
  },
] as const

export function DiseasesHubPage() {
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
            疾患から学ぼう
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            疾患別のケア技法・知識を体系的に学ぶ
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-3 dark:border-emerald-900/40 dark:from-emerald-950/40 dark:to-teal-950/40">
        <div className="flex items-center gap-2 text-xs">
          <Stethoscope size={14} className="text-emerald-600 dark:text-emerald-300" />
          <span className="font-bold text-emerald-700 dark:text-emerald-300">
            疾患別の口腔・嚥下・コミュニケーション戦略
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {diseases.map((d) => {
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
                <h3 className="font-bold text-gray-900 dark:text-gray-100">{d.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{d.description}</p>
              </div>
              <ChevronRight size={18} className="text-gray-400 dark:text-gray-500" />
            </Link>
          )
        })}
      </div>

      <div className="rounded-xl bg-white/70 p-4 text-xs leading-relaxed text-gray-600 dark:bg-gray-900/60 dark:text-gray-300">
        <p className="font-bold text-gray-700 dark:text-gray-200">今後追加予定</p>
        <p className="mt-1">
          パーキンソン病・脳卒中後遺症・サルコペニア/フレイル・がん終末期・ALS など、疾患別のケア技法を順次追加していきます。
        </p>
      </div>
    </div>
  )
}
