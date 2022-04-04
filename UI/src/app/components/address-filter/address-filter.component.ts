import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { AddressFilterModel } from '../../models/address-filter-model';
import { AddressInfo } from 'src/app/common/address-data';
import { CityEnum } from 'src/app/enums/city-enum';
import { AddressDataHelper } from 'src/app/helpers/address-data-helper';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { AddressService } from 'src/app/services/address-service';

@Component({
  selector: 'app-address-filter',
  templateUrl: './address-filter.component.html',
  styleUrls: ['./address-filter.component.scss']
})
export class AddressFilterComponent implements OnInit {
  addressFilter = new FormGroup({
    address: new FormControl(),
    timeframe: new FormControl(),
    walkScore: new FormControl(),
    transitScore: new FormControl(),
    bikeScore: new FormControl()
  })
  addressInfoOptions: AddressInfo[] = [];
  filteredAddresses$ = new Observable<AddressInfo[]>();

  @Input()
  addressVm = new AddressFilterModel();

  private readonly _addressFilterChanged$ = new EventEmitter<AddressFilterModel>();
  @Output()
  public readonly addressFilterChanged$: Observable<AddressFilterModel> = this._addressFilterChanged$;

  constructor(
    private readonly dbService: FirebaseDbService,
    private readonly addressService: AddressService) { }

  async ngOnInit(): Promise<void> {
    const addressData = await this.dbService.getAddressDataAsync(CityEnum.Tampa);
    this.addressInfoOptions = AddressDataHelper.getAddressInfoArray(addressData);
    
    this.setUpAddressFilter();
  }

  public onAddressChanged(address: string): void {
    this.addressService.addressChanged$.next(address);
  }

  private setUpAddressFilter(): void {
    this.filteredAddresses$ = this.addressFilter.get('address')!.valueChanges.pipe(
      startWith(''),
      map(e => this.filterAddress(e))
    );
  }

  private filterAddress(address: string): AddressInfo[] {
    const addressLower = address.toLowerCase();

    return this.addressInfoOptions.filter(e => e.address.toLowerCase()
      .includes(addressLower));
  }
}
