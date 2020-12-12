import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomIcon from '@material-ui/icons/Room';
import {dataLayer} from './map-style.js';
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
                    key={'Dadar1'}
                    latitude={19.024799}
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
                    key={'Wadala1'}
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
                    key={'Wadala2'}
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
                    key={'Wadala3'}
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
                    key={'Wadala4'}
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
                    key={'Wadala5'}
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
                    key={'Wadala6'}
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
                    key={'Wadala7'}
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
                    key={'Wadala8'}
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
                    key={'Wadala9'}
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
                    key={'Wadala10'}
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
                    key={'Wadala11'}
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
                    key={'Wadala12'}
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
                    key={'Wadala13'}
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
                
                <Marker
                    key={'Wadala14'}
                    latitude={19.024799}
                    longitude={72.843762}
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
                    key={'Wadala15'}
                    latitude={19.023236}
                    longitude={72.850328}
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
                    key={'Wadala16'}
                    latitude={19.02005}
                    longitude={72.859641}
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
                    key={'Wadala17'}
                    latitude={19.011102}
                    longitude={72.841402}
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
                    key={'Wadala18'}
                    latitude={19.00897}
                    longitude={72.819301}
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
                    key={'Wadala19'}
                    latitude={18.991663}
                    longitude={72.820545}
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
                    key={'Wadala20'}
                    latitude={18.987258}
                    longitude={72.848741}
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
                    key={'Wadala21'}
                    latitude={19.013953}
                    longitude={72.829686}
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
                    key={'Wadala22'}
                    latitude={19.010331}
                    longitude={72.836402}
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
                    key={'Wadala23'}
                    latitude={19.009995}
                    longitude={72.848655}
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
                    key={'Wadala24'}
                    latitude={19.002153}
                    longitude={72.848676}
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
                    key={'Wadala25'}
                    latitude={18.997071}
                    longitude={72.834879}
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
                    key={'Wadala26'}
                    latitude={18.993326}
                    longitude={72.826918}
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
                    key={'Wadala27'}
                    latitude={18.980238}
                    longitude={72.83284}
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
                    key={'Wadala28'}
                    latitude={18.96165}
                    longitude={72.816361}
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
                    key={'Wadala93'}
                    latitude={18.974962}
                    longitude={72.833742}
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