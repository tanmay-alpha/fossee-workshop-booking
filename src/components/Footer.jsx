import { Link } from 'react-router-dom'

/**
 * Site-wide footer — 3-column layout with clean links and funding info.
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">

          {/* Col 1 — Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tighter text-white no-underline transition-colors duration-200 hover:text-indigo-300"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500 text-[10px] font-black text-white">
                F
              </span>
              FOSSEE Workshops
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              Free and Open Source Software for Education —{' '}
              <span className="text-gray-400">IIT Bombay</span>
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
              Quick Links
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/workshops', label: 'Browse Workshops' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 no-underline transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://fossee.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gray-400 no-underline transition-colors duration-200 hover:text-white"
                >
                  About FOSSEE
                  <svg className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@fossee.in"
                  className="text-gray-400 no-underline transition-colors duration-200 hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 — Funding */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
              Funded By
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-gray-500">
              National Mission on Education through ICT
            </p>
            <p className="mt-1 text-sm font-medium text-gray-400">
              Ministry of Education, Govt. of India
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/[0.06] pt-6 text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} FOSSEE, IIT Bombay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
