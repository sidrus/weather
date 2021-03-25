import React, { useCallback, useEffect, useState } from 'react';
import { CurrentConditions } from './CurrentConditions';
import { LatLng, Map } from 'leaflet';

type MapCurrentConditionsProps = {
    map: Map
}

export const MapCurrentConditions = ({ map }: MapCurrentConditionsProps): JSX.Element => {
    const [position, setPosition] = useState<LatLng>(map.getCenter());

    const onMove = useCallback(() => {
        setPosition(map.getCenter());
    }, [map]);

    useEffect(() => {
        map.on('moveend', onMove);
        return () => {
            map.off('moveend', onMove);
        };
    }, [map, onMove]);

    return <CurrentConditions point={position} />;
};
