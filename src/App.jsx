import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

/**
 * App shell: shared navbar + routed page content.
 * Main uses relative z-10 so page content (including #hero on Home) stacks above the base layer.
 */
export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-gray-100">
      <Navbar />
      <main className="relative z-10 flex min-h-0 flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}
