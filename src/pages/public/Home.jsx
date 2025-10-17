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
                <div classname="header">
                    <Navbar />
                </div>
                <div className="body">
                    <div className="hero">
                        <img alt="Solar panels on a roof" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXEFYl5TbKlJDcMDZExuMHu9oaR5dfuOAd7ARZEyJho9bxVAZo57GIHmp9bI14HwQiIPnGULC1L2HhqhkjDWJ7xOjhs4jOer0lBlPZQMpfvBygBRnakBAlrKgeDhp2ABIe0YLq3KBbaeH8n6Clmx6BMf1jiKiyyJsYNxffuAyd0xlO8beuKsfRwu0vi0iThNfOyAwrlRgsQW9fT-SjP18IdOv4ky7XrjAKHyHIn35Te2s-0KMlbQG3oduwjED2b9Eg9ugV1gL2s3gc" />
                        <div class="absolute inset-0 bg-black/60"></div>
                        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                            <h1 className="h1 text-white tracking-tight">Find out if your home is perfect for solar — in just 3 minutes.</h1>
                            <p className="body mt-6 max-w-2xl mx-auto text-lg text-white/90">SolarMatch Kenya uses AI to analyze your roof or land for solar panel suitability, providing predictions on sunlight hours, installation cost, energy savings, ROI, and CO₂ reduction.</p>
                            <div className="mt-10 flex justify-center items-center gap-4">
                                <PrimaryButton>
                                    Check My Roof
                                </PrimaryButton>
                                <SecondaryButton>
                                    Learn More
                                </SecondaryButton>
                                <IconButton icon={<SettingsIcon />}>
                                    Settings
                                </IconButton>
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