import React from 'react';
import { Link } from 'react-router-dom';

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
        className="h-6 w-6 text-white hover:text-secondary"
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
        className="h-6 w-6 text-white hover:text-secondary"
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
        className="h-6 w-6 text-white hover:text-secondary"
    >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const Footer = () => {
    return (
        <footer className="bg-[#133b04] text-white py-8 mt-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    {/* Logo */}
                    <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                        <div className="flex items-center mb-4">
                            <img src="./logo.png" alt="Logo" className="h-8" />
                            <span className="ml-3 text-xl font-bold">SolarMatch</span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0">
                        <nav className="mb-4 md:mb-0 md:mr-10">
                            <ul className="flex space-x-6">
                                <li>
                                    <Link to="/about" className="text-base font-normal text-white hover:text-secondary">About</Link>
                                </li>
                                <li>
                                    <Link to="/services" className="text-base font-normal text-white hover:text-secondary">Services</Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-base font-normal text-white hover:text-secondary">Contact</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center space-x-6">
                        <a href="#" className="text-white hover:text-secondary" aria-label="LinkedIn"><LinkedinIcon /></a>
                        <a href="#" className="text-white hover:text-secondary" aria-label="Instagram"><InstagramIcon /></a>
                        <a href="#" className="text-white hover:text-secondary" aria-label="X"><XIcon /></a>
                    </div>
                </div>

                {/* Legal Links and Copyright */}
                <div className="mt-8 pt-8 border-t border-white flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-sm font-light text-center md:text-left">&copy; {new Date().getFullYear()} SolarMatch. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="text-sm font-light text-white hover:text-secondary">Privacy Policy</Link>
                        <Link to="/terms" className="text-sm font-light text-white hover:text-secondary">Terms of Service</Link>
                        <Link to="/contact" className="text-sm font-light text-white hover:text-secondary">Contact Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;