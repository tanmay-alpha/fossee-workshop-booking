import { Link, useParams } from 'react-router-dom'
import { workshops } from '../data/workshops.js'

/**
 * Phase 4 placeholder: will become full workshop detail + booking flow.
 */
export default function WorkshopDetailPage() {
  const { id } = useParams()
  const workshop = workshops.find((w) => w.id === id)

  return (
    <div className="min-h-[70vh] bg-gray-900 px-4 py-16 text-center sm:px-6">
      <div className="mx-auto max-w-lg rounded-2xl border border-gray-800 bg-gray-800/50 p-10">
        <p className="text-sm font-medium uppercase tracking-wider text-indigo-400">
          Phase 4 — coming soon
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white">
          {workshop ? workshop.title : 'Workshop'}
        </h1>
        <p className="mt-4 text-gray-400">
          Detail page for{' '}
          <span className="font-mono text-gray-300">{id}</span>. Booking and
          syllabus will live here.
        </p>
        <Link
          to="/workshops"
          className="mt-8 inline-flex rounded-full border border-indigo-500/50 px-6 py-2.5 text-sm font-semibold text-indigo-300 no-underline transition hover:bg-indigo-500/10"
        >
          ← Back to workshops
        </Link>
      </div>
    </div>
  )
}
