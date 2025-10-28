import React, { useState, useEffect } from 'react';
// 1. Import the 'Unlock' icon for the unban button
import { Search, Eye, Edit2, ShieldBan, ChevronDown, Unlock } from 'lucide-react';
import API from '../../services/api';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '../../components/common/Pagination';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // --- 2. Add state for search ---
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // --- 3. Add a debouncer for the search input ---
  // This prevents an API call on every single keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to page 1 on a new search
    }, 500); // 500ms delay
    
    return () => clearTimeout(timer); // Cleanup timer
  }, [searchTerm]);

  // --- 4. Update data fetching to include search ---
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await API.get('/admin/users', {
          params: { 
            page: currentPage, 
            per_page: 8,
            search: debouncedSearch // Send the debounced search term
          }
        });
        setUsers(res.data.users);
        setTotalPages(res.data.pagination.total_pages);
        setError(null); // Clear previous errors
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch users");
        setUsers([]); // Clear users on error
      }
      setLoading(false);
    };

    fetchUsers();
  // Re-run when page or debounced search term changes
  }, [currentPage, debouncedSearch]); 

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  
  // --- 5. Add handlers for Ban/Unban ---
  const handleBanUser = async (userId) => {
    if (!window.confirm("Are you sure you want to ban this user?")) return;

    try {
      await API.put(`/admin/users/${userId}/ban`);
      // Update the user's role in the local state
      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: 'banned' } : u
      ));
      toast.success(`${userName} has been banned.`);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to ban user.";
      // --- Replace alert ---
      toast.error(errorMsg);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      await API.put(`/admin/users/${userId}/unban`);
      // Update the user's role in the local state
      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: 'customer' } : u
      ));
      toast.success(`${userName} has been unbanned.`);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to unban user.";
      // --- Replace alert ---
      toast.error(errorMsg);
    }
  };

  // Helper to capitalize the first letter
  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

  return (
    <div className="p-6 h-full">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative grow">
          {/* --- 6. Wire up the search input --- */}
          <input
            type="text"
            placeholder="Search by name, email, or username..."
            className="w-full p-3 pl-12 bg-gray-100 rounded-lg border border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        {/* TODO: Wire up filter dropdowns */}
        <button className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 min-w-[150px]">
          County <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 min-w-[150px]">
          Category <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="5" className="p-4 text-center">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="5" className="p-4 text-center text-red-500">{error}</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">No users found.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${user.full_name.replace(' ', '+')}&background=random`} 
                        alt={user.full_name} 
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium text-sm">{user.full_name}</span>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-600">
                    {user.county || 'N/A'}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm">
                    {/* --- 7. Add styling for 'banned' role --- */}
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'customer' 
                          ? 'bg-green-100 text-green-800'
                          : user.role === 'installer'
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-red-100 text-red-800' // Banned
                      }`}
                    >
                      {capitalize(user.role)}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="p-1 hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                    <button className="p-1 hover:text-green-600 ml-2"><Edit2 className="w-4 h-4" /></button>
                    
                    {/* --- 8. Add conditional Ban/Unban button --- */}
                    {user.role === 'banned' ? (
                      <button 
                        className="p-1 hover:text-yellow-600 ml-2" 
                        onClick={() => handleUnbanUser(user.id, user.full_name)}
                        title="Unban User"
                      >
                        <Unlock className="w-4 h-4" />
                      </button>
                    ) : (
                      <button 
                        className="p-1 hover:text-red-600 ml-2" 
                        onClick={() => handleBanUser(user.id, user.full_name)}
                        title="Ban User"
                      >
                        <ShieldBan className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              />
            </PaginationItem>
            
            {/* TODO: Add full page number logic if needed */}
            <PaginationItem>
              <PaginationLink isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default UserManagement;