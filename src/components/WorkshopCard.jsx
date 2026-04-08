import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { useAnalytics } from '../hooks/useAnalytics.js'

/**
 * Featured workshop teaser card — clean card with live booking state.
 */
function WorkshopCard({ id, title, tag, description }) {
  const navigate = useNavigate()
  const { isBooked } = useApp()
  const { trackEvent } = useAnalytics()
  const booked = isBooked(id)

  function handleClick() {
    trackEvent('workshop_viewed', { workshopId: id, workshopTitle: title })
    navigate(booked ? `/workshops/${id}` : `/book/${id}`)
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/20">

      {/* Already booked badge */}
      {booked && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 ring-1 ring-emerald-500/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Registered
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Tag pill */}
        <span className="inline-flex w-fit rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-indigo-400 ring-1 ring-indigo-500/20">
          {tag}
        </span>

        {/* Title */}
        <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
          {title}
        </h3>

        {/* Divider */}
        <div className="mt-3 h-px w-full bg-white/[0.06]" aria-hidden />

        {/* Description */}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400 line-clamp-3">
          {description}
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleClick}
          className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] ${
            booked
              ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30 hover:bg-emerald-500/25 focus-visible:ring-emerald-400'
              : 'btn-gradient text-white focus-visible:ring-indigo-400'
          }`}
          aria-label={booked ? `View details for ${title}` : `Book ${title}`}
        >
          {booked ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Already Registered
            </>
          ) : (
            <>
              Book Now
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </article>
  )
}

export default memo(WorkshopCard)
