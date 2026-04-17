import { PlayCircle, ExternalLink, Globe } from 'lucide-react'

export interface VideoLink {
  label: string
  url: string
  kind?: 'youtube' | 'web'
}

interface Props {
  title?: string
  links: VideoLink[]
  accent?: 'teal' | 'amber' | 'blue'
}

const accentStyles = {
  teal: {
    header: 'text-teal-700 dark:text-teal-300',
    icon: 'text-teal-500',
    hover: 'hover:border-teal-400 hover:bg-teal-50 dark:hover:border-teal-600 dark:hover:bg-teal-950',
  },
  amber: {
    header: 'text-amber-700 dark:text-amber-300',
    icon: 'text-amber-500',
    hover: 'hover:border-amber-400 hover:bg-amber-50 dark:hover:border-amber-600 dark:hover:bg-amber-950',
  },
  blue: {
    header: 'text-blue-700 dark:text-blue-300',
    icon: 'text-blue-500',
    hover: 'hover:border-blue-400 hover:bg-blue-50 dark:hover:border-blue-600 dark:hover:bg-blue-950',
  },
}

export function VideoLinkList({ title = '動画で学習', links, accent = 'teal' }: Props) {
  const style = accentStyles[accent]
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center gap-2">
        <PlayCircle size={16} className={style.icon} />
        <h3 className={`text-sm font-bold ${style.header}`}>{title}</h3>
      </div>
      <ul className="space-y-2">
        {links.map((link) => {
          const isWeb = link.kind === 'web'
          const Icon = isWeb ? Globe : PlayCircle
          return (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm transition-colors dark:border-gray-700 dark:bg-gray-900 ${style.hover}`}
              >
                <Icon size={16} className={isWeb ? 'text-gray-500' : 'text-red-500'} />
                <span className="flex-1 text-gray-800 dark:text-gray-200">{link.label}</span>
                <ExternalLink size={12} className="text-gray-400" />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
