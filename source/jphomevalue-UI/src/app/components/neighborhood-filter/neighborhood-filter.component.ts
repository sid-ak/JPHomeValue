import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartService } from 'src/app/services/chart-service';
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
  
  neighborhoodFilter = new FormGroup({
    neighborhood: new FormControl(),
    timeframe: new FormControl(),
    walkScore: new FormControl(),
    transitScore: new FormControl(),
    bikeScore: new FormControl()
  })

  constructor(private readonly chartService: ChartService) { }

  ngOnInit(): void {
  }

  public onNeighborhoodFilterChanged(): void {
    this.neighborhoodVm = this.constructNeighborhoodVm(this.neighborhoodFilter);
    this.chartService.neighborhoodChanged$.next(this.neighborhoodVm);
  }

  private constructNeighborhoodVm(neighborhoodFilter: FormGroup): NeighborhoodFilterViewModel {
    if (neighborhoodFilter === (null || undefined)) return new NeighborhoodFilterViewModel();
    
    this.neighborhoodVm.neighborhood = this.getNeighborhoodEnum(neighborhoodFilter.get('neighborhood')?.value)
      ?? NeighborhoodEnum.None;
    this.neighborhoodVm.timeframe = neighborhoodFilter.get('timeframe')?.value as number ?? 0;
    this.neighborhoodVm.walkScore = neighborhoodFilter.get('walkScore')?.value as number ?? -1;
    this.neighborhoodVm.transitScore = neighborhoodFilter.get('transitScore')?.value as number ?? -1;
    this.neighborhoodVm.bikeScore = neighborhoodFilter.get('bikeScore')?.value as number ?? -1;
    return this.neighborhoodVm;
  }

  private getNeighborhoodEnum(neighborhood: string): NeighborhoodEnum {
    switch (neighborhood) {
      case "Tampa": return NeighborhoodEnum.Tampa;
      case "StPetersburg": return NeighborhoodEnum.StPetersburg;
      case "Clearwater": return NeighborhoodEnum.Clearwater;
      default: return NeighborhoodEnum.None;
    }
  }
}
