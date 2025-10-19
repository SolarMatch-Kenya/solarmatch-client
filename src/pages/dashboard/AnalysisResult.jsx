import React from 'react';

const AnalysisResult = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">AI Energy Analysis Results</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Optimal Panel Count:</h2>
        <p className="text-2xl text-green-600">25 panels</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Estimated Annual Production:</h2>
        <p className="text-2xl text-blue-600">15,000 kWh</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Projected Annual Savings:</h2>
        <p className="text-2xl text-purple-600">KSh 300,000</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Recommended System Size:</h2>
        <p className="text-2xl text-orange-600">10 kW</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Payback Period:</h2>
        <p className="text-2xl text-teal-600">5 years</p>
      </div>

      <p className="text-gray-600 mt-6">
        These results are based on advanced AI analysis of your property's sunlight exposure, energy consumption patterns, and local solar irradiance data.
      </p>
    </div>
  );
};

export default AnalysisResult;
