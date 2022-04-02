import { AddressData, AddressInfo } from "../common/address-data";
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
}