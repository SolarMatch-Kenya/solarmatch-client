import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Zap, Clock } from "lucide-react";
import Logo from '../../assets/logo-color.svg';

const AnalysisResult = () => {
  const analysisData = {
    optimalPanelCount: 25,
    annualProduction: 15000,
    annualSavings: 300000,
    systemSize: 10,
    paybackPeriod: 5,
  };

  return (
    <div className="app-container">
        <div className="header">
            <Navbar />
        </div>
        <div className="body">
            {/* Hero section */}
            <div className="hero relative bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(/src/assets/financing.jpg)' }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-8 py-30 mb-8 relative text-center max-w-7xl">
                    <img src={Logo} alt="SolarMatch Logo" className="h-24 mx-auto mb-8" />
                    <h1 className="text-4xl font-bold lg:text-5xl text-white tracking-tight">Your AI Energy Analysis Results</h1>
                    <p className="text-body mt-6 max-w-2xl mx-auto text-lg text-white/90">Here are the results of our AI-powered analysis of your property's solar potential. These results are based on advanced analysis of your property's sunlight exposure, energy consumption patterns, and local solar irradiance data.</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="bg-white shadow-lg rounded-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Optimal Panel Count</CardTitle>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{analysisData.optimalPanelCount} panels</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-lg rounded-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Estimated Annual Production</CardTitle>
                            <Zap className="h-5 w-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{analysisData.annualProduction.toLocaleString()} kWh</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-lg rounded-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Projected Annual Savings</CardTitle>
                            <TrendingUp className="h-5 w-5 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">KSh {analysisData.annualSavings.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-lg rounded-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Recommended System Size</CardTitle>
                            <Zap className="h-5 w-5 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{analysisData.systemSize} kW</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white shadow-lg rounded-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Payback Period</CardTitle>
                            <Clock className="h-5 w-5 text-teal-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{analysisData.paybackPeriod} years</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
        <div className="footer">
            <Footer />
        </div>
    </div>
  );
};

export default AnalysisResult;