import { LatLng, LatLngTuple } from 'leaflet';
import { FC, useEffect, useState } from 'react';
import { getCurrentConditions } from '../../wxapi/functions';
import { ICurrentConditions } from '../../wxapi/ICurrentConditions';
import './CurrentConditions.css';

const ctof = (celsius: number|undefined): number => {
    if (!celsius) {
        return NaN;
    }

    return Math.round(celsius * 5 / 9 + 32);
}

type CurrentConditionsProps = {
    point: LatLng
}

export const CurrentConditions: FC<CurrentConditionsProps> = ({point}: CurrentConditionsProps) => {
    const [currentConditions, setCurrentConditions] = useState<ICurrentConditions | null>(null)

    useEffect(() => {
        getCurrentConditions(point.lat, point.lng).then(data => {
            console.log(data);
            setCurrentConditions(data);
        }).catch(reason => {
            console.log(reason);
            setCurrentConditions(null)
        })
    }, [point])
    return (
        <div className="current-conditions">
            Conditions Report for {currentConditions?.properties.stationName}<br />
            Temperature: {ctof(currentConditions?.properties.temperature.value)} &deg;F<br />
            <img src={currentConditions?.properties.icon} alt={currentConditions?.properties.textDescription} />
        </div>
    )
}
