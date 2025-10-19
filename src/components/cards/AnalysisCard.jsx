// Displays details of solar energy analyses
import React from 'react';

const AnalysisCard = ({ analysis }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            {/* Analysis Title */}
            <h3 className="text-xl font-semibold mb-2">{analysis.title}</h3>

            {/* Analysis Description */}
            <p className="text-gray-600 mb-4">{analysis.description}</p>

            {/* Suitability Score in percentage */}
            <div className="mb-4">
                <span className="text-gray-700 font-medium">Suitability Score: </span>
                <span className="text-green-600 font-bold">{analysis.suitabilityScore}%</span>
            </div>

            {/* Recommended System Size */}
            <div className="mb-4">
                <span className="text-gray-700 font-medium">Recommended System Size: </span>
                <span className="text-green-600 font-bold">{analysis.recommendedSystemSize} kW</span>
            </div>

            {/* Estimated Installation Cost */}
            <div className="mb-4">
                <span className="text-gray-700 font-medium">Estimated Installation Cost: </span>
                <span className="text-green-600 font-bold">${analysis.estimatedInstallationCost}</span>
            </div>

            {/* Estimated Annual Savings */}
            <div className="mb-4">
                <span className="text-gray-700 font-medium">Estimated Annual Savings: </span>
                <span className="text-green-600 font-bold">${analysis.estimatedAnnualSavings}</span>
            </div>

            {/* Estimated CO2 Emissions reduction in tons per year*/}
            <div>
                <span className="text-gray-700 font-medium">Estimated CO2 Emissions Reduction: </span>
                <span className="text-green-600 font-bold">{analysis.estimatedCO2Reduction} tons/year</span>
            </div>
        </div>
    );
}