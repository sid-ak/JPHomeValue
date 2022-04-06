import { AddressData, AddressInfo, Scores } from "../common/address-data";
import { CommonHelper } from "./common-helper";

export class AddressDataHelper {
    
    /**
     * Zips address data from the DB and returns an array of AddressInfos. 
     * @param addressData 
     * @returns 
     */
    public static getAddressInfoArray(addressData: AddressData): AddressInfo[] {
        const zippedAddressData = CommonHelper.zip(
            addressData.addressInfoLists.lats, 
            addressData.addressInfoLists.lngs, 
            addressData.addressInfoLists.addresses,
            addressData.addressInfoLists.walkScores,
            addressData.addressInfoLists.transitScores,
            addressData.addressInfoLists.bikeScores);
        
        const addressInfoArray: AddressInfo[] = []
        zippedAddressData.forEach(e => addressInfoArray.push(new AddressInfo(e)));

        return addressInfoArray;
    }

    public static getScores(filteredAddressInfo?: AddressInfo): Scores {
        let scores = new Scores();
        
        if (filteredAddressInfo) {
            scores = {
                walkScore: filteredAddressInfo.walkScore ?? null,
                transitScore: filteredAddressInfo.transitScore ?? null,
                bikeScore: filteredAddressInfo.bikeScore ?? null
            }
        }
        
        return scores;
    }
}