import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith, takeUntil } from 'rxjs';
import { AddressFilterModel } from '../../models/address-filter-model';
import { AddressData, AddressInfo } from 'src/app/common/address-data';
import { CityEnum } from 'src/app/enums/city-enum';
import { AddressDataHelper } from 'src/app/helpers/address-data-helper';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { AddressService } from 'src/app/services/address-service';
import { CityService } from 'src/app/services/city-service';
import { CityHelper } from 'src/app/helpers/city-helper';

@Component({
  selector: 'app-address-filter',
  templateUrl: './address-filter.component.html',
  styleUrls: ['./address-filter.component.scss']
})
export class AddressFilterComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new EventEmitter<boolean>(false);

  readonly addressFilterGroup = new FormGroup({
    city: new FormControl(),
    showSurroundings: new FormControl(),
    address: new FormControl(),
    timeframe: new FormControl(),
    walkScore: new FormControl(),
    transitScore: new FormControl(),
    bikeScore: new FormControl()
  })
  addressInfoOptions: AddressInfo[] = [];
  filteredAddresses$ = new Observable<AddressInfo[]>();

  addressData: AddressData = new AddressData();

  constructor(
    private readonly dbService: FirebaseDbService,
    private readonly addressService: AddressService,
    private readonly cityService: CityService) { }

  async ngOnInit(): Promise<void> {
    this.cityService.cityChanged$.pipe(takeUntil(this.destroyed$)).subscribe(
      async e => await this.setUpAddressFilter(e)
    );
  }

  ngOnDestroy(): void {
      this.destroyed$.next(true);
  }

  public onCityChanged(city: CityEnum): void {
    this.cityService.cityChanged$.next(city);
  }

  public showSurroundings(showSurrounding: any) {
    this.addressFilterGroup.controls['showSurroundings']
      .setValue(showSurrounding.target.checked);
    this.onAddressFilterChanged();
  }

  public onAddressFilterChanged(): void {
    const filteredAddressInfo = this.addressInfoOptions.find(
      e => e.address === this.addressFilterGroup.get('address')?.value ?? ""
    );

    this.addressService.addressFilterChanged$.next(new AddressFilterModel(
      CityHelper.getCityFromString(this.addressFilterGroup.get('city')?.value),
      this.addressFilterGroup.get('showSurroundings')?.value,
      filteredAddressInfo?.lat ?? 0,
      filteredAddressInfo?.lng ?? 0,
      this.addressFilterGroup.get('address')?.value,
      this.addressFilterGroup.get('timeframe')?.value,
      this.addressFilterGroup.get('walkScore')?.value,
      this.addressFilterGroup.get('transitScore')?.value,
      this.addressFilterGroup.get('bikeScore')?.value
    ));
  }
  
  private async setUpAddressFilter(city: CityEnum): Promise<void> {
    this.addressData = await this.dbService.getAddressData(city);
    this.addressInfoOptions = AddressDataHelper.getAddressInfoArray(this.addressData);

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
