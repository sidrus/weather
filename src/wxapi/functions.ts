import { IPointInfo } from './IPointInfo';
import axios from 'axios';
import { ICurrentConditions } from './ICurrentConditions';
import { IStationList } from './IStationList';

const isValidLatitude = (lat: number): boolean => lat >= -90 && lat <= 90;
const isValidLongitude = (lng: number): boolean => lng >= -180 && lng <= 180;
const isValidLatLng = (lat: number, lng: number): boolean => isValidLatitude(lat) && isValidLongitude(lng);

export const getPointInfo = async (lat: number, lng: number): Promise<IPointInfo> => {
    const reqUri = `https://api.weather.gov/points/${lat},${lng}`;
    const response = await axios.get(reqUri);
    return response.data as IPointInfo;
};

export const getStations = async (pointInfo: IPointInfo): Promise<IStationList> => {
    const { gridId, gridX, gridY } = pointInfo.properties;
    const reqUri = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/stations`;
    const result = await axios.get(reqUri);
    return result.data;
};

export const getCurrentConditions = async (lat: number, lng: number): Promise<ICurrentConditions> => {
    if (!isValidLatLng(lat, lng)) {
        throw new Error(`Invalid LatLng: ${lat}, ${lng}`);
    }

    const pi = await getPointInfo(lat,lng);
    const stationList = await getStations(pi);
    const selectedStation = stationList.features[0].properties;

    const reqUri = `https://api.weather.gov/stations/${selectedStation.stationIdentifier}/observations/latest?require_qc=false`;
    const response = await axios.get(reqUri);
    const cond: ICurrentConditions = response.data;
    cond.properties.stationName = selectedStation.name;
    return cond;
};
