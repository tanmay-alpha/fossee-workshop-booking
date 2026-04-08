/**
 * Generates and downloads an iCalendar (.ics) file for a workshop booking.
 * Works entirely client-side using Blob URLs.
 */

/**
 * Formats a date string to iCal DTSTART format (YYYYMMDDTHHMMSSZ).
 * Accepts a date string like "Apr 15, 2026".
 * @param {string} dateStr
 * @returns {string}
 */
function formatICSDate(dateStr) {
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) {
      // Fallback to current date + 7 days
      const fallback = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      return fallback.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  } catch {
    return new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }
}

/**
 * Generates an .ics file and triggers a browser download.
 *
 * @param {{
 *   title: string,
 *   description: string,
 *   startDate: string,
 *   duration?: string,
 *   location?: string,
 *   organizer?: string
 * }} options
 */
export function generateICS({ title, description, startDate, duration, location, organizer }) {
  const dtStart = formatICSDate(startDate)
  // Default end = 3 days after start (workshops are 3 days)
  const startMs = new Date(startDate).getTime()
  const endMs = isNaN(startMs) ? Date.now() + 3 * 24 * 60 * 60 * 1000 : startMs + 3 * 24 * 60 * 60 * 1000
  const dtEnd = new Date(endMs).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const uid = `${Date.now()}-fossee@iitbombay.org`
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const safe = (str = '') => str.replace(/,/g, '\\,').replace(/\n/g, '\\n')

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FOSSEE IIT Bombay//Workshop Platform//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${safe(title)}`,
    `DESCRIPTION:${safe(description || `FOSSEE Workshop: ${title}`)}`,
    `LOCATION:${safe(location || 'Online / IIT Bombay')}`,
    `ORGANIZER;CN=${safe(organizer || 'FOSSEE IIT Bombay')}:mailto:contact@fossee.in`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${title.replace(/\s+/g, '_')}_FOSSEE.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
