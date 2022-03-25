import { Injectable } from "@angular/core";
import { MapHelper } from "../helpers/map-helper";

@Injectable({ providedIn: 'root' })
export class MapResolver {
    
  constructor() {}

  resolve(): void {
    MapHelper.addMapScript()
  }
}