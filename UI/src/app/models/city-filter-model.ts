import { CityEnum } from "../enums/city-enum";

/**
 * CityFilter Object Model
 */
export class CityFilterModel {
    city?: CityEnum;
    timeframe?: number;
    walkScore?: number;
    transitScore?: number;
    bikeScore?: number;

    /**
     * City would be Tampa, St. Pete and Clearwater as enums.
     * timeframe is in months. Only supporting 3, 6 and 12 for now.
     * walkScore, transitScore and bikeScore have range: 0-100.
     */
    constructor(
        city?: CityEnum,
        timeframe?: number,
        walkScore?: number,
        transitScore?: number,
        bikeScore?: number
    ) {
        this.city = city ?? CityEnum.None;
        this.timeframe = timeframe ?? 0;
        this.walkScore = walkScore ?? -1;
        this.transitScore = transitScore ?? -1;
        this.bikeScore = bikeScore ?? -1;
    }
}