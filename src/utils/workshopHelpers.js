/**
 * Shared helpers for computing booking button states and seat messaging.
 * Used in WorkshopCard.jsx, WorkshopDetailPage.jsx, and WorkshopsPage.jsx.
 */

/**
 * Returns the label, visual variant, and disabled state for a booking CTA
 * based on seat availability and whether the user has already booked.
 *
 * @param {number} spotsLeft
 * @param {boolean} isBooked
 * @returns {{ label: string, variant: 'default'|'warning'|'urgent'|'full'|'booked', disabled: boolean }}
 */
export function getBookingStatus(spotsLeft, isBooked) {
  if (isBooked) return { label: 'Already Booked', variant: 'booked', disabled: true }
  if (spotsLeft === 0) return { label: 'Workshop Full', variant: 'full', disabled: true }
  if (spotsLeft <= 3) return { label: `⚡ Only ${spotsLeft} Spots Left`, variant: 'urgent', disabled: false }
  if (spotsLeft <= 10) return { label: 'Filling Up — Book Now', variant: 'warning', disabled: false }
  return { label: 'Book Now', variant: 'default', disabled: false }
}

/**
 * Returns Tailwind classes for the booking button based on its variant.
 *
 * @param {'default'|'warning'|'urgent'|'full'|'booked'} variant
 * @returns {string}
 */
export function getButtonClasses(variant) {
  const base =
    'inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2'

  switch (variant) {
    case 'booked':
      return `${base} cursor-not-allowed bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30 focus-visible:ring-emerald-500`
    case 'full':
      return `${base} cursor-not-allowed border border-white/5 bg-white/5 text-gray-500 focus-visible:ring-gray-500`
    case 'urgent':
      return `${base} bg-red-500/15 text-red-300 ring-1 ring-red-500/30 hover:bg-red-500/25 hover:scale-[1.02] active:scale-95 focus-visible:ring-red-500`
    case 'warning':
      return `${base} bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30 hover:bg-amber-500/25 hover:scale-[1.02] active:scale-95 focus-visible:ring-amber-500`
    default:
      return `${base} btn-gradient text-white shadow-xl hover:scale-[1.03] active:scale-95 focus-visible:ring-fuchsia-400`
  }
}

/**
 * Returns the seat availability message and color for WorkshopDetailPage sidebar.
 *
 * @param {number} seats
 * @returns {{ message: string, colorClass: string, pulse: boolean }}
 */
export function getSeatMessage(seats) {
  if (seats === 0) return { message: 'This workshop is full', colorClass: 'text-red-400', pulse: false }
  if (seats <= 3) return { message: `⚡ Only ${seats} spots left`, colorClass: 'text-red-400', pulse: true }
  if (seats <= 10) return { message: `Only ${seats} spots left`, colorClass: 'text-amber-400', pulse: false }
  return { message: `${seats} spots available`, colorClass: 'text-emerald-400', pulse: false }
}
