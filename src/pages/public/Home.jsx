// Public (unauthenticated) page
// Landing page for new visitors
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';


const Home = () => {
    return (
        <div className="app-container">
            <div className="home-container">
                <div classname="header">
                    <Navbar />
                </div>
                <div className="body">
                    <div className="hero">
                        <img alt="Solar panels on a roof" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXEFYl5TbKlJDcMDZExuMHu9oaR5dfuOAd7ARZEyJho9bxVAZo57GIHmp9bI14HwQiIPnGULC1L2HhqhkjDWJ7xOjhs4jOer0lBlPZQMpfvBygBRnakBAlrKgeDhp2ABIe0YLq3KBbaeH8n6Clmx6BMf1jiKiyyJsYNxffuAyd0xlO8beuKsfRwu0vi0iThNfOyAwrlRgsQW9fT-SjP18IdOv4ky7XrjAKHyHIn35Te2s-0KMlbQG3oduwjED2b9Eg9ugV1gL2s3gc" />
                        <div class="absolute inset-0 bg-black/60"></div>
                        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">Find out if your home is perfect for solar — in just 3 minutes.</h1>
                            <p class="mt-6 max-w-2xl mx-auto text-lg text-white/90">SolarMatch Kenya uses AI to analyze your roof or land for solar panel suitability, providing predictions on sunlight hours, installation cost, energy savings, ROI, and CO₂ reduction.</p>
                            <div class="mt-10">
                                <a class="inline-flex items-center justify-center rounded-full h-12 px-8 bg-primary text-background-dark text-base font-bold shadow-lg hover:bg-primary/90 transition-transform duration-200 transform hover:scale-105" href="#">
                                    Check My Roof
                                </a>
                            </div>
                        </div>

                    </div>

                    <div className="onboarding-steps">

                    </div>
                    <div className="testimonials">

                    </div>
                    <div className="statistics">

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