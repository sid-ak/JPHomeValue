import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chart-service';
import { CityFilterModel } from 'src/app/models/city-filter-model';
import { CityEnum } from 'src/app/enums/city-enum';
import { takeUntil } from 'rxjs';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  private destroyed$ = new EventEmitter<void>();

  public cityVm = new CityFilterModel();

  public Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor (
    private readonly dbService: FirebaseDbService,
    private readonly chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.cityChanged$
      .pipe(takeUntil(this.destroyed$)).subscribe(
        async (e: any) => await this.getChartData(e as CityFilterModel)
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private async getChartData(
    cityVm: CityFilterModel): Promise<void> {
      this.cityVm = cityVm;
      switch (cityVm.city) {
        // Tampa
        case CityEnum.Tampa:
          if (cityVm.timeframe == 3) {
            await this.dbService.getModelAsync(Constants.getTampaThreeMonthsUrl)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 6) {
            await this.dbService.getModelAsync(Constants.getTampaSixMonthsUrl)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 12) {
            await this.dbService.getModelAsync(Constants.getTampaTwelveMonthsUrl)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          else {
            return;
          }
        break;

        // St. Pete
        case CityEnum.StPetersburg:
          if (cityVm.timeframe == 3) {
            await this.dbService.getModelAsync(Constants.getStPeteThreeMonthsUrl)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 6) {
            await this.dbService.getModelAsync(Constants.getStPeteSixMonthsUrl)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 12) {
            await this.dbService.getModelAsync(Constants.getStPeteTwelveMonthsUrl)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          else {
            return;
          }
        break;

        // Clearwater 
        case CityEnum.Clearwater:
          if (cityVm.timeframe == 3) {
            await this.dbService.getModelAsync(Constants.getClearwaterThreeMonthsUrl)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 6) {
            await this.dbService.getModelAsync(Constants.getClearwaterSixMonthsUrl)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 12) {
            await this.dbService.getModelAsync(Constants.getClearwaterTwelveMonthsUrl)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          else {
            return;
          }
        break;
        default: return;
      }
  }

  private createChartOptions(data: [string[], number[]]) {
    this.chartOptions = {
      title: {
        text: ""
      },
      credits: {
        enabled: false
      },
      series: [{
        type: "line",
        data: data[1]
      }],
      xAxis: {
        visible: false // Hidden until I can figure out adding dates to the x axis.
      },
    };
  }
}
