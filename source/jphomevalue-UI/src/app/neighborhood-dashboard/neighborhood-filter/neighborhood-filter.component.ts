import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { NeighborhoodEnum } from '../../enums/neighborhood-enum';
import { NeighborhoodFilterViewModel } from '../../view-models/neighborhood-filter-view-model';

@Component({
  selector: 'app-neighborhood-filter',
  templateUrl: './neighborhood-filter.component.html',
  styleUrls: ['./neighborhood-filter.component.scss']
})
export class NeighborhoodFilterComponent implements OnInit {
  @Input()
  neighborhoodVm = new NeighborhoodFilterViewModel()

  private readonly _neighborhoodFilterChanged$ = new EventEmitter<NeighborhoodFilterViewModel>();
  @Output()
  public readonly neighborhoodFilterChanged$ = new Observable<NeighborhoodFilterViewModel>();
  
  selectedTimeframe: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  neighborhoodFilter = new FormGroup({
    neighborhood: new FormControl(),
    timeframe: new FormControl(),
    walkScore: new FormControl(),
    transitScore: new FormControl(),
    bikeScore: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
  }

  public onNeighborhoodFilterChanged(): void {
    this.neighborhoodVm = this.constructNeighborhoodVm(this.neighborhoodFilter);
    console.log(this.neighborhoodVm);
    this._neighborhoodFilterChanged$.next(this.neighborhoodVm);
  }

  private constructNeighborhoodVm(neighborhoodFilter: FormGroup): NeighborhoodFilterViewModel {
    if (neighborhoodFilter === (null || undefined)) return new NeighborhoodFilterViewModel();
    
    this.neighborhoodVm.neighborhood = neighborhoodFilter.get('neighborhood')?.value 
      ?? NeighborhoodEnum.None;
    this.neighborhoodVm.timeframe = neighborhoodFilter.get('timeframe')?.value ?? -1;
    this.neighborhoodVm.walkScore = neighborhoodFilter.get('walkScore')?.value ?? -1;
    this.neighborhoodVm.transitScore = neighborhoodFilter.get('transitScore')?.value ?? -1;
    this.neighborhoodVm.bikeScore = neighborhoodFilter.get('bikeScore')?.value ?? -1;    
    return this.neighborhoodVm;
  }
}
