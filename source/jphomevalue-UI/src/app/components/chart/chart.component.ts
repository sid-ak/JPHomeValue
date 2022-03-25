import { Component, OnInit } from '@angular/core';
import { Shiller } from 'src/app/common/shiller';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chart-service';
import { NeighborhoodFilterViewModel } from 'src/app/view-models/neighborhood-filter-view-model';
import { CityEnum } from 'src/app/enums/city-enum';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  tampaShiller: Shiller = new Shiller(null, CityEnum.None);
  public neighborhoodVm = new NeighborhoodFilterViewModel();

  public Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor (
    private readonly dbService: FirebaseDbService,
    private readonly chartService: ChartService) { }

  async ngOnInit(): Promise<void> {
    this.chartService.neighborhoodChanged$.subscribe(
      e => this.getChartData(e as NeighborhoodFilterViewModel)
    );
  }

  private async getChartData(
    neighborhoodVm: NeighborhoodFilterViewModel): Promise<void> {
      this.neighborhoodVm = neighborhoodVm;
      switch (neighborhoodVm.neighborhood) {
        // Tampa
        case CityEnum.Tampa:
          if (neighborhoodVm.timeframe == 3) {
            await this.dbService.getTampaThreeMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (neighborhoodVm.timeframe == 6) {
            await this.dbService.getTampaSixMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (neighborhoodVm.timeframe == 12) {
            await this.dbService.getTampaTwelveMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          else {
            console.log("Did not match timeframe")
          }
        break;

        // St. Pete
        case CityEnum.StPetersburg:
          if (neighborhoodVm.timeframe == 3) {
            await this.dbService.getStPeteThreeMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (neighborhoodVm.timeframe == 6) {
            await this.dbService.getStPeteSixMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (neighborhoodVm.timeframe == 12) {
            await this.dbService.getStPeteTwelveMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          else {
            console.log("Did not match timeframe")
          }
        break;

        // Clearwater 
        case CityEnum.Clearwater:
          if (neighborhoodVm.timeframe == 3) {
            await this.dbService.getClearwaterThreeMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (neighborhoodVm.timeframe == 6) {
            await this.dbService.getClearwaterSixMonthsAsync()
            .then(e => this.createChartOptions([e.dates, e.indices]));
          }
          if (neighborhoodVm.timeframe == 12) {
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
