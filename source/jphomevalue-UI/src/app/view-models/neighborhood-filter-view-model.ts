import { NeighborhoodEnum } from "../enums/neighborhood-enum";

/**
 * The query structure for the backend.
 */
export class NeighborhoodFilterViewModel {
    neighborhood: NeighborhoodEnum;
    timeframe: number;
    walkScore: number;
    transitScore: number;
    bikeScore: number;

    /**
     * neighborhood would be Tampa, St. Pete and Clearwater as enums.
     * timeframe is in months. Only supporting 3, 6 and 12 for now.
     * walkScore, transitScore and bikeScore have range: 0-100.
     */
    constructor() {
        this.neighborhood = NeighborhoodEnum.None;
        this.timeframe = 0;
        this.walkScore = -1;
        this.transitScore = -1;
        this.bikeScore = -1;
    }
}