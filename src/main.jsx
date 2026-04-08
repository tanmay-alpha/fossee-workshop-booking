/* eslint-disable react-refresh/only-export-components */
import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import ErrorBoundary from './components/shared/ErrorBoundary.jsx'
import ToastContainer from './components/shared/Toast.jsx'

// Eagerly loaded pages (critical path)
import HomePage from './pages/HomePage.jsx'
import WorkshopsPage from './pages/WorkshopsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import MyBookingsPage from './pages/MyBookingsPage.jsx'
import TransformationPage from './pages/TransformationPage.jsx'

// Lazy loaded pages (non-critical)
const WorkshopDetailPage = lazy(() => import('./pages/WorkshopDetailPage.jsx'))
const BookingPage = lazy(() => import('./pages/BookingPage.jsx'))
const BookingSuccessPage = lazy(() => import('./pages/BookingSuccessPage.jsx'))

/** Skeleton fallback for lazy-loaded pages. */
function PageSkeleton() {
  return (
    <div className="page-enter min-h-screen bg-[#0a0a0f] pt-20">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="skeleton-shimmer mb-5 h-6 w-1/4 rounded-full bg-white/5" />
        <div className="skeleton-shimmer h-14 w-3/4 rounded-2xl bg-white/5" />
        <div className="skeleton-shimmer mt-6 h-4 w-1/2 rounded bg-white/5" />
        <div className="skeleton-shimmer mt-12 h-64 w-full rounded-3xl bg-white/5" />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AppProvider>
          <ToastContainer />

          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/workshops" element={<WorkshopsPage />} />
              <Route
                path="/workshops/:id"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <WorkshopDetailPage />
                  </Suspense>
                }
              />
              <Route
                path="/book/:id"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <BookingPage />
                  </Suspense>
                }
              />
              <Route
                path="/booking-success"
                element={
                  <Suspense fallback={<PageSkeleton />}>
                    <BookingSuccessPage />
                  </Suspense>
                }
              />
              <Route path="/my-bookings" element={<MyBookingsPage />} />
              <Route path="/transformation" element={<TransformationPage />} />
              {/* 404 catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AppProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
