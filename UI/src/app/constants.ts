export class Constants {
    static readonly googleMapsUrl: string = "https://maps.googleapis.com/maps/api/js?key=AIzaSyClCtv5n_qk-u3ZdDUomolWQixIw0sxQ8E";
    static readonly mapQuerySelector: string = `[src="${Constants.googleMapsUrl}"]`;

    // Tampa
    static readonly getTampaThreeMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/Model/TampaThreeMonths.json?print=pretty`;
    static readonly getTampaSixMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/Model/TampaSixMonths.json?print=pretty`;
    static readonly getTampaTwelveMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/Model/TampaTwelveMonths.json?print=pretty`;

    static readonly tampaLatLng = [27.964157, -82.452606];
    
    // St. Pete
    static readonly getStPeteThreeMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/Model/StPeteThreeMonths.json?print=pretty`;
    static readonly getStPeteSixMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/Model/StPeteSixMonths.json?print=pretty`;
    static readonly getStPeteTwelveMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/Model/StPeteTwelveMonths.json?print=pretty`;

    static readonly stPeteLatLng = [27.773056, -82.639999];
    
    // Clearwater
    static readonly getClearwaterThreeMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/Model/ClearwaterThreeMonths.json?print=pretty`;
    static readonly getClearwaterSixMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/Model/ClearwaterSixMonths.json?print=pretty`;
    static readonly getClearwaterTwelveMonthsUrl: string = `https://jphomevalue-default-rtdb.firebaseio.com/Model/ClearwaterTwelveMonths.json?print=pretty`;
    
    static readonly clearwaterLatLng = [27.972572, -82.796745];
}