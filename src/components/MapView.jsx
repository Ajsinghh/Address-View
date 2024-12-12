import { useEffect,useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css"; 

const MapView = () => {
  const mapRef = useRef(null);
  const { id } = useParams();
  const profiles = useSelector(store => store.profiles);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          setLoading(false);
        } else {
          setError(`Geocode error: ${status}`);
          setLoading(false);
        }
      });
    };

    const setupMap = async () => {
      try {
        setLoading(true);
        await loadGoogleMapsScript();
        const profile = profiles.find((profile) => profile.id === id);
        if (profile) {
          initializeMap(profile.address);
        } else {
          setError("Profile not found");
          setLoading(false);
          return;
        }
      } catch (error) {
        setError(error.message || "Unexpected error occurred");
        setLoading(false);
      }
    };

    setupMap();
  }, [id]);

  return (
    <div className="map-view">
      {loading && <div className="loading">Loading map...</div>}
      {error && <div className="error">{error}</div>}
      <div
        id="map"
        ref={mapRef}
        style={{ height: "400px", width: "100%", marginTop: "10px" }}
      ></div>
    </div>
  );
};

export default MapView;
