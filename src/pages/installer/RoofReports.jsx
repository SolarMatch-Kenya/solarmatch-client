import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/common/Loader";
import API from "../../services/api";

const RoofReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoofReports = async () => {
      if (!user) return;
      try {
        setLoading(true);
        // Fetch real data from the new endpoint
        const res = await API.get('/installer-reports');
        setReports(res.data);
      } catch (err) {
        setError("Failed to fetch roof reports.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoofReports();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full p-6" style={{ minHeight: '400px' }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Roof Reports from Leads</h2>
      
      {reports.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
          <p>No roof reports available from your leads.</p>
          <p className="text-sm mt-1">When a customer you have as a lead completes an analysis, it will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">{report.customerName}</h3>
                <p className="text-sm text-gray-500 mb-3">{report.address}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Annual Savings:</span>
                    <span className="font-semibold text-green-600">{report.annualSavings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Payback Period:</span>
                    <span className="font-semibold text-gray-800">{report.payback}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Report Date:</span>
                    <span className="text-gray-500">{new Date(report.reportDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto p-4 bg-gray-50 border-t border-gray-100">
                <button className="w-full bg-[#f79436] text-white font-semibold py-2 rounded-lg hover:bg-[#e68529]">
                  View Full Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoofReports;