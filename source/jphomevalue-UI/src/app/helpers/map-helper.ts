import { Constants } from '../constants';

export class MapHelper {
  private static readonly mapElement: Element | null
    = document.querySelector(Constants.mapQuerySelector);

  constructor() { }
  
  /**
   * Hacky.
   * Credit: https://stackoverflow.com/a/42733315
   */
  public static addMapScript(): void {
    if(!MapHelper.mapElement) {
      document.body.appendChild(Object.assign(
        document.createElement('script'), {
          type: 'text/javascript',
          src: Constants.googleMapsUrl,
          onload: () => MapHelper.initializeMap()
        })).remove() // Bad way to have the map re-render. TODO: Need to use an Observable wrapped around this.
    }
    return;
  }

  /**
   * Initializes the map by accessing the DOM.
   */
  private static initializeMap(): void {
    new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: {lat: 27.964157, lng: -82.452606}, // The Tampa lat and lng.
      zoom: 8
    });
  }
}
