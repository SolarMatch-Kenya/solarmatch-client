import React from 'react';

const IconButton = ({ icon, children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out ${className}`}
    >
      {icon}
      {children}
    </button>
  );
};

export default IconButton;
