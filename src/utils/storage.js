/**
 * Persistence layer — all localStorage operations wrapped in try/catch
 * because localStorage can throw in private browsing or when storage is full.
 */

const KEYS = {
  bookings: 'fossee_bookings',
  user: 'fossee_user',
  seats: 'fossee_seats',
}

// ── Bookings ──────────────────────────────────────────────────────────────

export function saveBookings(bookings) {
  try {
    localStorage.setItem(KEYS.bookings, JSON.stringify(bookings))
  } catch (e) {
    console.warn('[Storage] Failed to save bookings:', e)
  }
}

export function loadBookings() {
  try {
    const raw = localStorage.getItem(KEYS.bookings)
    if (!raw) return []
    return JSON.parse(raw) ?? []
  } catch (e) {
    console.warn('[Storage] Failed to load bookings:', e)
    return []
  }
}

// ── User ──────────────────────────────────────────────────────────────────

export function saveUser(user) {
  try {
    localStorage.setItem(KEYS.user, JSON.stringify(user))
  } catch (e) {
    console.warn('[Storage] Failed to save user:', e)
  }
}

export function loadUser() {
  try {
    const raw = localStorage.getItem(KEYS.user)
    if (!raw) return null
    return JSON.parse(raw) ?? null
  } catch (e) {
    console.warn('[Storage] Failed to load user:', e)
    return null
  }
}

// ── Seat overrides ────────────────────────────────────────────────────────

export function saveSeats(seatsMap) {
  try {
    localStorage.setItem(KEYS.seats, JSON.stringify(seatsMap))
  } catch (e) {
    console.warn('[Storage] Failed to save seats:', e)
  }
}

export function loadSeats() {
  try {
    const raw = localStorage.getItem(KEYS.seats)
    if (!raw) return {}
    return JSON.parse(raw) ?? {}
  } catch (e) {
    console.warn('[Storage] Failed to load seats:', e)
    return {}
  }
}
