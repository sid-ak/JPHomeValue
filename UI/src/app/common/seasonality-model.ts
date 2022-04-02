import { CityEnum } from "../enums/city-enum";
import { CityHelper } from "../helpers/city-helper";
import { Shiller } from "./shiller";

export class SeasonalityModel {
    readonly city: CityEnum;
    readonly shiller: Shiller;
    readonly timeframe: number;

    constructor(response: any | null) {
        if (response === (null || undefined)) {
            this.city = CityEnum.None;
            this.shiller = new Shiller(CityEnum.None);
            this.timeframe = -1;
            console.log("The requested model was null or undefined.")
            return;
        }
        this.city = CityHelper.getCityEnum(response?.city as string) ?? CityEnum.None;
        this.shiller = new Shiller(this.city, response?.shiller) ?? new Shiller(CityEnum.None);
        this.timeframe = response?.timeframe ?? -1;
    }
}