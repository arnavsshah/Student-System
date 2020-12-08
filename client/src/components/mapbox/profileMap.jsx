import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
// const { mapbox_api } = require('../../../../config/env_vars');
const mapbox_api = "pk.eyJ1IjoiY2VkcmljZGlnZ29yeSIsImEiOiJja2lleWtuN2gwZW5xMnlxdXN6OHEycHpzIn0.tctm36B4zOZyPCaZV3SD5A"
export default function ProfileMap(props) {
    const [viewport, setViewport] = useState({
        latitude: 19.022480,
        longitude: 72.855026,
        width: props.width,
        height: props.height,
        zoom: 12
    });
    const [selectedPark, setSelectedPark] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <div>
            {/* <h1>profileMap</h1> */}
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={mapbox_api}
                // mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >

                <Marker
                    key={"vjti"}
                    latitude={19.022480}
                    longitude={72.855026}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        <img src="/skateboarding.svg" alt="VJTI" />
                    </button>
                </Marker>
                <Marker
                    key={"vjti"}
                    latitude={19.022480}
                    longitude={72.855026}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        <img src="/skateboarding.svg" alt="Navi Mumbai" />
                    </button>
                </Marker>
                {/* {parkDate.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
        ))} */}

                {/* {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null} */}
            </ReactMapGL>
        </div>
    );
}