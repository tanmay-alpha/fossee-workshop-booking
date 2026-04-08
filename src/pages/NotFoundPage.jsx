import { Link } from 'react-router-dom'

/**
 * 404 Not Found page — catch-all route fallback.
 */
export default function NotFoundPage() {
  return (
    <div className="page-enter relative flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-4 text-center overflow-hidden">

      {/* Big 404 */}
      <p
        className="select-none text-[8rem] font-black leading-none tracking-tighter text-white/[0.04] sm:text-[12rem] lg:text-[16rem]"
        aria-hidden
      >
        404
      </p>

      {/* Content */}
      <div className="relative -mt-8 flex flex-col items-center">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/10">
          <svg className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="mt-6 text-4xl font-black tracking-tighter text-white sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-sm text-sm text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/workshops"
          className="btn-gradient mt-8 inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-sm font-bold text-white no-underline"
        >
          Go to Workshops
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
