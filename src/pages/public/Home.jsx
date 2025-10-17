// Public (unauthenticated) page
// Landing page for new visitors
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import IconButton from '../../components/buttons/IconButton';

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L8.12 5.12c-.67.21-1.3.53-1.88.97l-1.4-1.4c-1.1-1.1-2.87-.1-2.87 1.56v1.98c0 .8.4 1.55 1.08 2.03l1.4 1.4c-.44.58-.76 1.21-.97 1.88l-1.95.39c-1.56.38-1.56 2.6 0 2.98l1.95.39c.21.67.53 1.3.97 1.88l-1.4 1.4c-1.1 1.1-.1 2.87 1.56 2.87h1.98c.8 0 1.55-.4 2.03-1.08l1.4-1.4c.58.44 1.21.76 1.88.97l.39 1.95c.38 1.56 2.6 1.56 2.98 0l.39-1.95c.67-.21 1.3-.53 1.88-.97l1.4 1.4c1.1 1.1 2.87.1 2.87-1.56v-1.98c0-.8-.4-1.55-1.08-2.03l-1.4-1.4c.44-.58.76 1.21.97 1.88l1.95-.39c1.56-.38-1.56-2.6 0-2.98l-1.95-.39c-.21-.67-.53-1.3-.97-1.88l1.4-1.4c1.1-1.1.1-2.87-1.56-2.87h-1.98c-.8 0-1.55.4-2.03 1.08l-1.4 1.4c-.58-.44-1.21-.76-1.88-.97l-.39-1.95zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);

const Home = () => {
    return (
        <div className="app-container">
            <div className="home-container">
                <div className="header">
                    <Navbar />
                </div>
                <div className="body">

                    {/* Hero section */}
                    <div className="hero">
                        <img alt="Solar panels on a roof" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXEFYl5TbKlJDcMDZExuMHu9oaR5dfuOAd7ARZEyJho9bxVAZo57GIHmp9bI14HwQiIPnGULC1L2HhqhkjDWJ7xOjhs4jOer0lBlPZQMpfvBygBRnakBAlrKgeDhp2ABIe0YLq3KBbaeH8n6Clmx6BMf1jiKiyyJsYNxffuAyd0xlO8beuKsfRwu0vi0iThNfOyAwrlRgsQW9fT-SjP18IdOv4ky7XrjAKHyHIn35Te2s-0KMlbQG3oduwjED2b9Eg9ugV1gL2s3gc" />
                        <div class="absolute inset-0 bg-black/60"></div>
                        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
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
                    <div className="onboarding-steps">
                        <h2>Get Started in 3 Steps</h2>
                        <div className="steps-list">
                            <div className="step-item">
                                <img src="./step1-icon.png" alt="Step 1" />
                                <h3>1. Enter Your Address</h3>
                                <p>Provide your home or business address to begin the assessment.</p>
                            </div>
                            <div className="step-item">
                                <img src="./step2-icon.png" alt="Step 2" />
                                <h3>2. Analyze Your Roof</h3>
                                <p>Our AI analyzes your roof's size, orientation, and shading using satellite imagery.</p>
                            </div>
                            <div className="step-item">
                                <img src="./step3-icon.png" alt="Step 3" />
                                <h3>3. Get Your Report</h3>
                                <p>Receive a detailed report with solar suitability, cost estimates, and savings projections.</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="testimonials">
                        <h2>What Our Users Say</h2>
                        <div className="testimonials-list">
                            <div className="testimonial-item">
                                <p>"SolarMatch made it so easy to see if my roof was suitable for solar panels. The report was detailed and helped me make an informed decision."</p>
                                <span>- Jane D.</span>
                            </div>
                            <div className="testimonial-item">
                                <p>"I was amazed at how quickly I received my solar suitability report. The AI analysis was spot on!"</p>
                                <span>- Mark S.</span>
                            </div>
                            <div className="testimonial-item">
                                <p>"Thanks to SolarMatch, I was able to save money on my energy bills by installing solar panels. Highly recommend!"</p>
                                <span>- Aisha K.</span>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Counter*/}
                    <div className="statistics">
                        <div className="stat-item">
                            <h3>480+</h3>
                            <p>Homes Analyzed</p>
                        </div>
                        <div className="stat-item">
                            <h3>Kes. 10M+</h3>
                            <p>Energy Savings</p>
                        </div>
                        <div className="stat-item">
                            <h3>1,200+</h3>
                            <p>Metric Tons of CO₂ Saved</p>
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