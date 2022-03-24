import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { Chart, ChartOptions, Point } from 'chart.js';
import { TampaShillerIndex } from 'src/app/collections/tampa-shiller-index';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  tampaShiller: TampaShillerIndex = new TampaShillerIndex(null);
  
  public Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  
  constructor (private readonly dbService: FirebaseDbService) { }
  
  async ngOnInit(): Promise<void> {
    await this.generateTampaShillerChart();
  }

  private async generateTampaShillerChart(): Promise<void> {
    await this.dbService.getTampaShillerIndexAsync()
      .then(e => this.createChartOptions(e.indices));
  }

  private createChartOptions(data: number[]) {
    this.chartOptions = {
      title: {
        text: ""
      },
      credits: {
        enabled: false
      },
      series: [{
        type: "line",
        data: data
      }]
    };
  }
}
