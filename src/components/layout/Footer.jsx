import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-tertiary-green text-white py-6 mt-10">
            
            {/* Logo and Links */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center">
                    <img src="./logo.png" alt="Logo" className="h-8" />
                    <nav className="ml-10">
                        <ul className="flex space-x-4">
                            <li>
                                <Link to="/about" className="body text-white hover:text-secondary">About</Link>
                            </li>
                            <li>
                                <Link to="/services" className="body text-white hover:text-secondary">Services</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="body text-white hover:text-secondary">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex justify-center space-x-6">
                <a href="https://facebook.com" className="text-white hover:text-secondary" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://linkedin.com" className="text-white hover:text-secondary" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://instagram.com" className="text-white hover:text-secondary" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                </a>
            </div> 

            {/* Copyright and Links */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="small">&copy; {new Date().getFullYear()} SolarMatch. All rights reserved.</p>
                <div className="mt-2 space-x-4">
                    <Link to="/privacy" className="small text-white hover:text-secondary">Privacy Policy</Link>
                    <Link to="/terms" className="small text-white hover:text-secondary">Terms of Service</Link>
                    <Link to="/contact" className="small text-white hover:text-secondary">Contact Us</Link>
                </div>
            </div>
        </footer>
    );
}
export default Footer;