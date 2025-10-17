// Public (unauthenticated) page
// About SolarMatch page
import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const About = () => {
    return (
        <div className="app-container">
            <div className="about-container">
                <div className="header">
                    <Navbar />
                </div>
                <div className="body">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <h1 className="h1 text-center mb-6">About SolarMatch</h1>
                        <p className="text-body mb-4">
                            SolarMatch Kenya is dedicated to helping homeowners and businesses transition to clean, renewable energy. Our platform leverages advanced AI technology to analyze your property's suitability for solar panel installation, providing you with accurate predictions on sunlight exposure, installation costs, energy savings, return on investment, and environmental impact.
                        </p>
                        <p className="text-body mb-4">
                            Our mission is to make solar energy accessible and affordable for everyone. We believe that by harnessing the power of AI, we can simplify the process of going solar and empower individuals to make informed decisions about their energy future.
                        </p>
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