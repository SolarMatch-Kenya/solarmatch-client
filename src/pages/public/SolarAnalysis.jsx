import React, { useState, useMemo, useCallback } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { GoogleMap, useLoadScript, MarkerF, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places'];

const SolarAnalysis = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Ensure you have this in your .env
        libraries,
    });

    const [formData, setFormData] = useState({
        lat: '',
        lng: ''
    });
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState({ lat: -1.286389, lng: 36.817223 }); // Default to Nairobi
    const [mapZoom, setMapZoom] = useState(10);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [searchBox, setSearchBox] = useState(null);

    const onMapClick = useCallback((event) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        setFormData({ lat: newLat, lng: newLng });
        setMarkerPosition({ lat: newLat, lng: newLng });
        setMapCenter({ lat: newLat, lng: newLng });
    }, []);

    const onLoadSearchBox = useCallback((ref) => {
        setSearchBox(ref);
    }, []);

    const onPlacesChanged = useCallback(() => {
        const places = searchBox.getPlaces();
        const place = places[0];
        if (!place || !place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
        }

        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();

        setMapCenter({ lat: newLat, lng: newLng });
        setMapZoom(15); // Zoom in on the selected place
        setFormData({ lat: newLat, lng: newLng });
        setMarkerPosition({ lat: newLat, lng: newLng });
    }, [searchBox]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAnalysis(null);
        try {
            const response = await fetch('http://127.0.0.1:5000/analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setAnalysis(data);
        } catch (error) {
            console.error('Error fetching solar analysis:', error);
            alert('Failed to fetch solar analysis. Please try again.');
        }
        setLoading(false);
    };

    const renderMap = useMemo(() => {
        if (loadError) return <div>Error loading maps</div>;
        if (!isLoaded) return <div>Loading Maps...</div>;

        return (
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '500px' }}
                center={mapCenter}
                zoom={mapZoom}
                onClick={onMapClick}
                options={{
                    streetViewControl: false,
                    fullscreenControl: false,
                }}
            >
                {markerPosition && <MarkerF position={markerPosition} />}
                <StandaloneSearchBox
                    onLoad={onLoadSearchBox}
                    onPlacesChanged={onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Search for a location"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: "absolute",
                            left: "50%",
                            marginLeft: "-120px",
                            marginTop: "10px"
                        }}
                    />
                </StandaloneSearchBox>
            </GoogleMap>
        );
    }, [isLoaded, loadError, mapCenter, mapZoom, onMapClick, markerPosition, onLoadSearchBox, onPlacesChanged]);

    return (
        <div className="app-container">
            <div className="home-container">
                <div className="header">
                    <Navbar />
                </div>
                <div className="text-base font-normal">
                    <div className="py-20">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold lg:text-4xl text-center text-[#006800] mb-6">Solar Suitability Analysis</h1>

                            <div className="mb-8">
                                {renderMap}
                            </div>

                            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
                                <div className="mb-4">
                                    <label htmlFor="lat" className="block text-gray-700 font-bold mb-2">Latitude</label>
                                    <input type="text" id="lat" name="lat" value={formData.lat} onChange={() => {}} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006800]" readOnly />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="lng" className="block text-gray-700 font-bold mb-2">Longitude</label>
                                    <input type="text" id="lng" name="lng" value={formData.lng} onChange={() => {}} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006800]" readOnly />
                                </div>
                                <PrimaryButton type="submit" disabled={loading || !formData.lat || !formData.lng}>
                                    {loading ? 'Analyzing...' : 'Analyze'}
                                </PrimaryButton>
                            </form>

                            {analysis && (
                                <div className="mt-10 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold text-[#006800] mb-4">Analysis Results</h2>
                                    <div className="mb-4">
                                        <h3 className="font-bold">AI Feedback:</h3>
                                        <p>{analysis.ai_feedback}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Solar Data:</h3>
                                        <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(analysis.solar_data, null, 2)}</pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default SolarAnalysis;