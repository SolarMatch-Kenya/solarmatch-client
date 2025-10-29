import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/common/Loader";
import API from '../../services/api';

const CustomerLeads = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerLeads = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const res = await API.get('/installer-leads');
        setLeads(res.data);
      } catch (err) {
        setError("Failed to fetch customer leads.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerLeads();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full p-6 min-h-full" style={{ minHeight: '400px' }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Customer Leads</h2>
      
      {/* --- REPLACEMENT --- */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Your Leads</h3>
        </div>
        <div className="p-6">
          {leads.length === 0 ? (
            <p>No customer leads available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {/* Updated class for proper padding */}
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.potential}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerLeads;