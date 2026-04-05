import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

/**
 * App shell: shared navbar + routed page content.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <Outlet />
    </div>
  )
}
