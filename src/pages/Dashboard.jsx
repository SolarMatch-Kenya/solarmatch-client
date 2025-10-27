import React from 'react';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"; // Import Link for navigation
import { CloudIcon, CurrencyDollarIcon, ClockIcon, ViewfinderCircleIcon, UserGroupIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import MapSelector from "../components/map/MapSelector";

const Dashboard = () => {
  const { user } = useAuth();

  // Placeholder data based on your design
  const analysisStats = {
    savings: "85,000",
    co2: "2.1",
    payback: "4.5",
    suitability: 95,
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-full">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.full_name.split(' ')[0]}!</h1>
        <p className="text-gray-600">Here is a summary of your solar journey.</p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Estimated Annual Savings */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            {/* Placeholder for icon */}
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <CurrencyDollarIcon className="w-5 h-5 text-green-600" /> 
            </div>
            <h2 className="text-gray-600 font-medium">Estimated Annual Savings</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">KSh {analysisStats.savings}</p>
        </div>

        {/* Potential CO2 Reduction */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <CloudIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-gray-600 font-medium">Potential CO₂ Reduction</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">{analysisStats.co2} Tonnes/Year</p>
        </div>

        {/* Payback Period */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-yellow-700" />
            </div>
            <h2 className="text-gray-600 font-medium">Payback Period</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">{analysisStats.payback} Years</p>
        </div>
      </div>

      {/* Main Content Area (Journey & Snapshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Journey & Snapshot */}
        <div className="lg:col-span-2 space-y-6">
          {/* Your Solar Journey */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-gray-800">Your Solar Journey</h2>
              <span className="text-sm font-medium text-gray-500">Step 2 of 4</span>
            </div>
            <p className="text-gray-600 mb-2">Current Stage: <span className="font-semibold text-green-600">Results Ready</span></p>
            <p className="text-gray-600 mb-4">Next up: Find an installer</p>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "50%" }}></div>
            </div>
          </div>

          {/* Analysis Snapshot */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Analysis Snapshot: Home Rooftop</h2>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Placeholder for Map */}
              <div className="flex-1 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                <MapSelector/>
              </div>
              <div className="flex-1 md:max-w-xs">
                <h3 className="text-gray-600 font-medium">SOLAR SUITABILITY SCORE</h3>
                <p className="text-7xl font-bold text-green-500 my-2">{analysisStats.suitability}%</p>
                <p className="text-gray-700">Excellent sunlight exposure detected.</p>
                <Link to="/dashboard/analysis-result" className="mt-4 inline-block w-full text-center bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-700">
                  View Full Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Next Steps */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Next Steps</h2>
          <p className="text-gray-600 mb-6">
            Ready to move forward? Explore your results in augmented reality or find certified local installers.
          </p>
          <div className="space-y-3">
            <Link to="/dashboard/ar-view" className="w-full flex items-center justify-center gap-2 bg-[#f79436] text-white font-semibold py-3 rounded-lg hover:bg-[#e68529]">
              <ViewfinderCircleIcon className="w-5 h-5" />
              Explore in AR
            </Link>
            <Link to="/dashboard/installers" className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-200 border border-gray-200">
              <UserGroupIcon className="w-5 h-5" />
              Find Installers
            </Link>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-200 border border-gray-200">
              <ArrowDownTrayIcon className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;