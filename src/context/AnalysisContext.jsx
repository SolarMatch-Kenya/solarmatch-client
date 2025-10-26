// src/context/AnalysisContext.jsx

import React, { createContext, useContext } from 'react';
import API from '../services/api';

// We don't need useAuth anymore
// import { useAuth } from './AuthContext'; 

export const AnalysisContext = createContext();

export const useAnalysis = () => useContext(AnalysisContext);

export const AnalysisProvider = ({ children }) => {
  // 2. The token is handled by the API interceptor,
  // so we don't need it here.
  // const { token } = useAuth(); 

  const submitAnalysis = async (formData) => {
    // 1. This FormData setup is correct
    const data = new FormData();
    
    data.append('roofImage', formData.roofImage); // The file object
    data.append('address', formData.address);
    data.append('energyConsumption', formData.energyConsumption);
    data.append('roofType', formData.roofType);
    
    // IMPORTANT: Make sure your form is passing these!
    // I noticed in your AnalysisForm.jsx, you might not be saving
    // the lat/lon to the state. (See fix below)
    data.append('latitude', formData.latitude); 
    data.append('longitude', formData.longitude);
    
    try {
      // 3. This is the entire fetch() block, replaced with API.post
      // The URL is just '/analysis/submit' because the base URL
      // is already in the API instance.
      const res = await API.post('/analysis/submit', data);

      // 4. Axios puts the response in res.data
      const result = res.data; 
      console.log('Submission success:', result);
      
    } catch (error) {
      // 5. Improved error logging for Axios
      console.error("Analysis submission failed:", error.response?.data || error.message);
      // Handle error display
    }
  };

  return (
    <AnalysisContext.Provider value={{ submitAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
};