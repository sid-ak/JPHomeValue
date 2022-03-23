import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  public static initMap() {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: {lat: 27.964157, lng: -82.452606},
      zoom: 8
    });
    google.maps.event.trigger(map, 'resize');
  }
}
