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
                        <div className="container mx-auto px-8 relative text-center max-w-7xl">
                            <h1 className="text-4xl font-bold lg:text-5xl text-white tracking-tight">Find out if your home is perfect for solar — in just 3 minutes.</h1>
                            <p className="text-body mt-6 max-w-2xl mx-auto text-lg text-white/90">SolarMatch Kenya uses AI to analyze your roof or land for solar panel suitability, providing predictions on sunlight hours, installation cost, energy savings, ROI, and CO₂ reduction.</p>
                            <div className="mt-10 flex justify-center items-center gap-4">
                                <PrimaryButton>
                                    <Link to='/analysis-form'>Check My Roof</Link>
                                </PrimaryButton>
                                <SecondaryButton>
                                    Learn More
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-8 py-8 max-w-7xl">
                        {/* Onboarding steps */}
                        <div className="onboarding-steps py-20">
                            <h2 className="text-center h2">Get Started in 3 Steps</h2>
                            <div className="steps-list mt-10 flex flex-wrap justify-center gap-12">
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

                    {/* Testimonials */}
                    <div className="testimonials bg-green-50 py-20">
                        <div className="container mx-auto px-8 max-w-7xl">
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


{/* <div className="step-item text-center p-8 rounded-lg border border-orange-100">
                                    <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-100">
                                        <svg fill="currentColor" height="48" viewBox="0 0 256 256" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path></svg>
                                    </div>
                                    <h3 className="h3">1. Enter Your Address</h3>
                                    <p className="body">Provide your home or business address to begin the assessment.</p>
                                </div>
                                <div className="step-item text-center p-8 rounded-lg border border-orange-100">
                                    <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-100">
                                        <svg fill="currentColor" height="48" viewBox="0 0 256 256" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path></svg>
                                    </div>
                                    <h3 className="h3">2. Analyze Your Roof</h3>
                                    <p className="body">Our AI analyzes your roof's size, orientation, and shading using satellite imagery.</p>
                                </div>
                                <div className="step-item text-center p-8 rounded-lg border border-orange-100">
                                    <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-orange-100">
                                        <svg fill="currentColor" height="48" viewBox="0 0 256 256" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"></path></svg>
                                    </div>
                                    <h3 className="h3">3. Get Your Report</h3>
                                    <p className="body">Receive a detailed report with solar suitability, cost estimates, and savings projections.</p>
                                </div> */}