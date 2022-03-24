export class TampaShillerIndex {
    dates: string[];
    indices: number[];

    constructor(response: Array<any> | null) {
        if (response === (null || undefined)) {
            this.dates = [];
            this.indices = [];
            console.log("Response was null or undefined.")
        }
        // Map collection object to TampaShillerIndex.
        this.dates = response?.map(e => e.DATE as string) ?? [];
        this.indices = response?.map(e => e.TPXRSA as number) ?? [];
    }
}