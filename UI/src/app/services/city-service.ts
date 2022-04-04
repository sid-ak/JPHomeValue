import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CityFilterModel } from "../models/city-filter-model";

@Injectable({
    providedIn: 'root'
})
export class CityService {

    readonly cityChanged$ = new BehaviorSubject<CityFilterModel>(
      new CityFilterModel());
}