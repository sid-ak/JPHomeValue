import { Injectable } from "@angular/core";
import { noop } from "rxjs";
import { MapService } from "../services/map.service";

@Injectable({ providedIn: 'root' })
export class MapResolver {
    
  constructor() {}

  resolve() {
    // Please get your own API key for this here: https://developers.google.com/maps/documentation/javascript/get-api-key#console
    const googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyClCtv5n_qk-u3ZdDUomolWQixIw0sxQ8E&callback"
    if (!document.querySelectorAll(`[src="${googleMapsUrl}"]`).length) { 
      document.body.appendChild(Object.assign(
        document.createElement('script'), {
          type: 'text/javascript',
          src: googleMapsUrl,
          onload: () => MapService.initMap()
        })).remove();
    } else {
      noop()
    }
  }
}