import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    readonly addressChanged$ = new BehaviorSubject<string>("");
}