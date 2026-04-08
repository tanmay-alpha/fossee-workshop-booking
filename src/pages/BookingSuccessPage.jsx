import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { generateICS } from '../utils/calendarExport.js'
import Footer from '../components/Footer.jsx'

/**
 * Booking Success Page — clean confirmation with workshop details,
 * booking ID, "What's Next" section, and .ics calendar export.
 * Redirects to /workshops if accessed without router state.
 */

/** Display-formatted date — "Tuesday, 15 April 2026" */
function formatDate(dateStr) {
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default function BookingSuccessPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const hasState = Boolean(state?.bookingId)

  useEffect(() => {
    if (!hasState) navigate('/workshops', { replace: true })
  }, [hasState, navigate])

  if (!hasState) return null

  const { bookingId, attendee, workshop } = state

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(bookingId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  function handleAddToCalendar() {
    generateICS({
      title: workshop.title,
      description: `FOSSEE Workshop by ${workshop.instructor}. Duration: ${workshop.duration}`,
      startDate: workshop.date,
      duration: workshop.duration,
      location: 'Online / IIT Bombay',
      organizer: 'FOSSEE IIT Bombay',
    })
  }

  return (
    <div className="page-enter relative flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-4 py-20">

      <div className="relative w-full max-w-lg">

        {/* ── Icon ── */}
        <div className="success-icon-enter flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/25">
            <svg className="h-12 w-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* ── Main card ── */}
        <div className="success-card-enter glass mt-8 rounded-2xl p-8 text-center">

          {/* Headline */}
          <h1 className="text-3xl font-black tracking-tighter text-white">
            You're All Set!
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Welcome aboard,{' '}
            <span className="font-semibold text-white">{attendee.name}</span>.
            Your seat is confirmed and waiting for you.
          </p>

          {/* ── Workshop info block ── */}
          <div className="mt-6 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.08] text-left overflow-hidden">
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                Registered Workshop
              </p>
              <p className="mt-1.5 text-xl font-bold text-white leading-snug">
                {workshop.title}
              </p>
            </div>
            <div className="grid grid-cols-1 divide-y divide-white/[0.04] border-t border-white/[0.05] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { label: 'Date', value: formatDate(workshop.date) },
                { label: 'Duration', value: workshop.duration },
                { label: 'Instructor', value: workshop.instructor },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-gray-300 leading-snug">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Booking ID ── */}
          <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <div className="flex items-center gap-2 min-w-0">
              <svg className="h-4 w-4 shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
              <span className="text-xs text-gray-500">Booking ID</span>
              <span className="font-mono text-sm font-bold text-white truncate">{bookingId}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className={`ml-2 shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all duration-200 ${
                copied
                  ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30'
                  : 'border border-white/10 text-gray-400 hover:border-indigo-500/30 hover:text-indigo-300'
              }`}
              aria-label="Copy booking ID"
            >
              {copied ? (
                <>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.337c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  Copy ID
                </>
              )}
            </button>
          </div>

          <p className="mt-2 text-[11px] text-gray-600">
            Confirmation details sent to <span className="text-gray-400">{attendee.email}</span>
          </p>

          {/* ── What's Next section ── */}
          <div className="mt-7 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-400/80">
              What's Next
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {[
                {
                  icon: (
                    <svg className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
                    </svg>
                  ),
                  text: 'Save the date — add it to your calendar below.',
                },
                {
                  icon: (
                    <svg className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: 'Track your booking status in My Bookings.',
                },
                {
                  icon: (
                    <svg className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  ),
                  text: 'Explore more free workshops from IIT Bombay.',
                },
              ].map(({ icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">{icon}</span>
                  <p className="text-sm text-gray-400">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="mt-6 flex flex-col gap-3">
            {/* Calendar */}
            <button
              type="button"
              onClick={handleAddToCalendar}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-gray-200 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
            >
              <svg className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
              </svg>
              Add to Calendar (.ics)
            </button>

            <div className="flex gap-3">
              <Link
                to="/my-bookings"
                className="btn-gradient inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white no-underline"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                View My Bookings
              </Link>
              <Link
                to="/workshops"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-gray-300 no-underline transition-all hover:text-white"
              >
                More Workshops
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
