import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Scores } from "../common/address-data";
import { CityEnum } from "../enums/city-enum";
import { AddressFilterModel } from "../models/address-filter-model";
import { CityFilterModel } from "../models/city-filter-model";

@Injectable({
    providedIn: 'root'
})
export class FilterEventService {

    readonly cityChanged$ = new Subject<CityEnum>();

    public readonly addressFilterChanged$ = new Subject<AddressFilterModel>();
    public readonly displayScoresChanged$ = new Subject<Scores>();

    readonly cityFilterChanged$ = new Subject<CityFilterModel>();
}