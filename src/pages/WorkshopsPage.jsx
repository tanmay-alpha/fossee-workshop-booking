import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FILTER_CATEGORIES,
  WORKSHOP_TOTAL,
  workshops,
} from '../data/workshops.js'

/** Tailwind classes for tool/category pills on listing cards. */
const CATEGORY_BADGE = {
  Python:
    'border border-emerald-500/40 bg-emerald-500/15 text-emerald-300',
  Scilab: 'border border-blue-500/40 bg-blue-500/15 text-blue-300',
  R: 'border border-violet-500/40 bg-violet-500/15 text-violet-300',
  DWSIM: 'border border-cyan-500/40 bg-cyan-500/15 text-cyan-300',
  Arduino:
    'border border-orange-500/40 bg-orange-500/15 text-orange-300',
  eSim: 'border border-amber-500/40 bg-amber-500/15 text-amber-300',
  OSDAG: 'border border-sky-500/40 bg-sky-500/15 text-sky-300',
  OpenFOAM: 'border border-teal-500/40 bg-teal-500/15 text-teal-300',
}

/** Hover ring / glow on listing cards, matched to tool tag color (ADD 4). */
const CATEGORY_HOVER_RING = {
  Python: 'hover:shadow-emerald-500/25 hover:ring-emerald-500/50',
  Scilab: 'hover:shadow-blue-500/25 hover:ring-blue-500/50',
  R: 'hover:shadow-violet-500/25 hover:ring-violet-500/50',
  DWSIM: 'hover:shadow-cyan-500/25 hover:ring-cyan-500/50',
  Arduino: 'hover:shadow-orange-500/25 hover:ring-orange-500/50',
  eSim: 'hover:shadow-amber-500/25 hover:ring-amber-500/50',
  OSDAG: 'hover:shadow-sky-500/25 hover:ring-sky-500/50',
  OpenFOAM: 'hover:shadow-teal-500/25 hover:ring-teal-500/50',
}

/** Parse workshop date label for chronological sort (ADD 2). */
function workshopDateValue(dateStr) {
  return new Date(dateStr).getTime()
}

/**
 * Seat availability messaging + colors per product rules.
 */
function SeatBadge({ seats }) {
  if (seats === 0) {
    return (
      <span className="inline-flex rounded-full border border-red-500/50 bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-300">
        Waitlist Only
      </span>
    )
  }
  if (seats <= 5) {
    return (
      <span className="inline-flex rounded-full border border-amber-500/50 bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-200">
        Almost Full — {seats} seats
      </span>
    )
  }
  return (
    <span className="inline-flex rounded-full border border-emerald-500/50 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
      {seats} seats available
    </span>
  )
}

/**
 * Single workshop card: main area links to detail; Book Now is a real <button>
 * (disabled + gray when waitlist) so we avoid invalid nested interactive nodes.
 */
