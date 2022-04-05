import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CityEnum } from "../enums/city-enum";
import { CityFilterModel } from "../models/city-filter-model";

@Injectable({
    providedIn: 'root'
})
export class CityService {

    readonly cityChanged$ = new BehaviorSubject<CityEnum>(CityEnum.None);
    readonly cityFilterChanged$ = new Subject<CityFilterModel>();
}