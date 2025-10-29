// src/context/AnalysisContext.jsx

import React, { createContext, useContext } from 'react';
import API from '../services/api';
 

export const AnalysisContext = createContext();

export const useAnalysis = () => useContext(AnalysisContext);

export const AnalysisProvider = ({ children }) => {
  // 2. The token is handled by the API interceptor,
  // so we don't need it here.
  // const { token } = useAuth(); 

  const submitAnalysis = async (formData) => {
    const data = new FormData();
    
    data.append('roofImage', formData.roofImage); // The file object
    data.append('address', formData.address);
    data.append('energyConsumption', formData.energyConsumption);
    data.append('roofType', formData.roofType);
    
    data.append('latitude', formData.latitude); 
    data.append('longitude', formData.longitude);
    
    try {
      // This is the entire fetch() block, replaced with API.post
      const res = await API.post('/analysis/submit', data);

      // Axios puts the response in res.data
      const result = res.data; 
      console.log('Submission success:', result);
      
    } catch (error) {
      // Improved error logging for Axios
      console.error("Analysis submission failed:", error.response?.data || error.message);
    }
  };

  return (
    <AnalysisContext.Provider value={{ submitAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
};