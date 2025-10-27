import React, { useState, useEffect } from "react";
import EnergyUsageChart from "../../components/charts/EnergyUsageChart";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/common/Loader";

const InstallerOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        // Mock data for now
        setTimeout(() => {
          setStats({
            newLeads: 12,
            pendingInstallations: 5,
            totalEarnings: 4500,
          });
          setLoading(false);
        }, 1000);

      } catch (err) {
        setError("Failed to fetch overview data.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchOverviewData();
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

  if (!stats) {
    return <div className="p-6">No overview data available.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* --- Card 1 Replacement --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h4 className="text-sm font-medium">New Leads</h4>
            <span className="text-gray-400">[Users]</span> {/* Icon Placeholder */}
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.newLeads}</div>
            <p className="text-xs text-gray-500">+5 since last week</p>
          </div>
        </div>

        {/* --- Card 2 Replacement --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h4 className="text-sm font-medium">Pending Installations</h4>
            <span className="text-gray-400">[Zap]</span> {/* Icon Placeholder */}
          </div>
          <div>
            <div className="text-2xl font-bold">
              {stats.pendingInstallations}
            </div>
            <p className="text-xs text-gray-500">2 waiting for parts</p>
          </div>
        </div>

        {/* --- Card 3 Replacement --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h4 className="text-sm font-medium">Total Earnings (Monthly)</h4>
            <span className="text-gray-400">[$]</span> {/* Icon Placeholder */}
          </div>
          <div>
            <div className="text-2xl font-bold">${stats.totalEarnings}</div>
            <p className="text-xs text-gray-500">+15% from last month</p>
          </div>
        </div>
      </div>

      {/* --- Chart Card Replacement --- */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
        </div>
        <div className="p-6">
          <EnergyUsageChart />
        </div>
      </div>

    </div>
  );
};

export default InstallerOverview;