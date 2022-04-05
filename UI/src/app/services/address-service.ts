import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AddressFilterModel } from "../models/address-filter-model";

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    public readonly addressFilterChanged$ = new Subject<AddressFilterModel>();
}