import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import OnboardingCard from "../../components/ui/OnboardingCard";
import HomeIcon from "../../assets/icons/home_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react";
import RoofIcon from "../../assets/icons/roofing_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react";
import ReportIcon from "../../assets/icons/analytics_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg?react";
import Counter from '../../components/ui/Counter'


const Home = () => {
    return (
        <div className="app-container">
            <div className="home-container">
                <div className="header">
                    <Navbar />
                </div>
                <div className="body">

                    {/* Hero section */}
                    <div className="hero relative bg-cover bg-center max-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCXEFYl5TbKlJDcMDZExuMHu9oaR5dfuOAd7ARZEyJho9bxVAZo57GIHmp9bI14HwQiIPnGULC1L2HhqhkjDWJ7xOjhs4jOer0lBlPZQMpfvBygBRnakBAlrKgeDhp2ABIe0YLq3KBbaeH8n6Clmx6BMf1jiKiyyJsYNxffuAyd0xlO8beuKsfRwu0vi0iThNfOyAwrlRgsQW9fT-SjP18IdOv4ky7XrjAKHyHIn35Te2s-0KMlbQG3oduwjED2b9Eg9ugV1gL2s3gc)' }}>
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="container mx-auto px-8 py-30 mb-8 relative text-center max-w-7xl">
                            <h1 className="text-4xl font-bold lg:text-5xl text-white tracking-tight">Find out if your home is perfect for solar — in just 3 minutes.</h1>
                            <p className="text-body mt-6 max-w-2xl mx-auto text-lg text-white/90">SolarMatch Kenya uses AI to analyze your roof or land for solar panel suitability, providing predictions on sunlight hours, installation cost, energy savings, ROI, and CO₂ reduction.</p>
                            <div className="mt-10 flex justify-center items-center gap-6">
                                <PrimaryButton className='bg-[#f79436] text-white'>
                                    <Link to='/analysis'>Check My Roof</Link>
                                </PrimaryButton>
                                <SecondaryButton className='border border-[#f79436]'>
                                    <Link to='/how-it-works'>Learn More</Link>
                                </SecondaryButton>
                            </div>
                        </div>
                        {/* Wavy bottom shape */}
                        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                           <svg
                             viewBox="0 0 500 150"
                             preserveAspectRatio="none"
                             className="w-full h-20 lg:h-24"
                           >
                               <path
                                 d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                                 style={{ stroke: "none", fill: "#fff" }}
                               ></path>
                           </svg>
                        </div>
                    </div>

                    <div className="container mx-auto px-6 py-4 max-w-7xl">
                        {/* Onboarding steps */}
                        <div className="onboarding-steps py-12">
                            <h2 className="text-center font-bold text-3xl pb-4">Get Started in 3 Simple Steps</h2>
                            <div className="steps-list mt-10 flex flex-wrap justify-center gap-14">
                                <OnboardingCard
                                 icon={<HomeIcon width={48} height={48} fill="#ff9966" />}
                                 heading="1. Enter Your Address"
                                 step="Provide your home or business address to begin the assessment."
                                />
                                <OnboardingCard
                                 icon={<RoofIcon width={48} height={48} fill="#ff9966" />}
                                 heading="2. Analyze Your Roof"
                                 step="Our AI analyzes your roof's size, orientation, and shading using satellite imagery."
                                />
                                <OnboardingCard
                                 icon={<ReportIcon width={48} height={48} fill="#ff9966" />}
                                 heading="3. Get Your Report"
                                 step="Receive a detailed report with solar suitability, cost estimates, and savings projections."
                                />
                            </div>
                        </div>

                        {/* Statistics Counter*/}
                        <div className="statistics py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="stat-item text-center">
                                <Counter target={480} suffix="+" />
                                <p className="text-lg text-gray-600">Homes Analyzed</p>
                            </div>
                            <div className="stat-item text-center">
                                <Counter target={10000000} suffix="+" />
                                <p className="text-lg text-gray-600">Kes. Energy Savings</p>
                            </div>
                            <div className="stat-item text-center">
                                <Counter target={1200} suffix="+" />
                                <p className="text-lg text-gray-600">Metric Tons of CO₂ Saved</p>
                            </div>
                        </div>

                    </div>

                    {/* Testimonials */}
                    <div className="testimonials bg-linear-to-b from-green-50 to-[#133b04] py-20">
                        <div className="container mx-auto px-8 max-w-7xl">
                            <h2 className="text-center font-bold text-3xl">What Our Users Say</h2>
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