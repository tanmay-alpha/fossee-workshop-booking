import { Link, useNavigate, useParams } from 'react-router-dom'
import { workshops } from '../data/workshops.js'

/**
 * Shared category badge style aligned with WorkshopsPage.
 */
const CATEGORY_BADGE_CLASS =
  'inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-400'

function SeatBadge({ seats }) {
  if (seats === 0) {
    return (
      <span className="inline-flex rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        Waitlist Only
      </span>
    )
  }
  if (seats <= 5) {
    return (
      <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
        Almost Full — {seats} seats
      </span>
    )
  }
  return (
    <span className="inline-flex rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
      {seats} seats available
    </span>
  )
}

function getInitials(name) {
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

  if (!workshop) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl font-bold text-white">Workshop not found</h1>
          <p className="mt-3 text-gray-400">
            The workshop you are looking for does not exist.
          </p>
          <Link
            to="/workshops"
            className="mt-8 inline-flex rounded-xl border border-indigo-500/40 px-6 py-3 text-sm font-semibold text-indigo-300 no-underline transition hover:bg-indigo-500/10"
          >
            Back to Workshops
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="border-b border-gray-700 bg-gray-800 px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/workshops"
            className="text-sm font-semibold text-indigo-400 no-underline transition hover:text-indigo-300"
          >
            ← Back to Workshops
          </Link>
          <div className="mt-4">
            <span className={CATEGORY_BADGE_CLASS}>{workshop.category}</span>
          </div>
          <h1 className="mt-3 mb-2 text-3xl font-bold text-white">
            {workshop.title}
          </h1>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-gray-600 bg-gray-700/40 px-3 py-1 text-xs font-semibold text-gray-200">
              Date: {workshop.date}
            </span>
            <span className="rounded-full border border-gray-600 bg-gray-700/40 px-3 py-1 text-xs font-semibold text-gray-200">
              Duration: {workshop.duration}
            </span>
            <span className="rounded-full border border-gray-600 bg-gray-700/40 px-3 py-1 text-xs font-semibold text-gray-200">
              Level: {workshop.level}
            </span>
          </div>
          <SeatBadge seats={workshop.seats} />
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 lg:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          <div>
            <h2 className="mb-3 text-xl font-bold text-white">
              About this workshop
            </h2>
            <p className="leading-relaxed text-gray-300">{workshop.about}</p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">Topics covered</h2>
            <ul className="flex flex-col gap-2">
              {workshop.topics.map((topic, i) => (
                <li
                  key={`${workshop.id}-topic-${i + 1}`}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-900 text-xs font-bold text-indigo-300">
                    {i + 1}
                  </span>
                  <span className="text-gray-300">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-white">Prerequisites</h2>
            <ul className="flex flex-col gap-2">
              {workshop.prerequisites.map((p, i) => (
                <li
                  key={`${workshop.id}-pre-${i + 1}`}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gray-800 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Instructor</h2>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-700 text-xl font-bold text-indigo-200">
                {getInitials(workshop.instructor)}
              </div>
              <div>
                <p className="text-lg font-semibold text-white">
                  {workshop.instructor}
                </p>
                <p className="text-sm text-gray-400">FOSSEE Team, IIT Bombay</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex-shrink-0 lg:w-80">
          <div className="sticky top-24 self-start rounded-2xl border border-gray-700 bg-gray-800 p-6">
            <p className="mb-1 text-sm text-gray-400">Workshop fee</p>
            <p className="mb-1 text-3xl font-bold text-white">FREE</p>
            <p className="mb-4 text-xs text-gray-500">
              Funded by Ministry of Education, Govt. of India
            </p>
            <div className="mb-6 flex flex-col gap-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="text-gray-300">{workshop.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="text-gray-300">{workshop.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Level</span>
                <span className="text-gray-300">{workshop.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Seats left</span>
                <span
                  className={
                    workshop.seats === 0
                      ? 'text-red-400'
                      : workshop.seats <= 5
                        ? 'text-amber-400'
                        : 'text-green-400'
                  }
                >
                  {workshop.seats}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <SeatBadge seats={workshop.seats} />
            </div>

            <button
              type="button"
              onClick={() => navigate(`/book/${workshop.id}`)}
              className={`w-full rounded-xl py-3 text-center text-sm font-bold transition ${
                workshop.seats === 0
                  ? 'bg-red-900 text-red-200 hover:bg-red-800'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500'
              }`}
            >
              {workshop.seats === 0 ? 'Join Waitlist' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
