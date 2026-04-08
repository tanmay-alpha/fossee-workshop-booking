import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { workshops } from '../data/workshops.js'
import Footer from '../components/Footer.jsx'
import { useApp } from '../context/AppContext.jsx'
import { useAnalytics } from '../hooks/useAnalytics.js'
import { getBookingStatus, getButtonClasses, getSeatMessage } from '../utils/workshopHelpers.js'

/** Seat availability badge. */
function SeatBadge({ seats }) {
  if (seats === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 ring-1 ring-red-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" aria-hidden />
        Workshop Full
      </span>
    )
  }
  if (seats <= 3) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 ring-1 ring-red-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" aria-hidden />
        Only {seats} Spot{seats > 1 ? 's' : ''} Left
      </span>
    )
  }
  if (seats <= 10) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden />
        Almost Full — {seats} Seats
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
      {seats} Seats Available
    </span>
  )
}

/** Extract initials from a name string. */
function getInitials(name) {
  if (!name || typeof name !== 'string') return 'FW'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default function WorkshopDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const workshop = workshops.find((w) => w.id === id)
  const { isBooked, getBooking, getSeatCount } = useApp()
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    if (workshop) {
      trackEvent('workshop_viewed', { workshopId: workshop.id, workshopTitle: workshop.title })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── 404 state ── */
  if (!workshop) {
    return (
      <div className="page-enter min-h-screen bg-[#0a0a0f] pt-20">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.08]">
            <svg className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-black tracking-tighter text-white">Workshop Not Found</h1>
          <p className="mt-3 text-gray-500">The workshop you are looking for does not exist or has been removed.</p>
          <Link
            to="/workshops"
            className="btn-gradient mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white no-underline"
          >
            Back to Workshops
          </Link>
        </div>
      </div>
    )
  }

  const currentSeats = getSeatCount(workshop.id)
  const booked = isBooked(workshop.id)
  const booking = getBooking(workshop.id)
  const { label, variant, disabled } = getBookingStatus(currentSeats, booked)
  const buttonClasses = getButtonClasses(variant)
  const seatMsg = getSeatMessage(currentSeats)

  return (
    <div className="page-enter min-h-screen bg-[#0a0a0f] pt-20">

      {/* HEADER BANNER */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <Link
            to="/workshops"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 no-underline transition-colors duration-200 hover:text-white"
          >
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Workshops
          </Link>

          <div className="mt-5">
            <span className="inline-flex rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-indigo-400 ring-1 ring-indigo-500/20">
              {workshop.category}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tighter text-white sm:text-4xl md:text-5xl">
            {workshop.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[
              { label: 'Date', value: workshop.date },
              { label: 'Duration', value: workshop.duration },
              { label: 'Level', value: workshop.level },
            ].map(({ label, value }) => (
              <span
                key={label}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs font-medium text-gray-300"
              >
                {label}: {value}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <SeatBadge seats={currentSeats} />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row">

        {/* Left column */}
        <div className="flex flex-1 flex-col gap-10">

          {/* About */}
          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-white">About This Workshop</h2>
            <p className="leading-relaxed text-gray-400">{workshop.about}</p>
          </section>

          <div className="h-px bg-white/[0.06]" aria-hidden />

          {/* Topics */}
          <section>
            <h2 className="mb-5 text-xl font-bold tracking-tight text-white">Topics Covered</h2>
            <ol className="flex flex-col gap-3">
              {workshop.topics.map((topic, i) => (
                <li key={`${workshop.id}-topic-${i + 1}`} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-400 ring-1 ring-indigo-500/20">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-gray-300">{topic}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="h-px bg-white/[0.06]" aria-hidden />

          {/* Prerequisites */}
          <section>
            <h2 className="mb-5 text-xl font-bold tracking-tight text-white">Prerequisites</h2>
            <ul className="flex flex-col gap-3">
              {workshop.prerequisites.map((p, i) => (
                <li key={`${workshop.id}-pre-${i + 1}`} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm leading-relaxed text-gray-300">{p}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="h-px bg-white/[0.06]" aria-hidden />

          {/* Instructor */}
          <section className="glass rounded-2xl p-6">
            <h2 className="mb-5 text-xl font-bold tracking-tight text-white">Instructor</h2>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 text-lg font-bold text-white">
                {getInitials(workshop.instructor)}
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{workshop.instructor}</p>
                <p className="text-sm text-gray-500">FOSSEE Team, IIT Bombay</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="w-full flex-shrink-0 lg:w-96">
          <div className="glass sticky top-24 self-start rounded-2xl p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">Workshop Fee</p>
            <p className="mt-2 text-5xl font-black text-white">FREE</p>
            <p className="mt-2 text-sm text-gray-500">
              Funded by Ministry of Education, Govt. of India
            </p>

            {/* Details grid */}
            <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.06] pt-5 text-sm">
              {[
                { label: 'Date', value: workshop.date },
                { label: 'Duration', value: workshop.duration },
                { label: 'Level', value: workshop.level },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-gray-300">{value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Seats Left</span>
                <span className={`font-semibold ${seatMsg.colorClass}`}>
                  {currentSeats === 0 ? 'Full' : currentSeats}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <SeatBadge seats={currentSeats} />
            </div>

            {/* Already Booked Panel */}
            {booked ? (
              <div className="mt-8 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 p-5 text-center">
                <svg className="mx-auto h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-2 font-bold text-emerald-300">You're Registered for This Workshop</p>
                {booking && (
                  <p className="mt-1 font-mono text-xs text-emerald-500/80">{booking.bookingId}</p>
                )}
                <Link
                  to="/my-bookings"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 no-underline transition-colors hover:text-indigo-300"
                >
                  View in My Bookings →
                </Link>
              </div>
            ) : (
              <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && navigate(`/book/${workshop.id}`)}
                className={`mt-8 w-full ${buttonClasses}`}
              >
                {label}
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}