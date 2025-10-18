import React from 'react';
import EnergyUsageChart from '../../components/charts/EnergyUsageChart';

const EnergyData = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Your Energy Data</h1>

      <p className="text-gray-700 mb-6">
        Here you can visualize your solar energy production against your household energy consumption.
        Understanding these trends helps you optimize your energy usage and maximize savings.
      </p>

      <div className="mb-8">
        <EnergyUsageChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Monthly Average Production:</h2>
          <p className="text-2xl text-green-600">1,250 kWh</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Monthly Average Consumption:</h2>
          <p className="text-2xl text-red-600">1,100 kWh</p>
        </div>
      </div>

      <p className="text-gray-600 mt-6">
        Data is updated daily. For detailed reports or to adjust your energy goals, please visit your profile settings.
      </p>
    </div>
  );
};

export default EnergyData;
