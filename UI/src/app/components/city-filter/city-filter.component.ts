import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Interval, IntervalData, PredictionResult } from 'src/app/common/interval-data';
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

  intervalData!: IntervalData;
  intervals = [""];
  predictionResult: PredictionResult = new PredictionResult(0, 0, 0);

  predictionInterval = "";

  constructor(
    private readonly filterEventService: FilterEventService,
    private readonly dbService: FirebaseDbService) { }

  ngOnInit(): void {
  }

  public async onCityChanged(city: CityEnum): Promise<void> {
    this.filterEventService.cityChanged$.next(city);
    
    this.intervalData = await this.dbService.getIntervalData(city);
    this.intervals = this.intervalData.intervals.map(
      e => e.trainingInterval
    );
    this.cityFilterGroup.get('interval')?.setValue(null);
    this.onCityFilterChanged();
  }

  public onCityFilterChanged(): void {
    if (!this.cityFilterGroup.get('interval')?.value) {
      this.filterEventService.predictionResultChanged$.next(
        new PredictionResult(0, 0, 0));
    }
    
    this.filterEventService.cityFilterChanged$.next(new CityFilterModel(
      CityHelper.getCityFromString(this.cityFilterGroup.get('city')?.value),
      this.cityFilterGroup.get('timeframe')?.value,
      this.cityFilterGroup.get('interval')?.value
    ));
  }

  public onIntervalChanged() {
    const trainingInterval = this.cityFilterGroup.get('interval')?.value;
    const interval = this.intervalData.intervals.find(
      (e: Interval) => e.trainingInterval === trainingInterval
    );

    this.predictionInterval = interval?.predictionInterval!;

    this.predictionResult = this.intervalData.intervals.find(
      (e: Interval) => e.trainingInterval === trainingInterval
    )?.predictionResult!;
  
    this.filterEventService.predictionResultChanged$.next(this.predictionResult);

    this.onCityFilterChanged();
  }
}
