import React, { useMemo, useState } from 'react';
import './App.css';
import { MapView } from '../map-view'
import { MapCurrentConditions } from '../current-conditions';
import { LatLng, Map } from 'leaflet';

function App() {
    const [map, setMap] = useState<Map | null>(null);
    const displayMap = useMemo(() => <MapView initialLocation={new LatLng(31.54721611257426, -110.22094826016131)} onWhenCreated={setMap}/>, []);

    console.log(map);

    return (
        <div className="App">
            {displayMap}
            {map ? <MapCurrentConditions map={map} /> : ""}
        </div>
    );
}

export default App;
