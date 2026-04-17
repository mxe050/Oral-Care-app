import { ExternalLink, Droplets } from 'lucide-react'
import { VideoLinkList, type VideoLink } from '../../components/ui/VideoLinkList'

const ORAL_CARE_APP_URL = 'https://mxe050.github.io/oral-care/'

const oralCareVideos: VideoLink[] = [
  { label: 'シンガポール口腔のケア', url: 'https://www.youtube.com/watch?v=sMKNjIMsxy4' },
]

export function OralCareHubPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 text-white shadow-sm">
            <Droplets size={18} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            口腔のケア
          </h2>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          実践的な口腔ケアの手順と注意点をインタラクティブに学べます。
        </p>
      </div>

      {/* Embedded oral-care app */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5 dark:border-gray-800">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            口腔ケアアプリ
          </span>
          <a
            href={ORAL_CARE_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-700 transition-colors hover:bg-cyan-100 dark:bg-cyan-950 dark:text-cyan-300 dark:hover:bg-cyan-900"
          >
            別タブで開く
            <ExternalLink size={11} />
          </a>
        </div>
        <iframe
          src={ORAL_CARE_APP_URL}
          title="口腔ケアアプリ"
          className="block h-[70vh] w-full border-0"
          loading="lazy"
          allow="fullscreen"
        />
      </div>

      {/* Video learning links */}
      <VideoLinkList links={oralCareVideos} accent="blue" />
    </div>
  )
}
