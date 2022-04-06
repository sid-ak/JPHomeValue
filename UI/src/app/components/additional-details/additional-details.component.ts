import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Scores } from 'src/app/common/address-data';
import { AddressService } from 'src/app/services/address-service';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.scss']
})
export class AdditionalDetailsComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new EventEmitter<boolean>(false);

  public scores: Scores = new Scores();

  constructor(private readonly addressService: AddressService) { }

  ngOnInit(): void {
    this.addressService.displayScoresChanged$.pipe(takeUntil(this.destroyed$)).subscribe(
      e => this.scores = e
    )
  }

  ngOnDestroy(): void {
      this.destroyed$.next(true);
  }

}
