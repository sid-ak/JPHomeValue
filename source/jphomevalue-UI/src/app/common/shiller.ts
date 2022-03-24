import { NeighborhoodEnum } from "../enums/neighborhood-enum";

export class Shiller {
    dates: string[];
    indices: number[];

    constructor(response: Array<any> | null, neighborhood: NeighborhoodEnum) {
        if (response === (null || undefined)) {
            this.dates = [];
            this.indices = [];
            console.log("Response was null or undefined.")
            return;
        }
        // Map collection object to TampaShillerIndex.
        this.dates = response?.map(e => e.DATE as string) ?? [];
        switch (neighborhood) {
            case NeighborhoodEnum.Tampa:
                this.indices = response?.map(e => e.TPXRSA as number) ?? [];
            break;
            case NeighborhoodEnum.StPetersburg:
                this.indices = response?.map(e => e.ATNHPIUS45300Q as number) ?? [];
            break;
            case NeighborhoodEnum.Clearwater:
                this.indices = response?.map(e => e.ATNHPIUS45300Q as number) ?? []; // StPete and Clearwater are identical.
            break;
            case NeighborhoodEnum.None:
                this.indices = [];
            break;
            default: this.indices = [];
        }
    }
}