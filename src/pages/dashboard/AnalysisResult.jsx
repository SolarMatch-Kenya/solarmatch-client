import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import EmptyState from '../../components/common/EmptyState';
import RoofPreview from "../../components/ar/RoofPreview";
import API from '../../services/api';
import { ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline';
import Loader from '../../components/common/Loader';

const AnalysisResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const { token } = useAuth();

  useEffect(() => {
    
    const fetchResults = async () => {
      try {
        setLoading(true);
        setIsPending(false);
        const res = await API.get('/analysis/latest');
        const result = res.data; 
        
        if (result.status === 'PENDING') {
          setIsPending(true);
        } else if (result.status === 'FAILED') {
          setError("The analysis failed to process.");
        } else {
          setData(result);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setNoData(true);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [token]);

  // --- Your existing loading/error states ---
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full p-6" style={{ minHeight: '400px' }}>
        <Loader />
      </div>
    );
  }
  if (noData) return <EmptyState />;
  if (isPending) return <div className="p-6 text-blue-600">Your analysis is still processing. Please check back in a moment.</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!data) return <div className="p-6">No analysis data found.</div>;

  // --- New Render Logic ---
  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {/* Use placeholder or real address if available */}
          Solar Analysis for {data.request.address || "123 Sunshine Ave, Nairobi"}
        </h1>
        <p className="text-gray-600">
          Analysis completed: {new Date(data.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mb-6">
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
          <ArrowDownTrayIcon className="w-5 h-5" />
          Download PDF
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100">
          <ShareIcon className="w-5 h-5" />
          Share
        </button>
        <button className="flex items-center gap-2 bg-[#f79436] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#e68529]">
          Get a Quote
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column (Stats & Info) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Installation Cost (Placeholder data) */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 mb-1">Installation Cost</h3>
              <p className="text-2xl font-bold text-gray-800">KSh 850,000</p>
              <p className="text-sm text-gray-500">vs. last month's estimate</p>
            </div>
            {/* Annual Savings (Real data) */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 mb-1">Annual Savings</h3>
              <p className="text-2xl font-bold text-green-600">KSh {data.result.annual_savings_ksh.toLocaleString()}</p>
              <p className="text-sm text-green-500">Increased potential</p>
            </div>
            {/* ROI (Placeholder data) */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 mb-1">Return on Investment</h3>
              <p className="text-2xl font-bold text-gray-800">6.8 years</p>
              <p className="text-sm text-red-500">Slightly longer</p>
            </div>
            {/* CO2 Reduction (Placeholder data) */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-gray-500 mb-1">CO₂ Reduction</h3>
              <p className="text-2xl font-bold text-blue-600">2.1 tonnes/yr</p>
              <p className="text-sm text-green-500">Better than average</p>
            </div>
          </div>

          {/* Tabbed Info Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-2 px-4 font-semibold ${activeTab === 'summary' ? 'border-b-2 border-yellow-500 text-gray-800' : 'text-gray-500'}`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab('financial')}
                className={`py-2 px-4 font-semibold ${activeTab === 'financial' ? 'border-b-2 border-yellow-500 text-gray-800' : 'text-gray-500'}`}
              >
                Financial Breakdown
              </button>
              <button
                onClick={() => setActiveTab('impact')}
                className={`py-2 px-4 font-semibold ${activeTab === 'impact' ? 'border-b-2 border-yellow-500 text-gray-800' : 'text-gray-500'}`}
              >
                Environmental Impact
              </button>
            </div>

            {/* --- TAB CONTENT UPDATED --- */}
            <div className="text-gray-700 space-y-3 min-h-[150px]">
              {activeTab === 'summary' && (
                <div>
                  <h3 className="text-xl font-bold mb-3">System Summary</h3>
                  <p>
                    {data.result.summary_text || "No summary available."}
                  </p>
                </div>
              )}
              {activeTab === 'financial' && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Financial Breakdown</h3>
                  <p>
                    {data.result.financial_summary_text || "No financial summary available."}
                  </p>
                </div>
              )}
              {activeTab === 'impact' && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Environmental Impact</h3>
                  <p>
                    {data.result.environmental_summary_text || "No environmental impact summary available."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (AR/3D Viz) */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold">AR/3D Visualization</h3>
            {data.result.solar_suitability_score !== null && (
              <span className="text-sm font-semibold bg-green-100 text-green-700 py-1 px-3 rounded-full">
                Suitability: {data.result.solar_suitability_score}%
              </span>
            )}
          </div>
          
          {data.request.roof_image_url && data.result.panel_layout ? (
            <RoofPreview 
              photoUrl={data.request.roof_image_url}
              panelPositions={data.result.panel_layout}
              roofModelUrl={data.result.roof_model_url || "/models/3d_house_model.gltf"}
            />
          ) : (
            <div className="h-full min-h-[400px] flex items-center justify-center p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
              3D panel layout could not be generated for this analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;