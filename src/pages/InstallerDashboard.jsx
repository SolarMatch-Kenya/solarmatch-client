import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';

const InstallerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex">
        <nav className="w-64 p-4 bg-gray-100 h-screen">
          <ul className="space-y-2">
            <li>
              <Link to="/installer-dashboard" className="block p-2 rounded hover:bg-gray-200">Overview</Link>
            </li>
            <li>
              <Link to="/installer-dashboard/leads" className="block p-2 rounded hover:bg-gray-200">Customer Leads</Link>
            </li>
            <li>
              <Link to="/installer-dashboard/roof-analysis" className="block p-2 rounded hover:bg-gray-200">Roof Reports</Link>
            </li>
          </ul>
        </nav>
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Installer Dashboard</h2>
          <p>Welcome to your installer dashboard. Manage your leads, clients, and roof reports here.</p>
          {/* Content for sub-routes would go here if <Outlet /> was used */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstallerDashboard;
