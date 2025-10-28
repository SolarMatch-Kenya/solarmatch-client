import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import logoSrc from '../../assets/logo-color.svg';

// Icons
const LoginIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
);

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, token, logout } = useAuth(); // Get user and token
    const isLoggedIn = !!(user && token);
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
        setIsDropdownOpen(false); // Close dropdown on logout
        navigate("/login");
    };

    // --- Helper to get initials (same as sidebar) ---
    const getInitials = (name = "") => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        } else if (names.length === 1 && names[0].length > 0) {
            return names[0][0].toUpperCase();
        }
        return 'U'; // Default User
    };
    // --- End Helper ---

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

    // Determine correct dashboard path based on role
    let dashboardPath = '/dashboard'; // Default for customer
    if (user?.role === 'admin') {
        dashboardPath = '/admin-dashboard';
    } else if (user?.role === 'installer') {
        dashboardPath = '/installer-dashboard';
    }
    // Determine correct profile path (assuming profile is nested for all roles)
    let profilePath = '/dashboard/profile'; // Default for customer
    if (user?.role === 'admin') {
        // Assuming admin profile is at /admin-dashboard/profile, adjust if needed
        profilePath = '/admin-dashboard/profile';
    } else if (user?.role === 'installer') {
        // Assuming installer profile is at /installer-dashboard/profile, adjust if needed
        profilePath = '/installer-dashboard/profile';
    }


    return (
        <nav className="bg-white shadow-md relative z-50 px-[100px]">
            <div className="w-full px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center justify-between h-24">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-xl font-bold text-[#006800] space-x-2">
                            <img src={logoSrc} alt="Logo" className="h-20" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {/* ... your nav links ... */}
                        <Link to="/" className="flex items-center ...">Home</Link>
                        <Link to="/about" className="flex items-center ...">About</Link>
                        <Link to="/how-it-works" className="flex items-center ...">How It Works</Link>
                        <Link to="/financing" className="flex items-center ...">Financing</Link>
                        <Link to="/contact" className="flex items-center ...">Contact</Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Get Started button (only if not logged in?) */}
                        {!isLoggedIn && (
                            <div>
                                <PrimaryButton className="bg-[#f79436] text-white">
                                    <Link to="/register">Get Started</Link>
                                </PrimaryButton>
                            </div>
                        )}

                        {/* User profile dropdown or Login button */}
                        {isLoggedIn ? (
                            <div className="relative" ref={dropdownRef}>
                                {/* --- START: Initials Circle Button --- */}
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f79436] rounded-[10px] p-1 hover:bg-gray-100 transition-colors" // Added padding and hover
                                >
                                    {/* Initials Circle */}
                                    <div className="w-8 h-8 rounded-full bg-gray-200 border border-[#f79436] flex items-center justify-center font-semibold text-gray-600">
                                        {getInitials(user.full_name)}
                                    </div>
                                    {/* User Email */}
                                    <span className="text-sm text-gray-700 font-medium hidden sm:block truncate max-w-[150px]"> {/* Hide on very small screens, truncate */}
                                        {user.email}
                                    </span>
                                </button>
                                {/* --- END: Initials Circle Button --- */}

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                        {/* Link to appropriate profile */}
                                        <Link
                                            to={profilePath}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                                        >
                                            Profile
                                        </Link>
                                         {/* Link to appropriate Dashboard */}
                                        <Link
                                            to={dashboardPath}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50" // Logout styled differently
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center text-base font-normal text-[#006800] hover:text-[#f79436] p-2 relative after:absolute ...">
                                <LoginIcon /> Log in
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="lg:hidden flex items-center">
                        {/* ... (hamburger button remains the same) ... */}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed top-0 right-0 bottom-0 w-1/2 bg-white/90 z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
                {/* ... (mobile menu content remains the same, but ensure profile/logout links work) ... */}
                <div className="flex justify-end p-4"> {/* Close button */} </div>
                <div className="flex flex-col items-center space-y-6 mt-8">
                    {/* ... mobile nav links ... */}
                    {isLoggedIn ? (
                        <>
                            <Link to={profilePath} className="..." onClick={toggleMobileMenu}>Profile</Link>
                            <Link to={dashboardPath} className="..." onClick={toggleMobileMenu}>Dashboard</Link>
                            <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="...">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="..." onClick={toggleMobileMenu}>
                            <LoginIcon /> Log in
                        </Link>
                    )}
                    {!isLoggedIn && (
                        <PrimaryButton>
                            <Link to="/register" onClick={toggleMobileMenu}>Get Started</Link>
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;