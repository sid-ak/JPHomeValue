import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import * as Highcharts from 'highcharts';
import { CityService } from 'src/app/services/city-service';
import { CityFilterModel } from 'src/app/models/city-filter-model';
import { CityEnum } from 'src/app/enums/city-enum';
import { takeUntil } from 'rxjs';
import { AddressService } from 'src/app/services/address-service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new EventEmitter<void>();

  public cityVm = new CityFilterModel();

  public Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor (
    private readonly dbService: FirebaseDbService,
    private readonly cityService: CityService,
    private readonly addressService: AddressService) { }

  ngOnInit(): void {
    this.cityService.cityFilterChanged$
      .pipe(takeUntil(this.destroyed$)).subscribe(
        async (e: any) => await this.getChartData(e as CityFilterModel)
    );

    this.addressService.addressFilterChanged$
        .pipe(takeUntil(this.destroyed$)).subscribe(
          async (e: any) => await this.getChartData(e as CityFilterModel) // TODO: Replace with app model.
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
            await this.dbService.getModel(CityEnum.Tampa, 3)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 6) {
            await this.dbService.getModel(CityEnum.Tampa, 6)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 12) {
            await this.dbService.getModel(CityEnum.Tampa, 12)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          else {
            return;
          }
        break;

        // St. Pete
        case CityEnum.StPetersburg:
          if (cityVm.timeframe == 3) {
            await this.dbService.getModel(CityEnum.StPetersburg, 3)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 6) {
            await this.dbService.getModel(CityEnum.StPetersburg, 6)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 12) {
            await this.dbService.getModel(CityEnum.StPetersburg, 12)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          else {
            return;
          }
        break;

        // Clearwater 
        case CityEnum.Clearwater:
          if (cityVm.timeframe == 3) {
            await this.dbService.getModel(CityEnum.Clearwater, 3)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 6) {
            await this.dbService.getModel(CityEnum.Clearwater, 6)
              .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
          }
          if (cityVm.timeframe == 12) {
            await this.dbService.getModel(CityEnum.Clearwater, 12)
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

  public splitCamelCase(city?: string): string {
    if (city) return city.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    return "";
  }
}
