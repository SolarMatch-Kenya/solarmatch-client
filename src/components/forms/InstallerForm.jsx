import React, { useState, useContext } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import { AuthContext } from '../../context/AuthContext'; // Assuming installer registration/profile update uses AuthContext
import { validateInstallerForm } from '../../utils/validations'; // Assuming this will be created

const InstallerForm = () => {
  const { registerInstaller, updateInstallerProfile } = useContext(AuthContext); // Placeholder functions
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    serviceAreas: '',
    // Add more fields as needed
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateInstallerForm(formData);
    if (Object.keys(formErrors).length === 0) {
      // Decide whether to register or update based on context (e.g., if an installer is already logged in)
      console.log('Submitting installer form:', formData);
      // await registerInstaller(formData); or await updateInstallerProfile(formData);
      // Optionally clear form or show success message
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
      </div>
      <div>
        <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
        <input
          type="text"
          name="contactPerson"
          id="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="serviceAreas" className="block text-sm font-medium text-gray-700">Service Areas (comma-separated)</label>
        <input
          type="text"
          name="serviceAreas"
          id="serviceAreas"
          value={formData.serviceAreas}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.serviceAreas && <p className="text-red-500 text-xs mt-1">{errors.serviceAreas}</p>}
      </div>
      <PrimaryButton type="submit">Save Installer Details</PrimaryButton>
    </form>
  );
};

export default InstallerForm;
