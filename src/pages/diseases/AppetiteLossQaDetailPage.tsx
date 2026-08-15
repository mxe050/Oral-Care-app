import { useLayoutEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  List,
} from 'lucide-react'
import { GuideMarkdown } from '../../components/ui/GuideMarkdown'
import {
  appetiteLossGuideQuestions,
  getAppetiteLossGuideQuestion,
  getQuestionSafetyNote,
} from '../../data/appetite-loss-guide'

export function AppetiteLossQaDetailPage() {
  const { questionId } = useParams()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [questionId])
  const question = getAppetiteLossGuideQuestion(questionId)

  if (!question) {
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <h2 className="text-xl font-bold text-gray-950 dark:text-white">
          質問が見つかりません
        </h2>
        <Link
          to="/diseases/appetite-loss/qa"
          className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-bold text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
        >
          <List size={19} aria-hidden="true" />
          Q&A一覧へ
        </Link>
      </div>
    )
  }

  const safetyNote = getQuestionSafetyNote(question.number)
  const questionIndex = appetiteLossGuideQuestions.findIndex(
    (item) => item.id === question.id,
  )
  const previous = appetiteLossGuideQuestions[questionIndex - 1]
  const next = appetiteLossGuideQuestions[questionIndex + 1]
  const returnTo = `/diseases/appetite-loss/qa#${question.id}`

  return (
    <article className="mx-auto max-w-2xl">
      <Link
        to={returnTo}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold text-teal-700 transition-colors hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-teal-300 dark:hover:bg-teal-950/30"
      >
        <ArrowLeft size={19} aria-hidden="true" />
        Q&A一覧のQ{question.number}付近へ
      </Link>

      <header className="mt-4 border-b-2 border-teal-700 pb-5">
        <p className="text-sm font-bold leading-6 text-teal-700 dark:text-teal-300">
          {question.partTitle}
          {question.sectionTitle ? ` ／ ${question.sectionTitle}` : ''}
        </p>
        <h2 className="mt-2 text-2xl font-bold leading-10 tracking-tight text-gray-950 dark:text-white">
          <span className="mr-2 text-teal-700 dark:text-teal-300">
            Q{question.number}.
          </span>
          {question.title}
        </h2>
      </header>

      {safetyNote && (
        <aside className="mt-5 border-l-4 border-amber-500 bg-amber-50 px-4 py-4 dark:bg-amber-950/30">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={20}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-300"
            />
            <div>
              <h3 className="font-bold text-amber-950 dark:text-amber-100">
                この質問の安全上の補足
              </h3>
              <p className="mt-1 text-sm leading-6 text-amber-950/90 dark:text-amber-100/90">
                {safetyNote}
              </p>
            </div>
          </div>
        </aside>
      )}

      <div className="mt-6">
        <GuideMarkdown content={question.answer} />
      </div>

      <p className="mt-7 border-t border-gray-200 pt-5 text-xs leading-5 text-gray-500 dark:border-gray-700 dark:text-gray-400">
        この解説は学習とケア検討の補助です。急な変化や安全上の不安がある場合は、画面上の手順だけで判断せず医療者へ相談してください。
      </p>

      <nav aria-label="前後の質問" className="mt-6 grid grid-cols-2 gap-3">
        {previous ? (
          <Link
            to={`/diseases/appetite-loss/qa/${previous.id}`}
            className="flex min-h-12 items-center gap-2 rounded-xl border border-gray-300 px-3 py-3 text-sm font-bold leading-5 text-gray-700 hover:border-teal-500 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-teal-950/30"
          >
            <ChevronLeft size={18} aria-hidden="true" className="shrink-0" />
            <span>前の質問</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/diseases/appetite-loss/qa/${next.id}`}
            className="flex min-h-12 items-center justify-end gap-2 rounded-xl border border-gray-300 px-3 py-3 text-sm font-bold leading-5 text-gray-700 hover:border-teal-500 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-teal-950/30"
          >
            <span>次の質問</span>
            <ArrowRight size={18} aria-hidden="true" className="shrink-0" />
          </Link>
        )}
      </nav>

      <Link
        to={returnTo}
        className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-teal-700 px-5 py-4 text-center text-base font-bold text-white shadow-md transition-colors hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
      >
        <List size={21} aria-hidden="true" />
        Q&A一覧に戻る（Q{question.number}付近）
      </Link>
    </article>
  )
}
