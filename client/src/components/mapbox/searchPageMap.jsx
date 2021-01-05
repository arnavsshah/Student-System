import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useRef, useCallback } from 'react'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
 
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2VkcmljZGlnZ29yeSIsImEiOiJja2lleWtuN2gwZW5xMnlxdXN6OHEycHpzIn0.tctm36B4zOZyPCaZV3SD5A'
 
export default function SearchMap(props) {
    const [viewport, setViewport] = useState({
        latitude: 19.022281,
        longitude: 72.856220,
        zoom: 12
      });
      const mapRef = useRef();
      const handleViewportChange = useCallback(
        (newViewport) => {
          setViewport(newViewport)
          // console.log(newViewport)
        //   props.setLat(newViewport.latitude);
        //   props.setLon(newViewport.longitude);
        },
        []
      );
     
      // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
      const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
     
          return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        []
      );
     
      return (
        <div style={{ height: "80vh" }}>
          <MapGL
            ref={mapRef}
            {...viewport}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            // mapStyle={MAP_STYLE}
          >
            <Geocoder
              mapRef={mapRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              position="top-left"
            />
          </MapGL>
        </div>
      );
};