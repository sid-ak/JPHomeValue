import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, map, Observable, startWith } from 'rxjs';
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
  readonly addressFilterGroup = new FormGroup({
    address: new FormControl(),
    timeframe: new FormControl(),
    walkScore: new FormControl(),
    transitScore: new FormControl(),
    bikeScore: new FormControl()
  })
  addressInfoOptions: AddressInfo[] = [];
  filteredAddresses$ = new Observable<AddressInfo[]>();

  constructor(
    private readonly dbService: FirebaseDbService,
    private readonly addressService: AddressService) { }

  async ngOnInit(): Promise<void> {
    const addressData = await this.dbService.getAddressData(CityEnum.Tampa);
    this.addressInfoOptions = AddressDataHelper.getAddressInfoArray(addressData);
    
    this.setUpAddressFilter();
  }

  public onAddressFilterChanged(): void {
    const filteredAddressInfo = this.addressInfoOptions.find(
      e => e.address === this.addressFilterGroup.get('address')?.value
    )

    this.addressService.addressFilterChanged$.next(new AddressFilterModel(
      filteredAddressInfo?.lat ?? 0,
      filteredAddressInfo?.lng ?? 0,
      this.addressFilterGroup.get('address')?.value,
      this.addressFilterGroup.get('timeframe')?.value,
      this.addressFilterGroup.get('walkScore')?.value,
      this.addressFilterGroup.get('transitScore')?.value,
      this.addressFilterGroup.get('bikeScore')?.value,
    ));
  }

  private setUpAddressFilter(): void {
    this.filteredAddresses$ = this.addressFilterGroup.get('address')!.valueChanges.pipe(
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
