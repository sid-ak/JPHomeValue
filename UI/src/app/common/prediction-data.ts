import { CityEnum } from "../enums/city-enum";
import { CommonHelper } from "../helpers/common-helper";

export class PredictionData {
    readonly city: CityEnum;
    readonly predictedAddresses: PredictedAddress[];

    constructor(city: CityEnum, response: Array<any>) {
        this.city = city ?? CityEnum.None;
        
        const addresses = response.map(
            obj => Object.keys(obj)[0]
        ) ?? "";
        const seriesData = response.map(
            obj => Object.values(obj)
        ) ?? "";
        const zipped = CommonHelper.zip(addresses, seriesData);

        this.predictedAddresses = zipped.map(e => new PredictedAddress(e, city));
    }
}

class PredictedAddress {
    readonly address: string;
    readonly predictions: Prediction[];

    constructor(zippedPredictedAddress: any, city: CityEnum) {

        this.address = zippedPredictedAddress[0];
        this.predictions = CommonHelper.zip(
            zippedPredictedAddress[1][0].map((e: any) => e.DATE), 
            zippedPredictedAddress[1][0].map((e: any) => e.Price),
            zippedPredictedAddress[1][0].map((e: any) => {
                switch (city) {
                    case CityEnum.Tampa: return e.TPXRSA;
                    case CityEnum.StPetersburg: return e.ATNHPIUS45300Q;
                    case CityEnum.Clearwater: return e.ATNHPIUS45300Q;
                }
            })).map(e => new Prediction(e)
        );
    }
}

class Prediction {
    readonly date: string;
    readonly price: number;
    readonly index: number

    constructor(zippedPrediction: any) {
        this.date = zippedPrediction[0];
        this.price = zippedPrediction[1];
        this.index = zippedPrediction[2];
    }
}

