import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomIcon from '@material-ui/icons/Room';
import { dataLayer } from './map-style.js';
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
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedInstitute, setSelectedInstitute] = useState(null);
    // console.log("NOO",props.mapData);
    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedStudent(null);
                setSelectedCompany(null);
                setSelectedInstitute(null);
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
                // width="100%"
                // height="100%"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
                {props.mapData.map((data) => {
                    if( data.student.name !== undefined ){
                        console.log("studen qury",data.studentLocation)
                        return (
                            <Marker
                                key={data.student.name}
                                latitude={data.studentLocation.latitude}
                                longitude={data.studentLocation.longitude}
                            >
                                <button
                                    className="marker-btn"
                                    onClick={e => {
                                        e.preventDefault();
                                        setSelectedStudent(data);
                                    }}
                                >
                                    <RoomIcon color="primary" fontSize="large" />
                                </button>
                            </Marker>
                        )
                    }
                    else if( data.company.name !== undefined ){
                        return (
                            <Marker
                                key={data.company.name}
                                latitude={data.companyLocation.latitude}
                                longitude={data.companyLocation.longitude}
                            >
                                <button
                                    className="marker-btn"
                                    onClick={e => {
                                        e.preventDefault();
                                        setSelectedCompany(data);
                                    }}
                                >
                                    <RoomIcon color="primary" fontSize="large" />
                                </button>
                            </Marker>
                        )
                    }
                    else if( data.institute.name !== undefined ){
                        return (
                            <Marker
                                key={data.institute.name}
                                latitude={data.instituteLocation.latitude}
                                longitude={data.instituteLocation.longitude}
                            >
                                <button
                                    className="marker-btn"
                                    onClick={e => {
                                        e.preventDefault();
                                        setSelectedInstitute(data);
                                    }}
                                >
                                    <RoomIcon color="primary" fontSize="large" />
                                </button>
                            </Marker>
                        )
                    }
                    
                })
                }

                {/* for student */}
                {selectedStudent ? (
                    <Popup
                        latitude={selectedStudent.studentLocation.latitude}
                        longitude={selectedStudent.studentLocation.longitude}
                        onClose={() => {
                            setSelectedStudent(null);
                        }}
                    >
                        <div>
                            <h2><strong>Student</strong></h2>
                            <h4>Name: {selectedStudent.student.name}</h4>
                            <h4>Email: {selectedStudent.student.email}</h4>
                            <h4>Department: {selectedStudent.student.department}</h4>
                        </div>
                    </Popup>
                ) : null}
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