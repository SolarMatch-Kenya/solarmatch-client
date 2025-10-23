import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import { useAuth } from "../../context/AuthContext";

// Icons
const LoginIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
);

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
        <nav className="bg-white shadow-md relative z-50 px-[100px]">
            <div className="w-full px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center justify-between h-24">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-xl font-bold text-[#006800] space-x-2">
                            <img src="src/assets/logo-color.svg" alt="Logo" className="h-20" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link to="/" className="flex items-center text-base font-bold text-[#006800] hover:text-[#f79436] p-2 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#f79436] after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-left hover:after:scale-x-100">
                            Home
                        </Link>
                        <Link to="/about" className="flex items-center text-base font-bold text-[#006800] hover:text-[#f79436] p-2 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#f79436] after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-left hover:after:scale-x-100">
                            About
                        </Link>
                        <Link to="/how-it-works" className="flex items-center text-base font-bold text-[#006800] hover:text-[#f79436] p-2 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#f79436] after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-left hover:after:scale-x-100">
                            How It Works
                        </Link>
                        <Link to="/financing" className="flex items-center text-base font-bold text-[#006800] hover:text-[#f79436] p-2 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#f79436] after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-left hover:after:scale-x-100">
                            Financing
                        </Link>
                        <Link to="/contact" className="flex items-center text-base font-bold text-[#006800] hover:text-[#f79436] p-2 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#f79436] after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-left hover:after:scale-x-100">
                            Contact
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Get Started button */}
                        <div>
                            <PrimaryButton className="bg-[#f79436] text-white">
                                <Link to="/register">Get Started</Link>
                            </PrimaryButton>
                        </div>
                        {/* User profile dropdown or Login button */}
                        {isLoggedIn ? (
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={toggleDropdown} className="flex items-center text-[#006800] hover:text-[#f79436] focus:outline-none">
                                    <img src={user?.profilePicture || "./user-avatar.png"} alt="User Avatar" className="w-8 h-8 rounded-full" />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                        <Link to="/profile" className="flex items-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(false)}>
                                            Profile
                                        </Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center text-base font-normal text-[#006800] hover:text-[#f79436] p-2 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#f79436] after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-left hover:after:scale-x-100">
                                <LoginIcon /> Log in
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="text-[#006800] focus:outline-none">
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
                    <button onClick={toggleMobileMenu} className="text-[#006800] focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col items-center space-y-6 mt-8">
                    <Link to="/about" className="flex items-center text-base font-normal text-[#006800] hover:text-[#f79436] py-5 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#f79436] after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-left hover:after:scale-x-100" onClick={toggleMobileMenu}>
                        About
                    </Link>
                    <Link to="/how-it-works" className="flex items-center text-base font-normal text-[#006800] hover:text-[#f79436] py-5 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#f79436] after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-left hover:after:scale-x-100" onClick={toggleMobileMenu}>
                        How It Works
                    </Link>
                    <Link to="/contact" className="flex items-center text-base font-normal text-[#006800] hover:text-[#f79436] py-5 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#f79436] after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-left hover:after:scale-x-100" onClick={toggleMobileMenu}>
                        Contact
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="flex items-center text-base font-normal text-[#006800] hover:text-[#f79436] py-5 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#f79436] after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-left hover:after:scale-x-100" onClick={toggleMobileMenu}>
                                Profile
                            </Link>
                            <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="flex items-center text-base font-normal text-[#006800] hover:text-[#f79436] py-5 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#f79436] after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-left hover:after:scale-x-100" onClick={toggleMobileMenu}>
                            <LoginIcon /> Log in
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