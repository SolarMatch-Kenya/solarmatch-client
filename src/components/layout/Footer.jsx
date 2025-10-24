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
        <footer className="bg-[#133b04] text-white py-8 px-[100px]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    {/* Logo */}
                    <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                        <img src="src/assets/logo-white.svg" alt="Logo" className="h-24" />
                    </div>

                    {/* Navigation Links and Copyright */}
                    <div className="flex-col md:flex-row md:items-center justify-center space-y-2">
                        <div className="flex space-x-10 align-center justify-center mb-4 md:mb-2">
                            <Link to="/privacy" className="text-sm font-light text-white hover:text-secondary">Privacy Policy</Link>
                            <Link to="/terms" className="text-sm font-light text-white hover:text-secondary">Terms of Service</Link>
                            <Link to="/contact" className="text-sm font-light text-white hover:text-secondary">Contact Us</Link>
                        </div>
                        <div>
                            <p className="text-sm font-light text-center md:text-center border-t opacity-50 border-white pt-2 px-10">&copy; {new Date().getFullYear()} SolarMatch.  |  All rights reserved.</p>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center space-x-6">
                        <a href="#" className="text-white hover:text-secondary" aria-label="LinkedIn"><LinkedinIcon /></a>
                        <a href="#" className="text-white hover:text-secondary" aria-label="Instagram"><InstagramIcon /></a>
                        <a href="#" className="text-white hover:text-secondary" aria-label="X"><XIcon /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;