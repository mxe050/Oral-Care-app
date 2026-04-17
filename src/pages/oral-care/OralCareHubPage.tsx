import { Link } from 'react-router-dom'
import { Droplets, AlertCircle, Check, Info, ArrowRight } from 'lucide-react'

export function OralCareHubPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      {/* Header */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
            <Droplets size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold">オーラルケア</h2>
            <p className="text-xs text-sky-100">NG行動・学習アプリ</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-sky-50">
          高齢者・脳卒中患者の口腔のケアと誤嚥予防を学ぶ30問のケーススタディ。
        </p>
      </div>

      {/* Terminology note */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200">
          <AlertCircle size={16} className="text-amber-600" />
          本アプリにおける用語について
        </h3>
        <div className="space-y-3 rounded-lg border border-amber-100 bg-white p-4 text-xs dark:border-amber-900 dark:bg-gray-900">
          <div>
            <h4 className="mb-1 font-bold text-gray-900 dark:text-gray-100">
              1.「口腔ケア」の名称について
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              「口腔ケア」は一般社団法人日本口腔ケア学会により商標登録されています。学会側は公式声明として「学会員以外が論文等で使用することを妨げるものではない」と明示していますが、商標権が存在する用語であることに変わりはなく、今後の予期せぬトラブルを避けるために本アプリでは使用を控えています。
            </p>
          </div>
          <div>
            <h4 className="mb-1 font-bold text-gray-900 dark:text-gray-100">
              2. 厚生労働省の動向への準拠
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              厚生労働省は従来「口腔ケア」という用語を公式文書で使用していましたが、令和3年（2021年）の介護報酬改定において、加算名称を「口腔衛生管理体制加算」から基本サービスとしての「口腔衛生の管理」へ移行するなど、摂食支援を含むより包括的な概念として再定義しつつあります。そのため、本アプリでは
              <span className="font-bold text-amber-700 dark:text-amber-300">
                「口腔のケア」「オーラルケア」「口腔衛生管理」
              </span>
              といった表現を用いています。
            </p>
          </div>
        </div>
      </div>

      {/* Global standard note */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-200">
          <Check size={16} className="text-emerald-600" />
          日本の「口腔ケア」と海外の「オーラルヘルス」の違い
        </h3>
        <p className="mb-3 text-xs text-gray-800 dark:text-gray-300">
          日本の医療・介護現場で行われる従来の「口腔ケア」と、海外における「オーラルヘルス（口腔保健）」のアプローチには、いくつか明確な違いがあります。世界的な標準（グローバル・スタンダード）として、以下の点に留意する必要があります。
        </p>
        <div className="space-y-3 rounded-lg border border-emerald-100 bg-white p-4 text-xs dark:border-emerald-900 dark:bg-gray-900">
          <div>
            <h4 className="mb-1 font-bold text-gray-900 dark:text-gray-100">
              1. ケアにかける時間と回数の多さ
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              海外のオーラルヘルス管理では、日本と比較して1日あたりのケア回数が非常に多く、1回にかける時間も長く取る傾向があります。徹底したプラークコントロールが基本とされています。
            </p>
          </div>
          <div>
            <h4 className="mb-1 font-bold text-gray-900 dark:text-gray-100">
              2. 歯間清掃用具（歯間ブラシ・フロス）の徹底活用
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              歯ブラシ単独ではなく、デンタルフロスや歯間ブラシなどの歯間清掃用具を日常的にしっかりと使用することが標準です。特に歯肉炎（歯周病）の予防と管理においては、歯間ブラシの使用が極めて有用とされています。
            </p>
          </div>
          <div>
            <h4 className="mb-1 font-bold text-gray-900 dark:text-gray-100">
              3. フッ化物（フッ素）の積極的な応用
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              海外ではフッ化物の応用が非常に進んでいます。特に高齢者においては、歯ぐきが下がって露出した歯の根元が虫歯になる「根面う蝕（ルートカリエス）」が大きな問題となるため、その予防としてフッ化物の使用が極めて重要視されています。
            </p>
          </div>
        </div>
      </div>

      {/* GRADE note */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-blue-200">
          <Info size={16} className="text-blue-600" />
          エビデンスの確実性の表記について
        </h3>
        <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
          本アプリの各問題の出典に記載されている「エビデンス確実性：高／低」の評価は、
          <span className="font-bold">GRADEアプローチに厳密に準拠したものではなく、あくまで参考程度</span>
          のものです（すべてのハルシネーション確認終わっていません）。GRADEシステムでは「高」「中」「低」「非常に低」の4段階で評価されますが、本アプリでは学習の便宜上、簡略化して「高」「低」の2段階で概括的に表記しています。個々の臨床判断においては、原著論文を直接参照されることをお勧めします。
        </p>
      </div>

      {/* CTA */}
      <Link
        to="/oral-care/quiz"
        className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-700 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
      >
        学習を始める（全30問）
        <ArrowRight size={22} />
      </Link>
    </div>
  )
}
