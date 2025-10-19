// Displays solar installer info with ratings/contact
import React from 'react';

const InstallerCard = ({ installer }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">

            {/* Installer Name */}
            <h3 className="text-xl font-semibold mb-2">{installer.name}</h3>

            {/* Installer Description */}
            <p className="text-gray-600 mb-4">{installer.description}</p>

            {/* Installer Logo */}
            <div className="flex items-center mb-4">
                <img src={installer.logo} alt={`${installer.name} logo`} className="h-12 w-12 mr-2" />

                {/* Installer Rating */}
                <span className="text-yellow-500 mr-2">⭐ {installer.rating}</span>

                {/* Installer Reviews */}
                <span className="text-gray-500">({installer.reviews} reviews)</span>
            </div>

            {/* Contact Installer Button */}
            <a
                href={`tel:${installer.contact}`}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md inline-block"
            >
                Contact Installer
            </a>
        </div>
    );
};

export default InstallerCard;