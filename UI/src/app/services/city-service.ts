import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CityEnum } from "../enums/city-enum";
import { CityFilterModel } from "../models/city-filter-model";

@Injectable({
    providedIn: 'root'
})
export class CityService {

    readonly cityChanged$ = new Subject<CityEnum>();
    readonly cityFilterChanged$ = new Subject<CityFilterModel>();
}