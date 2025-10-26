import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Reports = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-800">My Reports</h1>
      <p className="mt-2 text-lg text-gray-600">Here are the analysis reports you have generated.</p>
      {/* Placeholder for reports list */}
      <div className="mt-8">
        <p>You don't have any reports yet. <a href="/analysis" className="text-[#f79436] hover:underline">Generate your first report.</a></p>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
