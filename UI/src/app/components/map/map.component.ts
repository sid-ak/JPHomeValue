import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { MapHelper } from 'src/app/helpers/map-helper';
import { FilterEventService } from 'src/app/services/filter-event.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  private readonly destroyed$ = new EventEmitter<boolean>(false);

  constructor (private readonly filterEventService: FilterEventService) { }

  ngOnInit(): void {
    this.filterEventService.cityChanged$.pipe(
      takeUntil(this.destroyed$)).subscribe(
      e => MapHelper.addMapScript(e)
    );
    
    this.filterEventService.addressFilterChanged$.pipe(
      takeUntil(this.destroyed$)).subscribe(
        e => MapHelper.addMapScript(e.city, e)
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
