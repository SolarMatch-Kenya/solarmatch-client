import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'; // Ensure you ran: npm install @headlessui/react
import API from '../../services/api';
import { Search, ChevronDown, Plus, X } from 'lucide-react';
import InstallerCard from "../../components/cards/InstallerCard"

// --- Add Installer Modal Form (Now includes category dropdown) ---
const AddInstallerModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    county: '',
    installer_category: '' // <-- Add category state
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.installer_category) {
       setError("Please select an installer category.");
       return;
    }
    setError('');
    setLoading(true);
    try {
      await API.post('/admin/installers', formData);
      setFormData({ // Reset form on success
        full_name: '', email: '', phone_number: '', county: '', installer_category: ''
      });
      onSuccess(); // Close modal and refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add installer");
    }
    setLoading(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => { onClose(); setError(''); }}> {/* Clear error on close */}
        <Transition.Child as={Fragment} /* ... backdrop ... */ >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} /* ... panel ... */ >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Add New Installer
                </Dialog.Title>
                <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                  <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full border p-2 rounded-md" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Company Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded-md" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Company Phone Number</label>
                    <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full border p-2 rounded-md" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">County</label>
                    <input type="text" name="county" value={formData.county} onChange={handleChange} className="w-full border p-2 rounded-md" required />
                  </div>
                  {/* --- ADD CATEGORY SELECT --- */}
                  <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select 
                      name="installer_category" 
                      value={formData.installer_category} 
                      onChange={handleChange} 
                      className="w-full border p-2 rounded-md bg-white" 
                      required
                    >
                      <option value="" disabled>Select Category</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 disabled:bg-gray-400">
                      {loading ? "Adding..." : "Add Installer"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// --- Main Page Component ---
const InstallerManagement = () => {
  const [installers, setInstallers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debouncer for search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetcher
  const fetchInstallers = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/installers', {
        params: { search: debouncedSearch }
      });
      setInstallers(res.data.installers);
    } catch (err) {
      console.error("Fetch Installers Error:", err);
      // Optionally set an error state here
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstallers();
  }, [debouncedSearch]); // Refetch on search

  const handleAddSuccess = () => {
    setIsModalOpen(false);
    fetchInstallers(); // Refresh list
    // TODO: Replace alert with a proper toast notification library
    alert("Installer added successfully! Credentials printed in backend console.");
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete installer "${name}"? This cannot be undone.`)) {
      return;
    }
    try {
      await API.delete(`/admin/installers/${id}`);
      fetchInstallers(); // Refresh list
    } catch (err) {
      alert("Failed to delete installer: " + err.response?.data?.error);
    }
  };

  return (
    <>
      <AddInstallerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
      <div className="p-6 h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Installer Management</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            <Plus className="w-5 h-5" />
            Add Installer
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative grow"> {/* Use grow instead of flex-grow */}
            <input
              type="text"
              placeholder="Search by name, email, or county..."
              className="w-full p-3 pl-12 bg-white rounded-lg border border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          {/* TODO: Implement actual dropdown logic for filters */}
          <button className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 min-w-[150px]">
            County <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 min-w-[150px]">
            Category <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Installer Cards Grid */}
        {loading ? (
          <div className="text-center p-8">Loading installers...</div>
        ) : installers.length === 0 ? (
          <div className="text-center text-gray-500 p-8 bg-gray-50 rounded-lg">No installers found matching your criteria.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {installers.map(installer => (
              <InstallerCard key={installer.id} installer={installer} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default InstallerManagement;