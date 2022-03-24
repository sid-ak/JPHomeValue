export class Constants {
    static readonly googleMapsUrl: string = "https://maps.googleapis.com/maps/api/js?key=AIzaSyClCtv5n_qk-u3ZdDUomolWQixIw0sxQ8E";
    static readonly mapQuerySelector: string = `[src="${Constants.googleMapsUrl}"]`;

    // Tampa
    static readonly getTampaThreeMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/TampaThreeMonths/shiller.json?print=pretty`;
    static readonly getTampaSixMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/TampaSixMonths/shiller.json?print=pretty`;
    static readonly getTampaTwelveMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/TampaTwelveMonths/shiller.json?print=pretty`;
}