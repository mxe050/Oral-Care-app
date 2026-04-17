import { NavLink } from 'react-router-dom'
import { Home, Smile, Droplets, Brain, Utensils } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'ホーム' },
  { to: '/ohat', icon: Smile, label: 'OHAT' },
  { to: '/oral-care', icon: Droplets, label: '口腔ケア' },
  { to: '/swallow', icon: Brain, label: '嚥下' },
  { to: '/fass', icon: Utensils, label: 'CORE10' },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
      <div className="mx-auto flex max-w-lg">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2.5 text-xs transition-all duration-200 ${
                isActive
                  ? 'text-teal-600 font-bold dark:text-teal-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`rounded-lg p-1 transition-all duration-200 ${isActive ? 'bg-teal-100 dark:bg-teal-900' : ''}`}>
                  <Icon size={20} fill={isActive ? 'currentColor' : 'none'} />
                </div>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
