import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext.jsx";

const menuRoutes = {
  'overview': '/adminOverview',
  'integration': '/adminIntegration',
  'roles': '/adminRoles',
  'tasks': '/adminTasks',
  'editor': '/adminTaskEditor',
};

// const routeToMenu = {
//   '/adminOverview': 'overview',
//   '/adminIntegration': 'integration',
//   '/adminRoles': 'roles',
//   '/adminTasks': 'tasks',
// };

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "integration",
    label: "Integration",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 11l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "tasks",
    label: "Task Management",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "editor",
    label: "Task Editor",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

export default function Sidebar({ activePage, onNavigate }) {
  const navigate = useNavigate();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const handleLogout = () => {
    alert('Logout from admin panel');
    // Clear any auth state or tokens here if needed
    navigate('/');
  };

  return (
    <aside className={`min-h-screen bg-white border-r border-gray-100 flex flex-col py-5 px-3 fixed left-0 top-0 z-30 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-52'}`}>
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="white" />
          </svg>
        </div>
        {!isCollapsed && (
          <NavLink to="/adminOverview" className="text-sm font-semibold text-gray-800 tracking-tight">
            Tenant Integrity <sup className="text-[10px] text-gray-400">™</sup>
          </NavLink>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (onNavigate) onNavigate(item.id);
                if (menuRoutes[item.id]) navigate(menuRoutes[item.id]);
              }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left w-full
                ${isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              title={isCollapsed ? item.label : ''}
            >
              <span className={isActive ? "text-blue-600" : "text-gray-400"}>{item.icon}</span>
              {!isCollapsed && item.label}
            </button>
          );
        })}
      </nav>

      {/* Collapse/Logout */}
      <div className="mt-4 space-y-2">
        <button 
          onClick={toggleSidebar}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-500 transition-all duration-150 w-full"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d={isCollapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {!isCollapsed && 'Collapse'}
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 hover:text-red-500 transition-all duration-150 w-full"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {!isCollapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
}