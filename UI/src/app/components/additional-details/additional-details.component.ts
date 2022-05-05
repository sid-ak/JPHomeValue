import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Scores } from 'src/app/common/address-data';
import { PredictionResult } from 'src/app/common/interval-data';
import { FilterEventService } from 'src/app/services/filter-event.service';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.scss']
})
export class AdditionalDetailsComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new EventEmitter<boolean>(false);
  
  public isCityDashboard = false;

  public scores: Scores = new Scores();
  public predictionResult = new PredictionResult(0, 0, 0);

  constructor(private readonly filterEventService: FilterEventService) { }

  ngOnInit(): void {
    this.filterEventService.displayScoresChanged$.pipe(takeUntil(this.destroyed$)).subscribe(
      e => this.scores = e
    )

    this.filterEventService.isCityDashboard$.pipe(takeUntil(this.destroyed$)).subscribe(
      e => this.isCityDashboard = e
    )

    this.filterEventService.predictionResultChanged$.pipe(
      takeUntil(this.destroyed$)).subscribe(
        (e: PredictionResult) => this.predictionResult = new PredictionResult(
          e.bestPrediction,
          e.worstPrediction,
          e.rmspe
        ));
  }

  ngOnDestroy(): void {
      this.destroyed$.next(true);
  }

}
