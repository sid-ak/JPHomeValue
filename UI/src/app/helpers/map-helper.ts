import { AddressInfo } from '../common/address-data';
import { Constants } from '../constants';
import { CityEnum } from '../enums/city-enum';
import { AddressFilterModel } from '../models/address-filter-model';
import { FirebaseDbService } from '../services/firebase-db.service';

export class MapHelper {
  private static readonly mapElement: HTMLElement | null
    = document.querySelector(Constants.mapQuerySelector);

  constructor() { }
  
  /**
   * Hacky.
   * Credit: https://stackoverflow.com/a/42733315
   */
  public static addMapScript(
    city: CityEnum = CityEnum.None, 
    addressFilter: AddressFilterModel = new AddressFilterModel(CityEnum.None)): void {

      if(!MapHelper.mapElement) {
        document.body.appendChild(Object.assign(
          document.createElement('script'), {
            type: 'text/javascript',
            src: Constants.googleMapsUrl,
            onload: () => this.initializeMap(city, addressFilter)
          })).remove() // Bad way to have the map re-render. TODO: Need to use an Observable wrapped around this.
      }

      return;
  }

  /**
   * Initializes the map with the city or lat/lng by accessing the DOM.
   */
  private static initializeMap(city: CityEnum, addressFilter: AddressFilterModel): void {
    if (addressFilter.lat === 0 && addressFilter.lat === 0) {
      new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: this.getLatLngFromCity(city),
        zoom: 12,
        streetViewControl: false
      });
    } else {
      new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: this.getLatLngFromAddressFilter(addressFilter),
        zoom: 18,
        streetViewControl: false
      });
    }
  }

  /**
   * Gets lat and long from an AddressFilterModel.
   * @param addressFilter 
   * @returns a lat/long of type google.maps.LatLng
   */
  private static getLatLngFromAddressFilter(addressFilter: AddressFilterModel): google.maps.LatLng {
    return new google.maps.LatLng(addressFilter.lat!, addressFilter.lng!)
  }

  /**
   * Gets lat and long from the city, returns Tampa's lat and long if no match is found.
   * @param city 
   * @returns 
   */
  private static getLatLngFromCity(city: CityEnum): google.maps.LatLng {
    return new Map<CityEnum, google.maps.LatLng>([
      [CityEnum.Tampa, new google.maps.LatLng(Constants.tampaLatLng[0], Constants.tampaLatLng[1])],
      [CityEnum.StPetersburg, new google.maps.LatLng(Constants.stPeteLatLng[0], Constants.stPeteLatLng[1])],
      [CityEnum.Clearwater, new google.maps.LatLng(Constants.clearwaterLatLng[0], Constants.clearwaterLatLng[1])]
    ]).get(city) ?? new google.maps.LatLng(Constants.tampaLatLng[0], Constants.tampaLatLng[1]);
  }
}
