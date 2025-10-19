// financer card with their logo and on click take them to their official site
import React from 'react';

const FinancerCard = ({ financer }) => {
    const handleClick = () => {
        window.open(financer.website, '_blank');
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer border border-gray-300 rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
        >
            {/* Financer Logo */}
            <img src={financer.logo} alt={financer.name} className="h-16 mb-4" />

            {/* Financer Details */}
            <h3 className="text-lg font-semibold">{financer.name}</h3>

            {/* Financer Description */}
            <p className="text-gray-600">{financer.description}</p>

            {/* Financer Location */}
            <span className="text-gray-500">{financer.location}</span>

            {/* Contact Financer Button */}
            <a
                href={`tel:${financer.contact}`}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md inline-block mt-4"
            >
                Contact Financer
            </a>
        </div>
    );
};

export default FinancerCard;