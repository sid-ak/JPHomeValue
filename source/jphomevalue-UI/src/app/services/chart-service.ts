import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CityFilterViewModel } from "../view-models/city-filter-view-model";

@Injectable({
    providedIn: 'root'
  })
  export class ChartService {

      readonly cityChanged$ = new BehaviorSubject<
        CityFilterViewModel>(new CityFilterViewModel());
  }