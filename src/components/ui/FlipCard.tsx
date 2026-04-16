import { useState, type ReactNode } from 'react'

interface Props {
  front: ReactNode
  back: ReactNode
  onFlip?: () => void
  className?: string
}

export function FlipCard({ front, back, onFlip, className = '' }: Props) {
  const [flipped, setFlipped] = useState(false)

  const handleFlip = () => {
    setFlipped(!flipped)
    if (!flipped && onFlip) onFlip()
  }

  return (
    <div
      className={`perspective-1000 cursor-pointer ${className}`}
      onClick={handleFlip}
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="rounded-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
          <div className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
            {flipped ? '' : 'タップして裏を見る'}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
          <div className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
            タップして戻す
          </div>
        </div>
      </div>
    </div>
  )
}
