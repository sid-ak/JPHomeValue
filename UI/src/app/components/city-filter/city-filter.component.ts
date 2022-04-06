import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CityHelper } from 'src/app/helpers/city-helper';
import { FilterEventService } from 'src/app/services/filter-event.service';
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
  });

  constructor(private readonly filterEventService: FilterEventService) { }

  ngOnInit(): void {
  }

  public onCityChanged(city: CityEnum): void {
    this.filterEventService.cityChanged$.next(city);
    this.onCityFilterChanged();
  }

  public onCityFilterChanged(): void {
    this.filterEventService.cityFilterChanged$.next(new CityFilterModel(
      CityHelper.getCityFromString(this.cityFilterGroup.get('city')?.value),
      this.cityFilterGroup.get('timeframe')?.value,
    ));
  }
}
