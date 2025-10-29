import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// We need the 'geocoding' library from Google
const libraries = ["geocoding"];

export default function MapSelector({ onSelect, width = "100%", height = 400 }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markerPosition, setMarkerPosition] = useState(null);

  // Set initial map center to Nairobi
  const mapCenter = {
    lat: -1.2921,
    lng: 36.8219,
  };

  const mapContainerStyle = {
    width,
    height,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  };

  const handleMapClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const newPos = { lat, lng };

    // Set the marker position on the map
    setMarkerPosition(newPos);

    // Use Google's Geocoder service to get the address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newPos }, (results, status) => {
      if (status === "OK" && results[0]) {
        const place = results[0];
        
        
        const compatiblePlaceObject = {
          place_name: place.formatted_address,
          geometry: {
            coordinates: [lng, lat] // [lon, lat]
          }
        };

        // Call the onSelect prop
        onSelect(compatiblePlaceObject);

      } else {
        // Handle case where no address is found
        const fallbackPlaceObject = {
          place_name: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
          geometry: {
            coordinates: [lng, lat]
          }
        };
        onSelect(fallbackPlaceObject);
      }
    });
  }, [onSelect]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={mapCenter}
      mapTypeId="satellite" // satellite view
      tilt={45}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        tiltControl: true,
      }}
      onClick={handleMapClick}
    >
      {markerPosition && (
        <Marker 
          position={markerPosition} 
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#ff4757",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff"
          }}
        />
      )}
    </GoogleMap>
  );
}