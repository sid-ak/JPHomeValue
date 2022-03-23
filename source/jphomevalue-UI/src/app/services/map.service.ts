import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  public static initMap() {
    console.log("initMap")
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
    google.maps.event.trigger(map, 'resize');
    console.log(map);
  }
}
