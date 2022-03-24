import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartOptions, Point } from 'chart.js';
import { TampaShillerIndex } from 'src/app/collections/tampa-shiller-index';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };

  ngAfterViewInit(): void {
  }
  // @ViewChild('chart')
  // private chartRef!: ElementRef;
  // private chart!: Chart;

  // tampaShiller: TampaShillerIndex = new TampaShillerIndex(null);
  // testData: any;

  // readonly lineChartOptions: ChartOptions = { responsive: true };

  // constructor (private readonly dbService: FirebaseDbService) { 
  //   this.testData = [{x: 1, y: 5}, {x: 2, y: 10}, {x: 3, y: 6}, {x: 4, y: 2}, {x: 4.1, y: 6}];
  //   // this.testData = [1, 5, 6, 8]
  // }
  
  // async ngAfterViewInit(): Promise<void> {
  //   this.tampaShiller = await this.dbService.getTampaShillerIndexAsync();
  //   console.log(this.tampaShiller.indices);
  //   this.generateLineChart();
  // }

  // private generateLineChart() {
  //   this.chart = new Chart(this.chartRef.nativeElement, {
  //     type: 'scatter',
  //     data: {
  //       datasets: [{
  //         label: 'My First Dataset',
  //         data: this.tampaShiller.indices,
  //         fill: true
  //       }]
  //     },
  //     // options: {
  //     //   responsive: true,
  //     //   maintainAspectRatio: false,
  //     //   scales: {
  //     //     xAxes: [{
  //     //       type: 'linear'
  //     //     }],
  //     //   }
  //     // }
  //   });
  // }
}
