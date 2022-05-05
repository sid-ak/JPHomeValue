import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import * as Highcharts from 'highcharts';
import { FilterEventService } from 'src/app/services/filter-event.service';
import { CityFilterModel } from 'src/app/models/city-filter-model';
import { CityEnum } from 'src/app/enums/city-enum';
import { takeUntil } from 'rxjs';
import { AddressFilterModel } from 'src/app/models/address-filter-model';
import { CityHelper } from 'src/app/helpers/city-helper';

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

  private async renderChart(filter: CityFilterModel | AddressFilterModel): Promise<void> {
    if (filter instanceof CityFilterModel && filter.timeframe) {
      this.filter = filter; // Need this on the DOM for chart.
      
      await this.dbService.getModel(
        CityHelper.getCityFromString(filter.city!), filter.timeframe)
          .then(e => this.data = [e.shiller.dates, e.shiller.indices]);
      
      this.createChartOptions(this.data);
      
      if (filter.interval) {
        const intervalShiller = await this.dbService.getIntervalData(filter.city!);
        const predictedShiller = intervalShiller.intervals.find(
          e => e.trainingInterval === filter.interval)!.shiller;

        this.updateChartOptions(
          filter.interval, 
          [predictedShiller.dates, predictedShiller.indices]);
      }
    }

    else if (filter instanceof AddressFilterModel && filter.address) {
      (this.filter as AddressFilterModel) = filter;
      
      const predictions = (await this.dbService.getPredictionData(filter.city)).predictedAddresses
        .filter(e => e.address === filter.address)
        .map(e => e.predictions)[0];
      const dates = predictions.map(e => e.date);
      const prices = predictions.map(e => e.price);

      this.createChartOptions([dates, prices], true)
    }
  }

  private createChartOptions(data: [string[], number[]], isAddressData: boolean = false) {
    this.chartOptions = {
      legend: {
        floating: true,
        align: "left",
        verticalAlign: "top",
        x: 90,
        y: 45,
      },
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
        plotLines: [{
          id: "lastHistoricalLine",
          value: this.getLastHistoricalDataPointFromCity(
            CityHelper.getCityFromString(this.filter.city!)),
          color: "red",
          width: 2,
          label: {
            text: "Historical Data Ends",
          }
        }],
      },
      yAxis: {
        title: {
          text: isAddressData ? "Price" : "Index Values"
        }
      },

      // Set Up Data
      series: [{
        name: isAddressData ? "Price" : "Index",
        color: "blue",
        type: "line",
        data: data[1],
        pointStart: Date.UTC(2002, 0, 1),
        pointIntervalUnit: 'month',
        tooltip: {
          valuePrefix: isAddressData ? "$": "",
          valueDecimals: 2
        }
      }],
    };
  }

  // TODO: Reuse existing objects for chartOptions.
  private updateChartOptions(filterInterval: string, newData: [string[], number[]]) {
    const originalData = this.data;

    this.chartOptions = {
      legend: {
        layout: 'vertical',
        floating: true,
        align: "left",
        verticalAlign: "top",
        x: 90,
        y: 45,
        labelFormatter: function() {
          if(this.name === "Resulting Index" && this.visible) {
            return `${this.name} <div
              style="color: orange;">|<div style="color: black;"> Training Interval</div></div>`
          }
          return this.name;
        }
      },
      xAxis: {
        plotLines: [{
          id: "lastHistoricalLine",
          value: this.getLastHistoricalDataPointFromCity(
            CityHelper.getCityFromString(this.filter.city!)),
          color: "red",
          width: 2,
          label: {
            text: "Historical Data Ends",
          }
        },
        {
          id: "intervalLine",
          dashStyle: 'LongDash',
          value: this.getDateFromInterval(filterInterval),
          color: "orange",
          label: {
            text: "Training Interval Ends",
          }
        }],
      },
      series: [{
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

        // New data
        {
          name: "Resulting Index",
          color: "green",
          type: "line",
          data: newData[1],
          pointStart: Date.UTC(2002, 0, 1),
          pointIntervalUnit: "month",
          zoneAxis: "x",
          zones: [{
            value: this.getDateFromInterval(filterInterval),
            color: "orange",
          }],
          tooltip: {
            valueDecimals: 2,
          }
        },
    ]};
    
    this.chartUpdateFlag = true;
  }

  public splitCamelCase(city?: string): string {
    if (city) return city.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    return "";
  }

  /**
   * Function that returns milliseconds in UTC for chart zoning
   * as per the selected training interval.
   * @param filterInterval 
   */
  private getDateFromInterval(filterInterval: string): number {
    return new Map<string, number>([
      ["1/2002 - 12/2011", Date.UTC(2011, 11, 1)],
      ["1/2002 - 12/2013", Date.UTC(2013, 11, 1)],
      ["1/2002 - 11/2015", Date.UTC(2015, 10, 1)],
      ["1/2002 - 11/2009", Date.UTC(2009, 10, 1)],
      ["1/2002 - 11/2011", Date.UTC(2011, 10, 1)],
      ["1/2002 - 11/2015", Date.UTC(2015, 10, 1)]
    ]).get(filterInterval) ?? -1;
  }

    /**
   * Function that returns milliseconds in UTC for chart zoning
   * as per the selected training interval.
   * @param filterInterval 
   */
     private getLastHistoricalDataPointFromCity(city: CityEnum): number {
      return new Map<string, number>([
        [CityEnum.Tampa, Date.UTC(2021, 11, 1)],
        [CityEnum.StPetersburg, Date.UTC(2021, 9, 1)],
        [CityEnum.Clearwater, Date.UTC(2021, 9, 1)]
      ]).get(city) ?? -1;
    }
}
