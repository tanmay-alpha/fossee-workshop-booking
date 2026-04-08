/**
 * Analytics hook — wraps trackEvent so swapping PostHog/GA4/Mixpanel
 * only requires editing this single file.
 *
 * Current implementation: logs to console.
 * To switch to PostHog: replace the console.log line with posthog.capture(name, properties).
 * To switch to GA4: replace with window.gtag('event', name, properties).
 */
export function useAnalytics() {
  /**
   * Track a named event with optional properties.
   * @param {string} name - The event name (e.g., 'workshop_viewed')
   * @param {Record<string, unknown>} [properties={}] - Key/value metadata
   */
  function trackEvent(name, properties = {}) {
    // Only log in development — silent in production
    if (import.meta.env.DEV) {
      console.log('[Analytics]', name, { ...properties, timestamp: new Date().toISOString() })
    }
    // PostHog: posthog.capture(name, properties)
    // GA4:     window.gtag?.('event', name, properties)
    // Mixpanel: mixpanel.track(name, properties)
  }

  return { trackEvent }
}
