import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isLoggedIn, logout, user } = useAuth();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link to="/about" className="body text-primary font-bold hover:text-secondary p-2 link-underline">
                            About
                        </Link>
                        <Link to="/how-it-works" className="body text-primary font-bold hover:text-secondary p-2 link-underline">
                            How It Works
                        </Link>
                        <Link to="/contact" className="body text-primary font-bold hover:text-secondary p-2 link-underline">
                            Contact
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Get Started button */}
                        <div>
                            <PrimaryButton>
                                <Link to="/get-started">Get Started</Link>
                            </PrimaryButton>
                        </div>
                        {/* User profile dropdown or Login button */}
                        {isLoggedIn ? (
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={toggleDropdown} className="flex items-center text-primary hover:text-secondary focus:outline-none">
                                    <img src={user?.profilePicture || "./user-avatar.png"} alt="User Avatar" className="w-8 h-8 rounded-full" />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                                            Profile
                                        </Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="body text-primary hover:text-secondary p-2 link-underline">
                                Log in
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="text-primary focus:outline-none">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed top-0 right-0 bottom-0 w-1/2 bg-white/90 z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleMobileMenu} className="text-primary focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col items-center space-y-6 mt-8">
                    <Link to="/about" className="body text-primary hover:text-secondary py-5 link-underline" onClick={toggleMobileMenu}>
                        About
                    </Link>
                    <Link to="/how-it-works" className="body text-primary hover:text-secondary py-5 link-underline" onClick={toggleMobileMenu}>
                        How It Works
                    </Link>
                    <Link to="/contact" className="body text-primary hover:text-secondary py-5 link-underline" onClick={toggleMobileMenu}>
                        Contact
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="body text-primary hover:text-secondary py-5 link-underline" onClick={toggleMobileMenu}>
                                Profile
                            </Link>
                            <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="body text-primary hover:text-secondary py-5 link-underline">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="body text-primary hover:text-secondary py-5 link-underline" onClick={toggleMobileMenu}>
                            Log in
                        </Link>
                    )}
                    <PrimaryButton>
                        <Link to="/get-started" onClick={toggleMobileMenu}>Get Started</Link>
                    </PrimaryButton>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;