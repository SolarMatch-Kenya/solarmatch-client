import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import API from '../../services/api';
import { toast } from 'sonner';

const Installers = () => {
  
  const [installerList, setInstallerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch installers from the backend on component mount
  useEffect(() => {
    const fetchInstallers = async () => {
      try {
        setLoading(true);
        const res = await API.get('/installers');
        setInstallerList(res.data);
      } catch (err) {
        setError("Failed to fetch installers.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInstallers();
  }, []);

  // 3. Create function to handle "Get Quote" click
  const handleGetQuote = async (installerId) => {
    try {
      // Show a confirmation or loading state if you want
      const res = await API.post('/quote-request', { installer_id: installerId });
      toast.success(res.data.message || "Quote request sent successfully!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || "Failed to send request.";
      toast.error(errorMsg);
      console.error(err);
    }
  };
  
  // 4. Add loading/error states to the return
  if (loading) return <div className="p-6">Loading installers...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Find a Trusted Solar Installer</h1>
      <p className="text-gray-600 mb-6">Browse our curated list of certified solar installers in Kenya.</p>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative grow">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by installer name or city..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        {/* Filters (as dropdowns) */}
        <select className="bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg focus:outline-none">
          <option>Location</option>
          <option>Nairobi</option>
          <option>Mombasa</option>
        </select>
        <select className="bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg focus:outline-none">
          <option>Services</option>
          <option>Residential</option>
          <option>Commercial</option>
        </select>
        <select className="bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-lg focus:outline-none">
          <option>Rating</option>
          <option>4 Stars & Up</option>
          <option>3 Stars & Up</option>
        </select>
      </div>

      {/* 5. Installer Grid (now uses state) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {installerList.map((installer) => (
          <div key={installer.id} className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            {/* ... Logo ... */}
            <div className="h-32 w-full flex ...">
              <span className="text-gray-500 text-sm">(Logo for {installer.name})</span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800">{installer.name}</h2>
            <p className="text-gray-500 mb-3">{installer.location}</p>
            
            {/* ... Rating ... */}
            <div className="flex items-center space-x-1 mb-4">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <span className="font-semibold text-gray-700">{installer.rating}</span>
              <span className="text-gray-500">({installer.reviews} reviews)</span>
            </div>

            {/* 6. Hook up the "Get Quote" button */}
            <div className="flex gap-3">
              <button className="flex-1 text-center bg-gray-100 text-gray-800 font-semibold py-2.5 rounded-lg hover:bg-gray-200">
                View Profile
              </button>
              <button 
                onClick={() => handleGetQuote(installer.id)}
                className="flex-1 text-center bg-[#f79436] text-white font-semibold py-2.5 rounded-lg hover:bg-[#e68529]"
              >
                Get Quote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Installers;