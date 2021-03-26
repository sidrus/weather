type CurrentConditionsMeasurement = {
    value: number
    unitCode: string
    qualityControl: string
}

export interface ICurrentConditions {
    id: string,
    type: string,
    geometry: {
        type: string,
        coordinates: number[]
    },
    properties: {
        id: string,
        type: string,
        elevation: {
            value: number,
            unitCode: string
        },
        stationName: string,
        station: string,
        timestamp: string,
        rawMessage: string,
        textDescription: string,
        icon: string,
        presentWeather: [],
        temperature: CurrentConditionsMeasurement,
        dewpoint: CurrentConditionsMeasurement,
        windDirection: CurrentConditionsMeasurement,
        windSpeed: CurrentConditionsMeasurement,
        windGust: CurrentConditionsMeasurement,
        barometricPressure: CurrentConditionsMeasurement,
        seaLevelPressure: CurrentConditionsMeasurement,
        visibility: CurrentConditionsMeasurement,
        maxTemperatureLast24Hours: CurrentConditionsMeasurement,
        minTemperatureLast24Hours: CurrentConditionsMeasurement,
        precipitationLastHour: CurrentConditionsMeasurement,
        precipitationLast3Hours: CurrentConditionsMeasurement,
        precipitationLast6Hours: CurrentConditionsMeasurement,
        relativeHumidity: CurrentConditionsMeasurement,
        windChill: CurrentConditionsMeasurement,
        heatIndex: CurrentConditionsMeasurement,
        cloudLayers: [
            {
                base: {
                    value: number | null,
                    unitCode: string
                },
                amount: string
            }
        ]
    }
}
