import React from 'react';

const PrimaryButton = ({ children, onClick, type = 'button', className = '' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md ${className}`}

        >
            {children}
        </button>
    );
};

export default PrimaryButton;