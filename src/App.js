import './App.css';
import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import { findRouteSrcDst } from "./route.js";

const render = (s) => {
    if (s === Status.LOADING || s === Status.FAILURE) return <h3>{s} ...</h3>;
    return null;
};

function Map ({
    children,
}) {
    const ref = useRef();
    const [map, setMap] = useState();
    const [date, setDate] = useState(new Date());
    const [route, setRoute] = useState();
    const [positions, setPositions] = useState(findRouteSrcDst(date));
    const [center, setCenter] = useState({ lat: 29.75, lng: -95.36 });
    
    const handleDateChange = () => {
        setDate(date);
        setPositions(findRouteSrcDst(date));
    };

    const handleDateDown = () => { 
        date.setDate(date.getDate() - 1);
        handleDateChange();
    };

    const handleToday = () => {
        const today = new Date();
        date.setFullYear(today.getFullYear());
        date.setMonth(today.getMonth());
        date.setDate(today.getDate());
        handleDateChange();
    };

    const handleDateUp = () => { 
        date.setDate(date.getDate() + 1);
        handleDateChange();
    };

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: center,
                zoom: 9,
                disableDefaultUI: true,
                zoomControl: true,
                scaleControl: true,
                rotateControl: true,
            }));
        }
    }, [center, map, setMap]);

    useEffect(() => {
        if (map) {
            map.panTo(center);
            map.setZoom(9);
            setMap(map);
        }
    }, [center, map, setCenter]);

    useEffect(() => {
        if (!route) {
            const src = positions.src;
            const dst = positions.dst;
            if (src === dst) {
                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ address: src }, (res, status) => {
                    if (status === 'OK') {
                        const position = res[0].geometry.location;
                        setRoute(new window.google.maps.Marker({ position }));
                        setCenter(position);
                    }
                });
            } else {
                const directionsService = new window.google.maps.DirectionsService();
                directionsService.route({ origin: src, destination: dst, travelMode: window.google.maps.TravelMode.DRIVING }, (res, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        let display = new window.google.maps.DirectionsRenderer();
                        display.setDirections(res);
                        setRoute(display);
                    }
                });
            }
        }

        return () => {
            if (route) {
                route.setMap(null)
                setRoute(null);
            }
        };
    }, [positions, setPositions, route, setRoute]);

    useEffect(() => {
        if (route) {
            route.setMap(map);
        }
    }, [map, route, setRoute]);

    return (
        <Stack>
            <InputGroup size="lg" style={{ justifyContent: 'center', "zIndex": "100"}}>
                <InputGroup.Text>{"Date: " + date.toLocaleDateString()}</InputGroup.Text>
                <Button variant="primary" onClick={handleDateDown}>Date - 1</Button>
                <Button variant="primary" onClick={handleToday}>Today's Date</Button>
                <Button variant="primary" onClick={handleDateUp}>Date + 1</Button>
            </InputGroup>
            <div style={{ top: "-50px", width: "100%", height: "100vh" }} ref={ref} id="map" />
        </Stack>
    );
    
}

function App() {
    return (
        <Wrapper apiKey={"AIzaSyCHCNDcvLp1RXfgCSZDItmBHNnPz3lblLE"} render={render}>
            <Map />
        </Wrapper>
    );
}

export default App;
