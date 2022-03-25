import { CityEnum } from "../enums/city-enum";

export class CityHelper {
    
    /**
     * Gets a City enum from its string representation.
     */
    public static getCityEnum(city: string): CityEnum {
        switch (city) {
          case "Tampa": return CityEnum.Tampa;
          case "StPetersburg": return CityEnum.StPetersburg;
          case "Clearwater": return CityEnum.Clearwater;
          default: return CityEnum.None;
        }
    }
}