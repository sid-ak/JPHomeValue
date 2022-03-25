import { Component, OnInit } from '@angular/core';
import { Shiller } from 'src/app/common/shiller';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chart-service';
import { CityFilterViewModel } from 'src/app/view-models/city-filter-view-model';
import { CityEnum } from 'src/app/enums/city-enum';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  tampaShiller: Shiller = new Shiller(null, CityEnum.None);
  public cityVm = new CityFilterViewModel();

  public Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor (
    private readonly dbService: FirebaseDbService,
    private readonly chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.cityChanged$.subscribe(
      async (e: any) => await this.getChartData(e as CityFilterViewModel)
    );
  }

  private async getChartData(
    cityVm: CityFilterViewModel): Promise<void> {
      this.cityVm = cityVm;
      switch (cityVm.city) {
        // Tampa
        case CityEnum.Tampa:
          if (cityVm.timeframe == 3) {
            await this.dbService.getTampaThreeMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (cityVm.timeframe == 6) {
            await this.dbService.getTampaSixMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (cityVm.timeframe == 12) {
            await this.dbService.getTampaTwelveMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          else {
            console.log("Did not match timeframe")
          }
        break;

        // St. Pete
        case CityEnum.StPetersburg:
          if (cityVm.timeframe == 3) {
            await this.dbService.getStPeteThreeMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (cityVm.timeframe == 6) {
            await this.dbService.getStPeteSixMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (cityVm.timeframe == 12) {
            await this.dbService.getStPeteTwelveMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          else {
            console.log("Did not match timeframe")
          }
        break;

        // Clearwater 
        case CityEnum.Clearwater:
          if (cityVm.timeframe == 3) {
            await this.dbService.getClearwaterThreeMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (cityVm.timeframe == 6) {
            await this.dbService.getClearwaterSixMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (cityVm.timeframe == 12) {
            await this.dbService.getClearwaterTwelveMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          else {
            console.log("Did not match timeframe")
          }
        break;
        default: console.log("Did not match enum")
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
