export interface IStation {
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
        stationIdentifier: string,
        name: string,
        timeZone: string,
        forecast: string,
        county: string,
        fireWeatherZone: string
    }
}

export interface IStationList {
    type: string,
    features: IStation[],
    observationStations: string[]
}
