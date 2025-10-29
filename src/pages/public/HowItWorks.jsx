import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import bg from '/assets/financing.jpg'

// Icons for the steps
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#006800] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const AiAnalysisIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#006800] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
);

const ReportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#006800] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const ConnectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#006800] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const HowItWorks = () => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="body">
                {/* Hero Section */}
                <div
                    className="relative bg-cover bg-center min-h-[50vh] flex items-center justify-center"
                    style={{ backgroundImage: `url(${bg})` }}
                >
                    <div className="absolute inset-0 bg-black opacity-70"></div>
                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-white text-4xl font-bold lg:text-5xl text-center">How SolarMatch Works</h1>
                        <p className="text-white text-lg mt-4 max-w-2xl mx-auto text-center">Discover the simple steps to unlock your home's solar potential and contribute to a greener Kenya.</p>
                    </div>
                </div>

                {/* Steps Section */}
                <div className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold lg:text-4xl text-center text-[#006800] mb-12">Our Simple Process</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="p-6 bg-white rounded-lg shadow-md text-center">
                                <LocationIcon />
                                <h3 className="text-xl font-semibold text-[#006800] mb-2">1. Enter Your Location</h3>
                                <p className="text-base text-gray-700">Provide your home or business address. Our system uses advanced mapping to pinpoint your exact location and roof characteristics.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg shadow-md text-center">
                                <AiAnalysisIcon />
                                <h3 className="text-xl font-semibold text-[#006800] mb-2">2. AI-Powered Analysis</h3>
                                <p className="text-base text-gray-700">Our AI analyzes your roof's size, orientation, tilt, and shading from surrounding objects to determine its solar suitability.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg shadow-md text-center">
                                <ReportIcon />
                                <h3 className="text-xl font-semibold text-[#006800] mb-2">3. Receive Your Report</h3>
                                <p className="text-base text-gray-700">Get a comprehensive report detailing estimated solar production, installation costs, potential savings, and environmental impact.</p>
                            </div>
                            <div className="p-6 bg-white rounded-lg shadow-md text-center">
                                <ConnectIcon />
                                <h3 className="text-xl font-semibold text-[#006800] mb-2">4. Connect & Finance</h3>
                                <p className="text-base text-gray-700">Optionally, connect with certified local installers and explore green financing options tailored to your needs.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="relative bg-green-50 text-white py-20 text-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold lg:text-4xl mb-4 text-[#006800]">Ready to Start Your Solar Journey?</h2>
                        <p className="text-lg mt-4 max-w-2xl mx-auto text-[#006800]">Get your personalized solar report today and take the first step towards energy independence.</p>
                        <div className="mt-8">
                            <PrimaryButton className='bg-[#f79436] text-white'>
                                Get Your Free Solar Report
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HowItWorks;