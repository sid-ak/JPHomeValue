import { CityEnum } from "../enums/city-enum";
import { CityHelper } from "../helpers/city-helper";

export class AddressData {
    readonly city: CityEnum;
    readonly addressInfoLists: AddressInfoLists;

    /**
     * Constructor that maps the address data from the DB.
     * @param response 
     * @returns 
     */
    constructor(response?: any) {
        this.city = CityHelper.getCityFromString(response?.city as string) ?? CityEnum.None;
        this.addressInfoLists = new AddressInfoLists(response?.addressData) ?? [];
    }
}

export class AddressInfoLists {
    readonly lats: number[];
    readonly lngs: number[];
    addresses: string[];
    readonly walkScores: number[];
    readonly transitScores: number[];
    readonly bikeScores: number[];

    /**
     * Constructor that maps the address info lists from address data.
     * @param response 
     * @returns 
     */
    constructor(response: Array<any>) {        
        this.lats = response?.map((e: { Lat: number; }) => e.Lat as number);
        this.lngs = response?.map((e: { Lng: number; }) => e.Lng as number);
        this.addresses = response?.map((e: { Address: string; }) => e.Address as string);
        this.walkScores = response?.map((e: { WalkScore: number; }) => e.WalkScore as number);
        this.transitScores = response?.map((e: { TransitScore: number; }) => e.TransitScore as number);
        this.bikeScores = response?.map((e: { BikeScore: number; }) => e.BikeScore as number);
    }
}

export class AddressInfo {
    readonly lat: number;
    readonly lng: number;
    readonly address: string;
    readonly walkScore: number;
    readonly transitScore: number;
    readonly bikeScore: number;

    /**
     * Constructor that maps the address info from from its zipped lists.
     * 
     * @param zippedAddressItem 
     */
    constructor (zippedAddressItem: Array<any>) {
        this.lat = zippedAddressItem[0],
        this.lng = zippedAddressItem[1],
        this.address = zippedAddressItem[2],
        this.walkScore = zippedAddressItem[3],
        this.transitScore = zippedAddressItem[4],
        this.bikeScore = zippedAddressItem[5]
    }
}

export class Scores {
    readonly walkScore?: number;
    readonly transitScore?: number;
    readonly bikeScore?: number;

    constructor(
        walkScore?: number,
        transitScore?: number,
        bikeScore?: number
    ) { 
        this.walkScore = walkScore ?? -1;
        this.transitScore = transitScore ?? -1;
        this.bikeScore = bikeScore ?? -1;
    }
}
