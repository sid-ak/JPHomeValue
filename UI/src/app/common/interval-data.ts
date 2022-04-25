import { CityEnum } from "../enums/city-enum";
import { Shiller } from "./shiller";

export class IntervalData {
    readonly city: CityEnum;
    readonly data: any;
    readonly intervals: Interval[];
    
    constructor(city: CityEnum, response?: any) {
        this.city = city;
        this.intervals = response.intervals.map(
            (e: any) => new Interval(city, e)
        );
    }
}

class Interval {
    readonly trainingInterval: string;
    readonly predictionInterval: string;
    readonly shiller: Shiller;

    constructor(city: CityEnum, interval: any) {
        this.trainingInterval = interval.trainingInterval;
        this.predictionInterval = interval.predictionInterval;
        this.shiller = new Shiller(city, interval.series);
    }
}