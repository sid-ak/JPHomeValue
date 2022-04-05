/**
 * AddressFIlter Object Model.
 */
export class AddressFilterModel {
    lat?: number;
    lng?: number;
    address?: string;
    timeframe?: number;
    walkScore?: number;
    transitScore?: number;
    bikeScore?: number;

    /**
     * timeframe is in months. Only supporting 3, 6 and 12 for now.
     * walkScore, transitScore and bikeScore have range: 0-100.
     */
    constructor(
        lat?: number,
        lng?: number,
        address?: string,
        timeframe?: number,
        walkScore?: number,
        transitScore?: number,
        bikeScore?: number
    ) {
        this.lat = lat ?? 0;
        this.lng = lng ?? 0;
        this.address = address ?? "";
        this.timeframe = timeframe ?? 0;
        this.walkScore = walkScore ?? -1;
        this.transitScore = transitScore ?? -1;
        this.bikeScore = bikeScore ?? -1;
    }
}