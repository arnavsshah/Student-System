import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomIcon from '@material-ui/icons/Room';
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
    // console.log("NOO",props.mapData);
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
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >

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
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>

                <Marker
                    key={'Dadar'}
                    latitude={19.021324}
                    longitude={72.8424178000}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>

                <Marker
                    key={'Wadala'}
                    latitude={19.023010}
                    longitude={72.859352}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0351345}
                    longitude={72.8580584}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0451345}
                    longitude={72.8580584}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0151345}
                    longitude={72.8780584}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0154345}
                    longitude={72.8380584}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0161345}
                    longitude={72.8380084}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0101345}
                    longitude={72.8370584}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0169345}
                    longitude={72.8380584}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0181345}
                    longitude={72.8370584}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0161845}
                    longitude={72.8380984}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0161545}
                    longitude={72.8380284}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0161945}
                    longitude={72.8370584}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
                <Marker
                    key={'Wadala'}
                    latitude={19.0161385}
                    longitude={72.8389584}
                >
                    <button
                        className="marker-btn"
                        onClick={e => {
                            e.preventDefault();
                            // setSelectedPark(park);
                        }}
                    >
                        {/* <img src="" alt="VJTI" /> */}
                        <RoomIcon color="primary" fontSize="large"/>
                    </button>
                </Marker>
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