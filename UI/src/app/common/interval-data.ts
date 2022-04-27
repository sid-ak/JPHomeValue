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

export class Interval {
    readonly trainingInterval: string;
    readonly predictionInterval: string;
    readonly shiller: Shiller;
    readonly predictionResult: PredictionResult;

    constructor(city: CityEnum, interval: any) {
        this.trainingInterval = interval.trainingInterval;
        this.predictionInterval = interval.predictionInterval;
        this.shiller = new Shiller(city, interval.series);
        this.predictionResult = new PredictionResult(
            interval.bestPrediction,
            interval.worstPrediction,
            interval.rmspe
        );
    }
}

export class PredictionResult {
    readonly bestPrediction: number;
    readonly worstPrediction: number;
    readonly rmspe: number;

    constructor(bestPrediction: number, worstPrediction: number, rmspe: number) {
        this.bestPrediction = bestPrediction;
        this.worstPrediction = worstPrediction;
        this.rmspe = rmspe;
    }
}