// Displayed when there’s no data (e.g., “No analyses yet”)

import React from 'react';
import { Link } from 'react-router-dom';

// You can add an icon here if you like
// import { DocumentAddIcon } from '@heroicons/react/outline'; 

const EmptyState = () => {
  return (
    <div className="text-center p-12 bg-white rounded-lg shadow-md">
      {/* <DocumentAddIcon className="mx-auto h-12 w-12 text-gray-400" /> */}
      <h3 className="mt-2 text-2xl font-semibold text-gray-900">
        No analysis found
      </h3>
      <p className="mt-1 text-base text-gray-500">
        You don't have any roof analyses yet. Get started by submitting your roof details.
      </p>
      <div className="mt-6">
        <Link
          to="/analysis" // <-- Make sure this is the correct link to your form
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Start Your First Analysis
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;