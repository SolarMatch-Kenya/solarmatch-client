import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo-white.svg';

const Sidebar = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Overview', path: '/dashboard' },
        { name: 'New Analysis', path: '/analysis' },
        { name: 'My Reports', path: '/dashboard/reports' },
        { name: 'Find Installers', path: '/installers' },
        { name: 'Profile', path: '/dashboard/profile' },
    ];

    return (
        <div className="flex flex-col w-64 bg-gray-800 text-white min-h-screen">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <img src={Logo} alt="SolarMatch Logo" className="h-12" />
            </div>
            <nav className="flex-grow mt-6">
                <ul>
                    {navLinks.map(link => (
                        <li key={link.name}>
                            <Link 
                                to={link.path} 
                                className={`flex items-center px-6 py-3 text-base transition-colors duration-200 ${location.pathname === link.path ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;