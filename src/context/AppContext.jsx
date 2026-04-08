/**
 * Global App Context — single source of truth for bookings, user, and seat counts.
 * Rehydrates from localStorage on mount. Syncs to localStorage on every state change.
 */

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { workshops as catalogWorkshops } from '../data/workshops.js'
import {
  loadBookings, saveBookings,
  loadUser, saveUser,
  loadSeats, saveSeats,
} from '../utils/storage.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // ── State ──────────────────────────────────────────────────────────────
  const [bookings, setBookings] = useState(() => loadBookings())
  const [user, setUser] = useState(() => loadUser())

  // Seat overrides: map of workshopId → remaining seats (only set after first booking)
  const [workshopSeats, setWorkshopSeats] = useState(() => {
    const persisted = loadSeats()
    // Merge with catalog defaults so unmodified seats show correctly
    const merged = {}
    catalogWorkshops.forEach((w) => {
      merged[w.id] = persisted[w.id] !== undefined ? persisted[w.id] : w.seats
    })
    return merged
  })

  // ── Persist on change ─────────────────────────────────────────────────
  useEffect(() => { saveBookings(bookings) }, [bookings])
  useEffect(() => { if (user) saveUser(user) }, [user])
  useEffect(() => { saveSeats(workshopSeats) }, [workshopSeats])

  // ── Helpers ───────────────────────────────────────────────────────────

  /** Check if a specific workshop has already been booked by this user. */
  const isBooked = useCallback(
    (workshopId) => bookings.some((b) => b.workshopId === workshopId && b.status === 'confirmed'),
    [bookings]
  )

  /** Get the booking object for a workshop (or null). */
  const getBooking = useCallback(
    (workshopId) => bookings.find((b) => b.workshopId === workshopId && b.status === 'confirmed') ?? null,
    [bookings]
  )

  /** Get current available seat count for a workshop. */
  const getSeatCount = useCallback(
    (workshopId) => {
      if (workshopSeats[workshopId] !== undefined) return workshopSeats[workshopId]
      const w = catalogWorkshops.find((w) => w.id === workshopId)
      return w?.seats ?? 0
    },
    [workshopSeats]
  )

  /**
   * Book a workshop.
   * @param {string} workshopId
   * @param {object} workshopData - { title, date, duration, instructor }
   * @param {object} formData - { name, email, phone, college, state, year }
   * @returns {string} bookingId
   */
  const addBooking = useCallback((workshopId, workshopData, formData) => {
    const bookingId = 'BK-' + nanoid(8).toUpperCase()
    const now = new Date().toISOString()

    const newBooking = {
      bookingId,
      workshopId,
      workshopTitle: workshopData.title,
      workshopDate: workshopData.date,
      workshopDuration: workshopData.duration,
      instructorName: workshopData.instructor,
      status: 'confirmed',
      bookedAt: now,
      attendee: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        college: formData.college?.trim() ?? '',
        state: formData.state,
        year: formData.year,
      },
    }

    // Update bookings
    setBookings((prev) => [...prev, newBooking])

    // Decrement seat count
    setWorkshopSeats((prev) => {
      const current = prev[workshopId] !== undefined ? prev[workshopId] : (catalogWorkshops.find((w) => w.id === workshopId)?.seats ?? 0)
      return { ...prev, [workshopId]: Math.max(0, current - 1) }
    })

    // Persist user info for future auto-fill
    const userInfo = { name: formData.name.trim(), email: formData.email.trim() }
    setUser(userInfo)

    return bookingId
  }, [])

  /**
   * Cancel a booking by ID — marks as cancelled and restores seat count.
   * @param {string} bookingId
   */
  const cancelBooking = useCallback((bookingId) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.bookingId !== bookingId) return b
        // Restore seat
        setWorkshopSeats((seats) => ({
          ...seats,
          [b.workshopId]: (seats[b.workshopId] ?? 0) + 1,
        }))
        return { ...b, status: 'cancelled', cancelledAt: new Date().toISOString() }
      })
    )
  }, [])

  /** Count of confirmed (non-cancelled) bookings */
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length

  const value = {
    bookings,
    user,
    workshopSeats,
    isBooked,
    getBooking,
    getSeatCount,
    addBooking,
    cancelBooking,
    confirmedCount,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/** Hook to consume the app context. Throws if used outside <AppProvider>. */
// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
