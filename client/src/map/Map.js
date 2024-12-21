// import { useRef, useEffect, useState } from "react";
// import { SearchBox } from "@mapbox/search-js-react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { Map } from "./Map.styled";
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import districts from "./districts.json";

// const accessToken = "pk.eyJ1IjoibWFrc3ltMTgiLCJhIjoiY2x5c280eDF2MDkweDJrc2N3a2R5c3l1cyJ9.70P7zxzTa0uSxIpnkz7YeA";

// export default function MapWithGeocoder() {
//     const mapContainerRef = useRef();
//     const mapInstanceRef = useRef();
//     const [mapLoaded, setMapLoaded] = useState(false);
//     const [inputValue, setInputValue] = useState("");
//     const [locations, setLocations] = useState([]);
//     const [filteredLocations, setFilteredLocations] = useState([]);
//     const [city, setCity] = useState("");
//     const [district, setDistrict] = useState("");

//     useEffect(() => {
//         const fetchLocations = async () => {
//             try {
//                 const response = await fetch('https://micro-map1.onrender.com/locations');
//                 const data = await response.json();
//                 setLocations(data);
//                 setFilteredLocations(data);
//             } catch (error) {
//                 console.error('Error fetching locations:', error);
//             }
//         };

//         fetchLocations();
//     }, []);

//     useEffect(() => {
//         mapboxgl.accessToken = accessToken;

//         const map = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: "mapbox://styles/mapbox/streets-v11",
//             center: [138.2529, 38.5048],
//             zoom: 4.3,
//         });

//         mapInstanceRef.current = map;

//         const geocoder = new MapboxGeocoder({
//             accessToken: mapboxgl.accessToken,
//             mapboxgl: mapboxgl,
//             language: "en"
//         });
//         map.addControl(geocoder);

//         map.on("load", () => {
//             setMapLoaded(true);
//             locations.forEach((location) => {
//                 const { longitude, latitude, name, streetViewLink } = location;

//                 const marker = new mapboxgl.Marker()
//                     .setLngLat([longitude, latitude])
//                     .addTo(map);

//                 const popup = new mapboxgl.Popup({ offset: 25 })
//                     .setHTML(`
//                         <h3>${name}</h3>
//                         <p><a href="${streetViewLink}" target="_blank">View in ${name}</a></p>
//                     `);

//                 marker.setPopup(popup);
//             });

//         });

//         mapInstanceRef.current = map;

//         return () => map.remove();
//     }, [locations]);

//     return (
//         <>
//             <SearchBox
//                 accessToken={accessToken}
//                 map={mapInstanceRef.current}
//                 mapboxgl={mapboxgl}
//                 value={inputValue}
//                 onChange={(d) => setInputValue(d)}
//                 marker
//             />
//             <Map id="map-container" ref={mapContainerRef} style={{ height: 600 }} />
//         </>
//     );
// }

import { useRef, useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map } from "./Map.styled";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import districts from "./districts.json";

const accessToken = "pk.eyJ1IjoibWFrc3ltMTgiLCJhIjoiY2x5c280eDF2MDkweDJrc2N3a2R5c3l1cyJ9.70P7zxzTa0uSxIpnkz7YeA";

export default function MapWithGeocoder() {
    const mapContainerRef = useRef();
    const mapInstanceRef = useRef();
    const [mapLoaded, setMapLoaded] = useState(false);
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const markersRef = useRef([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('https://micro-map1.onrender.com/locations');
                const data = await response.json();
                setLocations(data);
                setFilteredLocations(data);
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
            language: "en",
        });
        map.addControl(geocoder);

        map.on("load", () => {
            setMapLoaded(true);
            updateMarkers();
        });

        return () => map.remove();
    }, [filteredLocations]);

    const clearMarkers = () => {
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];
    };

    const updateMarkers = () => {
        if (!mapLoaded) return;

        clearMarkers(); // Remove existing markers

        filteredLocations.forEach((location) => {
            const { longitude, latitude, name, streetViewLink } = location;

            const marker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(mapInstanceRef.current);

            const popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                    <h3>${name}</h3>
                    <p><a href="${streetViewLink}" target="_blank">View in ${name}</a></p>
                `);

            marker.setPopup(popup);
            markersRef.current.push(marker); // Track the marker
        });
    };

    const handleFilter = () => {
        const newFilteredLocations = locations.filter((location) => {
            const matchesCity = city ? location.city?.toLowerCase().includes(city.toLowerCase()) : true;
            const matchesDistrict = district ? location.name?.toLowerCase().includes(district.toLowerCase()) : true;
            return matchesCity && matchesDistrict;
        });
        setFilteredLocations(newFilteredLocations);
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ position: "absolute", top: 10, right: 10, background: "white", padding: "10px", zIndex: 1000 }}>
                    <h3>Filters</h3>
                    <div>
                        <label>City:</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city"
                            style={{ marginBottom: "10px", width: "100%" }}
                        />
                    </div>
                    <div>
                        <label>District:</label>
                        <input
                            type="text"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            placeholder="Enter district"
                            style={{ marginBottom: "10px", width: "100%" }}
                        />
                    </div>
                    <button onClick={handleFilter} style={{ width: "100%" }}>Apply Filters</button>
                </div>
                <SearchBox
                    accessToken={accessToken}
                    map={mapInstanceRef.current}
                    mapboxgl={mapboxgl}
                />
            </div>
            <Map id="map-container" ref={mapContainerRef} style={{ height: 600 }} />
        </>
    );
}


