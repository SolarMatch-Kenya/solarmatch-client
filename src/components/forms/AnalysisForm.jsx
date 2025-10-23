// src/components/forms/AnalysisForm.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AnalysisContext } from "../../context/AnalysisContext";
import { AuthContext } from "../../context/AuthContext";
import PrimaryButton from "../buttons/PrimaryButton";
import { validateAnalysisForm } from "../../utils/validations";
import MapSelector from "../map/MapSelector";

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
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiResults, setAiResults] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📸 Handle Roof Photo Upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, roofImage: file });
    setLoading(true);

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const res = await fetch("/api/ai/roof-photo", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();

      // e.g. response: { type: "pitched" }
      setFormData((prev) => ({ ...prev, roofType: data.type || "other" }));
      setAiResults((prev) => ({ ...prev, photoAnalysis: data }));
    } catch (err) {
      console.error("AI Photo Analysis Failed", err);
    } finally {
      setLoading(false);
    }
  };

  // 📍 Handle Map Location Select → AI Geometry Analysis
  const handleMapSelect = async (place) => {
    const address = place.place_name || "";
    setFormData((prev) => ({ ...prev, address }));

    try {
      const coords = place.geometry?.coordinates;
      if (!coords) return;

      const res = await fetch("/api/ai/roof-geometry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lon: coords[0], lat: coords[1] }),
      });

      const data = await res.json();
      // e.g. { angle: 25, orientation: "South-East" }
      setFormData((prev) => ({
        ...prev,
        roofAngle: data.angle,
        roofOrientation: data.orientation,
      }));
      setAiResults((prev) => ({ ...prev, geometry: data }));
    } catch (err) {
      console.error("AI Geometry Analysis Failed", err);
    }
  };

  // ✅ Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateAnalysisForm(formData);
    if (Object.keys(formErrors).length !== 0) return setErrors(formErrors);

    if (!user) {
      localStorage.setItem("pendingAnalysis", JSON.stringify(formData));
      navigate("/login?redirect=/dashboard");
      return;
    }

    await submitAnalysis(formData);
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white px-26 py-20 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-6">Roof Analysis Details</h2>

      {/* 📸 Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload a photo of your roof
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="mt-2 block w-full text-sm text-gray-600 border border-gray-300 rounded-md p-2"
        />
        {loading && <p className="text-yellow-600 mt-1">Analyzing roof image...</p>}
        {formData.roofType && (
          <p className="text-green-600 mt-1">
            ✅ Detected roof type: {formData.roofType}
          </p>
        )}
      </div>

      {/* 📍 Address & Map */}
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
        <div className="mt-3">
          <MapSelector onSelect={handleMapSelect} />
        </div>
        {formData.roofAngle && (
          <div className="mt-2 text-sm text-gray-600">
            🧭 <b>Orientation:</b> {formData.roofOrientation} | <b>Angle:</b>{" "}
            {formData.roofAngle}°
          </div>
        )}
      </div>

      {/* ⚡ Energy Consumption */}
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
      </div>

      {/* 🏠 Roof Type (auto-settable) */}
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
      </div>

      <PrimaryButton type="submit">
        {user ? "Run Analysis" : "Analyze My Roof"}
      </PrimaryButton>
    </form>
  );
}
