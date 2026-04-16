import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useAppStore } from '../../stores/app-store'

const slides = [
  {
    title: '口腔内には何百億もの細菌がいます',
    body: '不十分な口腔ケアは細菌の温床となり、誤嚥性肺炎の直接的な原因になります。',
    highlight: '位相差顕微鏡（×3200倍）で見る口腔内細菌',
    color: 'from-red-600 to-red-800',
  },
  {
    title: 'OHATの導入で歯科介入が劇的に早まりました',
    body: '脳卒中患者において、OHAT導入前は歯科介入まで平均8日かかっていましたが、導入後はわずか2日に短縮されました。',
    highlight: '8日 → 2日（Matsunaga 2025）',
    color: 'from-teal-600 to-teal-800',
  },
  {
    title: '経験年数では食事介助スキルは向上しません',
    body: 'FASS研究（Nagano & Maeda 2024）の結果、看護経験年数や研修参加回数と食事介助スキルには相関がありませんでした。しかし、スキルスコアと患者の食事摂取量には有意な相関（R²=0.318）があります。',
    highlight: '実技トレーニングでしかスキルは身につかない',
    color: 'from-amber-600 to-amber-800',
  },
  {
    title: 'あなたの口腔ケアと食事介助が患者さんの命を守ります',
    body: 'このアプリでOHAT-J（口腔アセスメント）とCORE10（食事介助スキル）を学び、エビデンスに基づいた実践力を身につけましょう。',
    highlight: '「食べる喜び」を守る看護師になろう',
    color: 'from-primary to-primary-dark',
  },
]

export function ProloguePage() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  const setPrologueSeen = useAppStore((s) => s.setPrologueSeen)

  const isLast = current === slides.length - 1
  const slide = slides[current]

  const handleFinish = () => {
    setPrologueSeen()
    navigate('/', { replace: true })
  }

  return (
    <div className={`fixed inset-0 z-50 flex flex-col bg-gradient-to-br ${slide.color} text-white`}>
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-4 text-6xl font-bold opacity-20">{current + 1}</div>
        <h2 className="text-2xl font-bold leading-tight">{slide.title}</h2>
        <p className="mt-4 text-base leading-relaxed opacity-90">{slide.body}</p>
        <div className="mt-6 rounded-xl bg-white/20 px-6 py-3 text-sm font-bold backdrop-blur">
          {slide.highlight}
        </div>
      </div>

      <div className="flex items-center justify-between px-6 pb-10">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm ${current === 0 ? 'opacity-0' : 'bg-white/20'}`}
          disabled={current === 0}
        >
          <ChevronLeft size={16} /> 戻る
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${i === current ? 'w-6 bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>

        {isLast ? (
          <button
            onClick={handleFinish}
            className="rounded-full bg-white px-6 py-2 text-sm font-bold text-gray-900"
          >
            はじめる
          </button>
        ) : (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="flex items-center gap-1 rounded-full bg-white/20 px-4 py-2 text-sm"
          >
            次へ <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
