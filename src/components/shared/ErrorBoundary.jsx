import { Component } from 'react'

/**
 * Class-based ErrorBoundary that catches render errors anywhere in the tree.
 * Wrap the root outlet in main.jsx so any page crash shows a safe fallback.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught error:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-4 text-center">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/20">
          <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-black tracking-tighter text-white">
          Something Went Wrong
        </h1>
        <p className="mt-3 max-w-sm text-sm text-gray-400">
          An unexpected error occurred. Please try reloading the page.
        </p>

        {this.state.error && (
          <pre className="mt-4 max-w-md overflow-auto rounded-xl bg-white/[0.03] px-4 py-3 text-left text-xs text-red-300">
            {this.state.error.message}
          </pre>
        )}

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn-gradient mt-8 rounded-xl px-8 py-3.5 text-sm font-bold text-white"
        >
          Reload Page
        </button>
      </div>
    )
  }
}
