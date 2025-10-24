import React from 'react';
import PrimaryButton from '../buttons/PrimaryButton';

const FinancerCard = ({ financer }) => {
    const handleClick = () => {
        window.open(financer.website, '_blank');
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer border border-gray-300 rounded-lg p-4 flex flex-col items-start hover:shadow-lg transition-shadow duration-200 text-left"
        >
            {/* Financer Logo */}
            <img src={financer.logo} alt={financer.name} className="h-16 mb-4" />

            {/* Financer Details */}
            <h3 className="text-lg font-semibold mb-2">{financer.name}</h3>

            {/* Financer Description */}
            <p className="text-gray-600 mb-2">{financer.description}</p>

            {/* Financer Location */}
            <span className="text-gray-500 mb-4">{financer.location}</span>

            {/* Contact Financer Button */}
            <PrimaryButton onClick={() => window.open(`tel:${financer.contact}`)}>
                Contact Financer
            </PrimaryButton>
        </div>
    );
};

export default FinancerCard;