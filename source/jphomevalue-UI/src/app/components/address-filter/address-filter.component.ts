import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AddressFilterViewModel } from '../../view-models/address-filter-view-model';

@Component({
  selector: 'app-address-filter',
  templateUrl: './address-filter.component.html',
  styleUrls: ['./address-filter.component.scss']
})
export class AddressFilterComponent implements OnInit {
  @Input()
  addressVm = new AddressFilterViewModel()

  private readonly _addressFilterChanged$ = new EventEmitter<AddressFilterViewModel>();
  @Output()
  public readonly addressFilterChanged$: Observable<AddressFilterViewModel> = this._addressFilterChanged$;
  
  addressFilter = new FormGroup({
    address: new FormControl(),
    timeframe: new FormControl(),
    walkScore: new FormControl(),
    transitScore: new FormControl(),
    bikeScore: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
  }

  public onAddressFilterChanged(): void {
    this.addressVm = this.constructAddressVm(this.addressFilter);
    this._addressFilterChanged$.next(this.addressVm);
  }

  private constructAddressVm(neighborhoodFilter: FormGroup): AddressFilterViewModel {
  if (neighborhoodFilter === (null || undefined)) return new AddressFilterViewModel();
    
    this.addressVm.address = neighborhoodFilter.get('address')?.value ?? "";
    this.addressVm.timeframe = neighborhoodFilter.get('timeframe')?.value ?? -1;
    this.addressVm.walkScore = neighborhoodFilter.get('walkScore')?.value ?? -1;
    this.addressVm.transitScore = neighborhoodFilter.get('transitScore')?.value ?? -1;
    this.addressVm.bikeScore = neighborhoodFilter.get('bikeScore')?.value ?? -1;    
    return this.addressVm;
  }
}
