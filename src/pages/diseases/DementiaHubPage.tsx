import { Link } from 'react-router-dom'
import { ArrowLeft, Heart, ChevronRight, Brain } from 'lucide-react'

const techniques = [
  {
    to: '/diseases/dementia/humanitude',
    icon: Heart,
    title: 'ユマニチュード',
    description: 'Yves Gineste・Rosette Marescottiが開発した4本の柱に基づくケア技法',
    gradient: 'from-rose-400 to-pink-600',
  },
] as const

export function DementiaHubPage() {
  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="flex items-center gap-2">
        <Link
          to="/diseases"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="疾患一覧へ戻る"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">認知症患者</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            BPSDを和らげる非薬物的ケア技法
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50 p-3 dark:border-violet-900/40 dark:from-violet-950/40 dark:to-purple-950/40">
        <div className="mb-1 flex items-center gap-2 text-xs">
          <Brain size={14} className="text-violet-600 dark:text-violet-300" />
          <span className="font-bold text-violet-700 dark:text-violet-300">
            認知症ケアの基本姿勢
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-violet-900/90 dark:text-violet-100/90">
          認知症患者の「拒否」「攻撃性」「不穏」は中核症状ではなく BPSD(行動・心理症状)です。多くは介助者の関わり方を変えることで軽減できます。薬物的鎮静の前に、まずコミュニケーション技法から学びましょう。
        </p>
      </div>

      <div className="space-y-3">
        {techniques.map((t) => {
          const Icon = t.icon
          return (
            <Link
              key={t.to}
              to={t.to}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md active:scale-[0.98] dark:border-gray-700 dark:bg-gray-900"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${t.gradient} text-white shadow-sm`}
              >
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-gray-100">{t.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.description}</p>
              </div>
              <ChevronRight size={18} className="text-gray-400 dark:text-gray-500" />
            </Link>
          )
        })}
      </div>

      <div className="rounded-xl bg-white/70 p-4 text-xs leading-relaxed text-gray-600 dark:bg-gray-900/60 dark:text-gray-300">
        <p className="font-bold text-gray-700 dark:text-gray-200">今後追加予定</p>
        <p className="mt-1">
          パーソン・センタード・ケア(Kitwood)、バリデーション療法(Feil)、レミニシング療法、認知症ケアマッピング(DCM)など。
        </p>
      </div>
    </div>
  )
}
