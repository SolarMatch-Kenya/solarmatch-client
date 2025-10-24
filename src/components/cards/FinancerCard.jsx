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
<<<<<<< HEAD
            <PrimaryButton onClick={() => window.open(`tel:${financer.contact}`)}>
=======
            <a
                href={`tel:${financer.contact}`}
                className="bg-[#f79436] hover:bg-[#f79436]/90 text-white font-bold py-2 px-4 rounded-[10px] transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md inline-block mt-4"
            >
>>>>>>> 51071dbd530d41a7cf2c70497f45ebd0da689ba6
                Contact Financer
            </PrimaryButton>
        </div>
    );
};

export default FinancerCard;