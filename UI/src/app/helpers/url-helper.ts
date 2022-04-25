import { Constants } from "../constants";
import { CityEnum } from "../enums/city-enum";

export class UrlHelper {

    /**
     * Gets the the DB URL for the seasonality forecast model from the city and timeframe.
     * Returns an empty string if no match is found.
     * @param city 
     * @param timeframe 
     * @returns 
     */

    // TODO: There has to be a better way to get a tuple key match without converting
    // to string on every instance.
    public static getModelUrl(city: CityEnum, timeframe: number): string {
        return new Map<string, string>([
            [[CityEnum.Tampa, 3].toString(), Constants.getTampaThreeMonthsUrl],
            [[CityEnum.Tampa, 6].toString(), Constants.getTampaSixMonthsUrl],
            [[CityEnum.Tampa, 12].toString(), Constants.getTampaTwelveMonthsUrl],
            [[CityEnum.StPetersburg, 3].toString(), Constants.getStPeteThreeMonthsUrl],
            [[CityEnum.StPetersburg, 6].toString(), Constants.getStPeteSixMonthsUrl],
            [[CityEnum.StPetersburg, 12].toString(), Constants.getStPeteTwelveMonthsUrl],
            [[CityEnum.Clearwater, 3].toString(), Constants.getClearwaterThreeMonthsUrl],
            [[CityEnum.Clearwater, 6].toString(), Constants.getClearwaterSixMonthsUrl],
            [[CityEnum.Clearwater, 12].toString(), Constants.getClearwaterTwelveMonthsUrl]
        ]).get([city, timeframe].toString()) ?? "";
    }

    /**
     * Gets the DB URL for address data from the city.
     * Returns an empty string if no match is found.
     * @param city 
     * @returns 
     */
    public static getAddressDataUrl(city: CityEnum): string {
        return new Map<CityEnum, string>([
            [CityEnum.Tampa, Constants.getTampaAddressDataUrl],
            [CityEnum.StPetersburg, Constants.getStPeteAddressDataUrl],
            [CityEnum.Clearwater, Constants.getClearwaterAddressDataUrl]
        ]).get(city) ?? "";
    }

    /**
     * Gets the DB URL for prediction data from the city.
     * Returns an empty string if no match is found.
     * @param city 
     * @returns 
     */
    public static getPredictionDataUrl(city: CityEnum): string {
        return new Map<CityEnum, string>([
            [CityEnum.Tampa, Constants.getTampaPredictionDataUrl],
            [CityEnum.StPetersburg, Constants.getStPetePredictionDataUrl],
            [CityEnum.Clearwater, Constants.getClearwaterPredictionDataUrl]
        ]).get(city) ?? "";
    }

    /**
     * Gets the DB URL for interval data from the city.
     * Returns an empty string if no match is found.
     * @param city 
     * @returns 
     */
     public static getIntervalDataUrl(city: CityEnum): string {
        return new Map<CityEnum, string>([
            [CityEnum.Tampa, Constants.getTampaIntervalDataUrl],
            [CityEnum.StPetersburg, Constants.getStPeteIntervalDataUrl],
            [CityEnum.Clearwater, Constants.getClearwaterIntervalDataUrl]
        ]).get(city) ?? "";
    }
}   