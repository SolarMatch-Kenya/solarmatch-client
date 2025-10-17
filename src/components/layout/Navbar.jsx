import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../buttons/PrimaryButton";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-primary">
                            <img src="./logo.png" alt="Home" />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/about" className="body text-primary hover:text-secondary">
                            About
                        </Link>
                        <Link to="/services" className="body text-primary hover:text-secondary">
                            Services
                        </Link>
                        <Link to="/contact" className="body text-primary hover:text-secondary">
                            Contact
                        </Link>
                        <Link to="/login" className="body text-primary hover:text-secondary">
                            Login
                        </Link>
                    </div>

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
            </div>
        </nav>
    );
};

export default Navbar;