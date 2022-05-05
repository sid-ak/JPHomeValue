import { Constants } from '../constants';
import { CityEnum } from '../enums/city-enum';
import { AddressFilterModel } from '../models/address-filter-model';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { AddressInfo } from '../common/address-data';

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
          })).remove() 
          // Bad way to have the map re-render. TODO: Need to use an Observable wrapped around this.
      }

      return;
  }

  /**
   * Initializes the map with the city or lat/lng by accessing the DOM.
   * 
   * TODO: Make branching logic more efficient and usable.
   * The address markers require an input address before they can display, they shouldn't.
   */
  private static initializeMap(
    city: CityEnum, 
    addressFilter: AddressFilterModel): void {

    // Initialize with city.
    if (addressFilter.lat === 0 && addressFilter.lat === 0) {
      new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: this.getLatLngFromCity(city),
        zoom: 12,
        streetViewControl: false
      });
      
      // Initialize with lat/lng.
    } else {
      const addressLatLng = this.getLatLngFromAddressFilter(addressFilter);

      // Initialization for when address markers do not need to be shown.
      if (!addressFilter.showAddressMarkers) {
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          center: addressLatLng,
          zoom: addressFilter.showSurroundings ? 15 : 20,
          streetViewControl: false,
          mapTypeId: addressFilter.showSurroundings ? 'roadmap' : 'satellite'
        });

        // Set a single marker.
        new google.maps.Marker({
          position: addressLatLng,
          map,
          title: addressFilter.address
        });

        // Initialization for when address markers do need to be shown.
      } else if (addressFilter.showAddressMarkers 
          || (addressFilter.showAddressMarkers && addressFilter.showSurroundings)) {
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          center: this.getLatLngFromCity(city),
          zoom: 11,
          streetViewControl: false,
          mapTypeId: 'roadmap'
        });

        // Set multiple markers.
        const markers = addressFilter.addressMarkers!.map((position) => {
          const marker = new google.maps.Marker({
            position: { lat: position.lat(), lng: position.lng() }
          });

          return marker;
        });

        // Construct and instantiate a cluster for visualization.
        new MarkerClusterer({ markers, map })
      }
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
   * @returns a lat/long of type google.maps.LatLng
   */
  private static getLatLngFromCity(city: CityEnum): google.maps.LatLng {
    return new Map<CityEnum, google.maps.LatLng>([
      [CityEnum.Tampa, new google.maps.LatLng(Constants.tampaLatLng[0], Constants.tampaLatLng[1])],
      [CityEnum.StPetersburg, new google.maps.LatLng(Constants.stPeteLatLng[0], Constants.stPeteLatLng[1])],
      [CityEnum.Clearwater, new google.maps.LatLng(Constants.clearwaterLatLng[0], Constants.clearwaterLatLng[1])]
    ]).get(city) ?? new google.maps.LatLng(Constants.tampaLatLng[0], Constants.tampaLatLng[1]);
  }

  /**
   * Gets an array of type google.maps.LatLng from an array of AddressInfo.
   * @param addressInfos is an array of type AddressInfo.
   * @returns an array of type google.maps.LatLng
   */
  public static getLatLngArrayFromAddressInfos(
    addressInfos: AddressInfo[]): google.maps.LatLng[] {
      let latLngArray: google.maps.LatLng[] = [];

    addressInfos.map(
      e => latLngArray.push(new google.maps.LatLng(e.lat, e.lng))
    );

    return latLngArray;
  }
}
