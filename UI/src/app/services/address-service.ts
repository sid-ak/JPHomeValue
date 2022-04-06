import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Scores } from "../common/address-data";
import { AddressFilterModel } from "../models/address-filter-model";

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    public readonly addressFilterChanged$ = new Subject<AddressFilterModel>();
    public readonly displayScoresChanged$ = new Subject<Scores>();
}