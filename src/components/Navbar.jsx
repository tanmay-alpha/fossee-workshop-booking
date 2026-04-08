import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

/**
 * Sticky navbar with mobile hamburger menu.
 * Includes "My Bookings" link with live count badge from AppContext.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { confirmedCount } = useApp()

  const linkClass = ({ isActive }) =>
    [
      'relative py-1 text-sm font-medium no-underline transition-colors duration-200',
      isActive ? 'text-white' : 'text-gray-400 hover:text-white',
    ].join(' ')

  const Underline = ({ isActive }) =>
    isActive ? (
      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-indigo-400" />
    ) : null

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0f]/90 backdrop-blur-lg">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tighter text-white no-underline outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] rounded-lg"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500 text-xs font-black text-white">
            F
          </span>
          <span className="hidden sm:inline">FOSSEE Workshops</span>
          <span className="sm:hidden">FOSSEE</span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={linkClass}>
            {({ isActive }) => (
              <span className="group relative">
                Home
                <Underline isActive={isActive} />
              </span>
            )}
          </NavLink>
          <NavLink to="/workshops" className={linkClass}>
            {({ isActive }) => (
              <span className="group relative">
                Workshops
                <Underline isActive={isActive} />
              </span>
            )}
          </NavLink>
          <NavLink to="/my-bookings" className={linkClass}>
            {({ isActive }) => (
              <span className="group relative flex items-center gap-1.5">
                My Bookings
                {confirmedCount > 0 && (
                  <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-indigo-500 px-1.5 text-[10px] font-black text-white">
                    {confirmedCount}
                  </span>
                )}
                <Underline isActive={isActive} />
              </span>
            )}
          </NavLink>
          <NavLink to="/transformation" className={linkClass}>
            {({ isActive }) => (
              <span className="group relative flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Showcase
                <Underline isActive={isActive} />
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((v) => !v)}
          className="flex items-center justify-center rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 md:hidden"
        >
          {isOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/[0.06] bg-[#0a0a0f]/95 px-4 py-4 backdrop-blur-lg">
            <div className="flex flex-col gap-1 text-sm">
              {[
                { to: '/', label: 'Home', end: true },
                { to: '/workshops', label: 'Workshops', end: false },
                { to: '/my-bookings', label: 'My Bookings', end: false, badge: confirmedCount },
                { to: '/transformation', label: '✦ Showcase', end: false },
              ].map(({ to, label, end, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-lg px-3 py-3 font-medium no-underline transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-500/10 text-indigo-300'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                  {badge > 0 && (
                    <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-indigo-500 px-1.5 text-[10px] font-black text-white">
                      {badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
