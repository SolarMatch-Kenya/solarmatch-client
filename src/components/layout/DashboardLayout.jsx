// src/pages/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../layout/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <main className="flex-1 p-6 lg:p-10">
        <Outlet /> 
      </main>
    </div>
  );
}