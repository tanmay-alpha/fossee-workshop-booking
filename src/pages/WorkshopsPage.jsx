import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
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
 * Single workshop row card: navigates to detail; CTA is non-nested (span inside Link).
 */
function WorkshopListingCard({ workshop }) {
  const { id, title, category, date, seats } = workshop
  const badgeClass =
    CATEGORY_BADGE[category] ??
    'border border-gray-600 bg-gray-700/40 text-gray-300'
  const soldOut = seats === 0

  return (
    <Link
      to={`/workshops/${id}`}
      className="group flex h-full flex-col rounded-2xl border border-gray-700/80 bg-gray-800 p-6 shadow-lg outline-none ring-indigo-500/0 transition duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:ring-2 hover:ring-indigo-500/30 focus-visible:ring-2 focus-visible:ring-indigo-400"
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

      <span
        className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition ${
          soldOut
            ? 'pointer-events-none border-gray-600 bg-gray-900/50 text-gray-500'
            : 'border-indigo-500/50 text-indigo-200 group-hover:border-indigo-400 group-hover:bg-indigo-500/10'
        }`}
        aria-disabled={soldOut}
      >
        Book Now
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}

/**
 * Full workshop catalog with search, category filters, and responsive grid.
 */
export default function WorkshopsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

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

  const shownCount = filteredWorkshops.length

  function clearFilters() {
    setSearch('')
    setActiveCategory('All')
  }

  return (
    <div className="min-h-screen bg-gray-900 pb-20 text-gray-100">
      {/* Page header */}
      <div className="border-b border-gray-800 px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Browse Workshops
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-400">
            Free, hands-on workshops by FOSSEE · IIT Bombay
          </p>
          <p className="mt-6 text-sm font-medium text-indigo-300">
            Showing {shownCount} of {WORKSHOP_TOTAL} workshops
          </p>
        </div>
      </div>

      {/* Sticky search + filters (sits below the fixed-height navbar) */}
      <div className="sticky top-16 z-40 border-b border-gray-800 bg-gray-950/90 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-4">
          <label className="relative block">
            <span className="sr-only">Search workshops</span>
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
              className="w-full rounded-full border border-gray-700 bg-gray-800 py-3 pl-12 pr-4 text-sm text-white placeholder:text-gray-500 outline-none ring-indigo-500/0 transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/40"
            />
          </label>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by category"
          >
            {FILTER_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
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
        </div>
      </div>

      {/* Grid or empty state */}
      <div className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {shownCount === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 bg-gray-800/30 py-20 text-center">
              <div
                className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gray-800 ring-1 ring-gray-700"
                aria-hidden
              >
                {/* Simple “no results” mark: calendar + strike */}
                <svg
                  className="h-14 w-14 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.25}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 4.5l15 15"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-white">
                No workshops found
              </p>
              <p className="mt-2 max-w-sm text-sm text-gray-500">
                Try another search or category, or reset everything below.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-8 rounded-full border border-indigo-500/50 px-6 py-2.5 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/10"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredWorkshops.map((w) => (
                <WorkshopListingCard key={w.id} workshop={w} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
