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

  chart: any;
  chartUpdateFlag = false;
  Highcharts = Highcharts;
  chartConstructor = "chart";
  chartCallback: any;
  chartOptions!: Highcharts.Options;

  data!: [string[], number[]];

  public isCityDashboard = true;

  constructor (
    private readonly dbService: FirebaseDbService,
    private readonly filterEventService: FilterEventService) { }

  ngOnInit(): void {
    this.filterEventService.cityFilterChanged$.pipe(takeUntil(this.destroyed$)).subscribe(
      async (e: CityFilterModel) => await this.renderChart(e as CityFilterModel)
    );

    this.filterEventService.addressFilterChanged$.pipe(takeUntil(this.destroyed$)).subscribe(
      async (e: AddressFilterModel) => await this.renderChart(e as AddressFilterModel)
    );

    this.filterEventService.isCityDashboard$.pipe(takeUntil(this.destroyed$)).subscribe(
      e => this.isCityDashboard = e
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  // TODO: Branching logic has too many branches. Fix it.
  private async renderChart(filter: CityFilterModel | AddressFilterModel): Promise<void> {
    if (filter instanceof CityFilterModel) {
      if (filter.timeframe) {
        this.filter = filter; // Need this on the DOM for chart.
        switch (filter.city) {          
          // Tampa
          case CityEnum.Tampa:
            if (filter.timeframe == 3) {
              await this.dbService.getModel(CityEnum.Tampa, 3)
                .then(e => this.data = [e.shiller.dates, e.shiller.indices]);
              this.createChartOptions(this.data);
            }
            if (filter.timeframe == 6) {
              await this.dbService.getModel(CityEnum.Tampa, 6)
                .then(e => this.data = [e.shiller.dates, e.shiller.indices]);
              this.createChartOptions(this.data);
            }
            if (filter.timeframe == 12) {
              await this.dbService.getModel(CityEnum.Tampa, 12)
                .then(e => this.data = [e.shiller.dates, e.shiller.indices]);
              this.createChartOptions(this.data);
            }
          break;

          // St. Pete
          case CityEnum.StPetersburg:
            if (filter.timeframe == 3) {
              await this.dbService.getModel(CityEnum.StPetersburg, 3)
                .then(e => this.data = [e.shiller.dates, e.shiller.indices]);
              this.createChartOptions(this.data)
            }
            if (filter.timeframe == 6) {
              await this.dbService.getModel(CityEnum.StPetersburg, 6)
                .then(e => this.data = [e.shiller.dates, e.shiller.indices]);
              this.createChartOptions(this.data)
            }
            if (filter.timeframe == 12) {
              await this.dbService.getModel(CityEnum.StPetersburg, 12)
                .then(e => this.data = [e.shiller.dates, e.shiller.indices]);
              this.createChartOptions(this.data)
            }
          break;

          // Clearwater 
          case CityEnum.Clearwater:
            if (filter.timeframe == 3) {
              await this.dbService.getModel(CityEnum.Clearwater, 3)
                .then(e => this.data = [e.shiller.dates, e.shiller.indices]);
              this.createChartOptions(this.data)
            }
            if (filter.timeframe == 6) {
              await this.dbService.getModel(CityEnum.Clearwater, 6)
                .then(e => this.data = [e.shiller.dates, e.shiller.indices]);
              this.createChartOptions(this.data)
            }
            if (filter.timeframe == 12) {
              await this.dbService.getModel(CityEnum.Clearwater, 12)
                .then(e => this.data = [e.shiller.dates, e.shiller.indices]);
              this.createChartOptions(this.data)
            }
          break;
        }
        if (filter.interval) {
          const intervalShiller = await this.dbService.getIntervalData(filter.city!);
          const predictedShiller = intervalShiller.intervals.find(
            e => e.trainingInterval === filter.interval)!.shiller;
  
          this.updateChartOptions([predictedShiller.dates, predictedShiller.indices]);
        }
      }
    }

    else if (filter instanceof AddressFilterModel && filter.address) {
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
        name: "Index",
        color: "blue",
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

  private updateChartOptions(newData: [string[], number[]]) {
    const originalData = this.data;

    this.chartOptions.series = [
      {
        name: "Index",
        color: "blue",
        type: "line",
        data: originalData[1],
        pointStart: Date.UTC(2002, 0, 1),
        pointIntervalUnit: 'month',
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: "Predicted Index",
        color: "green",
        type: "line",
        data: newData[1],
        pointStart: Date.UTC(2002, 0, 1),
        pointIntervalUnit: 'month',
        tooltip: {
          valueDecimals: 2
        }
      },
    ];
    
    this.chartUpdateFlag = true;
  }

  public splitCamelCase(city?: string): string {
    if (city) return city.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    return "";
  }
}
