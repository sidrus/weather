import React, { FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLng, Map } from 'leaflet';
import './MapView.css'

type MapProps = {
    initialLocation: LatLng
    onWhenCreated?: (map: Map) => void;
}

export const MapView : FC<MapProps> = ({initialLocation, onWhenCreated}) =>
{
    const createdHandler = (map: Map) => {
        if (onWhenCreated) {
            onWhenCreated(map);
        }
    }

    return (
        <MapContainer className="map" center={initialLocation} zoom={10} scrollWheelZoom={true} whenCreated={createdHandler}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={initialLocation}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}
