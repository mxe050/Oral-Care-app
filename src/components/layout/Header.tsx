import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { useAppStore } from '../../stores/app-store'

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { darkMode, toggleDarkMode } = useAppStore()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-gray-700 dark:bg-gray-900/90">
      <div className="flex items-center gap-2">
        {!isHome && (
          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-lg font-bold text-primary">
          OralCare Navi
        </h1>
      </div>
      <button
        onClick={toggleDarkMode}
        className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  )
}
