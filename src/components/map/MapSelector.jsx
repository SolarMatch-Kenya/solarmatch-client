import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapSelector({ onSelect, width = "100%", height = 400 }) {
  const mapContainer = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12", // hybrid view
      center: [36.8219, -1.2921],
      zoom: 10,
    });

    map.on("load", () => {
      // --- Improve imagery clarity ---
      const satelliteLayer = map
        .getStyle()
        .layers.find((l) => l.id.includes("satellite"));
      if (satelliteLayer) {
        map.setPaintProperty(satelliteLayer.id, "raster-brightness-min", 0);
        map.setPaintProperty(satelliteLayer.id, "raster-brightness-max", 1);
        map.setPaintProperty(satelliteLayer.id, "raster-contrast", 0.3);
        map.setPaintProperty(satelliteLayer.id, "raster-saturation", 0.4);
      }

      // --- Add sharper ESRI imagery below all Mapbox layers ---
      // Place it at the *bottom* of the style (before everything else)
      const firstLayerId = map.getStyle().layers[0].id;

      map.addSource("esri-imagery", {
        type: "raster",
        tiles: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
      });

      map.addLayer(
        {
          id: "esri-layer",
          type: "raster",
          source: "esri-imagery",
          paint: {
            "raster-saturation": 0.3,
            "raster-contrast": 0.2,
          },
        },
        firstLayerId // ensures labels and markers stay on top
      );
    });

    // --- Handle clicks and show pin + popup ---
    map.on("click", async (e) => {
      const [lon, lat] = [e.lngLat.lng, e.lngLat.lat];

      // Reverse geocode to get readable name
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await res.json();
      const place = data.features?.[0];

      // Remove previous marker if any
      if (markerRef.current) markerRef.current.remove();

      // Create a new marker
      const marker = new mapboxgl.Marker({ color: "#ff4757" })
        .setLngLat([lon, lat])
        .addTo(map);

      // Create popup for the marker
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<b>${place?.text || "Selected Location"}</b><br>${
          place?.place_name || `${lat.toFixed(5)}, ${lon.toFixed(5)}`
        }`
      );

      // Attach popup and open it
      marker.setPopup(popup).togglePopup();

      // Store current marker reference
      markerRef.current = marker;

      // Slightly pan the map to center the pin
      map.easeTo({ center: [lon, lat], duration: 800 });

      // Pass location info back to parent
      onSelect(place || { place_name: `${lat},${lon}` });
    });

    return () => map.remove();
  }, [onSelect]);

  return (
    <div
      ref={mapContainer}
      style={{
        width,
        height,
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    />
  );
}
