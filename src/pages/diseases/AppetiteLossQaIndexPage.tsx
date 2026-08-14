import {
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  GitBranch,
  ListTree,
} from 'lucide-react'
import { GuideMarkdown } from '../../components/ui/GuideMarkdown'
import {
  appetiteLossGuideParts,
  appetiteLossGuideQuestionCount,
  appetiteLossGuideSupplements,
} from '../../data/appetite-loss-guide'

type TouchSafeLinkProps = {
  to: string
  className: string
  children: ReactNode
  ariaLabel?: string
}

function TouchSafeLink({
  to,
  className,
  children,
  ariaLabel,
}: TouchSafeLinkProps) {
  const touchState = useRef({
    active: false,
    moved: false,
    x: 0,
    y: 0,
  })

  const start = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'touch') return
    touchState.current = {
      active: true,
      moved: false,
      x: event.clientX,
      y: event.clientY,
    }
  }

  const move = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const state = touchState.current
    if (!state.active || event.pointerType !== 'touch') return
    if (
      Math.abs(event.clientX - state.x) > 12 ||
      Math.abs(event.clientY - state.y) > 12
    ) {
      state.moved = true
    }
  }

  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      onPointerDown={start}
      onPointerMove={move}
      onPointerCancel={() => {
        touchState.current.active = false
      }}
      onClick={(event) => {
        if (touchState.current.moved) event.preventDefault()
        touchState.current.active = false
        touchState.current.moved = false
      }}
      className={className}
    >
      {children}
    </Link>
  )
}

const sourceLinks = [
  {
    label: 'ESPEN guideline on nutrition and hydration in dementia — Update 2024',
    href: 'https://pubmed.ncbi.nlm.nih.gov/38772068/',
  },
  {
    label: '日本摂食嚥下リハビリテーション学会 嚥下調整食分類2021',
    href: 'https://www.jsdr.or.jp/doc/classification2021.html',
  },
  {
    label: '厚生労働省「こんな時は迷わず119へ」',
    href: 'https://kakarikata.mhlw.go.jp/kakaritsuke/urgency.html',
  },
  {
    label: '日本老年医学会誌「認知症高齢者の嚥下障害」',
    href: 'https://www.jstage.jst.go.jp/article/geriatrics/60/1/60_60.1/_article/-char/ja/',
  },
]

