import { useRef, useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map } from "./Map.styled";

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
                // const response = await fetch('http://localhost:5001/locations');
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

        map.on("load", () => {
            setMapLoaded(true);

            // locations.forEach((location) => {
            //     const marker = new mapboxgl.Marker()
            //         .setLngLat(location.coordinates)
            //         .addTo(map);

            //     const popup = new mapboxgl.Popup({ offset: 25 })
            //         .setHTML(`
            //             <h3>${location.name}</h3>
            //             <p><a href="${location.streetViewLink}" target="_blank">View in ${location.name}</a></p>
            //         `);

            //     marker.setPopup(popup);
            // });

            locations.forEach((location) => {
                const [lat, lng] = location.coordinates.split(',').map(Number);

                if (!isNaN(lat) && !isNaN(lng)) {
                    const marker = new mapboxgl.Marker()
                        .setLngLat([lng, lat])
                        .addTo(map);

                    const popup = new mapboxgl.Popup({ offset: 25 })
                        .setHTML(`
                            <h3>${location.name}</h3>
                            <p><a href="${location.streetViewLink}" target="_blank">View in ${location.name}</a></p>
                        `);

                    marker.setPopup(popup);
                } else {
                    console.error(`Invalid coordinates for location: ${location.name}`);
                }
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
