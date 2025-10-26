import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import EmptyState from '../../components/common/EmptyState';
import RoofPreview from "../../components/ar/RoofPreview";
import API from '../../services/api';

const AnalysisResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setIsPending(false);
        
        // 2. Use API.get() (no need for headers, it's done by the interceptor)
        const res = await API.get('/analysis/latest');

        // 3. Axios puts the response data in `res.data`
        const result = res.data; 
        
        if (result.status === 'PENDING') {
          setIsPending(true);
        } else if (result.status === 'FAILED') {
          setError("The analysis failed to process.");
        } else {
          setData(result);
        }
      } catch (err) {
        // 4. Handle Axios errors
        if (err.response && err.response.status === 404) {
          setNoData(true);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) return <div className="p-6">Loading analysis...</div>;

  if (noData) return <EmptyState />;
  if (isPending) return <div className="p-6 text-blue-600">Your analysis is still processing. Please check back in a moment.</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!data) return <div className="p-6">No analysis data found.</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">AI Energy Analysis Results</h1>

      {/* You now have 'data.result' and 'data.request'
        Update your JSX to access 'data.result'
      */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Optimal Panel Count:</h2>
        <p className="text-2xl text-green-600">{data.result.panel_count} panels</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Estimated Annual Production:</h2>
        <p className="text-2xl text-blue-600">{data.result.annual_production_kwh} kWh</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Projected Annual Savings:</h2>
        <p className="text-2xl text-purple-600">KSh {data.result.annual_savings_ksh.toLocaleString()}</p>
      </div>

      {/* Add the RoofPreview here */}
      {data.request.roof_image_url && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">3D Roof Preview</h2>
          {data.result.panel_layout ? (
            <RoofPreview 
              photoUrl={data.request.roof_image_url}
              panelPositions={data.result.panel_layout}
              roofModelUrl={data.result.roof_model_url}
            />
          ) : (
            <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg">
              3D panel layout could not be generated for this analysis.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;