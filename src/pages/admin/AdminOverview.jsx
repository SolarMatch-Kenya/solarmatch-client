import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Users, Sun, Leaf, UserPlus, Wrench, CheckCircle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler, // Import Filler for area charts
  Legend,
} from 'chart.js';

// --- Register Chart.js components ---
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler, // Register Filler
  Legend
);

// --- Reusable Stat Card Component ---
const StatCard = ({ title, value, change, icon, iconColor }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</p> {/* Format number */}
      <p className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change} this month
      </p>
    </div>
    <div className={`p-3 rounded-full ${iconColor}`}>
      {icon}
    </div>
  </div>
);

// --- Reusable Activity Item Component ---
const ActivityItem = ({ item }) => {
  let icon, iconColor, textPrefix;
  switch (item.type) {
    case 'user_registered':
      icon = <UserPlus className="w-4 h-4 text-green-700" />;
      iconColor = 'bg-green-100';
      textPrefix = 'New user registered:';
      break;
    case 'installer_approved':
      icon = <Wrench className="w-4 h-4 text-yellow-700" />;
      iconColor = 'bg-yellow-100';
      textPrefix = 'Installer approved:';
      break;
    case 'analysis_complete':
      icon = <CheckCircle className="w-4 h-4 text-blue-700" />;
      iconColor = 'bg-blue-100';
      textPrefix = 'New analysis complete:';
      break;
    default:
      icon = <CheckCircle className="w-4 h-4 text-gray-700" />;
      iconColor = 'bg-gray-100';
      textPrefix = 'Activity:';
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-full ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">
          {textPrefix} <span className="font-normal">{item.text}</span>
        </p>
        <p className="text-xs text-gray-500">{item.time_ago}</p>
      </div>
    </div>
  );
};


// --- Main Overview Component ---
const AdminOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await API.get('/admin/stats');
        setData(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load dashboard data.");
        console.error("Dashboard Error:", err);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  // --- Chart Configuration ---
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }, // Hide legend
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    },
    elements: {
      line: {
        tension: 0.4, // Make the line curvy
        borderColor: '#f79436', // Orange line
        borderWidth: 3,
      },
      point: {
        radius: 0, // Hide points
      },
    },
    // Add fill for area chart look
    datasets: {
      line: {
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(247, 148, 54, 0.4)'); // Lighter orange
          gradient.addColorStop(1, 'rgba(247, 148, 54, 0)'); // Transparent
          return gradient;
        },
        fill: 'start', // Fill area below line
      }
    }
  };

  const chartData = {
    labels: data?.growth_data?.labels || [],
    datasets: [
      {
        label: 'New Users',
        data: data?.growth_data?.data || [],
        // Styling is mostly handled in chartOptions.datasets.line
      },
    ],
  };

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!data) return <div className="p-6 text-center">No data available.</div>;

  return (
    <div className="p-6 min-h-full"> {/* Changed background */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={data.stats.total_users}
          change={data.stats.users_change}
          icon={<Users className="w-6 h-6 text-green-700" />}
          iconColor="bg-green-100"
        />
        <StatCard
          title="Solar Analyses"
          value={data.stats.total_analyses}
          change={data.stats.analyses_change}
          icon={<Sun className="w-6 h-6 text-yellow-700" />}
          iconColor="bg-yellow-100"
        />
        <StatCard
          title="CO₂ Saved (tons)"
          value={data.stats.co2_saved}
          change={data.stats.co2_change}
          icon={<Leaf className="w-6 h-6 text-blue-700" />}
          iconColor="bg-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-1">User Growth</h2>
          <p className="text-sm text-gray-500 mb-4">Last 30 Days</p>
          <div className="h-[300px] relative"> {/* Set height for chart */}
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <div className="space-y-5"> {/* Increased spacing */}
            {data.recent_activity.length > 0 ? (
              data.recent_activity.map((item, index) => (
                <ActivityItem key={index} item={item} />
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent activity.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;