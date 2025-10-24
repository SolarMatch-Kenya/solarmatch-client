import React from 'react';

const SecondaryButton = ({ children, onClick, type = 'button', className = '' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
<<<<<<< HEAD
            className={`bg-[#f79436] hover:bg-[#f79436]/90 text-white font-bold py-2 px-4 rounded-full transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md ${className}`}
=======
            className={`bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded-[10px] transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md ${className}`}
>>>>>>> 51071dbd530d41a7cf2c70497f45ebd0da689ba6
        >
            {children}
        </button>
    );
};

export default SecondaryButton;