function WorkshopListingCard({ workshop }) {
  const navigate = useNavigate()
  const { id, title, category, date, seats } = workshop
  const badgeClass =
    CATEGORY_BADGE[category] ??
    'border border-gray-600 bg-gray-700/40 text-gray-300'
  const hoverRing =
    CATEGORY_HOVER_RING[category] ??
    'hover:shadow-gray-500/20 hover:ring-gray-500/40'
  const soldOut = seats === 0

  return (
    <div
      className={`group flex h-full flex-col rounded-2xl border border-gray-700/80 bg-gray-800 shadow-lg ring-0 transition duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:ring-2 ${hoverRing}`}
    >
      <Link
        to={`/workshops/${id}`}
        className="flex flex-1 flex-col rounded-t-2xl p-6 pb-4 text-left outline-none ring-indigo-500/0 transition focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badgeClass}`}
        >
          {category}
        </span>

        <h3 className="mt-4 text-lg font-bold leading-snug text-white group-hover:text-indigo-100">
          {title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <svg
              className="h-4 w-4 shrink-0 text-gray-500"
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

      <div className="px-6 pb-6">
        <button
          type="button"
          disabled={soldOut}
          onClick={() => {
            if (!soldOut) navigate(`/workshops/${id}`)
          }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition enabled:border-indigo-500/50 enabled:text-indigo-200 enabled:hover:border-indigo-400 enabled:hover:bg-indigo-500/10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:border-gray-600 disabled:bg-gray-900/50 disabled:text-gray-500"
        >
          Book Now
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}

/**
 * Full workshop catalog with search, category filters, and responsive grid.
 */
export default function WorkshopsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  /** ADD 2: sort mode for filtered results */
  const [sortBy, setSortBy] = useState('date-asc')

  const filteredWorkshops = useMemo(() => {
    const q = search.trim().toLowerCase()
    return workshops.filter((w) => {
      const catOk =
        activeCategory === 'All' || w.category === activeCategory
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
        return arr.sort(
          (a, b) => workshopDateValue(a.date) - workshopDateValue(b.date),
        )
      case 'seats-desc':
        return arr.sort((a, b) => b.seats - a.seats)
      case 'name-asc':
        return arr.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return arr
    }
  }, [filteredWorkshops, sortBy])

  const shownCount = filteredWorkshops.length

  function clearFilters() {
    setSearch('')
    setActiveCategory('All')
  }

  return (
    <div className="min-h-screen bg-gray-900 pb-20 pt-6 text-gray-100">
      {/* Page header — first visible page content; higher z than sticky so the bar never paints over the title */}
      <div className="relative z-40 border-b border-gray-800 bg-gray-900 px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Browse Workshops
          </h1>
          {/* ADD 1: live count directly under title (muted) */}
          <p className="mt-2 text-sm text-gray-500">
            Showing {shownCount} of {WORKSHOP_TOTAL} workshops
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Free, hands-on workshops by FOSSEE · IIT Bombay
          </p>
        </div>
      </div>

      {/* Sticky search + filters — top matches navbar (~64px); margin-top separates from heading */}
      <div className="sticky top-[64px] z-30 mt-8 border-b border-gray-800 bg-gray-950/90 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <label className="block">
            <span className="sr-only">Search workshops</span>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or tool..."
                className={`w-full rounded-full border border-gray-700 bg-gray-800 py-3 pl-12 text-sm text-white placeholder:text-gray-500 outline-none ring-indigo-500/0 transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/40 ${
                  search ? 'pr-12' : 'pr-4'
                }`}
              />
              {search ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : null}
            </div>
          </label>

          {/* FIX 3 + ADD 2: pills wrap on narrow screens; sort select on the same row when space allows */}
          <div className="flex flex-wrap items-center justify-between gap-3 gap-y-2">
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
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition sm:text-sm ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
                        : 'border border-gray-600 bg-transparent text-gray-300 hover:border-gray-500 hover:bg-gray-800/80'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            <div className="w-full shrink-0 sm:w-auto">
              <label className="sr-only" htmlFor="workshop-sort">
                Sort workshops
              </label>
              <select
                id="workshop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/40 sm:w-auto"
              >
                <option value="date-asc">Sort: Latest</option>
                <option value="seats-desc">Sort: Seats Available</option>
                <option value="name-asc">Sort: Name A–Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid or empty state (ADD 3) — extra top padding so content never sits under the sticky bar */}
      <div className="px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {shownCount === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 bg-gray-800/30 py-20 text-center">
              <svg
                className="mb-6 h-20 w-20 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <p className="text-lg font-semibold text-white">
                No workshops found
              </p>
              <p className="mt-2 max-w-md text-sm text-gray-500">
                Try a different search term or clear your filters
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-8 rounded-full border border-indigo-500/50 px-6 py-2.5 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/10"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedWorkshops.map((w) => (
                <WorkshopListingCard key={w.id} workshop={w} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
