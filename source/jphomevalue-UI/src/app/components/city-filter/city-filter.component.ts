import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartService } from 'src/app/services/chart-service';
import { CityEnum } from '../../enums/city-enum';
import { CityFilterViewModel } from '../../view-models/city-filter-view-model';

@Component({
  selector: 'app-city-filter',
  templateUrl: './city-filter.component.html',
  styleUrls: ['./city-filter.component.scss']
})
export class CityFilterComponent implements OnInit {
  @Input()
  cityVm = new CityFilterViewModel()
  
  cityFilter = new FormGroup({
    city: new FormControl(),
    timeframe: new FormControl(),
    walkScore: new FormControl(),
    transitScore: new FormControl(),
    bikeScore: new FormControl()
  })

  constructor(private readonly chartService: ChartService) { }

  ngOnInit(): void {
  }

  public onCityFilterChanged(): void {
    this.cityVm = this.constructCityVm(this.cityFilter);
    this.chartService.cityChanged$.next(this.cityVm);
  }

  private constructCityVm(cityFilter: FormGroup): CityFilterViewModel {
    if (cityFilter === (null || undefined)) return new CityFilterViewModel();
    
    this.cityVm.city = this.getCityEnum(cityFilter.get('city')?.value)
      ?? CityEnum.None;
    this.cityVm.timeframe = cityFilter.get('timeframe')?.value as number ?? 0;
    this.cityVm.walkScore = cityFilter.get('walkScore')?.value as number ?? -1;
    this.cityVm.transitScore = cityFilter.get('transitScore')?.value as number ?? -1;
    this.cityVm.bikeScore = cityFilter.get('bikeScore')?.value as number ?? -1;
    return this.cityVm;
  }

  private getCityEnum(city: string): CityEnum {
    switch (city) {
      case "Tampa": return CityEnum.Tampa;
      case "StPetersburg": return CityEnum.StPetersburg;
      case "Clearwater": return CityEnum.Clearwater;
      default: return CityEnum.None;
    }
  }
}
