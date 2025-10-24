import React from 'react';

const ARView = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">Augmented Reality Roof Preview</h1>
      <p className="text-gray-600 text-lg mb-8 text-center">
        This page will display an interactive Augmented Reality (AR) view of solar panel placement on your roof.
        Please ensure your device supports AR features for the best experience.
      </p>
      <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xl">
        [AR Content Placeholder]
      </div>
      <p className="text-gray-500 mt-4 text-sm">
        (Integration with AR libraries like AR.js or native AR frameworks would go here)
      </p>
    </div>
  );
};

export default ARView;
