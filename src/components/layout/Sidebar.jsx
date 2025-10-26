// src/components/common/SideMenu.jsx
import React, { useContext } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Assuming you have this
import logoSrc from '../../assets/logo-color.svg';

// Define links for different roles
const userLinks = [
  { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { name: 'AI Analysis', icon: 'auto_awesome', path: '/dashboard/analysis-result' },
  { name: 'AR Preview', icon: 'view_in_ar', path: '/dashboard/ar-view' },
  { name: 'Energy Data', icon: 'show_chart', path: '/dashboard/energy-data' },
  { name: 'Find Installers', icon: 'engineering', path: '/dashboard/installers' },
  { name: 'Profile', icon: 'person', path: '/dashboard/profile' },
];

const adminLinks = [
  { name: 'Dashboard', icon: 'dashboard', path: '/admin-dashboard' },
  { name: 'Users', icon: 'group', path: '/admin-dashboard/user-management' },
  { name: 'Installers', icon: 'engineering', path: '/admin-dashboard/installer-management' },
  { name: 'Analytics', icon: 'analytics', path: '/admin-dashboard/content' },
];

const installerLinks = [
  { name: 'Overview', icon: 'dashboard', path: '/installer-dashboard' },
  { name: 'Customer Leads', icon: 'assignment_ind', path: '/installer-dashboard/leads' },
  { name: 'Roof Reports', icon: 'assessment', path: '/installer-dashboard/roof-analysis' },
];

const getLinksForRole = (role) => {
  switch (role) {
    case 'admin':
      return adminLinks;
    case 'installer':
      return installerLinks;
    case 'user':
    default:
      return userLinks;
  }
};

// Helper component for links
const MenuLink = ({ to, icon, children }) => (
  <NavLink
    to={to}
    end // Use 'end' to only match the exact path
    // Use NavLink's "children as a function" to get access to isActive
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all duration-300 ${
        isActive
          ? 'bg-green-100 text-green-700' // <-- Target active style
          : 'text-gray-600 hover:bg-gray-50' // <-- Target inactive style
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span
          className="material-symbols-outlined"
          // This inline style toggles the Google Font "FILL" setting
          style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
        >
          {icon}
        </span>
        <span className="font-medium">{children}</span>
      </>
    )}
  </NavLink>
);

export default function SideBar() {
  const { user, logout } = useContext(AuthContext); // Get user and logout
  const navigate = useNavigate();

  // Determine role (defaulting to 'user')
  const userRole = user?.role || 'user'; 
  const links = getLinksForRole(userRole);
  const panelTitle = userRole.charAt(0).toUpperCase() + userRole.slice(1) + " Panel";

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white p-6 flex flex-col justify-between shadow-xl dark:shadow-neumorphic-dark h-screen sticky top-0">
      <div>
        {/* Header */}
        <div className="flex-col items-center mb-12">
          <Link to="/" className="flex items-center text-xl font-bold space-x-2">
            <img src={logoSrc} alt="Logo" className="h-20" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <MenuLink key={link.name} to={link.path} icon={link.icon}>
              {link.name}
            </MenuLink>
          ))}
        </nav>
      </div>

      {/* Footer (Logout) */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-black w-full transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}