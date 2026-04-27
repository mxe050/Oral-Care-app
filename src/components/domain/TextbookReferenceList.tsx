import { BookOpen } from 'lucide-react'
import { TEXTBOOK_REFERENCES, type TextbookId } from '../../data/textbook-references'

interface Props {
  citedIds: TextbookId[]
}

export function TextbookReferenceList({ citedIds }: Props) {
  const cited = citedIds
    .map((id) => TEXTBOOK_REFERENCES[id])
    .filter((r): r is NonNullable<typeof r> => Boolean(r))

  if (cited.length === 0) return null

  return (
    <div>
      <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-gray-100">
        <BookOpen size={14} />
        参考文献
      </h3>
      <div className="space-y-2">
        {cited.map((r, i) => (
          <div
            key={r.id}
            className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex items-start gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-[10px] font-black text-white">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-bold leading-tight text-gray-900 dark:text-gray-100">
                  {r.title}
                </div>
                <div className="mt-0.5 text-[11px] text-gray-600 dark:text-gray-400">
                  {r.authors}
                  {r.publisher ? `. ${r.publisher}` : ''}
                  {r.journal ? `. ${r.journal}` : ''}
                  {r.year ? `, ${r.year}` : ''}
                  {r.pages ? `, p.${r.pages}` : ''}.
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
