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
}