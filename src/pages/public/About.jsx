import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PrimaryButton from '../../components/buttons/PrimaryButton';

const About = () => {
    return (
        <div className="app-container">
            <div className="home-container">
                <div className="header">
                    <Navbar />
                </div>
                <div className="body">
                    {/* Hero Section */}
                    <div className="relative bg-primary text-white py-20 text-center">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="h1">About SolarMatch</h1>
                            <p className="text-lg mt-4 max-w-2xl mx-auto">Empowering a sustainable future through accessible solar energy.</p>
                        </div>
                    </div>

                    {/* Mission Section */}
                    <div className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="h2 text-primary">Our Mission</h2>
                            <p className="text-lg mt-6 max-w-3xl mx-auto text-gray-700">
                                At SolarMatch, our mission is to revolutionize access to solar energy in Kenya by providing accurate, AI-driven insights into solar panel suitability for homes and businesses. We aim to simplify the transition to renewable energy, making it affordable, efficient, and transparent for everyone.
                            </p>
                        </div>
                    </div>

                    {/* Values Section */}
                    <div className="py-20">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="h2 text-center text-primary">Our Values</h2>
                            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <h3 className="h3 text-primary">Innovation</h3>
                                    <p className="body mt-2 text-gray-600">Leveraging cutting-edge AI to provide precise and reliable solar analysis.</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <h3 className="h3 text-primary">Sustainability</h3>
                                    <p className="body mt-2 text-gray-600">Committed to promoting clean energy and reducing carbon footprints.</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <h3 className="h3 text-primary">Transparency</h3>
                                    <p className="body mt-2 text-gray-600">Offering clear, understandable reports and honest cost estimations.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="h2 text-primary">Meet the Team</h2>
                            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <img src="https://via.placeholder.com/150" alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                    <h3 className="h3">John Doe</h3>
                                    <p className="body text-gray-600">CEO & Founder</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <img src="https://via.placeholder.com/150" alt="Team Member 2" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                    <h3 className="h3">Jane Smith</h3>
                                    <p className="body text-gray-600">Lead AI Engineer</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <img src="https://via.placeholder.com/150" alt="Team Member 3" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                    <h3 className="h3">Peter Jones</h3>
                                    <p className="body text-gray-600">Head of Operations</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="relative bg-secondary text-white py-20 text-center">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="h2">Ready to go Solar?</h2>
                            <p className="text-lg mt-4 max-w-2xl mx-auto">Join the solar revolution today and start saving on your energy bills while contributing to a greener planet.</p>
                            <div className="mt-8">
                                <PrimaryButton>
                                    Get Your Free Solar Report
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default About;