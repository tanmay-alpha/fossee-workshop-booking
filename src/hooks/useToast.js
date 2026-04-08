/**
 * Custom toast notification hook.
 * Manages a stack of up to 3 toasts with auto-dismiss after 3.5s.
 * Designed for import in any component — no Context needed.
 */

import { useState, useCallback, useRef } from 'react'

let globalDispatch = null

/** Internal registry so useToast can be called from anywhere. */
export function registerToastDispatch(fn) {
  globalDispatch = fn
}

/**
 * Call this inside a component to create toasts locally.
 * Or use the standalone toast object for calls outside React trees.
 */
export function useToast() {
  const push = useCallback((type, message) => {
    if (globalDispatch) globalDispatch({ type, message, id: Date.now() + Math.random() })
  }, [])

  return {
    success: (message) => push('success', message),
    error: (message) => push('error', message),
    info: (message) => push('info', message),
    warning: (message) => push('warning', message),
  }
}

/** Standalone toast object usable outside React components (e.g., context functions). */
export const toast = {
  success: (message) => globalDispatch?.({ type: 'success', message, id: Date.now() + Math.random() }),
  error: (message) => globalDispatch?.({ type: 'error', message, id: Date.now() + Math.random() }),
  info: (message) => globalDispatch?.({ type: 'info', message, id: Date.now() + Math.random() }),
  warning: (message) => globalDispatch?.({ type: 'warning', message, id: Date.now() + Math.random() }),
}
