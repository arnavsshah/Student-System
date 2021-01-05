import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import RoomIcon from '@material-ui/icons/Room';
// import { GeoJSONLayer } from "react-mapbox-gl";
// import PolylineOverlay from './polyline'
// import MapboxGL from '@mapbox/react-native-mapbox-gl';
// const { mapbox_api } = require('../../../../config/env_vars');
const mapbox_api = "pk.eyJ1IjoiY2VkcmljZGlnZ29yeSIsImEiOiJja2lleWtuN2gwZW5xMnlxdXN6OHEycHpzIn0.tctm36B4zOZyPCaZV3SD5A"
export default function ProfileMap(props) {
    console.log("gg", props.maps)
    const [viewport, setViewport] = useState({
        latitude: 19.022480,
        longitude: 72.855026,
        width: props.width,
        height: props.height,
        zoom: 4
    });
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedInstitute, setSelectedInstitute] = useState(null);
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
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
                
                {props.maps.institutes.map((m)=>{
                    if( m.instituteLocation.latitude !== undefined ){
                        return (
                            <Marker
                                key={m.institute.name}
                                latitude={m.instituteLocation.latitude}
                                longitude={m.instituteLocation.longitude}
                            >
                                <button
                                    className="marker-btn"
                                    onClick={e => {
                                        e.preventDefault();
                                        setSelectedInstitute(m);
                                    }}
                                >
                                    <RoomIcon color="primary" fontSize="large" />
                                </button>
                            </Marker>
                        )
                    }
                })
                }
                {props.maps.companies.map((m)=>{
                        if( m.companyLocation.latitude !== undefined ){
                            return (
                                <Marker
                                    key={m.company.name}
                                    latitude={m.companyLocation.latitude}
                                    longitude={m.companyLocation.longitude}
                                >
                                    <button
                                        className="marker-btn"
                                        onClick={e => {
                                            e.preventDefault();
                                            setSelectedCompany(m);
                                        }}
                                    >
                                        <RoomIcon color="primary" fontSize="large" />
                                    </button>
                                </Marker>
                            )
                        }
                    }
                )}

             {/* for company */}
             {selectedCompany ? (
                    <Popup
                        latitude={selectedCompany.companyLocation.latitude}
                        longitude={selectedCompany.companyLocation.longitude}
                        onClose={() => {
                            setSelectedCompany(null);
                        }}
                    >
                        <div>
                            <h2><strong>Company</strong></h2>
                            <h4>Name: {selectedCompany.company.name}</h4>
                            <h4>Website: {selectedCompany.company.website}</h4>
                            <h4>Field: {selectedCompany.company.field}</h4>
                        </div>
                    </Popup>
                ) : null}
                {/* for institute */}
                {selectedInstitute ? (
                    <Popup
                        latitude={selectedInstitute.instituteLocation.latitude}
                        longitude={selectedInstitute.instituteLocation.longitude}
                        onClose={() => {
                            setSelectedInstitute(null);
                        }}
                    >
                        <div>
                            <h2><strong>Institute</strong></h2>
                            <h4>Name: {selectedInstitute.institute.name}</h4>
                            <h4>Degree: {selectedInstitute.institute.degree}</h4>
                        </div>
                    </Popup>
                ) : null}
                
              





            </ReactMapGL>
        </div>
    );
}