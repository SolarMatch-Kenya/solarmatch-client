import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PrimaryButton from '../../components/buttons/PrimaryButton';

const LinkedinIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-tertiary-brown hover:text-secondary"
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const InstagramIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-tertiary-brown hover:text-secondary"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const XIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-tertiary-brown hover:text-secondary"
    >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const InnovationIcon = () => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto text-[#006800]"
    >
        <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2ZM12 16C11.45 16 11 15.55 11 15V14H13V15C13 15.55 12.55 16 12 16ZM12 4C14.76 4 17 6.24 17 9C17 10.54 16.37 11.94 15.32 12.95L14.5 13.5V16H9.5V13.5L8.68 12.95C7.63 11.94 7 10.54 7 9C7 6.24 9.24 4 12 4Z" fill="currentColor" />
        <path d="M10 20H14V22H10V20Z" fill="currentColor" />
    </svg>
);

const SustainabilityIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        fill="currentColor"
        className="bi bi-leaf mx-auto text-[#006800]"
        viewBox="0 0 16 16"
    >
        <path d="M1.4 1.7c.216.289.65.84 1.725 1.274 1.093.44 2.884.774 5.834.528l.37-.023c1.823-.06 3.117.598 3.956 1.579C14.16 6.082 14.5 7.41 14.5 8.5c0 .58-.032 1.285-.229 1.997q.198.248.382.54c.756 1.2 1.19 2.563 1.348 3.966a1 1 0 0 1-1.98.198c-.13-.97-.397-1.913-.868-2.77C12.173 13.386 10.565 14 8 14c-1.854 0-3.32-.544-4.45-1.435-1.125-.887-1.89-2.095-2.391-3.383C.16 6.62.16 3.646.509 1.902L.73.806zm-.05 1.39c-.146 1.609-.008 3.809.74 5.728.457 1.17 1.13 2.213 2.079 2.961.942.744 2.185 1.22 3.83 1.221 2.588 0 3.91-.66 4.609-1.445-1.789-2.46-4.121-1.213-6.342-2.68-.74-.488-1.735-1.323-1.844-2.308-.023-.214.237-.274.38-.112 1.4 1.6 3.573 1.757 5.59 2.045 1.227.215 2.21.526 3.033 1.158.058-.39.075-.782.075-1.158 0-.91-.288-1.988-.975-2.792-.626-.732-1.622-1.281-3.167-1.229l-.316.02c-3.05.253-5.01-.08-6.291-.598a5.3 5.3 0 0 1-1.4-.811" />
    </svg>
);

const TransparencyIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        fill="currentColor"
        className="bi bi-eye mx-auto text-[#006800]"
        viewBox="0 0 16 16"
    >
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
    </svg>
);

const About = () => {
    return (
        <div className="app-container">
            <div className="home-container">
                <div className="header">
                    <Navbar />
                </div>
                <div className="body">
                    {/* Hero Section */}
                    <div
                        className="relative bg-cover bg-center text-white py-20 text-center min-h-[400px]"
                        style={{ backgroundImage: "url('/hero-background.jpg')" }}
                    >
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-4xl font-bold lg:text-5xl">About SolarMatch</h1>
                            <p className="text-lg mt-4 max-w-2xl mx-auto">Empowering a sustainable future through accessible solar energy.</p>
                        </div>
                    </div>

                    {/* Mission Section */}
                    <div className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="h2 text-[#006800]">Our Mission</h2>
                            <p className="text-lg mt-6 max-w-3xl mx-auto text-gray-700">
                                At SolarMatch, our mission is to revolutionize access to solar energy in Kenya by providing accurate, AI-driven insights into solar panel suitability for homes and businesses. We aim to simplify the transition to renewable energy, making it affordable, efficient, and transparent for everyone.
                            </p>
                        </div>
                    </div>

                    {/* Values Section */}
                    <div className="py-20">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="h2 text-center text-[#006800]">Our Values</h2>
                            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <InnovationIcon />
                                    <h3 className="h3 text-[#006800] mt-4">Innovation</h3>
                                    <p className="body mt-2 text-gray-600">Leveraging cutting-edge AI to provide precise and reliable solar analysis.</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <SustainabilityIcon />
                                    <h3 className="h3 text-[#006800] mt-4">Sustainability</h3>
                                    <p className="body mt-2 text-gray-600">Committed to promoting clean energy and reducing carbon footprints.</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <TransparencyIcon />
                                    <h3 className="h3 text-[#006800] mt-4">Transparency</h3>
                                    <p className="body mt-2 text-gray-600">Offering clear, understandable reports and honest cost estimations.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="py-20 bg-gray-50">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="h2 text-[#006800]">Meet the Team</h2>
                            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <img src="https://via.placeholder.com/150" alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                    <h3 className="h3">Jaymo Kariuki</h3>
                                    <p className="body text-gray-600">Team Lead</p>
                                    <div className="mt-4 flex justify-center space-x-4">
                                        <a href="#"><LinkedinIcon /></a>
                                        <a href="#"><InstagramIcon /></a>
                                        <a href="#"><XIcon /></a>
                                    </div>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <img src="https://via.placeholder.com/150" alt="Team Member 2" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                    <h3 className="h3">Trish Njuguna</h3>
                                    <p className="body text-gray-600">Lead AI Engineer</p>
                                    <div className="mt-4 flex justify-center space-x-4">
                                        <a href="#"><LinkedinIcon /></a>
                                        <a href="#"><InstagramIcon /></a>
                                        <a href="#"><XIcon /></a>
                                    </div>
                                </div>
                                <div className="p-6 bg-white rounded-lg shadow-md">
                                    <img src="https://via.placeholder.com/150" alt="Team Member 3" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                    <h3 className="h3">Ayub Foks</h3>
                                    <p className="body text-gray-600">Lead Software Engineer</p>
                                    <div className="mt-4 flex justify-center space-x-4">
                                        <a href="#"><LinkedinIcon /></a>
                                        <a href="#"><InstagramIcon /></a>
                                        <a href="#"><XIcon /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Connect with us Section */}
                    <div className="py-20">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="h2 text-[#006800]">Connect with us</h2>
                            <p className="text-lg mt-6 max-w-3xl mx-auto text-gray-700">
                                Follow us on social media to stay updated with the latest news and announcements.
                            </p>
                            <div className="mt-8 flex justify-center space-x-6">
                                <a href="#" className="text-gray-600 hover:text-gray-900"><LinkedinIcon /></a>
                                <a href="#" className="text-gray-600 hover:text-gray-900"><InstagramIcon /></a>
                                <a href="#" className="text-gray-600 hover:text-gray-900"><XIcon /></a>
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