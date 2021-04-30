import { LatLng } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { getCurrentConditions } from '../../wxapi/functions';
import { ICurrentConditions } from '../../wxapi/ICurrentConditions';
import Card from '@material-ui/core/Card';
import { CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';

const ctof = (celsius: number|undefined): number => {
    if (celsius === undefined) {
        return NaN;
    }

    return Math.round(celsius * 9 / 5 + 32);
};

type CurrentConditionsProps = {
    point: LatLng
}

const useStyles = makeStyles({
    root: {
        padding: '1em',
        position: 'absolute',
        top: '2em',
        right: '2em',
        height: '50vh',
        width: '25vw',
        zIndex: 1000,
        backgroundColor: 'rgba(64, 64, 64, 0.85)',
        color: '#DDD'
    }
});

export const CurrentConditions = ({point}: CurrentConditionsProps): JSX.Element => {
    const [currentConditions, setCurrentConditions] = useState<ICurrentConditions | null>(null);
    const classes = useStyles();

    useEffect(() => {
        getCurrentConditions(point.lat, point.lng).then(data => {
            console.log(data);
            setCurrentConditions(data);
        }).catch(reason => {
            console.log(reason);
            setCurrentConditions(null);
        });
    }, [point]);

    if (currentConditions) {
        const {
            temperature,
            relativeHumidity,
            icon,
            textDescription,
            stationName
        } = currentConditions.properties;

        return (
            <Card className={classes.root} elevation={6}>
                <CardHeader title="Current Conditions Report" />
                <CardContent>
                    <Typography>{stationName}</Typography>
                    <Typography>Temperature: {ctof(temperature.value)} &deg;F</Typography>
                    <Typography>Humidity: {Math.round(relativeHumidity.value)}%</Typography>
                    <img src={icon} alt={textDescription} />
                </CardContent>
            </Card>
        );
    } else {
        return (
            <Card className={classes.root} elevation={6}>
                <CardHeader title="Error" />
                <CardContent>
                    <Typography>Encountered an error while retrieving current conditions.</Typography>
                </CardContent>
            </Card>
        );
    }
};
