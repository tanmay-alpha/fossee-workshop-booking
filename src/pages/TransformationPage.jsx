import { useEffect, useRef, useState } from 'react'

/* ─── Intersection-observer hook for fade-in animations ─── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── SVG Icons ─── */
const icons = {
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" strokeWidth={2.5} />
    </svg>
  ),
  ux: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M8 12.5s1.5 2 4 2 4-2 4-2" strokeLinecap="round"/><line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" strokeWidth={2.5}/><line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" strokeWidth={2.5}/>
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
    </svg>
  ),
}

const improvements = [
  {
    icon: icons.mobile,
    title: 'Responsive Design',
    desc: 'Fully mobile-friendly layouts that adapt seamlessly across all screen sizes.',
    gradient: 'from-violet-500 to-indigo-500',
  },
  {
    icon: icons.ux,
    title: 'Improved UI/UX',
    desc: 'Modern glassmorphism, micro-animations, and accessible color palettes for delight.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: icons.bolt,
    title: 'Faster Navigation',
    desc: 'Vite-powered dev with code-splitting and lazy loading for instant page transitions.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: icons.calendar,
    title: 'Better Booking Flow',
    desc: 'Step-by-step guided booking with instant validation and confirmation feedback.',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: icons.react,
    title: 'React + Tailwind',
    desc: 'Component-driven architecture with a utility-first design system for consistency.',
    gradient: 'from-teal-500 to-emerald-500',
  },
]

/* ─── Image card shared component ─── */
function ScreenshotCard({ src, alt, index, side }) {
  const [ref, visible] = useFadeIn(0.1)
  const delay = index * 120

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
        borderColor: side === 'before' ? 'rgba(255,255,255,0.08)' : 'rgba(99,102,241,0.35)',
        boxShadow: side === 'after'
          ? '0 0 0 1px rgba(99,102,241,0.2), 0 8px 32px rgba(99,102,241,0.18)'
          : 'none',
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
        style={{
          filter: side === 'before' ? 'grayscale(55%) brightness(0.72) contrast(0.9)' : 'none',
          aspectRatio: '16/9',
        }}
      />
    </div>
  )
}

