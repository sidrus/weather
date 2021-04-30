import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { MapView } from '../map-view';
import { MapCurrentConditions } from '../current-conditions';
import { LatLng, Map } from 'leaflet';
import { makeStyles } from '@material-ui/core';

let watchId: number;

const useStyles = makeStyles({
    crosshair: {
        left: 'calc(50% - 1em)',
        top: 'calc(50% - 1em)',
        position: 'absolute',
        width: '2em',
        height: '2em',
        zIndex: 10000,
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: '2em',
        color: '#222',
        textShadow: '1px 1px 3px #fff'
    }
});

function App(): JSX.Element {
    const [map, setMap] = useState<Map | null>(null);
    const [position, setPosition] = useState<GeolocationPosition>();
    const displayMap = useMemo(() => {
        return <MapView
            initialLocation={new LatLng(position?.coords.latitude ?? 0, position?.coords.longitude ?? 0)}
            onWhenCreated={setMap} />;
    }, [position]);

    const classes = useStyles();

    useEffect(() => {
        watchId = navigator.geolocation.watchPosition((pos) => {
            setPosition(pos);
        }
        , (error) => {
            console.error(error);
        });

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return (
        <div className="App">
            <div className={classes.crosshair}>+</div>
            {position ? displayMap : 'Locating position...'}
            {map ? <MapCurrentConditions map={map} /> : ''}
        </div>
    );
}

export default App;
