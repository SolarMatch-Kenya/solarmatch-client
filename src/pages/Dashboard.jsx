import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Zap, BarChart } from "lucide-react";
import EnergyUsageChart from "../components/charts/EnergyUsageChart";
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for now
  const stats = {
    totalSavings: 12500,
    co2Reduction: 2.5,
    analysesPerformed: 3,
  };

  const recentActivities = [
    { id: 1, description: "Completed analysis for rooftop in Nairobi", date: "2 days ago" },
    { id: 2, description: "Viewed report for analysis #1234", date: "3 days ago" },
    { id: 3, description: "Connected with 'GreenSolar Ltd' installer", date: "5 days ago" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, {user.full_name}!</h1>
        <p className="text-lg text-gray-600 mb-8">Here's a summary of your solar journey so far.</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Savings (KES)</CardTitle>
              <DollarSign className="h-5 w-5 text-[#f79436]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">KES {stats.totalSavings.toLocaleString()}</div>
              <p className="text-xs text-gray-500">+1,200 since last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">CO₂ Reduction (Tons)</CardTitle>
              <Zap className="h-5 w-5 text-[#f79436]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.co2Reduction}</div>
              <p className="text-xs text-gray-500">Equivalent to planting 15 trees</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Analyses Performed</CardTitle>
              <BarChart className="h-5 w-5 text-[#f79436]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.analysesPerformed}</div>
              <p className="text-xs text-gray-500">1 new analysis this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content: Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Energy Savings Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <EnergyUsageChart />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar: Quick Actions & Recent Activity */}
          <div>
            <Card className="mb-6 bg-white shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-3">
                <PrimaryButton className='w-full bg-[#f79436] text-white hover:bg-[#e68529]'>
                  <Link to='/analysis'>Start a New Analysis</Link>
                </PrimaryButton>
                <SecondaryButton className='w-full border border-gray-300 text-gray-700 hover:bg-gray-100'>
                  <Link to='/dashboard/reports'>View My Reports</Link>
                </SecondaryButton>
                <SecondaryButton className='w-full border border-gray-300 text-gray-700 hover:bg-gray-100'>
                  <Link to='/installers'>Find Installers</Link>
                </SecondaryButton>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivities.map(activity => (
                    <li key={activity.id} className="flex items-start">
                      <div className="flex-shrink-0 h-3 w-3 rounded-full bg-[#f79436] mt-1.5"></div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
