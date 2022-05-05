export class Constants {
    // Key has been removed and must be added in place of <key>
    // static readonly googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=<key>&libraries=places";
    static readonly mapQuerySelector = `[src="${Constants.googleMapsUrl}"]`;

    // LatLngs
    static readonly tampaLatLng = [27.964157, -82.452606];
    static readonly stPeteLatLng = [27.773056, -82.639999];
    static readonly clearwaterLatLng = [27.972572, -82.796745];

    // TODO: Build URLs programmatically and get rid of redundant constants.

    // TimeframeData: Tampa
    static readonly getTampaThreeMonthsUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/TimeframeData/TampaThreeMonths.json?print=pretty";
    static readonly getTampaSixMonthsUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/TimeframeData/TampaSixMonths.json?print=pretty";
    static readonly getTampaTwelveMonthsUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/TimeframeData/TampaTwelveMonths.json?print=pretty";

    // TimeframeData: StPete
    static readonly getStPeteThreeMonthsUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/TimeframeData/StPeteThreeMonths.json?print=pretty";
    static readonly getStPeteSixMonthsUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/TimeframeData/StPeteSixMonths.json?print=pretty";
    static readonly getStPeteTwelveMonthsUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/TimeframeData/StPeteTwelveMonths.json?print=pretty";

    // TimeframeData: Clearwater
    static readonly getClearwaterThreeMonthsUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/TimeframeData/ClearwaterThreeMonths.json?print=pretty";
    static readonly getClearwaterSixMonthsUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/TimeframeData/ClearwaterSixMonths.json?print=pretty";
    static readonly getClearwaterTwelveMonthsUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/TimeframeData/ClearwaterTwelveMonths.json?print=pretty";

    // AddressData
    static readonly getTampaAddressDataUrl  = "https://jphomevalue-default-rtdb.firebaseio.com/AddressData/TampaAddressData.json?print=pretty";
    static readonly getStPeteAddressDataUrl = "https://jphomevalue-default-rtdb.firebaseio.com/AddressData/StPeteAddressData.json?print=pretty";
    static readonly getClearwaterAddressDataUrl = "https://jphomevalue-default-rtdb.firebaseio.com/AddressData/ClearwaterAddressData.json?print=pretty";
    
    // PredictionData
    static readonly getTampaPredictionDataUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Predictions/TampaPredictions.json?print=pretty";
    static readonly getStPetePredictionDataUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Predictions/StPetePredictions.json?print=pretty";
    static readonly getClearwaterPredictionDataUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Predictions/ClearwaterPredictions.json?print=pretty";

    // IntervalData
    static readonly getTampaIntervalDataUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/IntervalData/TampaIntervalData.json?print=pretty";
    static readonly getStPeteIntervalDataUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/IntervalData/StPeteIntervalData.json?print=pretty";
    static readonly getClearwaterIntervalDataUrl = "https://jphomevalue-default-rtdb.firebaseio.com/Model/IntervalData/ClearwaterIntervalData.json?print=pretty";
}
