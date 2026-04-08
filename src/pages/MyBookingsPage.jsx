import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../hooks/useToast.js'
import Footer from '../components/Footer.jsx'

/**
 * My Bookings — clean listing of confirmed and cancelled bookings.
 */

/** Format a date string to "15 Apr 2026" */
function formatShortDate(dateStr) {
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return dateStr }
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* fallback */ }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`ml-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-bold transition-all duration-200 ${
        copied
          ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30'
          : 'border border-white/10 text-gray-500 hover:border-indigo-500/30 hover:text-indigo-300'
      }`}
      aria-label="Copy booking ID"
    >
      {copied ? (
        <>
          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.337c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
          Copy
        </>
      )}
    </button>
  )
}

function CancelConfirm({ onCancel, onKeep }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.04] px-4 py-3">
      <svg className="h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <p className="flex-1 text-sm text-red-300">Cancel your spot? This cannot be undone.</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-300 transition-all hover:bg-red-500/30"
        >
          Yes, Cancel
        </button>
        <button
          type="button"
          onClick={onKeep}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-gray-400 transition-all hover:border-white/20 hover:text-white"
        >
          Keep My Spot
        </button>
      </div>
    </div>
  )
}

function BookingCard({ booking, index }) {
  const { cancelBooking } = useApp()
  const toast = useToast()
  const [showConfirm, setShowConfirm] = useState(false)
  const isCancelled = booking.status === 'cancelled'

  const workshopDate = new Date(booking.workshopDate)
  const isFuture = !isNaN(workshopDate.getTime()) ? workshopDate > new Date() : true

  const handleCancel = useCallback(() => {
    cancelBooking(booking.bookingId)
    toast.warning('Booking cancelled. Your spot has been released.')
    setShowConfirm(false)
  }, [booking.bookingId, cancelBooking, toast])

  return (
    <div
      className={`card-stagger booking-card-hover glass rounded-2xl p-6 transition-all duration-200 ${
        isCancelled ? 'opacity-50 grayscale-[30%]' : 'hover:border-indigo-500/15'
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Left: info */}
        <div className="min-w-0 flex-1">

          {/* Status chip */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ring-1 ${
              isCancelled
                ? 'bg-red-500/10 text-red-400 ring-red-500/20'
                : 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isCancelled ? 'bg-red-400' : 'bg-emerald-400'
              }`}
            />
            {isCancelled ? 'Cancelled' : 'Confirmed'}
          </span>

          {/* Title */}
          <h2 className="mt-3 text-xl font-bold tracking-tight text-white leading-snug">
            {booking.workshopTitle}
          </h2>

          {/* Meta row */}
          <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
              </svg>
              {formatShortDate(booking.workshopDate)}
            </span>
            {booking.instructorName && (
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                {booking.instructorName}
              </span>
            )}
          </div>

          {/* Booking ID row */}
          <div className="mt-3 flex items-center">
            <span className="text-[11px] font-medium text-gray-600">Booking ID</span>
            <span className="ml-2 font-mono text-xs font-semibold text-gray-300">{booking.bookingId}</span>
            <CopyButton text={booking.bookingId} />
          </div>

          {/* Attendee */}
          <p className="mt-1 text-xs text-gray-600">
            {booking.attendee.name}
            {booking.attendee.email && <> · <span className="text-gray-500">{booking.attendee.email}</span></>}
          </p>
        </div>

        {/* Right: fee badge */}
        <div className="shrink-0 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">Fee</p>
          <p className="mt-0.5 text-2xl font-black text-white">FREE</p>
          <p className="text-[10px] text-gray-700">Govt. Funded</p>
        </div>
      </div>

      {/* Cancel zone */}
      {!isCancelled && isFuture && !showConfirm && (
        <div className="mt-5 flex items-center justify-between border-t border-white/[0.04] pt-4">
          <p className="text-xs text-gray-600">Booked {booking.bookedAt ? new Date(booking.bookedAt).toLocaleDateString('en-IN') : 'Recently'}</p>
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="group flex items-center gap-1.5 text-xs font-medium text-gray-600 transition-colors duration-200 hover:text-red-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400 rounded"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel Booking
          </button>
        </div>
      )}

      {showConfirm && (
        <CancelConfirm onCancel={handleCancel} onKeep={() => setShowConfirm(false)} />
      )}
    </div>
  )
}

/** Section header with count */
function SectionHeader({ icon, title, count, color = 'text-gray-500' }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className={`text-lg ${color}`}>{icon}</span>
      <h2 className={`text-sm font-bold uppercase tracking-[0.12em] ${color}`}>
        {title}
      </h2>
      <span className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-black ring-1 ${
        color.includes('emerald')
          ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
          : 'bg-gray-500/10 text-gray-500 ring-gray-500/20'
      }`}>
        {count}
      </span>
      <div className="flex-1 h-px bg-white/[0.04]" />
    </div>
  )
}

export default function MyBookingsPage() {
  const { bookings } = useApp()
  const confirmed = bookings.filter((b) => b.status === 'confirmed')
  const cancelled = bookings.filter((b) => b.status === 'cancelled')

  return (
    <div className="page-enter min-h-screen bg-[#0a0a0f] text-white">

      {/* ── Page Header ── */}
      <div className="relative mx-auto max-w-4xl px-4 py-20">
        <div className="relative">
          <div className="flex flex-wrap items-end gap-4">
            <h1 className="text-4xl font-black tracking-tighter text-white sm:text-5xl">
              My Bookings
            </h1>
            {confirmed.length > 0 && (
              <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-3 py-1 text-sm font-bold text-indigo-400 ring-1 ring-indigo-500/30">
                {confirmed.length} Confirmed
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            All your FOSSEE workshop registrations in one place.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-4xl px-4 pb-24">
        {bookings.length === 0 ? (

          /* ── Empty State ── */
          <div className="glass flex flex-col items-center justify-center rounded-2xl py-24 text-center px-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] text-4xl select-none">
              📋
            </div>
            <h2 className="mt-8 text-2xl font-black tracking-tight text-white">
              No Bookings Yet
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
              You haven't registered for any workshops yet. Free IIT Bombay workshops are waiting for you!
            </p>
            <Link
              to="/workshops"
              className="btn-gradient mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white no-underline"
            >
              Explore Workshops
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

        ) : (
          <div className="space-y-10">

            {/* ── Confirmed / Upcoming ── */}
            {confirmed.length > 0 && (
              <section>
                <SectionHeader
                  icon="✅"
                  title="Upcoming"
                  count={confirmed.length}
                  color="text-emerald-500"
                />
                <div className="space-y-4">
                  {confirmed.map((b, i) => (
                    <BookingCard key={b.bookingId} booking={b} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* ── Cancelled ── */}
            {cancelled.length > 0 && (
              <section>
                <SectionHeader
                  icon="🚫"
                  title="Cancelled"
                  count={cancelled.length}
                  color="text-gray-500"
                />
                <div className="space-y-4">
                  {cancelled.map((b, i) => (
                    <BookingCard key={b.bookingId} booking={b} index={confirmed.length + i} />
                  ))}
                </div>
              </section>
            )}

          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
