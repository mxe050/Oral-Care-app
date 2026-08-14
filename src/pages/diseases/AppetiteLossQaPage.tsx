import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ExternalLink,
  Utensils,
} from 'lucide-react'
import {
  appetiteLossQaMaterials,
  appetiteLossQaPriorities,
  appetiteLossQaTopics,
} from '../../data/appetite-loss-qa'

export function AppetiteLossQaPage() {
  const [activeTopicId, setActiveTopicId] = useState(appetiteLossQaTopics[0].id)
  const [openQuestionId, setOpenQuestionId] = useState(
    appetiteLossQaTopics[0].questions[0].id,
  )

  const activeTopic =
    appetiteLossQaTopics.find((topic) => topic.id === activeTopicId) ??
    appetiteLossQaTopics[0]

  const selectTopic = (topicId: string) => {
    const topic = appetiteLossQaTopics.find((item) => item.id === topicId)
    if (!topic) return

    setActiveTopicId(topic.id)
    setOpenQuestionId(topic.questions[0].id)
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="flex items-start gap-2">
        <Link
          to="/diseases/appetite-loss"
          className="mt-0.5 shrink-0 rounded-lg p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          aria-label="食欲不振・拒否へ戻る"
        >
          <ArrowLeft size={22} />
        </Link>
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            総合的具体的方法Q&A
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
            「食べない・食べられない」を、急変の確認から具体的に整理する
          </p>
        </div>
      </div>

      <section className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-sm dark:border-amber-900/50 dark:from-amber-950/40 dark:to-orange-950/30">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
            <Utensils size={20} aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-bold text-amber-950 dark:text-amber-100">
              最初の一歩
            </h3>
            <p className="mt-1 text-base leading-7 text-amber-950/90 dark:text-amber-100/90">
              食欲不振・拒否は症状です。窒息や急な病気を見逃さず、口・痛み・便秘・薬・気分・嚥下・環境を順番に確かめます。
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="general-qa-title">
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <CircleHelp
              size={19}
              className="text-teal-600 dark:text-teal-300"
              aria-hidden="true"
            />
            <h3 id="general-qa-title" className="text-lg font-bold text-gray-900 dark:text-gray-100">
              テーマを選ぶ
            </h3>
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
            質問をタップすると、確認することと次の行動を読めます。
          </p>
        </div>

        <div
          role="tablist"
          aria-label="総合的具体的方法Q&Aのテーマ"
          className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:thin]"
        >
          {appetiteLossQaTopics.map((topic) => {
            const isSelected = topic.id === activeTopic.id

            return (
              <button
                key={topic.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => selectTopic(topic.id)}
                className={
                  'min-h-11 shrink-0 snap-start rounded-xl border px-4 py-2 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 ' +
                  (isSelected
                    ? 'border-teal-600 bg-teal-600 text-white shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-teal-700 dark:hover:bg-teal-950/40')
                }
              >
                {topic.shortLabel}
              </button>
            )
          })}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="border-b border-gray-100 bg-teal-50/70 p-4 dark:border-gray-800 dark:bg-teal-950/25">
            <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
              {activeTopic.title}
            </h4>
            <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200">
              {activeTopic.description}
            </p>
          </div>

          <div className="space-y-3 p-3">
            {activeTopic.questions.map((item) => {
              const isOpen = openQuestionId === item.id

              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
                >
                  <button
                    type="button"
                    onClick={() => setOpenQuestionId(isOpen ? '' : item.id)}
                    aria-expanded={isOpen}
                    className="flex min-h-12 w-full items-center gap-3 p-4 text-left transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:hover:bg-gray-800/70"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-200">
                      <CircleHelp size={16} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1 text-base font-bold leading-7 text-gray-900 dark:text-gray-100">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={
                        'shrink-0 text-teal-700 transition-transform dark:text-teal-300 ' +
                        (isOpen ? 'rotate-180' : '')
                      }
                    />
                  </button>

                  {isOpen && (
                    <div className="space-y-4 border-t border-gray-100 p-4 dark:border-gray-800">
                      {item.lead && (
                        <p className="rounded-xl border border-teal-100 bg-teal-50 p-3 text-base font-bold leading-7 text-teal-950 dark:border-teal-900/60 dark:bg-teal-950/40 dark:text-teal-50">
                          {item.lead}
                        </p>
                      )}

                      <div className="space-y-3 text-base leading-7 text-gray-700 dark:text-gray-200">
                        {item.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>

                      {item.bullets && (
                        <ul className="space-y-2 rounded-xl bg-gray-50 p-3 text-base leading-7 text-gray-700 dark:bg-gray-800/60 dark:text-gray-200">
                          {item.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2">
                              <CheckCircle2
                                size={17}
                                aria-hidden="true"
                                className="mt-1 shrink-0 text-teal-600 dark:text-teal-300"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {item.resources && (
                        <details className="group rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm dark:border-gray-700 dark:bg-gray-800/60">
                          <summary className="cursor-pointer list-none font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-gray-200">
                            <span className="flex items-center justify-between gap-3">
                              参考文献・根拠
                              <ChevronDown
                                size={18}
                                aria-hidden="true"
                                className="transition-transform group-open:rotate-180"
                              />
                            </span>
                          </summary>
                          <ul className="mt-3 space-y-2 border-t border-gray-200 pt-3 text-xs leading-5 text-gray-600 dark:border-gray-700 dark:text-gray-300">
                            {item.resources.map((resource) => (
                              <li key={resource.label}>
                                <a
                                  href={resource.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-start gap-1 text-teal-700 underline decoration-teal-300 underline-offset-2 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
                                >
                                  <ExternalLink
                                    size={13}
                                    aria-hidden="true"
                                    className="mt-0.5 shrink-0"
                                  />
                                  <span>{resource.label}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
        <div className="flex items-center gap-2">
          <CheckCircle2
            size={19}
            className="text-violet-700 dark:text-violet-300"
            aria-hidden="true"
          />
          <h3 className="text-lg font-bold text-violet-950 dark:text-violet-100">
            実行の目安
          </h3>
        </div>
        <div className="mt-3 space-y-2">
          {appetiteLossQaPriorities.map((priority) => (
            <details
              key={priority.period}
              className="rounded-xl border border-violet-100 bg-white p-3 dark:border-violet-900/50 dark:bg-gray-900"
            >
              <summary className="cursor-pointer list-none text-base font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-gray-100">
                <span className="flex items-center justify-between gap-3">
                  {priority.period}
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-violet-700 dark:text-violet-300"
                  />
                </span>
              </summary>
              <ul className="mt-3 space-y-2 border-t border-violet-100 pt-3 text-base leading-7 text-gray-700 dark:border-violet-900/50 dark:text-gray-200">
                {priority.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2
                      size={16}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-violet-600 dark:text-violet-300"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
        <div className="flex items-start gap-3">
          <AlertCircle
            size={20}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-rose-700 dark:text-rose-300"
          />
          <div>
            <h3 className="text-base font-bold text-rose-950 dark:text-rose-100">
              このページだけで判断しないでください
            </h3>
            <p className="mt-1 text-base leading-7 text-rose-950/90 dark:text-rose-100/90">
              食べられない原因や安全な食形態は人によって異なります。急な変化、むせ、呼吸苦、痛み、脱水の心配がある時は、食事を続ける前に医療者へ相談してください。
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white/70 p-4 text-sm leading-6 text-gray-600 dark:bg-gray-900/60 dark:text-gray-300">
        <h3 className="font-bold text-gray-900 dark:text-gray-100">主な根拠・参考資料</h3>
        <ul className="mt-2 space-y-2">
          {appetiteLossQaMaterials.map((material) => (
            <li key={material.label}>
              <a
                href={material.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1 text-teal-700 underline decoration-teal-300 underline-offset-2 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
              >
                <ExternalLink size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                <span>{material.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
          本ページは学習・ケア検討の補助を目的としています。個別の治療や食形態、栄養、人工栄養の判断は、本人・家族と医療・ケアチームで行ってください。
        </p>
      </section>
    </div>
  )
}
