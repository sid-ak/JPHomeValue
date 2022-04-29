import { CommonHelper } from "./common-helper";

/**
 * This class essentially helps with array destructuring for 
 * data export/download.
 * TODO: Find better ways.
 */
export class DataExportHelper {
    public static getForecastData(shillerData: any): Shiller[] {
        const dates = Object.values(shillerData)[0];
        const indices = Object.values(shillerData)[1];
        const zipped = CommonHelper.zip(dates, indices);
        
        // Basically Shiller.
        const forecastExport = zipped.map(
          e => {return {date: e[0], index: e[1]}}
        )
    
        return forecastExport;
    }
    
    public static getRmseData(...filterData: any): RmseExport[]
    {
        const filter = filterData[0];
        const rmseData = filterData[1];

        const rmseExport = {
            ...filter,
            ...rmseData
        }

        return [rmseExport];
    }
}

interface Shiller {
    date: string,
    index: number
}

interface RmseExport {
    city: string;
    timeframe: number;
    trainingInterval: number;
    predictionInterval: number;
    bestPrediction: number;
    worstPrediction: number;
    rmspe: number;
}