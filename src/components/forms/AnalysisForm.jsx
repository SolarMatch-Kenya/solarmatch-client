// src/components/forms/AnalysisForm.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AnalysisContext } from "../../context/AnalysisContext";
import { AuthContext } from "../../context/AuthContext";
import PrimaryButton from "../buttons/PrimaryButton";
import { validateAnalysisForm } from "../../utils/validations";
import MapSelector from "../map/MapSelector";

const AnalysisForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { submitAnalysis } = useContext(AnalysisContext);
  const [formData, setFormData] = useState({
    address: "",
    energyConsumption: "",
    roofType: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateAnalysisForm(formData);
    if (Object.keys(formErrors).length !== 0) {
      return setErrors(formErrors);
    }

    // 🟡 If user not logged in
    if (!user) {
      localStorage.setItem("pendingAnalysis", JSON.stringify(formData));
      navigate("/login?redirect=/dashboard");
      return;
    }

    // 🟢 Logged in → run analysis
    await submitAnalysis(formData);
    navigate("/dashboard"); // Redirect after successful analysis
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Roof Analysis Details</h2>

      {/* Address + Map */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="123 Koinange St, Nairobi"
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address}</p>
        )}
        <div className="mt-3">
          <MapSelector
            onSelect={(coords) =>
              setFormData({ ...formData, address: coords.place_name || "" })
            }
          />
        </div>
      </div>

      {/* Energy Consumption */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Average Monthly Energy Consumption (kWh)
        </label>
        <input
          type="number"
          name="energyConsumption"
          value={formData.energyConsumption}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.energyConsumption && (
          <p className="text-red-500 text-xs mt-1">{errors.energyConsumption}</p>
        )}
      </div>

      {/* Roof Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Roof Type
        </label>
        <select
          name="roofType"
          value={formData.roofType}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="">Select a roof type</option>
          <option value="pitched">Pitched</option>
          <option value="flat">Flat</option>
          <option value="other">Other</option>
        </select>
        {errors.roofType && (
          <p className="text-red-500 text-xs mt-1">{errors.roofType}</p>
        )}
      </div>

      <PrimaryButton type="submit">
        {user ? "Run Analysis" : "Analyze My Roof"}
      </PrimaryButton>
    </form>
  );
};

export default AnalysisForm;
