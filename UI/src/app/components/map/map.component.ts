import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { MapHelper } from 'src/app/helpers/map-helper';
import { AddressService } from 'src/app/services/address-service';
import { CityService } from 'src/app/services/city-service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  private readonly destroyed$ = new EventEmitter<boolean>(false);

  constructor (
    private readonly addressService: AddressService,
    private readonly cityService: CityService) { }

  ngOnInit(): void {
    this.cityService.cityChanged$.pipe(
      takeUntil(this.destroyed$)).subscribe(
      e => MapHelper.addMapScript(e)
    );
    
    this.addressService.addressFilterChanged$.pipe(
      takeUntil(this.destroyed$)).subscribe(
        e => MapHelper.addMapScript(undefined, e)
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
