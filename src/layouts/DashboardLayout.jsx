import { Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function DashboardLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="w-56 bg-gray-900 text-white flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-700">
          <h1 className="text-lg font-bold tracking-tight">☁️ CloudDrive</h1>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
              ${isActive ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
            }
          >
            📁 My Files
          </NavLink>
          <NavLink
            to="/dashboard/starred"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
              ${isActive ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
            }
          >
            ⭐ Starred
          </NavLink>
          <NavLink
            to="/dashboard/shared"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
              ${isActive ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
            }
          >
            🔗 Shared
          </NavLink>
          <NavLink
            to="/dashboard/trash"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
              ${isActive ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
            }
          >
            🗑️ Trash
          </NavLink>
        </nav>

        {/* User info at bottom */}
        <div className="px-4 py-4 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2 truncate">{user?.email}</p>
          <button
            onClick={logout}
            className="w-full text-left text-sm text-gray-400 hover:text-red-400 transition"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">My Files</h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-gray-600">{user?.name}</span>
          </div>
        </div>

        {/* Page content slot */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default DashboardLayout