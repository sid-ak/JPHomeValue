import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import * as Highcharts from 'highcharts';
import { FilterEventService } from 'src/app/services/filter-event.service';
import { CityFilterModel } from 'src/app/models/city-filter-model';
import { CityEnum } from 'src/app/enums/city-enum';
import { takeUntil } from 'rxjs';
import { AddressFilterModel } from 'src/app/models/address-filter-model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new EventEmitter<void>();

  public filter: CityFilterModel | AddressFilterModel = new CityFilterModel();

  public Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  public isCityDashboard = true;

  constructor (
    private readonly dbService: FirebaseDbService,
    private readonly filterEventService: FilterEventService) { }

  async ngOnInit(): Promise<void> {
    this.filterEventService.cityFilterChanged$.pipe(takeUntil(this.destroyed$)).subscribe(
      async (e: CityFilterModel) => await this.renderChart(e as CityFilterModel)
    );

    this.filterEventService.addressFilterChanged$.pipe(takeUntil(this.destroyed$)).subscribe(
      async (e: AddressFilterModel) => await this.renderChart(e as AddressFilterModel)
    );

    this.filterEventService.isCityDashboard$.pipe(takeUntil(this.destroyed$)).subscribe(
      e => this.isCityDashboard = e
    );

    const intervalData = await this.dbService.getIntervalData(CityEnum.Tampa);
    console.log(intervalData);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private async renderChart(filter: CityFilterModel | AddressFilterModel): Promise<void> {
      if (filter instanceof CityFilterModel) {
        this.filter = filter;
        switch (filter.city) {
          // Tampa
          case CityEnum.Tampa:
            if (filter.timeframe == 3) {
              await this.dbService.getModel(CityEnum.Tampa, 3)
                .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
            }
            if (filter.timeframe == 6) {
              await this.dbService.getModel(CityEnum.Tampa, 6)
                .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
            }
            if (filter.timeframe == 12) {
              await this.dbService.getModel(CityEnum.Tampa, 12)
                .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
            }
            else {
              return;
            }
          break;

          // St. Pete
          case CityEnum.StPetersburg:
            if (filter.timeframe == 3) {
              await this.dbService.getModel(CityEnum.StPetersburg, 3)
                .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
            }
            if (filter.timeframe == 6) {
              await this.dbService.getModel(CityEnum.StPetersburg, 6)
                .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
            }
            if (filter.timeframe == 12) {
              await this.dbService.getModel(CityEnum.StPetersburg, 12)
                .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
            }
            else {
              return;
            }
          break;

          // Clearwater 
          case CityEnum.Clearwater:
            if (filter.timeframe == 3) {
              await this.dbService.getModel(CityEnum.Clearwater, 3)
                .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
            }
            if (filter.timeframe == 6) {
              await this.dbService.getModel(CityEnum.Clearwater, 6)
                .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
            }
            if (filter.timeframe == 12) {
              await this.dbService.getModel(CityEnum.Clearwater, 12)
                .then(e => this.createChartOptions([e.shiller.dates, e.shiller.indices]));
            }
            else {
              return;
            }
          break;
          default: return;
        }

      } else if (filter instanceof AddressFilterModel && filter.address) {
        (this.filter as AddressFilterModel) = filter;
        const predictions = (await this.dbService.getPredictionData(filter.city)).predictedAddresses
          .filter(e => e.address === filter.address)
          .map(e => e.predictions)[0];
        const dates = predictions.map(e => e.date);
        const prices = predictions.map(e => e.price);
        this.createChartOptions([dates, prices])
    }
  }

  private createChartOptions(data: [string[], number[]]) {
    this.chartOptions = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: "Forecast"
      },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: "Date"
        },
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "Index Values"
        }
      },

      // Set Up Data
      series: [{
        name: "Price",
        type: "line",
        data: data[1],
        pointStart: Date.UTC(2002, 0, 1),
        pointIntervalUnit: 'month',
        tooltip: {
          valueDecimals: 2
        }
      }],
    };
  }

  public splitCamelCase(city?: string): string {
    if (city) return city.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    return "";
  }
}
