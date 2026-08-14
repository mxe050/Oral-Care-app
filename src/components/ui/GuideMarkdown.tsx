import type { ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'

type GuideMarkdownProps = {
  content: string
}

const renderInline = (value: string): ReactNode[] => {
  const tokenPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g
  const nodes: ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = tokenPattern.exec(value)) !== null) {
    if (match.index > cursor) nodes.push(value.slice(cursor, match.index))

    const token = match[0]
    if (token.startsWith('**')) {
      nodes.push(
        <strong key={`strong-${match.index}`} className="font-bold text-gray-950 dark:text-white">
          {token.slice(2, -2)}
        </strong>,
      )
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)]\(([^)]+)\)$/)
      if (linkMatch && /^https?:\/\//.test(linkMatch[2])) {
        nodes.push(
          <a
            key={`link-${match.index}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-baseline gap-1 font-medium text-teal-700 underline decoration-teal-300 underline-offset-2 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
          >
            <span>{linkMatch[1]}</span>
            <ExternalLink size={12} aria-hidden="true" />
          </a>,
        )
      } else {
        nodes.push(token)
      }
    } else {
      nodes.push(
        <code
          key={`code-${match.index}`}
          className="rounded bg-gray-100 px-1 py-0.5 text-[0.9em] dark:bg-gray-800"
        >
          {token.slice(1, -1)}
        </code>,
      )
    }

    cursor = match.index + token.length
  }

  if (cursor < value.length) nodes.push(value.slice(cursor))
  return nodes
}

const splitTableRow = (line: string) =>
  line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())

const isTableSeparator = (line: string) =>
  /^\s*\|?\s*:?-{3,}/.test(line) && line.includes('|')

const renderBlock = (block: string, blockIndex: number) => {
  const lines = block.split('\n').map((line) => line.trimEnd())
  const first = lines[0]?.trim() ?? ''

  if (!first || first === '---') return null

  if (lines.length >= 2 && first.includes('|') && isTableSeparator(lines[1])) {
    const headings = splitTableRow(lines[0])
    const rows = lines.slice(2).filter((line) => line.includes('|')).map(splitTableRow)

    return (
      <div
        key={`table-${blockIndex}`}
        className="my-5 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-teal-50 dark:bg-teal-950/40">
            <tr>
              {headings.map((heading, index) => (
                <th
                  key={`heading-${index}`}
                  className="whitespace-nowrap border-b border-gray-200 px-3 py-3 font-bold text-gray-900 dark:border-gray-700 dark:text-gray-100"
                >
                  {renderInline(heading)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="border-b border-gray-100 last:border-0 dark:border-gray-800">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`cell-${cellIndex}`}
                    className="min-w-36 px-3 py-3 align-top leading-6 text-gray-700 dark:text-gray-200"
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (lines.every((line) => /^\s*[-*]\s+/.test(line))) {
    return (
      <ul key={`ul-${blockIndex}`} className="my-4 space-y-2 pl-5">
        {lines.map((line, index) => (
          <li key={`li-${index}`} className="list-disc pl-1">
            {renderInline(line.replace(/^\s*[-*]\s+/, ''))}
          </li>
        ))}
      </ul>
    )
  }

  if (lines.every((line) => /^\s*\d+[.．]\s+/.test(line))) {
    return (
      <ol key={`ol-${blockIndex}`} className="my-4 space-y-2 pl-6">
        {lines.map((line, index) => (
          <li key={`li-${index}`} className="list-decimal pl-1">
            {renderInline(line.replace(/^\s*\d+[.．]\s+/, ''))}
          </li>
        ))}
      </ol>
    )
  }

  if (lines.every((line) => line.trimStart().startsWith('>'))) {
    return (
      <blockquote
        key={`quote-${blockIndex}`}
        className="my-5 border-l-4 border-teal-400 bg-teal-50/70 px-4 py-3 font-medium leading-7 text-teal-950 dark:bg-teal-950/30 dark:text-teal-100"
      >
        {lines.map((line, index) => (
          <span key={`quote-line-${index}`}>
            {index > 0 && <br />}
            {renderInline(line.replace(/^\s*>\s?/, ''))}
          </span>
        ))}
      </blockquote>
    )
  }

  const headingMatch = first.match(/^(#{1,6})\s+(.+)$/)
  if (headingMatch) {
    return (
      <h3
        key={`heading-${blockIndex}`}
        className="mb-2 mt-7 text-lg font-bold leading-7 text-gray-950 dark:text-white"
      >
        {renderInline(headingMatch[2])}
      </h3>
    )
  }

  return (
    <p
      key={`paragraph-${blockIndex}`}
      className="my-4 text-base leading-8 text-gray-700 dark:text-gray-200"
    >
      {lines.map((line, index) => (
        <span key={`line-${index}`}>
          {index > 0 && <br />}
          {renderInline(line)}
        </span>
      ))}
    </p>
  )
}

export function GuideMarkdown({ content }: GuideMarkdownProps) {
  const blocks = content
    .replace(/\r\n?/g, '\n')
    .split(/\n\s*\n/)
    .filter((block) => block.trim())

  return <div>{blocks.map(renderBlock)}</div>
}
