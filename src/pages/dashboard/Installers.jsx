import React from 'react';

const Installers = () => {
  const installerList = [
    {
      id: 1,
      name: 'Bright Solar Solutions',
      region: 'Nairobi',
      rating: 4.8,
      projects: 120,
      contact: 'info@brightsolar.co.ke',
    },
    {
      id: 2,
      name: 'Green Energy Installers',
      region: 'Mombasa',
      rating: 4.5,
      projects: 90,
      contact: 'contact@greenenergy.co.ke',
    },
    {
      id: 3,
      name: 'SunPower Kenya',
      region: 'Kisumu',
      rating: 4.9,
      projects: 150,
      contact: 'sales@sunpower.co.ke',
    },
    {
      id: 4,
      name: 'EcoWatt Solar',
      region: 'Nakuru',
      rating: 4.7,
      projects: 110,
      contact: 'hello@ecowatt.co.ke',
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Available Installers in Your Region</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {installerList.map((installer) => (
          <div key={installer.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{installer.name}</h2>
            <p className="text-gray-600">Region: {installer.region}</p>
            <p className="text-gray-600">Rating: {installer.rating} / 5</p>
            <p className="text-gray-600">Projects Completed: {installer.projects}</p>
            <p className="text-blue-500 mt-2">Contact: {installer.contact}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View Profile
            </button>
          </div>
        ))}
      </div>

      <p className="text-gray-600 mt-8">
        These are certified installers available to help you with your solar installation needs.
        You can view their profiles for more details and to request a quote.
      </p>
    </div>
  );
};

export default Installers;
