/**
 * Toast notification system — slides in from bottom-right, auto-dismisses after 3.5s.
 * Maximum 3 toasts visible at once; oldest is dropped when limit is exceeded.
 * This component must be mounted once in main.jsx and registers the global dispatch.
 */

import { useState, useEffect, useCallback } from 'react'
import { registerToastDispatch } from '../../hooks/useToast.js'

const MAX_TOASTS = 3
const DURATION = 3500

const TOAST_STYLES = {
  success: {
    bg: 'bg-emerald-500/15 border-emerald-500/30',
    icon: 'text-emerald-400',
    bar: 'bg-emerald-500',
    svg: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  error: {
    bg: 'bg-red-500/15 border-red-500/30',
    icon: 'text-red-400',
    bar: 'bg-red-500',
    svg: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    ),
  },
  info: {
    bg: 'bg-blue-500/15 border-blue-500/30',
    icon: 'text-blue-400',
    bar: 'bg-blue-500',
    svg: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    ),
  },
  warning: {
    bg: 'bg-amber-500/15 border-amber-500/30',
    icon: 'text-amber-400',
    bar: 'bg-amber-500',
    svg: (
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    ),
  },
}

function ToastItem({ toast, onDismiss }) {
  const [visible, setVisible] = useState(false)
  const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info

  useEffect(() => {
    // Trigger slide-in
    const showTimer = requestAnimationFrame(() => setVisible(true))
    // Auto-dismiss
    const dismissTimer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDismiss(toast.id), 400)
    }, DURATION)

    return () => {
      cancelAnimationFrame(showTimer)
      clearTimeout(dismissTimer)
    }
  }, [toast.id, onDismiss])

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-2xl border px-4 py-3.5 shadow-2xl backdrop-blur-xl transition-all duration-400 ease-out ${style.bg} ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      {/* Icon */}
      <svg
        className={`mt-0.5 h-5 w-5 shrink-0 ${style.icon}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        {style.svg}
      </svg>

      {/* Message */}
      <p className="flex-1 text-sm font-medium text-white">{toast.message}</p>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={() => {
          setVisible(false)
          setTimeout(() => onDismiss(toast.id), 400)
        }}
        className="ml-1 shrink-0 rounded-lg p-0.5 text-white/40 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        aria-label="Dismiss notification"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 ${style.bar} opacity-60`}
        style={{ animation: `toast-progress ${DURATION}ms linear forwards` }}
      />

      <style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to   { width: 0%;   }
        }
      `}</style>
    </div>
  )
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  const dispatch = useCallback((toast) => {
    setToasts((prev) => {
      const next = [...prev, toast]
      return next.length > MAX_TOASTS ? next.slice(next.length - MAX_TOASTS) : next
    })
  }, [])

  // Register global dispatch on mount
  useEffect(() => {
    registerToastDispatch(dispatch)
  }, [dispatch])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-6 right-4 z-[9999] flex flex-col-reverse gap-2 sm:right-6"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </div>
  )
}
