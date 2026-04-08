import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FILTER_CATEGORIES,
  workshops,
} from '../data/workshops.js'
import Footer from '../components/Footer.jsx'
import { useApp } from '../context/AppContext.jsx'

/** Parse workshop date label for chronological sort. */
function workshopDateValue(dateStr) {
  return new Date(dateStr).getTime()
}

/** Seat availability badge. */
function SeatBadge({ seats }) {
  if (seats === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 ring-1 ring-red-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" aria-hidden />
        Waitlist Only
      </span>
    )
  }
  if (seats <= 5) {
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

/**
 * Workshop listing card — shows live booking state from context.
 */
function WorkshopListingCard({ workshop, index = 0 }) {
  const navigate = useNavigate()
  const { isBooked, getSeatCount } = useApp()
  const { id, title, category, date } = workshop
  const seats = getSeatCount(id)
  const booked = isBooked(id)
  const soldOut = seats === 0

  return (
    <div
      className="card-stagger group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/20"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {/* Already booked badge */}
      {booked && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 ring-1 ring-emerald-500/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Registered
        </div>
      )}

      <Link
        to={`/workshops/${id}`}
        className="relative z-10 flex flex-1 flex-col rounded-t-2xl p-7 pb-4 text-left no-underline outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-400/50"
      >
        <span className="inline-flex w-fit rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-indigo-400 ring-1 ring-indigo-500/20">
          {category}
        </span>

        <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-white">
          {title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <svg
              className="h-4 w-4 shrink-0 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"
              />
            </svg>
            {date}
          </span>
        </div>

        <div className="mt-4">
          <SeatBadge seats={seats} />
        </div>
      </Link>

      {/* CTA */}
      <div className="relative z-10 mt-auto px-7 pb-7">
        <button
          type="button"
          disabled={soldOut && !booked}
          onClick={() => {
            if (booked) navigate(`/workshops/${id}`)
            else if (!soldOut) navigate(`/book/${id}`)
          }}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
            booked
              ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30 hover:bg-emerald-500/25'
              : soldOut
                ? 'cursor-not-allowed border border-white/5 bg-white/5 text-gray-500 pointer-events-none'
                : 'btn-gradient text-white'
          }`}
        >
          {booked ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Already Registered
            </>
          ) : soldOut ? 'Workshop Full' : (
            <>
              Book Now
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

/** Skeleton card. */
function SkeletonCard({ index }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.02] p-7 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="skeleton-shimmer h-6 w-1/4 rounded-full bg-white/5 mb-4" />
      <div className="skeleton-shimmer h-8 w-3/4 rounded-lg bg-white/5 mb-3" />
      <div className="skeleton-shimmer h-4 w-1/2 rounded bg-white/5 mb-3" />
      <div className="skeleton-shimmer h-5 w-1/3 rounded-full bg-white/5 mb-8" />
      <div className="skeleton-shimmer h-12 w-full rounded-xl bg-white/5" />
    </div>
  )
}

/**
 * Workshop catalog: search, category filters, sort, skeleton loader,
 * empty state, and scroll-to-top FAB.
 */
export default function WorkshopsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date-asc')

  const { getSeatCount } = useApp()

  // Skeleton loading — 400ms
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  // Scroll-to-top
  const [showScrollTop, setShowScrollTop] = useState(false)
  useEffect(() => {
    function onScroll() {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filteredWorkshops = useMemo(() => {
    const q = search.trim().toLowerCase()
    return workshops.filter((w) => {
      const catOk = activeCategory === 'All' || w.category === activeCategory
      if (!catOk) return false
      if (!q) return true
      return (
        w.title.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q)
      )
    })
  }, [search, activeCategory])

  const sortedWorkshops = useMemo(() => {
    const arr = [...filteredWorkshops]
    switch (sortBy) {
      case 'date-asc':
        return arr.sort((a, b) => workshopDateValue(a.date) - workshopDateValue(b.date))
      case 'seats-desc':
        return arr.sort((a, b) => getSeatCount(b.id) - getSeatCount(a.id))
      case 'name-asc':
        return arr.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return arr
    }
  }, [filteredWorkshops, sortBy, getSeatCount])

  const shownCount = filteredWorkshops.length

  function clearFilters() {
    setSearch('')
    setActiveCategory('All')
  }

  return (
    <div className="page-enter min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Header section */}
      <div className="relative py-20 px-4 max-w-7xl mx-auto">
        <h1 className="relative text-4xl font-black tracking-tighter text-white sm:text-5xl">
          Browse Workshops
        </h1>
        <p className="mt-3 text-sm text-gray-400">
          Showing <span className="font-semibold text-white">{filteredWorkshops.length}</span> of <span className="font-semibold text-white">{workshops.length}</span> workshops
        </p>

        {/* Search input */}
        <div className="relative mt-6">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <label htmlFor="search-input" className="sr-only">Search Workshops</label>
          <input
            id="search-input"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or tool..."
            className={`w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-4 pl-12 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-indigo-500/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/15 ${
              search ? 'pr-12' : 'pr-4'
            }`}
          />
          {search ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 transition hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : null}
        </div>

        {/* Filter pills + sort */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div
            className="flex min-w-0 flex-1 flex-wrap gap-2"
            role="group"
            aria-label="Filter by category"
          >
            {FILTER_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-200 sm:text-sm ${
                    isActive
                      ? 'bg-indigo-600 text-white ring-1 ring-indigo-500/50'
                      : 'border border-white/[0.08] bg-white/[0.02] text-gray-400 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Sort dropdown */}
          <div className="w-full shrink-0 sm:w-auto">
            <label className="sr-only" htmlFor="workshop-sort">Sort Workshops</label>
            <div className="relative inline-block w-full sm:w-auto">
              <select
                id="workshop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-lg border border-white/[0.08] bg-white/[0.03] py-2 pl-3 pr-9 text-sm text-white cursor-pointer outline-none transition-all duration-200 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 sm:w-auto"
              >
                <option value="date-asc">Sort: Upcoming First</option>
                <option value="seats-desc">Sort: Seats Available</option>
                <option value="name-asc">Sort: Name A–Z</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} index={i} />
            ))}
          </div>
        ) : (
          <div>
            {shownCount === 0 ? (
              /* ── Empty state ── */
              <div className="glass flex flex-col items-center justify-center rounded-2xl py-24 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.08]">
                  <svg
                    className="h-10 w-10 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <p className="mt-6 text-2xl font-bold tracking-tight text-white">
                  No Workshops Found
                </p>
                <p className="mt-3 max-w-sm text-sm text-gray-500">
                  Try a different search term or clear your filters to see all available workshops.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn-gradient mt-8 rounded-xl px-8 py-3.5 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedWorkshops.map((w, i) => (
                  <WorkshopListingCard key={w.id} workshop={w} index={i} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />

      {/* Scroll-to-top FAB */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-200 hover:bg-indigo-500 ${
          showScrollTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}
