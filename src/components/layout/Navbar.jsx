import React, { useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md relative z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center justify-between h-32">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-xl font-bold text-primary space-x-2">
                            <img src="./public/android-chrome-192x192.png" alt="Home" className="h-24" />
                            <span className="text-3xl font-bold">SolarMatch</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/about" className="body text-primary hover:text-secondary uppercase font-bold hover:underline">
                            About
                        </Link>
                        <Link to="/services" className="body text-primary hover:text-secondary uppercase font-bold hover:underline">
                            Services
                        </Link>
                        <Link to="/contact" className="body text-primary hover:text-secondary uppercase font-bold hover:underline">
                            Contact
                        </Link>
                        <Link to="/login" className="body text-primary hover:text-secondary uppercase font-bold hover:underline">
                            Login
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {/* Get Started button */}
                        <div>
                            <PrimaryButton>
                                <Link to="/get-started">Get Started</Link>
                            </PrimaryButton>
                        </div>
                        {/* User profile dropdown*/}
                        <div className="relative">
                            <button className="flex items-center text-primary hover:text-secondary focus:outline-none">
                                <img src="./user-avatar.png" alt="User Avatar" className="w-8 h-8 rounded-full" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="text-primary focus:outline-none">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed top-0 right-0 bottom-0 w-1/2 bg-white/90 z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleMobileMenu} className="text-primary focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col items-center space-y-6 mt-8">
                    <Link to="/about" className="body text-primary hover:text-secondary uppercase font-bold hover:underline" onClick={toggleMobileMenu}>
                        About
                    </Link>
                    <Link to="/services" className="body text-primary hover:text-secondary uppercase font-bold hover:underline" onClick={toggleMobileMenu}>
                        Services
                    </Link>
                    <Link to="/contact" className="body text-primary hover:text-secondary uppercase font-bold hover:underline" onClick={toggleMobileMenu}>
                        Contact
                    </Link>
                    <Link to="/login" className="body text-primary hover:text-secondary uppercase font-bold hover:underline" onClick={toggleMobileMenu}>
                        Login
                    </Link>
                    <PrimaryButton>
                        <Link to="/get-started" onClick={toggleMobileMenu}>Get Started</Link>
                    </PrimaryButton>
                    <div className="relative">
                        <button className="flex items-center text-primary hover:text-secondary focus:outline-none" onClick={toggleMobileMenu}>
                            <img src="./user-avatar.png" alt="User Avatar" className="w-8 h-8 rounded-full" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;