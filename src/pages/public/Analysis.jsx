import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import AnalysisForm from '../../components/forms/AnalysisForm';

const Analysis = () => {
    return (
        <DashboardLayout>
            <div className="container mx-auto px-6 py-12 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Start a New Analysis</h1>
                <AnalysisForm />
            </div>
        </DashboardLayout>
    );
};

export default Analysis;