/* ─── Section header ─── */
function SideHeader({ label, badge, sub, side }) {
  return (
    <div className="mb-5 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase ${
            side === 'before'
              ? 'bg-white/[0.06] text-gray-400'
              : 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30'
          }`}
        >
          {side === 'after' && (
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
          )}
          {badge}
        </span>
      </div>
      <h3
        className={`text-xl font-bold leading-tight sm:text-2xl ${
          side === 'before' ? 'text-gray-400' : 'text-white'
        }`}
      >
        {label}
      </h3>
      <p className={`text-sm ${side === 'before' ? 'text-gray-600' : 'text-indigo-300'}`}>
        {sub}
      </p>
    </div>
  )
}

export default function TransformationPage() {
  const [heroRef, heroVisible] = useFadeIn(0.05)
  const [impRef, impVisible] = useFadeIn(0.1)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* ── Background ambient glows ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* ══════════ HERO HEADER ══════════ */}
        <div
          ref={heroRef}
          className="mb-20 text-center transition-all duration-800"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
            Project Showcase · FOSSEE IIT Bombay
          </span>

          <h1 className="mt-5 bg-gradient-to-br from-white via-gray-100 to-gray-400 bg-clip-text text-4xl font-black leading-none tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            FOSSEE Workshop Platform
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              UI Transformation
            </span>
          </h1>

          <p className="mt-5 mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">
            From basic Django interface to modern&nbsp;
            <span className="font-semibold text-indigo-300">React + Tailwind CSS</span> experience —
            a complete visual and engineering overhaul.
          </p>

          {/* Stat pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              ['Django → React', 'Stack'],
              ['100% Responsive', 'Mobile'],
              ['5+ Pages', 'Rebuilt'],
              ['Dark Mode', 'Design'],
            ].map(([val, label]) => (
              <div key={label} className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm">
                <span className="font-bold text-white">{val}</span>
                <span className="text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ BEFORE / AFTER COMPARISON ══════════ */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Side-by-Side Comparison</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-0">

          {/* ── BEFORE ── */}
          <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 lg:rounded-r-none lg:border-r-0 lg:p-8">
            {/* Subtle noise overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-60" />

            <SideHeader
              side="before"
              badge="Before"
              label="Original Django UI"
              sub="Basic interface with limited interactivity and no responsive layout"
            />

            <div className="flex flex-col gap-3">
              <ScreenshotCard src="/images/before1.png" alt="Django login page" index={0} side="before" />
              <ScreenshotCard src="/images/before2.png" alt="Django registration form" index={1} side="before" />
              <ScreenshotCard src="/images/before3.png" alt="Django registration continued" index={2} side="before" />
            </div>

            <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="mt-0.5 h-4 w-4 shrink-0 text-gray-500">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round"/><line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeWidth={2.5}/>
              </svg>
              <p className="text-xs leading-relaxed text-gray-500">
                Basic UI, plain forms, no responsive design, limited UX affordances, and dated visual language typical of legacy Django templates.
              </p>
            </div>

            {/* Demerits */}
            <ul className="mt-4 flex flex-col gap-2">
              {['No mobile support', 'Plain HTML forms', 'No visual hierarchy', 'No feedback states'].map(d => (
                <li key={d} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/[0.08]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-2.5 w-2.5 text-gray-600">
                      <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                    </svg>
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* ── DIVIDER ── */}
          <div className="hidden lg:flex lg:items-stretch lg:justify-center">
            <div className="relative flex w-px flex-col items-center">
              <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-indigo-500/60 to-transparent" />
              <div className="sticky top-1/2 z-10 flex h-10 w-10 shrink-0 -translate-y-1/2 items-center justify-center rounded-full border border-indigo-500/40 bg-indigo-500/20 text-xs font-black text-indigo-300 backdrop-blur-sm shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                VS
              </div>
            </div>
          </div>

          {/* Mobile divider */}
          <div className="flex items-center gap-4 lg:hidden">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-500/40" />
            <span className="rounded-full border border-indigo-500/40 bg-indigo-500/20 px-3 py-1 text-xs font-black text-indigo-300">VS</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-500/40" />
          </div>

          {/* ── AFTER ── */}
          <div className="relative overflow-hidden rounded-2xl border border-indigo-500/25 bg-indigo-900/[0.07] p-6 lg:rounded-l-none lg:border-l-0 lg:p-8"
            style={{ boxShadow: '0 0 40px rgba(99,102,241,0.08), inset 0 0 60px rgba(99,102,241,0.03)' }}
          >
            {/* Glow overlay */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

            <SideHeader
              side="after"
              badge="After"
              label="Modern React UI"
              sub="Redesigned from the ground up — responsive, animated, and premium"
            />

            <div className="flex flex-col gap-3">
              <ScreenshotCard src="/images/after1.png" alt="New React homepage" index={0} side="after" />
              <ScreenshotCard src="/images/after2.png" alt="New workshop catalog" index={1} side="after" />
              <ScreenshotCard src="/images/after3.png" alt="New booking page" index={2} side="after" />
            </div>

            <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400">
                <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
              </svg>
              <p className="text-xs leading-relaxed text-indigo-200">
                Clean dark-mode design, smooth animations, component-driven architecture, accessible interactions, and a fully responsive layout across all devices.
              </p>
            </div>

            {/* Merits */}
            <ul className="mt-4 flex flex-col gap-2">
              {['Fully responsive', 'Dark mode design', 'Micro-animations', 'Instant feedback'].map(m => (
                <li key={m} className="flex items-center gap-2 text-xs text-indigo-300">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-500/25 border border-indigo-500/30">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-2.5 w-2.5 text-indigo-300">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ══════════ IMPROVEMENTS SECTION ══════════ */}
        <div
          ref={impRef}
          className="mt-24 transition-all duration-700"
          style={{ opacity: impVisible ? 1 : 0, transform: impVisible ? 'translateY(0)' : 'translateY(28px)' }}
        >
          <div className="mb-3 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Key Improvements</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <h2 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
            What changed &amp; why it matters
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {improvements.map(({ icon, title, desc, gradient }, i) => (
              <ImprovementCard key={title} icon={icon} title={title} desc={desc} gradient={gradient} index={i} />
            ))}
          </div>
        </div>

        {/* ══════════ TECH STACK BADGE STRIP ══════════ */}
        <TechStack />

        {/* ══════════ FOOTER NOTE ══════════ */}
        <p className="mt-16 text-center text-xs text-gray-600">
          Submitted as part of the FOSSEE IIT Bombay internship programme · Built with React, Vite &amp; Tailwind CSS
        </p>
      </div>
    </div>
  )
}

/* ─── Improvement card with staggered animation ─── */
function ImprovementCard({ icon, title, desc, gradient, index }) {
  const [ref, visible] = useFadeIn(0.1)
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-xl"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, background 0.3s, box-shadow 0.3s',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Glow on hover */}
      <div className={`pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br ${gradient} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`} />

      <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
        {icon}
      </div>
      <h3 className="mb-1.5 text-sm font-bold text-white">{title}</h3>
      <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
    </div>
  )
}

/* ─── Tech stack strip ─── */
function TechStack() {
  const [ref, visible] = useFadeIn(0.1)
  const techs = [
    { name: 'React 18', color: '#61DAFB' },
    { name: 'Vite', color: '#646CFF' },
    { name: 'Tailwind CSS', color: '#38BDF8' },
    { name: 'React Router', color: '#F44250' },
    { name: 'Context API', color: '#A78BFA' },
    { name: 'Vercel', color: '#ffffff' },
  ]
  return (
    <div
      ref={ref}
      className="mt-16 text-center transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
    >
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-600">Built with</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {techs.map(({ name, color }) => (
          <span
            key={name}
            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            style={{ color }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
