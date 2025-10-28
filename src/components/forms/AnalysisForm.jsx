// src/components/forms/AnalysisForm.jsx

import { useState, useContext, memo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnalysisContext } from "../../context/AnalysisContext";
import { AuthContext } from "../../context/AuthContext"; 
import { validateAnalysisForm } from "../../utils/validations";
import MapSelector from "../map/MapSelector";
import roofPlaceholder from "../../assets/image_placeholder.jpg"; 
import Loader from "../common/Loader"
import { toast } from 'sonner';

const MemoizedMapSelector = memo(MapSelector);

export default function AnalysisForm() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { submitAnalysis } = useContext(AnalysisContext);

  const [formData, setFormData] = useState({
    address: "",
    energyConsumption: "",
    roofType: "",
    roofImage: null,
    roofAngle: "",
    roofOrientation: "",
    latitude: null,  
    longitude: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pendingData = localStorage.getItem("pendingAnalysis");
    if (pendingData) {
      setFormData(prev => ({ ...prev, ...JSON.parse(pendingData) }));
      localStorage.removeItem("pendingAnalysis");

      toast.info("Welcome back! Please re-select your roof image to continue.");
      
      // Ask user to re-select the image
      setErrors(prev => ({ 
        ...prev, 
        roofImage: "Welcome back! Please re-select your roof image to continue." 
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, roofImage: file });
    
    // Clear the "re-upload" error if it exists
    if (errors.roofImage) {
      setErrors(prev => ({ ...prev, roofImage: null }));
    }
    
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); 
  };

  // Handle Map Location Select (with useCallback fix)
  const handleMapSelect = useCallback(async (place) => {
    const address = place.place_name || "";
    const coords = place.geometry?.coordinates; // [lon, lat]

    setFormData((prev) => ({ 
      ...prev, 
      address,
      longitude: coords ? coords[0] : null,
      latitude: coords ? coords[1] : null,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateAnalysisForm(formData);
    if (Object.keys(formErrors).length !== 0) return setErrors(formErrors);

    if (!user) {
      const { roofImage, ...dataToStore } = formData;
      localStorage.setItem("pendingAnalysis", JSON.stringify(dataToStore));
      
      localStorage.setItem("pendingAnalysisRedirect", "true"); 
      
      navigate("/login?redirect=/dashboard");
      return;
    }

    try {
      await submitAnalysis(formData);
      toast.success("Analysis submitted successfully! Redirecting..."); // <-- Success toast
      // Redirect after a short delay to allow user to see the toast
      setTimeout(() => {
         navigate("/dashboard/analysis-result"); // Redirect to results page
      }, 1500);
    } catch (error) {
       toast.error(error.message || "Failed to submit analysis."); // <-- Error toast
       setIsSubmitting(false); // Stop submitting on error
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen p-6" style={{ minHeight: '400px' }}>
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-lg max-w-[1000px] mx-auto my-[100px]">
      {/* Upload Section - Updated to 2-column layout */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Left: Image Preview */}
        <div className="w-full md:w-1/2 h-48 rounded-lg overflow-hidden border">
          <img
            src={
              formData.roofImage
                ? URL.createObjectURL(formData.roofImage)
                : roofPlaceholder
            }
            alt="Roof upload preview"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right: Text and Upload Button */}
        <div className="w-full md:w-1/2">
          <h3 className="font-semibold text-gray-800">
            Upload a photo of your roof
          </h3>
          <p className="text-sm text-gray-600 mt-2 mb-4">
            Drag and drop a photo or browse to upload. Ensure the photo is clear
            and shows the entire roof.
          </p>
          
          {/* Styled file input */}
          <label
            htmlFor="roof-upload"
            className="cursor-pointer bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-all text-sm"
          >
            Upload...
          </label>
          <input
            id="roof-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden" // <-- Hide the actual input
          />
          {loading && <p className="text-yellow-600 mt-2 text-sm">Analyzing roof image...</p>}
          {formData.roofType && (
            <p className="text-green-600 mt-2 text-sm">
              Detected roof type: {formData.roofType}
            </p>
          )}
        </div>
      </div>

      {/* 📍 Address & Map */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Enter your location
        </label>
        <div className="relative">
          {/* Icon for location */}
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            location_on
          </span>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-3 pl-10" // <-- Added pl-10 for icon
            placeholder="Start typing your address..."
          />
        </div>
        <div className="mt-4 rounded-lg overflow-hidden">
          <MemoizedMapSelector onSelect={handleMapSelect} />
        </div>
        {formData.roofAngle && (
          <div className="mt-2 text-sm text-gray-600">
            🧭 <b>Orientation:</b> {formData.roofOrientation} | <b>Angle:</b>{" "}
            {formData.roofAngle}°
          </div>
        )}
      </div>
      
      {/* Container for the two dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🏠 Roof Type */}
        <div>
          <label htmlFor="roofType" className="block text-sm font-medium text-gray-700">
            Roof Type
          </label>
          <select
            id="roofType"
            name="roofType"
            value={formData.roofType}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-white"
          >
            <option value="">Select a roof type</option>
            <option value="pitched">Pitched</option>
            <option value="flat">Flat</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* ⚡ Monthly Electricity Bill */}
        <div>
          <label htmlFor="energyConsumption" className="block text-sm font-medium text-gray-700">
            Monthly Electricity Bill (kWh)
          </label>
          <input
            id="energyConsumption"
            type="number"
            name="energyConsumption"
            value={formData.energyConsumption}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3"
            placeholder="e.g., 500"
          />
        </div>
      </div>

      {/* Submit Button - Centered */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow-400 text-black font-bold py-3 px-10 rounded-lg hover:bg-yellow-500 transition-all duration-300"
        >
          {isSubmitting ? "Submitting..." : (user ? "Run Analysis" : "Analyze My Roof")}
        </button>
      </div>
    </form>
  );
}