/**
 * Workshop teaser card: translucent tag pill, copy, and glass-style CTA.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.tag — short label shown in the badge
 * @param {string} props.description
 * @param {'emerald' | 'blue' | 'orange'} [props.accent] — optional; callers may pass it for API compatibility
 */
export default function WorkshopCard({ title, tag, description }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-700/50 bg-gray-800/40 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:shadow-2xl">
      <span className="inline-flex w-fit rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-400">
        {tag}
      </span>

      <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400">
        {description}
      </p>

      <button
        type="button"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-white/10"
      >
        Book Now
        <span aria-hidden="true">→</span>
      </button>
    </article>
  )
}
