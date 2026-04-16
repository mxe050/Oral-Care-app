import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useAppStore } from '../../stores/app-store'
import type { Reference } from '../../types/common'

interface Slide {
  title: string
  body: string
  highlight: string
  color: string
  references: Reference[]
}

const slides: Slide[] = [
  {
    title: '口腔内には何百億もの細菌がいます',
    body: '不十分な口腔ケアは細菌の温床となり、誤嚥性肺炎の直接的な原因になります。',
    highlight: '位相差顕微鏡（x3200倍）で見る口腔内細菌',
    color: 'from-red-600 to-red-800',
    references: [
      {
        id: 'prologue-1',
        authors: 'Yoneyama T, et al.',
        title: 'Oral care and pneumonia',
        journal: 'Lancet',
        year: 1999,
        doi: '10.1016/S0140-6736(05)75550-1',
        keyFinding: '口腔ケアにより肺炎発生率が40%低下',
      },
    ],
  },
  {
    title: 'OHATの導入で歯科介入が劇的に早まりました',
    body: '脳卒中患者において、OHAT導入前は歯科介入まで平均8日かかっていましたが、導入後はわずか2日に短縮されました。',
    highlight: '8日 → 2日（Matsunaga 2025）',
    color: 'from-teal-600 to-teal-800',
    references: [
      {
        id: 'prologue-2',
        authors: 'Matsunaga Y, et al.',
        title: 'Impact of implementing OHAT on early dental intervention for stroke patients',
        journal: 'Journal of Clinical Nursing',
        year: 2025,
        keyFinding: 'OHAT導入により歯科介入までの日数が8日から2日に短縮',
      },
    ],
  },
  {
    title: '経験年数では食事介助スキルは向上しません',
    body: 'FASS研究の結果、看護経験年数や研修参加回数と食事介助スキルには相関がありませんでした。しかし、スキルスコアと患者の食事摂取量には有意な相関があります。',
    highlight: '実技トレーニングでしかスキルは身につかない',
    color: 'from-amber-600 to-amber-800',
    references: [
      {
        id: 'prologue-3',
        authors: 'Nagano A, Maeda K',
        title: 'Development and validation of Feeding Assistance Skill Score (FASS)',
        journal: 'European Geriatric Medicine',
        year: 2024,
        doi: '10.1007/s41999-024-01020-0',
        keyFinding: 'R2=0.318, p=0.006',
      },
    ],
  },
  {
    title: 'あなたの口腔ケアと食事介助が患者さんの命を守ります',
    body: 'このアプリでOHAT-J（口腔アセスメント）とCORE10（食事介助スキル）を学び、エビデンスに基づいた実践力を身につけましょう。',
    highlight: '「食べる喜び」を守る看護師になろう',
    color: 'from-teal-600 to-teal-800',
    references: [],
  },
]

export function ProloguePage() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [animating, setAnimating] = useState(false)
  const navigate = useNavigate()
  const setPrologueSeen = useAppStore((s) => s.setPrologueSeen)
  const touchStartX = useRef<number>(0)

  const isLast = current === slides.length - 1
  const slide = slides[current]

  const goTo = useCallback(
    (next: number, dir: 'left' | 'right') => {
      if (animating || next < 0 || next >= slides.length) return
      setDirection(dir)
      setAnimating(true)
      setTimeout(() => {
        setCurrent(next)
        setDirection(null)
        setAnimating(false)
      }, 300)
    },
    [animating],
  )

  const handleFinish = () => {
    setPrologueSeen()
    navigate('/', { replace: true })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) < 50) return
    if (dx < 0 && current < slides.length - 1) goTo(current + 1, 'left')
    if (dx > 0 && current > 0) goTo(current - 1, 'right')
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-gradient-to-br ${slide.color} text-white transition-all duration-300`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`flex flex-1 flex-col items-center justify-center px-8 text-center transition-all duration-300 ${
          direction === 'left'
            ? '-translate-x-8 opacity-0'
            : direction === 'right'
              ? 'translate-x-8 opacity-0'
              : 'translate-x-0 opacity-100'
        }`}
      >
        <div className="mb-4 text-7xl font-black opacity-15">{current + 1}</div>
        <h2 className="text-2xl font-bold leading-tight tracking-tight">
          {slide.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed opacity-90">
          {slide.body}
        </p>
        <div className="mt-6 rounded-2xl bg-white/20 px-6 py-3 text-sm font-bold backdrop-blur-sm">
          {slide.highlight}
        </div>

        {slide.references.length > 0 && (
          <div className="mt-6 w-full max-w-sm">
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
              {slide.references.map((ref) => (
                <p key={ref.id} className="text-xs opacity-80">
                  {ref.authors} ({ref.year}). <em>{ref.title}</em>. {ref.journal}.
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-6 pb-10">
        <button
          onClick={() => goTo(current - 1, 'right')}
          className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-all ${
            current === 0 ? 'pointer-events-none opacity-0' : 'bg-white/20 hover:bg-white/30'
          }`}
          disabled={current === 0}
        >
          <ChevronLeft size={16} /> 戻る
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-white' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>

        {isLast ? (
          <button
            onClick={handleFinish}
            className="rounded-full bg-white px-6 py-2 text-sm font-bold text-gray-900 shadow-lg transition-all hover:scale-105"
          >
            はじめる
          </button>
        ) : (
          <button
            onClick={() => goTo(current + 1, 'left')}
            className="flex items-center gap-1 rounded-full bg-white/20 px-4 py-2 text-sm transition-all hover:bg-white/30"
          >
            次へ <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
