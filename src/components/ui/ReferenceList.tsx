import { useState } from 'react'
import { BookOpen, ChevronDown, ExternalLink } from 'lucide-react'
import type { Reference } from '../../types/common'

interface Props {
  references: Reference[]
  compact?: boolean
}

export function ReferenceList({ references, compact = false }: Props) {
  const [open, setOpen] = useState(false)

  if (references.length === 0) return null

  if (compact) {
    return (
      <div className="group relative inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
        <BookOpen size={12} />
        <span>参考文献 ({references.length})</span>
        <div className="pointer-events-none absolute bottom-full left-0 z-50 mb-1 hidden w-64 rounded-lg bg-gray-900 p-3 text-xs text-white shadow-lg group-hover:block dark:bg-gray-700">
          {references.map((ref) => (
            <p key={ref.id} className="mb-1 last:mb-0">
              {ref.authors} ({ref.year})
            </p>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <span className="flex items-center gap-2">
          <BookOpen size={16} className="text-teal-600 dark:text-teal-400" />
          参考文献 ({references.length})
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-3 border-t border-gray-100 px-4 py-3 dark:border-gray-800">
          {references.map((ref) => (
            <div key={ref.id} className="text-xs text-gray-600 dark:text-gray-400">
              <p>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {ref.authors}
                </span>{' '}
                ({ref.year}).{' '}
                <span className="italic">{ref.title}</span>.{' '}
                <span className="text-gray-500">{ref.journal}</span>.
              </p>
              {ref.doi && (
                <a
                  href={`https://doi.org/${ref.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-teal-600 hover:underline dark:text-teal-400"
                >
                  <ExternalLink size={10} />
                  DOI: {ref.doi}
                </a>
              )}
              {ref.keyFinding && (
                <p className="mt-1 rounded bg-teal-50 px-2 py-1 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                  {ref.keyFinding}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
