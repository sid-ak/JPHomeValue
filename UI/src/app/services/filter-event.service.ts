import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Scores } from "../common/address-data";
import { CityEnum } from "../enums/city-enum";
import { AddressFilterModel } from "../models/address-filter-model";
import { CityFilterModel } from "../models/city-filter-model";

@Injectable({
    providedIn: 'root'
})
export class FilterEventService {

    public readonly cityChanged$ = new Subject<CityEnum>();
    public readonly cityFilterChanged$ = new Subject<CityFilterModel>();

    public readonly addressFilterChanged$ = new Subject<AddressFilterModel>();
    
    public readonly displayScoresChanged$ = new Subject<Scores>();

    public readonly isCityDashboard$ = new BehaviorSubject<boolean>(true);

}