export function AppetiteLossQaIndexPage() {
  const location = useLocation()
  const implementation = appetiteLossGuideSupplements.find(
    (section) => section.id === 'implementation',
  )
  const otherSupplements = appetiteLossGuideSupplements.filter(
    (section) => section.id !== 'implementation',
  )

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0 })
      return
    }

    const targetId = decodeURIComponent(location.hash.slice(1))
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'auto',
        block: targetId.startsWith('q') ? 'center' : 'start',
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.hash])

  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <header className="flex items-start gap-2">
        <Link
          to="/diseases/appetite-loss"
          className="mt-0.5 shrink-0 rounded-lg p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          aria-label="食欲不振・拒否へ戻る"
        >
          <ArrowLeft size={22} />
        </Link>
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-gray-950 dark:text-white">
            総合的具体的方法Q&A
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
            最初の確認から現場の工夫、嚥下、薬、意思決定まで全
            {appetiteLossGuideQuestionCount}問
          </p>
        </div>
      </header>

      <TouchSafeLink
        to="/diseases/appetite-loss/algorithm"
        className="group flex touch-pan-y items-center gap-4 rounded-2xl border-2 border-indigo-700 bg-indigo-700 p-4 text-white shadow-md transition-colors hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-indigo-400 dark:bg-indigo-800 dark:hover:bg-indigo-900 dark:focus:ring-offset-gray-950"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
          <GitBranch size={24} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-bold leading-6">
            包括的食欲不振・食事拒否 鑑別＆介入アルゴリズム
          </span>
          <span className="mt-1 block text-sm leading-5 text-indigo-100">
            Clinical Algorithm
          </span>
        </span>
        <ArrowRight
          size={21}
          aria-hidden="true"
          className="shrink-0 transition-transform group-hover:translate-x-1"
        />
      </TouchSafeLink>

      <section className="border-l-4 border-rose-500 bg-rose-50 px-4 py-4 dark:bg-rose-950/30">
        <div className="flex items-start gap-3">
          <AlertTriangle
            size={21}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-rose-700 dark:text-rose-300"
          />
          <div>
            <h3 className="font-bold text-rose-950 dark:text-rose-100">
              最初に安全を確認
            </h3>
            <p className="mt-1 text-sm leading-6 text-rose-950/90 dark:text-rose-100/90">
              呼吸できない・話せない、顔色が青い、反応がない、突然の片麻痺やろれつ不良は119番の対象です。急な変化、繰り返すむせ、発熱、息苦しさ、飲水できない状態は、食事の工夫だけで様子を見ず医療者へ相談してください。
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="chapter-nav-title">
        <div className="flex items-center gap-2">
          <ListTree size={20} className="text-teal-700 dark:text-teal-300" aria-hidden="true" />
          <h3 id="chapter-nav-title" className="text-lg font-bold text-gray-950 dark:text-white">
            読みたい部へ移動
          </h3>
        </div>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
          部を選ぶと、同じページ内の質問一覧へ移動します。下へスクロールすれば全ての質問を続けて見られます。
        </p>
        <nav
          aria-label="Q&Aの部"
          className="mt-4 divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-700 dark:border-gray-700"
        >
          {appetiteLossGuideParts.map((part) => (
            <TouchSafeLink
              key={part.id}
              to={`/diseases/appetite-loss/qa#${part.id}`}
              className="flex min-h-14 touch-pan-y items-center gap-3 px-2 py-3 text-left text-gray-900 transition-colors hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:text-gray-100 dark:hover:bg-teal-950/30"
            >
              <span className="flex h-8 min-w-12 shrink-0 items-center justify-center rounded-lg bg-teal-700 px-2 text-xs font-bold text-white">
                第{part.number}部
              </span>
              <span className="min-w-0 flex-1 text-sm font-bold leading-6">
                {part.title.replace(/^第\d+部[\u3000\s]*/, '')}
              </span>
              <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-teal-700 dark:text-teal-300" />
            </TouchSafeLink>
          ))}
        </nav>
      </section>

      <section aria-labelledby="all-questions-title">
        <div className="flex items-center gap-2">
          <ClipboardList size={20} className="text-teal-700 dark:text-teal-300" aria-hidden="true" />
          <h3 id="all-questions-title" className="text-lg font-bold text-gray-950 dark:text-white">
            全質問一覧
          </h3>
        </div>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
          質問を押すと解説ページが開きます。縦スクロール中に指が動いた場合は、誤って開かないようにしています。
        </p>

        <div className="mt-6 space-y-12">
          {appetiteLossGuideParts.map((part) => {
            let previousSection = ''

            return (
              <section
                key={part.id}
                id={part.id}
                className="scroll-mt-5"
                aria-labelledby={`${part.id}-title`}
              >
                <div className="border-b-2 border-teal-700 pb-3">
                  <p className="text-xs font-bold tracking-wide text-teal-700 dark:text-teal-300">
                    {part.questions.length}問
                  </p>
                  <h4
                    id={`${part.id}-title`}
                    className="mt-1 text-xl font-bold leading-8 text-gray-950 dark:text-white"
                  >
                    {part.title}
                  </h4>
                </div>

                <div className="mt-2">
                  {part.questions.map((question) => {
                    const showSection =
                      Boolean(question.sectionTitle) &&
                      question.sectionTitle !== previousSection
                    previousSection = question.sectionTitle ?? ''

                    return (
                      <div key={question.id}>
                        {showSection && (
                          <h5 className="mb-1 mt-7 border-l-4 border-teal-500 pl-3 text-base font-bold leading-7 text-gray-800 dark:text-gray-100">
                            {question.sectionTitle}
                          </h5>
                        )}
                        <div
                          id={question.id}
                          className="scroll-mt-24 border-b border-gray-200 dark:border-gray-700"
                        >
                          <TouchSafeLink
                            to={`/diseases/appetite-loss/qa/${question.id}`}
                            className="group flex min-h-16 touch-pan-y items-start gap-3 px-1 py-4 text-left transition-colors hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:hover:bg-teal-950/30"
                            ariaLabel={`Q${question.number}の解説を開く`}
                          >
                            <span className="mt-0.5 shrink-0 font-bold text-teal-700 dark:text-teal-300">
                              Q{question.number}.
                            </span>
                            <span className="min-w-0 flex-1 text-base font-medium leading-7 text-gray-900 group-hover:text-teal-950 dark:text-gray-100 dark:group-hover:text-teal-100">
                              {question.title}
                            </span>
                            <ArrowRight
                              size={18}
                              aria-hidden="true"
                              className="mt-1 shrink-0 text-gray-400 group-hover:text-teal-700 dark:group-hover:text-teal-300"
                            />
                          </TouchSafeLink>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </section>

      {implementation && (
        <section className="border-t-4 border-violet-600 pt-5" aria-labelledby="implementation-title">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-violet-700 dark:text-violet-300" aria-hidden="true" />
            <h3 id="implementation-title" className="text-xl font-bold text-gray-950 dark:text-white">
              {implementation.title}
            </h3>
          </div>
          <GuideMarkdown content={implementation.body} />
        </section>
      )}

      <section aria-labelledby="supplement-title">
        <h3 id="supplement-title" className="text-lg font-bold text-gray-950 dark:text-white">
          付録・原則・文献
        </h3>
        <div className="mt-3 divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-700 dark:border-gray-700">
          {otherSupplements.map((section) => (
            <details key={section.id} className="group py-1">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-2 py-3 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:text-gray-100">
                {section.title}
                <ChevronDown size={19} aria-hidden="true" className="shrink-0 text-teal-700 transition-transform group-open:rotate-180 dark:text-teal-300" />
              </summary>
              <div className="px-2 pb-5">
                <GuideMarkdown content={section.body} />
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200 pt-5 text-sm leading-6 text-gray-600 dark:border-gray-700 dark:text-gray-300">
        <h3 className="font-bold text-gray-950 dark:text-white">確認した主な根拠</h3>
        <ul className="mt-3 space-y-2">
          {sourceLinks.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1 text-teal-700 underline decoration-teal-300 underline-offset-2 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
              >
                <ExternalLink size={14} aria-hidden="true" className="mt-1 shrink-0" />
                <span>{source.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-5 text-gray-500 dark:text-gray-400">
          本ページは学習・ケア検討の補助です。資料内の時間、回数、量、姿勢、介助法は一律の指示ではありません。個別の診断・治療・食形態・栄養・薬剤・人工栄養は、本人の希望を確認し、医療・ケアチームで判断してください。
        </p>
      </section>
    </div>
  )
}
