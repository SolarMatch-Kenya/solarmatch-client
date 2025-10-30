import React, { useState, useEffect } from 'react'; 
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"; 
import { CloudIcon, CurrencyDollarIcon, ClockIcon, ViewfinderCircleIcon, UserGroupIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import MapSelector from "../components/map/MapSelector";
import API from '../services/api'; 

const Dashboard = () => {
  // Add token to get from auth context
  const { user, token } = useAuth(); 

  // Add state for loading and analysis data
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Optional: for error handling

  // Original placeholder data, renamed to 'defaultStats'
  const defaultStats = {
    savings: "0",
    co2: "0",
    payback: "0",
    suitability: 0,
  };

  // Add useEffect to fetch data on component load
  useEffect(() => {
    const fetchLatestAnalysis = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const res = await API.get('/analysis/latest');
        
        // Only set data if the analysis is completed
        if (res.data) {
          setAnalysisData(res.data);
        }
      } catch (err) {
        // If 404 (no analysis yet), it's okay. We'll just use default stats.
        if (err.response && err.response.status !== 404) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAnalysis();
  }, [token]); // Re-run if the token changes

  // Create a new 'stats' object that merges real data over the defaults
  const stats = {
    savings: analysisData?.result?.annual_savings_ksh
      ? analysisData.result.annual_savings_ksh.toLocaleString()
      : defaultStats.savings,
    
    co2: defaultStats.co2, // This is still a placeholder, as noted
    
    payback: defaultStats.payback, // This is also still a placeholder
    
    suitability: analysisData?.result?.solar_suitability_score
      ? analysisData.result.solar_suitability_score
      : defaultStats.suitability,
  };

  const hasAnalysis = analysisData !== null;
  
  const journeyStep = hasAnalysis ? "Step 2 of 4" : "Step 1 of 4";
  const journeyStage = hasAnalysis ? "Results Ready" : "Start Your Analysis";
  const journeyStageColor = hasAnalysis ? "text-green-600" : "text-blue-600";
  const journeyNextStep = hasAnalysis ? "Next up: Find an installer" : "Next up: Get your free solar estimate";
  const journeyProgress = hasAnalysis ? "50%" : "25%";

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-full">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.full_name.split(' ')[0]}!</h1>
        <p className="text-gray-600">Here is a summary of your solar journey.</p>
      </div>

      {/* Top Stat Cards - Now use the new 'stats' object */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Estimated Annual Savings */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <CurrencyDollarIcon className="w-5 h-5 text-green-600" /> 
            </div>
            <h2 className="text-gray-600 font-medium">Estimated Annual Savings</h2>
          </div>
          {/* We now use stats.savings */}
          <p className="text-3xl font-bold text-gray-800">KSh {stats.savings}</p>
        </div>

        {/* Potential CO2 Reduction */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <CloudIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-gray-600 font-medium">Potential CO₂ Reduction</h2>
          </div>
          {/* We now use stats.co2 */}
          <p className="text-3xl font-bold text-gray-800">{stats.co2} Tonnes/Year</p>
        </div>

        {/* Payback Period */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-yellow-700" />
            </div>
            <h2 className="text-gray-600 font-medium">Payback Period</h2>
          </div>
          {/* We now use stats.payback */}
          <p className="text-3xl font-bold text-gray-800">{stats.payback} Years</p>
        </div>
      </div>

      {/* Main Content Area (Journey & Snapshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Journey & Snapshot */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-gray-800">Your Solar Journey</h2>
              <span className="text-sm font-medium text-gray-500">{journeyStep}</span>
            </div>
            <p className="text-gray-600 mb-2">
              Current Stage: <span className={`font-semibold ${journeyStageColor}`}>{journeyStage}</span>
            </p>
            <p className="text-gray-600 mb-4">{journeyNextStep}</p>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: journeyProgress }}></div>
            </div>
          </div>

          {/* Analysis Snapshot */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Analysis Snapshot: Home Rooftop</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                <MapSelector/>
              </div>
              <div className="flex-1 md:max-w-xs">
                <h3 className="text-gray-600 font-medium">SOLAR SUITABILITY SCORE</h3>
                {/* We now use stats.suitability */}
                <p className="text-7xl font-bold text-green-500 my-2">{stats.suitability}%</p>
                <p className="text-gray-700">Excellent sunlight exposure detected.</p>
                <Link to="/dashboard/analysis-result" className="mt-4 inline-block w-full text-center bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-700">
                  View Full Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Next Steps (No changes here) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Next Steps</h2>
          <p className="text-gray-600 mb-6">
            Ready to move forward? Explore your results in augmented reality or find certified local installers.
          </p>
          <div className="space-y-3">
            <Link to="/dashboard/analysis-result" className="w-full flex items-center justify-center gap-2 bg-[#f79436] text-white font-semibold py-3 rounded-lg hover:bg-[#e68529]">
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