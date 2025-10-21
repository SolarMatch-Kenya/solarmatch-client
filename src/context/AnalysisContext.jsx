// Stores user analysis data and AI responses

// src/context/AnalysisContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  // 🧠 When a user logs in, load their analyses
  useEffect(() => {
    if (user) {
      loadUserAnalyses();
    } else {
      setAnalyses([]);
    }
  }, [user]);

  // 🟩 Simulated load (replace with API call later)
  const loadUserAnalyses = async () => {
    setLoading(true);
    try {
      const stored = JSON.parse(localStorage.getItem(`analyses_${user?.id}`)) || [];
      setAnalyses(stored);
    } catch (error) {
      console.error("Failed to load analyses:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟩 Submit new roof analysis
  const submitAnalysis = async (data) => {
    setLoading(true);
    try {
      // Simulate backend computation
      const fakeResult = {
        ...data,
        id: Date.now(),
        roofArea: Math.floor(Math.random() * 120 + 50),
        potentialSavings: Math.floor(Math.random() * 5000 + 1000),
        timestamp: new Date().toISOString(),
      };

      // Save under this user (temporary localStorage persistence)
      const existing = JSON.parse(localStorage.getItem(`analyses_${user?.id}`)) || [];
      const updated = [fakeResult, ...existing];
      localStorage.setItem(`analyses_${user?.id}`, JSON.stringify(updated));
      setAnalyses(updated);
      setSelectedAnalysis(fakeResult);
      return fakeResult;
    } catch (error) {
      console.error("Error submitting analysis:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🟩 Select an analysis to view (for ARView or details)
  const selectAnalysis = (id) => {
    const found = analyses.find((a) => a.id === id);
    setSelectedAnalysis(found);
  };

  return (
    <AnalysisContext.Provider
      value={{
        analyses,
        selectedAnalysis,
        loading,
        submitAnalysis,
        selectAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};
