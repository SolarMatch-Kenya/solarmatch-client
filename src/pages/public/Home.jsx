import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';

const Home = () => {
    return (
        <div className="app-container">
            <div className="home-container">
                <div className="header">
                    <Navbar />
                </div>
                <div className="body">

                    {/* Hero section */}
                    <div className="hero relative bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCXEFYl5TbKlJDcMDZExuMHu9oaR5dfuOAd7ARZEyJho9bxVAZo57GIHmp9bI14HwQiIPnGULC1L2HhqhkjDWJ7xOjhs4jOer0lBlPZQMpfvBygBRnakBAlrKgeDhp2ABIe0YLq3KBbaeH8n6Clmx6BMf1jiKiyyJsYNxffuAyd0xlO8beuKsfRwu0vi0iThNfOyAwrlRgsQW9fT-SjP18IdOv4ky7XrjAKHyHIn35Te2s-0KMlbQG3oduwjED2b9Eg9ugV1gL2s3gc)' }}>
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                            <h1 className="h1 text-white tracking-tight">Find out if your home is perfect for solar — in just 3 minutes.</h1>
                            <p className="text-body mt-6 max-w-2xl mx-auto text-lg text-white/90">SolarMatch Kenya uses AI to analyze your roof or land for solar panel suitability, providing predictions on sunlight hours, installation cost, energy savings, ROI, and CO₂ reduction.</p>
                            <div className="mt-10 flex justify-center items-center gap-4">
                                <PrimaryButton>
                                    Check My Roof
                                </PrimaryButton>
                                <SecondaryButton>
                                    Learn More
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>

                    {/* Onboarding steps */}
                    <div className="onboarding-steps py-20">
                        <h2 className="text-center h2">Get Started in 3 Steps</h2>
                        <div className="steps-list mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="step-item text-center">
                                <img src="./step1-icon.png" alt="Step 1" className="w-24 h-24 mx-auto mb-4" />
                                <h3 className="h3">1. Enter Your Address</h3>
                                <p className="body">Provide your home or business address to begin the assessment.</p>
                            </div>
                            <div className="step-item text-center">
                                <img src="./step2-icon.png" alt="Step 2" className="w-24 h-24 mx-auto mb-4" />
                                <h3 className="h3">2. Analyze Your Roof</h3>
                                <p className="body">Our AI analyzes your roof's size, orientation, and shading using satellite imagery.</p>
                            </div>
                            <div className="step-item text-center">
                                <img src="./step3-icon.png" alt="Step 3" className="w-24 h-24 mx-auto mb-4" />
                                <h3 className="h3">3. Get Your Report</h3>
                                <p className="body">Receive a detailed report with solar suitability, cost estimates, and savings projections.</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="testimonials bg-gray-100 py-20">
                        <h2 className="text-center h2">What Our Users Say</h2>
                        <div className="testimonials-list mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="testimonial-item bg-white p-8 rounded-lg">
                                <p className="body">"SolarMatch made it so easy to see if my roof was suitable for solar panels. The report was detailed and helped me make an informed decision."</p>
                                <span className="font-bold mt-4">- Jane D.</span>
                            </div>
                            <div className="testimonial-item bg-white p-8 rounded-lg">
                                <p className="body">"I was amazed at how quickly I received my solar suitability report. The AI analysis was spot on!"</p>
                                <span className="font-bold mt-4">- Mark S.</span>
                            </div>
                            <div className="testimonial-item bg-white p-8 rounded-lg">
                                <p className="body">"Thanks to SolarMatch, I was able to save money on my energy bills by installing solar panels. Highly recommend!"</p>
                                <span className="font-bold mt-4">- Aisha K.</span>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Counter*/}
                    <div className="statistics py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="stat-item text-center">
                            <h3 className="text-4xl font-bold text-primary">480+</h3>
                            <p className="text-lg text-gray-600">Homes Analyzed</p>
                        </div>
                        <div className="stat-item text-center">
                            <h3 className="text-4xl font-bold text-primary">Kes. 10M+</h3>
                            <p className="text-lg text-gray-600">Energy Savings</p>
                        </div>
                        <div className="stat-item text-center">
                            <h3 className="text-4xl font-bold text-primary">1,200+</h3>
                            <p className="text-lg text-gray-600">Metric Tons of CO₂ Saved</p>
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

export default Home;