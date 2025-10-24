import React from 'react';
import CO2ReductionChart from '../../components/charts/CO2ReductionChart';
import CostSavingsChart from '../../components/charts/CostSavingsChart';
import EnergyUsageChart from '../../components/charts/EnergyUsageChart';
import SunlightScoreChart from '../../components/charts/SunlightScoreChart';

const Overview = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Energy Produced</h2>
          <p className="text-3xl font-bold text-green-600">12,345 kWh</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Total Savings</h2>
          <p className="text-3xl font-bold text-blue-600">KSh 250,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">CO2 Reduced</h2>
          <p className="text-3xl font-bold text-purple-600">5,678 kg</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EnergyUsageChart />
        <CostSavingsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CO2ReductionChart />
        <SunlightScoreChart />
      </div>
    </div>
  );
};

export default Overview;
