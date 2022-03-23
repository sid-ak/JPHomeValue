import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  // Chart data.
  readonly data = {
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  constructor (private readonly dbService: FirebaseDbService) {}
  
  ngOnInit(): void {
    this.dbService.getShillerIndex(0)
  }
}
