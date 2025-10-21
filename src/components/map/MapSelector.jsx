import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapSelector({ onSelect }) {
  const mapContainer = useRef(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [36.8219, -1.2921],
      zoom: 10
    });

    map.on("click", async (e) => {
      const [lon, lat] = [e.lngLat.lng, e.lngLat.lat];
      // Reverse geocode via Mapbox
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${mapboxgl.accessToken}`);
      const data = await res.json();
      if (data.features && data.features.length) {
        onSelect(data.features[0]);
      } else {
        onSelect({ place_name: `${lat},${lon}` });
      }
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ height: 200, borderRadius: 8 }} />;
}
