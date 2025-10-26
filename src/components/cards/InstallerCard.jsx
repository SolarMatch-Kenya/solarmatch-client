// Displays solar installer info with ratings/contact
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

// --- Installer Card Component (Now uses category) ---
const InstallerCard = ({ installer, onDelete }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
    <div> {/* Content wrapper */}
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={`https://ui-avatars.com/api/?name=${installer.full_name.replace(' ', '+')}&background=random`} 
          alt={installer.full_name} 
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-bold text-gray-800">{installer.full_name}</h3>
          <p className="text-sm text-gray-500">{installer.county || 'N/A'}</p>
        </div>
      </div>
      <div className="space-y-1 mb-4">
        {/* --- USE category FIELD --- */}
        <p className="text-sm"><span className="font-medium text-gray-600">Category:</span> {installer.category || 'N/A'}</p>
        <p className="text-sm"><span className="font-medium text-gray-600">Contact:</span> {installer.phone_number}</p>
      </div>
    </div>
    <div className="flex justify-end gap-2 border-t pt-3 mt-auto"> {/* Actions aligned at bottom */}
      <button className="p-1 text-gray-400 hover:text-green-600"><Edit className="w-4 h-4" /></button>
      <button 
        className="p-1 text-gray-400 hover:text-red-600"
        onClick={() => onDelete(installer.id, installer.full_name)}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default InstallerCard;