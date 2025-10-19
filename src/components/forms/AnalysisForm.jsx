import React, { useState, useContext } from 'react';
import { AnalysisContext } from '../../context/AnalysisContext';
import PrimaryButton from '../buttons/PrimaryButton';
import { validateAnalysisForm } from '../../utils/validations'; // Assuming this will be created

const AnalysisForm = () => {
  const { submitAnalysis } = useContext(AnalysisContext);
  const [formData, setFormData] = useState({
    address: '',
    energyConsumption: '',
    roofType: '',
    // Add more fields as needed
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateAnalysisForm(formData);
    if (Object.keys(formErrors).length === 0) {
      await submitAnalysis(formData);
      // Optionally clear form or show success message
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>
      <div>
        <label htmlFor="energyConsumption" className="block text-sm font-medium text-gray-700">Average Monthly Energy Consumption (kWh)</label>
        <input
          type="number"
          name="energyConsumption"
          id="energyConsumption"
          value={formData.energyConsumption}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.energyConsumption && <p className="text-red-500 text-xs mt-1">{errors.energyConsumption}</p>}
      </div>
      <div>
        <label htmlFor="roofType" className="block text-sm font-medium text-gray-700">Roof Type</label>
        <select
          name="roofType"
          id="roofType"
          value={formData.roofType}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="">Select a roof type</option>
          <option value="pitched">Pitched</option>
          <option value="flat">Flat</option>
          <option value="other">Other</option>
        </select>
        {errors.roofType && <p className="text-red-500 text-xs mt-1">{errors.roofType}</p>}
      </div>
      <PrimaryButton type="submit">Run Analysis</PrimaryButton>
    </form>
  );
};

export default AnalysisForm;
