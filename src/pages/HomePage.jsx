import { Link } from 'react-router-dom'
import WorkshopCard from '../components/WorkshopCard.jsx'
import Footer from '../components/Footer.jsx'

/* ─── Staggered animation styles ────────────────────────────────────────── */
const fadeInUp = (delay = 0) => ({
  animation: `fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
})

/**
 * Stat pill — icon + value + label.
 */
function StatPill({ icon, value, label }) {
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 text-center sm:flex-row sm:gap-3 sm:text-left"
      aria-label={`${value} ${label}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-base font-bold text-white">{value}</span>
        <span className="text-xs font-medium text-gray-500">{label}</span>
      </span>
    </div>
  )
}

/* ─── SVG icons ─────────────────────────────────────────────────────────── */
const BookIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
)
const UsersIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
)
const ShieldIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
)

/* ─────────────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="page-enter">
      {/* Keyframes for stagger animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section
        id="hero"
        className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-8 lg:px-16"
        aria-labelledby="hero-heading"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 60%), ' +
            'linear-gradient(to bottom, #0a0a0f, #0f1120)',
        }}
      >
        {/* ── Content ── */}
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-7">

          {/* Eyebrow label */}
          <p
            className="inline-flex items-center gap-2.5 rounded-full border border-indigo-400/20 bg-indigo-500/8 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300 sm:text-sm"
            style={fadeInUp(0)}
          >
            <span aria-hidden className="inline-flex h-2 w-2 rounded-full bg-indigo-400" />
            FOSSEE · IIT Bombay
          </p>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="text-4xl font-black leading-[0.95] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
            style={fadeInUp(0.1)}
          >
            Book Workshops.<br />
            <span className="text-gradient">Build Skills.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mx-auto max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg"
            style={fadeInUp(0.2)}
          >
            Explore free, hands-on workshops designed by IIT&nbsp;Bombay.
            Open to all students across&nbsp;India.
          </p>

          {/* CTA buttons */}
          <div
            className="mt-2 flex flex-wrap items-center justify-center gap-4"
            style={fadeInUp(0.3)}
          >
            <Link
              to="/workshops"
              className="btn-gradient inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold text-white no-underline shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
            >
              Explore Workshops
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <Link
              to="/#workshops"
              className="inline-flex items-center rounded-xl border border-gray-600 bg-white/5 px-6 py-3.5 text-sm font-semibold text-gray-300 no-underline transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Learn More
            </Link>
          </div>

          {/* Trust Signals */}
          <div
            className="mt-6 flex items-center justify-center gap-6 text-sm font-medium text-gray-400"
            style={fadeInUp(0.4)}
          >
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Trusted by 50,000+ Students
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              IIT Bombay Certified
            </span>
          </div>

          {/* Stats row */}
          <div className="mt-4 w-full" style={fadeInUp(0.4)}>
            <div className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-5 sm:gap-5 sm:px-8">
              <StatPill icon={BookIcon}   value="500+"       label="Workshops" />
              <div className="h-10 w-px bg-white/[0.06]" aria-hidden />
              <StatPill icon={UsersIcon}  value="50,000+"    label="Students" />
              <div className="h-10 w-px bg-white/[0.06]" aria-hidden />
              <StatPill icon={ShieldIcon} value="IIT Bombay" label="Certified" />
            </div>
          </div>
        </div>

        {/* Scroll hint — static */}
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ════════════════ FEATURED WORKSHOPS ════════════════ */}
      <section
        id="workshops"
        className="relative px-4 py-24 sm:px-8 lg:px-16"
        aria-labelledby="workshops-heading"
      >
        {/* Decorative divider */}
        <div className="mx-auto mb-14 flex max-w-6xl items-center gap-4" aria-hidden>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            Featured
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
        </div>

        <div className="mx-auto max-w-6xl">
          {/* Section heading */}
          <div className="mb-12 text-center">
            <h2
              id="workshops-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Available Workshops
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-indigo-500/60" />
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-gray-400 sm:text-base">
              Pick a workshop and reserve your spot today.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <WorkshopCard
              id="python-for-scientific-computing"
              title="Python for Scientific Computing"
              tag="Python"
              description="Learn NumPy, SciPy and Matplotlib through real-world data problems."
            />
            <WorkshopCard
              id="scilab-for-engineering-math"
              title="Scilab Fundamentals"
              tag="Scilab"
              description="Master open-source numerical computation used in engineering fields."
            />
            <WorkshopCard
              id="arduino-embedded-systems"
              title="Arduino & Embedded Systems"
              tag="Arduino"
              description="Build real hardware projects using C programming and Arduino boards."
            />
          </div>

          {/* View all CTA */}
          <div className="mt-14 text-center">
            <Link
              to="/workshops"
              className="group inline-flex items-center gap-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/8 px-6 py-3 text-sm font-semibold text-indigo-300 no-underline transition-all duration-200 hover:border-indigo-400/40 hover:bg-indigo-500/15 hover:text-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Browse All Workshops
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
