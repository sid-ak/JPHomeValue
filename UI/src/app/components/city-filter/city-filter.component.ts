import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CityHelper } from 'src/app/helpers/city-helper';
import { CityService } from 'src/app/services/city-service';
import { CityEnum } from '../../enums/city-enum';
import { CityFilterModel } from '../../models/city-filter-model';

@Component({
  selector: 'app-city-filter',
  templateUrl: './city-filter.component.html',
  styleUrls: ['./city-filter.component.scss']
})
export class CityFilterComponent implements OnInit {
  readonly cityFilterGroup = new FormGroup({
    city: new FormControl(),
    timeframe: new FormControl(),
    walkScore: new FormControl(),
    transitScore: new FormControl(),
    bikeScore: new FormControl()
  });

  constructor(private readonly cityService: CityService) { }

  ngOnInit(): void {
  }

  public onCityChanged(city: CityEnum): void {
    this.cityService.cityChanged$.next(city);
    this.onCityFilterChanged();
  }

  public onCityFilterChanged(): void {
    this.cityService.cityFilterChanged$.next(new CityFilterModel(
      CityHelper.getCityEnum(this.cityFilterGroup.get('city')?.value),
      this.cityFilterGroup.get('timeframe')?.value,
      this.cityFilterGroup.get('walkScore')?.value,
      this.cityFilterGroup.get('transitScore')?.value,
      this.cityFilterGroup.get('bikeScore')?.value
    ));
  }
}
