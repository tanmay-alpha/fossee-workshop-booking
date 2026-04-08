import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { workshops } from '../data/workshops.js'
import Footer from '../components/Footer.jsx'
import { useApp } from '../context/AppContext.jsx'
import { useToast } from '../hooks/useToast.js'
import { useAnalytics } from '../hooks/useAnalytics.js'

/** All Indian states and UTs for the dropdown. */
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
]

const YEAR_OPTIONS = ['1st', '2nd', '3rd', '4th', 'Postgraduate']

/** Returns Tailwind classes for form input based on validation state. */
function inputCls(error, touched) {
  const base =
    'input-glow bg-white/[0.04] border text-white rounded-xl px-4 py-3.5 w-full min-h-[48px] outline-none placeholder-gray-600 transition-all duration-200 text-sm'
  if (error && touched) return `${base} border-red-500/60 ring-1 ring-red-500/20 focus:border-red-400`
  if (!error && touched) return `${base} border-emerald-500/60 ring-1 ring-emerald-500/20 focus:border-emerald-400`
  return `${base} border-white/[0.08]`
}

export default function BookingPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const workshop = workshops.find((w) => w.id === id)
  const { isBooked, addBooking, getSeatCount, user } = useApp()
  const toast = useToast()
  const { trackEvent } = useAnalytics()

  /* ── Duplicate booking protection ── */
  useEffect(() => {
    if (workshop && isBooked(workshop.id)) {
      navigate('/my-bookings', {
        replace: true,
        state: { message: 'You have already booked this workshop.' },
      })
    }
  }, [workshop, isBooked, navigate])

  /* ── Analytics ── */
  useEffect(() => {
    if (workshop) {
      trackEvent('booking_started', { workshopId: workshop.id, workshopTitle: workshop.title })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Form state ── */
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: '',
    college: '',
    state: '',
    year: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* ── Validation rules ── */
  function validate(field, value) {
    const v = String(value).trim()
    switch (field) {
      case 'name':
        return v.length < 2 ? 'Full name is required (min 2 characters)' : ''
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address'
      case 'phone':
        return /^[6-9]\d{9}$/.test(v) ? '' : 'Enter a valid 10-digit Indian mobile number'
      case 'college':
        return v.length < 2 ? 'College / University name is required' : ''
      case 'state':
        return v ? '' : 'Please select your state'
      case 'year':
        return v ? '' : 'Please select your year of study'
      default:
        return ''
    }
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (submitted || touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, value) }))
    }
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validate(field, form[field]) }))
  }

  function validateAll() {
    const newErrors = {}
    const allTouched = {}
    for (const field of Object.keys(form)) {
      newErrors[field] = validate(field, form[field])
      allTouched[field] = true
    }
    setErrors(newErrors)
    setTouched(allTouched)
    return Object.values(newErrors).every((e) => !e)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)

    if (!validateAll()) {
      toast.error('Please fix the errors below before submitting.')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const bookingId = addBooking(workshop.id, workshop, form)

      trackEvent('booking_completed', {
        workshopId: workshop.id,
        workshopTitle: workshop.title,
        bookingId,
      })

      navigate('/booking-success', {
        state: {
          bookingId,
          attendee: {
            name: form.name.trim(),
            email: form.email.trim(),
          },
          workshop: {
            title: workshop.title,
            date: workshop.date,
            duration: workshop.duration,
            instructor: workshop.instructor,
          },
        },
      })
    } catch {
      setIsSubmitting(false)
      toast.error('Something went wrong. Please try again.')
    }
  }

  /* ── 404 state ── */
  if (!workshop) {
    return (
      <div className="page-enter min-h-screen bg-[#0a0a0f] pt-20">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.08]">
            <svg className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-black tracking-tighter text-white">Workshop Not Found</h1>
          <p className="mt-3 text-gray-500">We can't find a workshop to book with that ID.</p>
          <Link
            to="/workshops"
            className="btn-gradient mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white no-underline"
          >
            Browse Workshops
          </Link>
        </div>
      </div>
    )
  }

  const currentSeats = getSeatCount(workshop.id)

  return (
    <div className="page-enter min-h-screen bg-[#0a0a0f] pt-12 sm:pt-20">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16">

        {/* Back link */}
        <Link
          to={`/workshops/${id}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 no-underline transition-colors duration-200 hover:text-white"
        >
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Workshop
        </Link>

        {/* Workshop summary card */}
        <div className="glass mt-6 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold tracking-widest text-indigo-400 ring-1 ring-indigo-500/20">
                {workshop.category}
              </span>
              <h1 className="mt-2 text-2xl font-bold tracking-tighter text-white sm:text-3xl">
                {workshop.title}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {workshop.date} · {workshop.duration}
              </p>
              {/* Seats urgency */}
              {currentSeats <= 5 && currentSeats > 0 && (
                <p className={`mt-2 text-xs font-semibold ${currentSeats <= 3 ? 'text-red-400' : 'text-amber-400'}`}>
                  Only {currentSeats} spots remaining
                </p>
              )}
            </div>
            <div className="hidden sm:block">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Booking form */}
        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <h2 className="text-lg font-bold tracking-tight text-white">Registration Details</h2>

          {/* Full Name */}
          <div>
            <label htmlFor="booking-name" className="mb-1.5 block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              id="booking-name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Ravi Kumar"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              className={inputCls(errors.name, touched.name)}
              aria-invalid={errors.name && touched.name ? 'true' : undefined}
            />
            {errors.name && touched.name && (
              <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="booking-email" className="mb-1.5 block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              id="booking-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={inputCls(errors.email, touched.email)}
              aria-invalid={errors.email && touched.email ? 'true' : undefined}
            />
            {errors.email && touched.email && (
              <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="booking-phone" className="mb-1.5 block text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <input
              id="booking-phone"
              type="tel"
              autoComplete="tel"
              placeholder="10-digit mobile number (starts with 6-9)"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
              onBlur={() => handleBlur('phone')}
              className={inputCls(errors.phone, touched.phone)}
              aria-invalid={errors.phone && touched.phone ? 'true' : undefined}
            />
            {errors.phone && touched.phone && (
              <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
            )}
          </div>

          {/* College */}
          <div>
            <label htmlFor="booking-college" className="mb-1.5 block text-sm font-medium text-gray-300">
              College / University
            </label>
            <input
              id="booking-college"
              type="text"
              autoComplete="organization"
              placeholder="e.g. IIT Bombay"
              value={form.college}
              onChange={(e) => handleChange('college', e.target.value)}
              onBlur={() => handleBlur('college')}
              className={inputCls(errors.college, touched.college)}
              aria-invalid={errors.college && touched.college ? 'true' : undefined}
            />
            {errors.college && touched.college && (
              <p className="mt-1.5 text-xs text-red-400">{errors.college}</p>
            )}
          </div>

          {/* State & Year */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="booking-state" className="mb-1.5 block text-sm font-medium text-gray-300">
                State
              </label>
              <select
                id="booking-state"
                autoComplete="address-level1"
                value={form.state}
                onChange={(e) => handleChange('state', e.target.value)}
                onBlur={() => handleBlur('state')}
                className={`${inputCls(errors.state, touched.state)} appearance-none cursor-pointer`}
                aria-invalid={errors.state && touched.state ? 'true' : undefined}
              >
                <option value="" disabled>Select State</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.state && touched.state && (
                <p className="mt-1.5 text-xs text-red-400">{errors.state}</p>
              )}
            </div>

            <div>
              <label htmlFor="booking-year" className="mb-1.5 block text-sm font-medium text-gray-300">
                Year of Study
              </label>
              <select
                id="booking-year"
                value={form.year}
                onChange={(e) => handleChange('year', e.target.value)}
                onBlur={() => handleBlur('year')}
                className={`${inputCls(errors.year, touched.year)} appearance-none cursor-pointer`}
                aria-invalid={errors.year && touched.year ? 'true' : undefined}
              >
                <option value="" disabled>Select Year</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {errors.year && touched.year && (
                <p className="mt-1.5 text-xs text-red-400">{errors.year}</p>
              )}
            </div>
          </div>

          {/* Workshop (read-only) */}
          <div>
            <label htmlFor="booking-workshop" className="mb-1.5 block text-sm font-medium text-gray-300">
              Workshop
            </label>
            <input
              id="booking-workshop"
              type="text"
              value={workshop.title}
              readOnly
              className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3.5 text-sm text-gray-500 outline-none cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-gradient mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all duration-200 ${isSubmitting
              ? 'opacity-80 cursor-wait'
              : ''
              }`}
          >
            {isSubmitting ? (
              <>
                <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                Confirm Booking
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  )
}
