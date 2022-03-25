import { CityEnum } from "../enums/city-enum";

export class Shiller {
    dates: string[];
    indices: number[];

    constructor(response: Array<any> | null, neighborhood: CityEnum) {
        if (response === (null || undefined)) {
            this.dates = [];
            this.indices = [];
            console.log("Response was null or undefined.")
            return;
        }
        // Map collection object to TampaShillerIndex.
        this.dates = response?.map(e => e.DATE as string) ?? [];
        switch (neighborhood) {
            case CityEnum.Tampa:
                this.indices = response?.map(e => e.TPXRSA as number) ?? [];
            break;
            case CityEnum.StPetersburg:
                this.indices = response?.map(e => e.ATNHPIUS45300Q as number) ?? [];
            break;
            case CityEnum.Clearwater:
                this.indices = response?.map(e => e.ATNHPIUS45300Q as number) ?? []; // StPete and Clearwater are identical.
            break;
            case CityEnum.None:
                this.indices = [];
            break;
            default: this.indices = [];
        }
    }
}