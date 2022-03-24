import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { TampaShillerIndex } from 'src/app/collections/tampa-shiller-index';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  tampaShiller: TampaShillerIndex = new TampaShillerIndex(null);

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
  
  async ngOnInit(): Promise<void> {
    this.tampaShiller = await this.dbService.getTampaShillerIndexAsync();
    console.log(this.tampaShiller.indices)
  }
}
