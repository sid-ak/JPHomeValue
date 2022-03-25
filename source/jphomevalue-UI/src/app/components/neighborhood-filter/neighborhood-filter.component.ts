import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartService } from 'src/app/services/chart-service';
import { CityEnum } from '../../enums/city-enum';
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
    
    this.neighborhoodVm.neighborhood = this.getCityEnum(neighborhoodFilter.get('neighborhood')?.value)
      ?? CityEnum.None;
    this.neighborhoodVm.timeframe = neighborhoodFilter.get('timeframe')?.value as number ?? 0;
    this.neighborhoodVm.walkScore = neighborhoodFilter.get('walkScore')?.value as number ?? -1;
    this.neighborhoodVm.transitScore = neighborhoodFilter.get('transitScore')?.value as number ?? -1;
    this.neighborhoodVm.bikeScore = neighborhoodFilter.get('bikeScore')?.value as number ?? -1;
    return this.neighborhoodVm;
  }

  private getCityEnum(neighborhood: string): CityEnum {
    switch (neighborhood) {
      case "Tampa": return CityEnum.Tampa;
      case "StPetersburg": return CityEnum.StPetersburg;
      case "Clearwater": return CityEnum.Clearwater;
      default: return CityEnum.None;
    }
  }
}
