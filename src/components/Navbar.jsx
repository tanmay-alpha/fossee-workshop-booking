import { Link } from 'react-router-dom'

/**
 * Top navigation — dark, minimal bar aligned with the rest of the app.
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/80 bg-gray-950/90 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-white no-underline transition-colors hover:text-indigo-200"
        >
          FOSSEE Workshops
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link
            to="/workshops"
            className="no-underline transition-colors duration-200 hover:text-indigo-400"
          >
            Workshops
          </Link>
          <Link
            to="/"
            className="no-underline transition-colors duration-200 hover:text-indigo-400"
          >
            Home
          </Link>
        </div>
      </nav>
    </header>
  )
}
