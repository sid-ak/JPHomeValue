import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter, takeUntil, toArray, zip } from 'rxjs';
import { PredictionResult } from 'src/app/common/interval-data';
import { CityHelper } from 'src/app/helpers/city-helper';
import { DataExportHelper } from 'src/app/helpers/data-export-helper';
import { ExcelService } from 'src/app/services/excel.service';
import { FilterEventService } from 'src/app/services/filter-event.service';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';

/**
 * Super simple concatenation of arrays for display in an xlsx file.
 */
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new EventEmitter<boolean>(false);

  @Input()
  cityFilterGroup!: FormGroup;
  public predictionResult = new PredictionResult(0, 0, 0);

  constructor(
    private readonly excelService: ExcelService,
    private readonly filterEventService: FilterEventService,
    private readonly firebaseDbService: FirebaseDbService) { }
  
  ngOnInit(): void {
    this.filterEventService.predictionResultChanged$.pipe(
      takeUntil(this.destroyed$)).subscribe(
        (e: PredictionResult) => this.predictionResult = new PredictionResult(
          e.bestPrediction,
          e.worstPrediction,
          e.rmspe
    ));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  downloadFilterData(): void {
    const city = this.cityFilterGroup.get('city')?.value;
    const rmseData = DataExportHelper.getRmseData(
      this.cityFilterGroup.value, this.predictionResult
    );
    
    this.excelService.exportAsExcelFile(rmseData, `RMSE_Data_${city}`);
  }

  async downloadForecastData(): Promise<void> {
    const city = this.cityFilterGroup.get('city')?.value;
    const timeframe = this.cityFilterGroup.get('timeframe')?.value;
    const shillerData = await this.firebaseDbService.getModel(
      CityHelper.getCityFromString(city), timeframe);

    const forecastData = DataExportHelper.getForecastData(shillerData.shiller); 
    
    this.excelService.exportAsExcelFile(forecastData, `Forecast_Data_${city}`);
  }
}
