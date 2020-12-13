import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import RoomIcon from '@material-ui/icons/Room';
// import { GeoJSONLayer } from "react-mapbox-gl";
// import PolylineOverlay from './polyline'
// import MapboxGL from '@mapbox/react-native-mapbox-gl';
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
    const [selectedPoint, setSelectedPoint] = useState(null);
    let points = [
        ['72.975050', '19.203610'],
        ['73.043450', '19.183600'],
        ['-122.16969', '37.42896']
    ]
    return (
        <div>
            {/* <h1>profileMap</h1> */}
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={mapbox_api}
                // onLoad={addLines}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
                {/* <PolylineOverlay points={points} /> */}
                <Marker
                    key={'Z'}
                    latitude={19.203610}
                    longitude={72.975050}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large" />
                    </button>
                </Marker>
                <Popup
                    latitude={19.203610}
                    longitude={72.975050}
                >

                </Popup>
                <Marker
                    key={'A'}
                    latitude={19.183600}
                    longitude={73.043450}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large" />
                    </button>
                </Marker>
                <Marker
                    key={'B'}
                    latitude={37.42896}
                    longitude={-122.16969}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large" />
                    </button>
                </Marker>
                <Marker
                    key={'C'}
                    latitude={19.0274356}
                    longitude={72.8501467}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large" />
                    </button>
                </Marker>
                <Marker
                    key={'D'}
                    latitude={19.01807}
                    longitude={73.04038}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large" />
                    </button>
                </Marker>
                <Marker
                    key={'E'}
                    latitude={19.203610}
                    longitude={72.975050}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large" />
                    </button>
                </Marker>
                {selectedPoint ? (
                    <Popup
                        latitude={19.203610}
                        longitude={72.975050}
                        onClose={() => {
                            setSelectedPoint(null);
                        }}
                    >
                        <div>
                            {/* <h2>{selectedPark.properties.NAME}</h2>
                            <p>{selectedPark.properties.DESCRIPTIO}</p> */}
                            <h2>Hello</h2>
                        </div>
                    </Popup>
                ) : null}

                {/* {props.mapData && props.mapData.map((data) => {
                    
                    // console.log('gg', Object.keys(data.studentLocation).length)
                    {if (Object.keys(data.studentLocation).length) {
                        return(
                        <Marker
                            key={'VJTI'}
                            latitude={19.0223}
                            longitude={72.8562}
                        >
                            <button
                                className="marker-btn"
                                onClick={e => {
                                    e.preventDefault();
                                    // setSelectedPark(park);
                                }}
                            >
                                <img src="/skateboarding.svg" alt={data.studentLocation.address} />
                            </button>
                        </Marker>
                    
                    )
                     }
                }}) */}
                {/* } */}






                {/* <Marker
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
                </Marker> */}
                {/* <Marker
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
                </Marker> */}
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