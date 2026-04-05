import { Link } from 'react-router-dom'
import WorkshopCard from '../components/WorkshopCard.jsx'

/**
 * Stat pill for the hero: icon + short label, muted for hierarchy under CTAs.
 */
function StatBadge({ children, icon }) {
  return (
    <div className="flex items-center gap-2 text-gray-300">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-gray-300 ring-1 ring-white/10">
        {icon}
      </span>
      <span className="text-left text-xs font-medium uppercase tracking-wide text-gray-300 sm:text-sm">
        {children}
      </span>
    </div>
  )
}

/**
 * Marketing home: hero + featured workshop grid (unchanged from original App body).
 */
export default function HomePage() {
  return (
    <>
      <section
        id="hero"
        className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-visible bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-16 text-center text-white sm:px-6"
        aria-labelledby="hero-heading"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 sm:text-sm">
            FOSSEE · IIT Bombay
          </p>

          <h1
            id="hero-heading"
            className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Book Workshops.
            </span>
            <span className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Build Skills.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-white/90 sm:text-lg">
            Explore free, hands-on workshops designed by IIT Bombay. Open to all
            students across India.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/workshops"
              className="inline-flex rounded-lg bg-blue-700 px-8 py-3 text-sm font-semibold text-white no-underline shadow-lg shadow-blue-950/40 transition duration-200 ease-out hover:bg-blue-600 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              View Workshops
            </Link>
            <Link
              to="/#workshops"
              className="inline-flex rounded-lg border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white no-underline backdrop-blur-sm transition duration-200 ease-out hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-14 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:max-w-none">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
            <StatBadge
              icon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              }
            >
              500+ Workshops
            </StatBadge>
            <StatBadge
              icon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              }
            >
              50,000+ Students
            </StatBadge>
            <StatBadge
              icon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              }
            >
              IIT Bombay Certified
            </StatBadge>
            </div>
          </div>
        </div>
      </section>

      <section
        id="workshops"
        className="border-t border-gray-800 px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="workshops-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2
              id="workshops-heading"
              className="relative inline-block pb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Available Workshops
              <span
                className="absolute bottom-2 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-indigo-500"
                aria-hidden
              />
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-gray-400">
              Pick a workshop and reserve your spot today
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <WorkshopCard
              title="Python for Scientific Computing"
              tag="Python"
              description="Learn NumPy, SciPy and Matplotlib through real-world data problems."
              accent="emerald"
            />
            <WorkshopCard
              title="Scilab Fundamentals"
              tag="Scilab"
              description="Master open-source numerical computation used in engineering fields."
              accent="blue"
            />
            <WorkshopCard
              title="Arduino & Embedded Systems"
              tag="Arduino"
              description="Build real hardware projects using C programming and Arduino boards."
              accent="orange"
            />
          </div>
        </div>
      </section>
    </>
  )
}
