import React, { useState, useEffect } from 'react';
import { Search, Eye, Edit2, ShieldBan, ChevronDown } from 'lucide-react';
import API from '../../services/api';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '../../components/common/Pagination'; // Assuming Pagination.jsx is here

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users from the new API endpoint
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await API.get('/admin/users', {
          params: { page: currentPage, per_page: 8 } // Show 8 users per page
        });
        setUsers(res.data.users);
        setTotalPages(res.data.pagination.total_pages);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch users");
      }
      setLoading(false);
    };

    fetchUsers();
  }, [currentPage]); // Re-run this effect when currentPage changes

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Helper to capitalize the first letter
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="p-6 h-full">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative grow">
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            className="w-full p-3 pl-12 bg-gray-100 rounded-lg border border-gray-200"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
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
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'installer' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {capitalize(user.role)}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="p-1 hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                    <button className="p-1 hover:text-green-600 ml-2"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-1 hover:text-red-600 ml-2"><ShieldBan className="w-4 h-4" /></button>
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
            
            {/* We will implement full pagination logic later */}
            {/* For now, a simple page number display */}
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
