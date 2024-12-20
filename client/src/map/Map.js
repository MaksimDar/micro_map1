import { useRef, useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map } from "./Map.styled";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const accessToken = "pk.eyJ1IjoibWFrc3ltMTgiLCJhIjoiY2x5c280eDF2MDkweDJrc2N3a2R5c3l1cyJ9.70P7zxzTa0uSxIpnkz7YeA";

export default function MapWithGeocoder() {
    const mapContainerRef = useRef();
    const mapInstanceRef = useRef();
    const [mapLoaded, setMapLoaded] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('https://micro-map1.onrender.com/locations');
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        mapboxgl.accessToken = accessToken;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [138.2529, 38.5048],
            zoom: 4.3,
        });

        mapInstanceRef.current = map;

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            language: "en"
        });
        map.addControl(geocoder);

        map.on("load", () => {
            setMapLoaded(true);
            locations.forEach((location) => {
                const { longitude, latitude, name, streetViewLink } = location;

                const marker = new mapboxgl.Marker()
                    .setLngLat([longitude, latitude])
                    .addTo(map);

                const popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`
                        <h3>${name}</h3>
                        <p><a href="${streetViewLink}" target="_blank">View in ${name}</a></p>
                    `);

                marker.setPopup(popup);
            });

        });

        mapInstanceRef.current = map;

        return () => map.remove();
    }, [locations]);

    return (
        <>
            <SearchBox
                accessToken={accessToken}
                map={mapInstanceRef.current}
                mapboxgl={mapboxgl}
                value={inputValue}
                onChange={(d) => setInputValue(d)}
                marker
            />
            <Map id="map-container" ref={mapContainerRef} style={{ height: 600 }} />
        </>
    );
}
