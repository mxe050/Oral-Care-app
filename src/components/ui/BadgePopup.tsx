import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface Props {
  badge: { name: string; emoji: string; description: string }
  onClose: () => void
}

export function BadgePopup({ badge, onClose }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => {
          setVisible(false)
          setTimeout(onClose, 300)
        }}
      />

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-xs rounded-2xl bg-white p-6 text-center shadow-2xl transition-all duration-500 dark:bg-gray-900 ${
          visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <button
          onClick={() => {
            setVisible(false)
            setTimeout(onClose, 300)
          }}
          className="absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X size={16} />
        </button>

        <div className="mb-3 text-5xl">{badge.emoji}</div>
        <div className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          バッジ獲得!
        </div>
        <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">
          {badge.name}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {badge.description}
        </p>

        {/* Confetti dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                backgroundColor: ['#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6'][i % 5],
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animation: `badgeConfetti ${1 + Math.random()}s ease-out ${Math.random() * 0.5}s forwards`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes badgeConfetti {
          0% { transform: scale(0) translateY(0); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: scale(1) translateY(-30px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
