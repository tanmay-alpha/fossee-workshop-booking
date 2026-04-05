/**
 * Workshop teaser card: tag badge, copy, and a ghost CTA tinted to match the tag.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.tag — short label shown in the badge
 * @param {string} props.description
 * @param {'emerald' | 'blue' | 'orange'} props.accent — drives badge, border, and button colors
 */
const accentStyles = {
  emerald: {
    badge:
      'border border-emerald-500/40 bg-emerald-500/15 text-emerald-300',
    border: 'border-l-emerald-500',
    button:
      'border-emerald-500/50 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/10',
  },
  blue: {
    badge: 'border border-blue-500/40 bg-blue-500/15 text-blue-300',
    border: 'border-l-blue-500',
    button:
      'border-blue-500/50 text-blue-300 hover:border-blue-400 hover:bg-blue-500/10',
  },
  orange: {
    badge: 'border border-orange-500/40 bg-orange-500/15 text-orange-300',
    border: 'border-l-orange-500',
    button:
      'border-orange-500/50 text-orange-300 hover:border-orange-400 hover:bg-orange-500/10',
  },
}

export default function WorkshopCard({ title, tag, description, accent }) {
  const a = accentStyles[accent]

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border-l-4 bg-gray-800 p-6 shadow-xl transition duration-300 ease-out hover:scale-105 hover:shadow-2xl ${a.border}`}
    >
      {/* Tag badge */}
      <span
        className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${a.badge}`}
      >
        {tag}
      </span>

      <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400">
        {description}
      </p>

      {/* Ghost CTA — color family matches the workshop tag */}
      <button
        type="button"
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 bg-transparent px-5 py-2.5 text-sm font-semibold transition duration-200 ${a.button}`}
      >
        Book Now
        <span aria-hidden="true">→</span>
      </button>
    </article>
  )
}
