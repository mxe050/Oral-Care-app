import { NavLink } from 'react-router-dom'
import { Home, Smile, Utensils } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'ホーム' },
  { to: '/ohat', icon: Smile, label: 'OHAT' },
  { to: '/fass', icon: Utensils, label: 'CORE10' },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-lg">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2 text-xs transition-colors ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-gray-500 dark:text-gray-400'
              }`
            }
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
