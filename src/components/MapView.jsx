import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import profiles from "../data/profile.json";
import "../App.css"; // Optional: Add styles for the component

const MapView = () => {
  const mapRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
        script.src = `https://maps.gomaps.pro/maps/api/js?key=${apiKey}&libraries=geometry,places&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
      });
    };

    const initializeMap = (address) => {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          const map = new window.google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 13,
          });

          new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
          });
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    };

    const setupMap = async () => {
      try {
        await loadGoogleMapsScript();
        const profile = profiles.find((profile) => profile.id === id);
        if (profile) {
          initializeMap(profile.address);
        } else {
          console.error("Profile not found");
        }
      } catch (error) {
        console.error("Failed to load Google Maps script:", error);
      }
    };

    setupMap();
  }, [id]);

  return (
    <div className="map-view">
      
      <div
        id="map"
        ref={mapRef}
        style={{ height: "400px", width: "100%", marginTop: "10px" }}
      ></div>
    </div>
  );
};

export default MapView;
