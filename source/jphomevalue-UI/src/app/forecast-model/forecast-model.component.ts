import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-forecast-model',
  templateUrl: './forecast-model.component.html',
  styleUrls: ['./forecast-model.component.scss']
})
export class ForecastModelComponent {
  data = {
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
}
