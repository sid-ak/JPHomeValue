import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CityHelper } from 'src/app/helpers/city-helper';
import { FilterEventService } from 'src/app/services/filter-event.service';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
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
    interval: new FormControl(),
  });

  
  intervals = [""];

  constructor(
    private readonly filterEventService: FilterEventService,
    private readonly dbService: FirebaseDbService) { }

  ngOnInit(): void {
  }

  public async onCityChanged(city: CityEnum): Promise<void> {
    this.filterEventService.cityChanged$.next(city);
    
    const intervalData = await this.dbService.getIntervalData(city);
    this.intervals = intervalData.intervals.map(
      e => e.trainingInterval
    );
    
    this.onCityFilterChanged();
  }

  public onCityFilterChanged(): void {
    this.filterEventService.cityFilterChanged$.next(new CityFilterModel(
      CityHelper.getCityFromString(this.cityFilterGroup.get('city')?.value),
      this.cityFilterGroup.get('timeframe')?.value,
      this.cityFilterGroup.get('interval')?.value ?? ""
    ));
  }
}
