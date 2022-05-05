import { CityEnum } from "../enums/city-enum";
import { CityHelper } from "../helpers/city-helper";
import { Shiller } from "./shiller";

export class SeasonalityModel {
    readonly city: CityEnum;
    readonly shiller: Shiller;
    readonly timeframe: number;

    constructor(response: any) {
        this.city = CityHelper.getCityFromString(response?.city as string);
        this.shiller = new Shiller(this.city, response?.shiller);
        this.timeframe = response?.timeframe ?? -1;
    }
}