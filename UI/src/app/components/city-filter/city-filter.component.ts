import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CityHelper } from 'src/app/helpers/city-helper';
import { ChartService } from 'src/app/services/chart-service';
import { CityEnum } from '../../enums/city-enum';
import { CityFilterModel } from '../../models/city-filter-model';

@Component({
  selector: 'app-city-filter',
  templateUrl: './city-filter.component.html',
  styleUrls: ['./city-filter.component.scss']
})
export class CityFilterComponent implements OnInit {
  @Input()
  cityVm = new CityFilterModel()
  
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

  private constructCityVm(cityFilter: FormGroup): CityFilterModel {
    if (cityFilter === (null || undefined)) return new CityFilterModel();
    
    this.cityVm.city = CityHelper.getCityEnum(cityFilter.get('city')?.value)
      ?? CityEnum.None;
    this.cityVm.timeframe = cityFilter.get('timeframe')?.value as number ?? 0;
    this.cityVm.walkScore = cityFilter.get('walkScore')?.value as number ?? -1;
    this.cityVm.transitScore = cityFilter.get('transitScore')?.value as number ?? -1;
    this.cityVm.bikeScore = cityFilter.get('bikeScore')?.value as number ?? -1;
    return this.cityVm;
  }
}
