import './App.css';
import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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

    const handleToday = () => {
        const today = new Date();
        date.setTime(today.getTime());
        handleDateChange();
    };

    const handleDateDelta = (d) => { 
        date.setDate(date.getDate() + d);
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
        <Container fluid>
            <Row>
                <div style={{ top: "0", width: "100vw", height: "100vh" }} ref={ref} id="map" />
            </Row>
            <Row style={{ position: "relative", top: "-100vh" }}>
                <InputGroup style={{ justifyContent: 'center', "zIndex": "100"}}>
                    <InputGroup.Text className="border border-top-0 border-light">{date.toLocaleDateString()}</InputGroup.Text>
                    <Button className="border border-top-0 border-light" variant="primary" onClick={handleDateDelta.bind(null, -7)}>-7</Button>
                    <Button className="border border-top-0 border-light" variant="primary" onClick={handleDateDelta.bind(null, -1)}>-1</Button>
                    <Button className="border border-top-0 border-light" variant="primary" onClick={handleToday}>Today</Button>
                    <Button className="border border-top-0 border-light" variant="primary" onClick={handleDateDelta.bind(null, 1)}>+1</Button>
                    <Button className="border border-top-0 border-light" variant="primary" onClick={handleDateDelta.bind(null, 7)}>+7</Button>
                </InputGroup>
            </Row>
        </Container>
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
