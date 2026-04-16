import { TrendingUp, UserX, BookOpen } from 'lucide-react'

export function FassEvidencePage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">エビデンス</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          FASS研究（Nagano & Maeda 2024）の重要な知見
        </p>
      </div>

      {/* 衝撃データ1 */}
      <div className="rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-6 text-white shadow-lg">
        <div className="mb-3 flex items-center gap-2">
          <UserX size={20} />
          <h3 className="font-bold">経験年数とスキルは無相関</h3>
        </div>
        <p className="text-sm opacity-90">
          看護師の経験年数や研修参加回数と、食事介助スキル（FASSスコア）の間に統計的な相関は認められませんでした。
        </p>
        <div className="mt-4 rounded-lg bg-white/20 p-3 text-center backdrop-blur">
          <div className="text-2xl font-bold">p = n.s.</div>
          <div className="text-xs">経験年数 × FASSスコア</div>
        </div>
        <p className="mt-3 text-xs opacity-80">
          つまり、座学や経験だけでは食事介助スキルは向上しません。実技トレーニングが不可欠です。
        </p>
      </div>

      {/* 衝撃データ2 */}
      <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 p-6 text-white shadow-lg">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={20} />
          <h3 className="font-bold">スキルと食事摂取量は相関</h3>
        </div>
        <p className="text-sm opacity-90">
          FASSスコアと患者の食事摂取量には有意な正の相関が確認されました。
        </p>
        <div className="mt-4 rounded-lg bg-white/20 p-3 text-center backdrop-blur">
          <div className="text-2xl font-bold">R² = 0.318</div>
          <div className="text-xs">p = 0.006</div>
        </div>
        <p className="mt-3 text-xs opacity-80">
          スキルを向上させれば、患者さんの食事摂取量が改善します。あなたの技術が患者さんの栄養状態に直結しています。
        </p>
      </div>

      {/* 開発プロセス */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen size={18} className="text-primary" />
          <h3 className="font-bold text-gray-900 dark:text-gray-100">FASS/CORE10の開発プロセス</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex gap-2">
            <span className="font-bold text-primary">手法</span>
            Delphi法（修正デルファイ法）
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">専門家</span>
            25名の摂食嚥下専門家パネル
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">ラウンド</span>
            4ラウンドのコンセンサス形成
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">採点</span>
            3段階（0=していない / 1=不十分 / 2=している）
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">満点</span>
            20点（10項目 × 2点）
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">信頼性</span>
            AC1統計量で評価者間信頼性を確認
          </li>
        </ul>
      </div>

      {/* 引用 */}
      <div className="rounded-lg bg-gray-100 p-4 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        <p className="font-bold">Reference:</p>
        <p className="mt-1">
          Nagano A, Maeda K. Development and validation of Feeding Assistance Skill Score (FASS) for objective evaluation of feeding assistance skill.
          <em> European Geriatric Medicine</em>. 2024;15:1437-1445.
        </p>
      </div>
    </div>
  )
}
