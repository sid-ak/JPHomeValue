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

  constructor (
    private readonly dbService: FirebaseDbService,
    private readonly filterEventService: FilterEventService) { }

  ngOnInit(): void {
    this.filterEventService.cityFilterChanged$.pipe(takeUntil(this.destroyed$)).subscribe(
      async (e: CityFilterModel) => await this.renderChart(e as CityFilterModel)
    );

    this.filterEventService.addressFilterChanged$.pipe(takeUntil(this.destroyed$)).subscribe(
      async (e: AddressFilterModel) => await this.renderChart(e as AddressFilterModel) // TODO: Replace with app model.
    );
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

        /**
         * TODO: Update branching logic to work with the AddressFilterModel. 
         */
      } else if (filter instanceof AddressFilterModel && filter.address) {
        this.filter = new AddressFilterModel(CityEnum.None);
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
