import { useEffect, useState } from 'react'
import { TrendingUp, UserX, BookOpen } from 'lucide-react'
import { ReferenceList } from '../../components/ui/ReferenceList'
import { useProgressStore } from '../../stores/progress-store'
import { XP_ACTIONS } from '../../types/common'
import type { Reference } from '../../types/common'

const references: Reference[] = [
  {
    id: 'fass-main',
    authors: 'Nagano A, Maeda K',
    title: 'Development and validation of Feeding Assistance Skill Score (FASS) for objective evaluation of feeding assistance skill',
    journal: 'European Geriatric Medicine',
    year: 2024,
    doi: '10.1007/s41999-024-01020-0',
    keyFinding: 'FASSスコアと患者の食事摂取量に有意な正の相関（R2=0.318, p=0.006）',
  },
  {
    id: 'fass-delphi',
    authors: 'Nagano A, Maeda K',
    title: 'Development of CORE10 checklist using modified Delphi method',
    journal: 'European Geriatric Medicine',
    year: 2024,
    keyFinding: '25名の専門家パネルによる4ラウンドのコンセンサス形成で10項目を確定',
  },
]

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const duration = 2000
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased * 1000) / 1000)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target])

  return (
    <span>
      {value.toFixed(target % 1 !== 0 ? 3 : 0)}
      {suffix}
    </span>
  )
}

export function FassEvidencePage() {
  const markCompleted = useProgressStore((s) => s.markCompleted)
  const addXp = useProgressStore((s) => s.addXp)
  const completedSections = useProgressStore((s) => s.completedSections)

  useEffect(() => {
    if (!completedSections['fass-evidence']) {
      markCompleted('fass-evidence')
      addXp(XP_ACTIONS.viewLesson)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">エビデンス</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          FASS研究の重要な知見
        </p>
      </div>

      {/* Finding 1 */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-6 text-white shadow-lg">
        <div className="mb-3 flex items-center gap-2">
          <UserX size={20} />
          <h3 className="font-bold">経験年数とスキルは無相関</h3>
        </div>
        <p className="text-sm opacity-90">
          看護師の経験年数や研修参加回数と、食事介助スキル（FASSスコア）の間に統計的な相関は認められませんでした。
        </p>
        <div className="mt-4 rounded-xl bg-white/20 p-4 text-center backdrop-blur">
          <div className="text-3xl font-bold">p = n.s.</div>
          <div className="mt-1 text-xs opacity-80">経験年数 x FASSスコア</div>
        </div>
        <p className="mt-3 text-xs opacity-80">
          つまり、座学や経験だけでは食事介助スキルは向上しません。実技トレーニングが不可欠です。
        </p>
      </div>

      {/* Finding 2 */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 p-6 text-white shadow-lg">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={20} />
          <h3 className="font-bold">スキルと食事摂取量は相関</h3>
        </div>
        <p className="text-sm opacity-90">
          FASSスコアと患者の食事摂取量には有意な正の相関が確認されました。
        </p>
        <div className="mt-4 rounded-xl bg-white/20 p-4 text-center backdrop-blur">
          <div className="text-3xl font-bold">
            R&#178; = <AnimatedCounter target={0.318} />
          </div>
          <div className="mt-1 text-xs opacity-80">
            p = <AnimatedCounter target={0.006} />
          </div>
        </div>
        <p className="mt-3 text-xs opacity-80">
          スキルを向上させれば、患者さんの食事摂取量が改善します。あなたの技術が患者さんの栄養状態に直結しています。
        </p>
      </div>

      {/* Development process */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen size={18} className="text-teal-600 dark:text-teal-400" />
          <h3 className="font-bold text-gray-900 dark:text-gray-100">
            FASS/CORE10の開発プロセス
          </h3>
        </div>
        <div className="space-y-2">
          {[
            { label: '手法', value: 'Delphi法（修正デルファイ法）' },
            { label: '専門家', value: '25名の摂食嚥下専門家パネル' },
            { label: 'ラウンド', value: '4ラウンドのコンセンサス形成' },
            { label: '採点', value: '3段階（0=していない / 1=不十分 / 2=している）' },
            { label: '満点', value: '20点（10項目 x 2点）' },
            { label: '信頼性', value: 'AC1統計量で評価者間信頼性を確認' },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-3 text-sm">
              <span className="w-16 shrink-0 font-bold text-teal-600 dark:text-teal-400">
                {label}
              </span>
              <span className="text-gray-600 dark:text-gray-400">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* References */}
      <ReferenceList references={references} />
    </div>
  )
}
