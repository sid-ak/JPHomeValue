import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NeighborhoodFilterViewModel } from "../view-models/neighborhood-filter-view-model";

@Injectable({
    providedIn: 'root'
  })
  export class ChartService {

      readonly neighborhoodChanged$ = new BehaviorSubject<
        NeighborhoodFilterViewModel>(new NeighborhoodFilterViewModel());
  }