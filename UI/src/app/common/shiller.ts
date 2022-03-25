import { CityEnum } from "../enums/city-enum";

export class Shiller {
    dates: string[];
    indices: number[];

    constructor(response: Array<any> | null, city: CityEnum) {
        if (response === (null || undefined)) {
            this.dates = [];
            this.indices = [];
            console.log("Response was null or undefined.")
            return;
        }
        // Map index based on city.
        this.dates = response?.map(e => e.DATE as string) ?? [];
        switch (city) {
            case CityEnum.Tampa:
                this.indices = response?.map(e => e.TPXRSA as number) ?? [];
            break;
            case CityEnum.StPetersburg:
                this.indices = response?.map(e => e.ATNHPIUS45300Q as number) ?? [];
            break;
            // StPete and Clearwater identifiers are identical but leaving this case here.
            case CityEnum.Clearwater:
                this.indices = response?.map(e => e.ATNHPIUS45300Q as number) ?? [];
            break;
            case CityEnum.None:
                this.indices = [];
            break;
            default: this.indices = [];
        }
    }
}