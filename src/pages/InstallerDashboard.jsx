// src/pages/installer/InstallerDashboard.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import DashboardLayout from '../components/layout/DashboardLayout'; // Re-use the main layout

const InstallerDashboard = () => {
  return (
    <DashboardLayout> 
      {/* Child routes (Overview, Leads, etc.) will render here */}
      <Outlet /> 
    </DashboardLayout>
  );
};

export default InstallerDashboard;