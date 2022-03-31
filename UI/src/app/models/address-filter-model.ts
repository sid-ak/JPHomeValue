/**
 * AddressFIlter Object Model.
 */
export class AddressFilterModel {
    address: string;
    timeframe: number;
    walkScore: number;
    transitScore: number;
    bikeScore: number;

    /**
     * timeframe is in months. Only supporting 3, 6 and 12 for now.
     * walkScore, transitScore and bikeScore have range: 0-100.
     */
    constructor() {
        this.address = "";
        this.timeframe = -1;
        this.walkScore = -1;
        this.transitScore = -1;
        this.bikeScore = -1;
    }
}