import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith, takeUntil } from 'rxjs';
import { AddressFilterModel } from '../../models/address-filter-model';
import { AddressData, AddressInfo, Scores } from 'src/app/common/address-data';
import { CityEnum } from 'src/app/enums/city-enum';
import { AddressDataHelper } from 'src/app/helpers/address-data-helper';
import { FirebaseDbService } from 'src/app/services/firebase-db.service';
import { AddressService } from 'src/app/services/address-service';
import { CityService } from 'src/app/services/city-service';
import { CityHelper } from 'src/app/helpers/city-helper';
import { MapHelper } from 'src/app/helpers/map-helper';

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
    showAddressMarkers: new FormControl(),
    address: new FormControl(),
    timeframe: new FormControl(),
    walkScore: new FormControl(),
    transitScore: new FormControl(),
    bikeScore: new FormControl()
  })
  addressInfos: AddressInfo[] = [];
  filteredAddresses$ = new Observable<AddressInfo[]>();

  addressData: AddressData = new AddressData();

  isAddressListFiltered: boolean = false;
  noAddressFound: boolean = false;

  constructor(
    private readonly dbService: FirebaseDbService,
    private readonly addressService: AddressService,
    private readonly cityService: CityService) { }

  /**
   * Set up the autocomplete on initialization.
   */
  async ngOnInit(): Promise<void> {
    this.cityService.cityChanged$.pipe(takeUntil(this.destroyed$)).subscribe(
      async e => await this.setUpAddressFilter(e)
    );
  }

  ngOnDestroy(): void {
      this.destroyed$.next(true);
  }

  /**
   * Handle change to the city dropdown.
   * @param city 
   */
  public onCityChanged(city: CityEnum): void {
    this.cityService.cityChanged$.next(city);
    
    this.addressFilterGroup.controls['address'].setValue(null);
    this.addressFilterGroup.controls['showSurroundings'].setValue(null);
    this.addressFilterGroup.controls['showAddressMarkers'].setValue(null);

    this.addressService.displayScoresChanged$.next(new Scores());
  }

  /**
   * A way to reinitialize the map and chart if the address filter button is clicked.
   * @param latLngArray An optional parameter to show clustered address markers using
   * an array of type google.maps.LatLng
   * 
   * TODO: Handle a special case for when just the timeframe is changed, and nothing else.
   * Similar to how city change is handled. The map does not need to re render on timeframe change.
   */
  public onAddressFilterChanged(
    latLngArray: google.maps.LatLng[] = []): void {
    
    const city = CityHelper.getCityFromString(this.addressFilterGroup.get('city')?.value);
    const showSurroundings = this.addressFilterGroup.get('showSurroundings')?.value;
    const showAddressMarkers = this.addressFilterGroup.get('showAddressMarkers')?.value;
    const address = this.addressFilterGroup.get('address')?.value ?? "";
    const timeframe = this.addressFilterGroup.get('timeframe')?.value;
    const walkScore = this.addressFilterGroup.get('walkScore')?.value;
    const transitScore = this.addressFilterGroup.get('transitScore')?.value;
    const bikeScore = this.addressFilterGroup.get('bikeScore')?.value;

    const filteredAddressInfo = this.addressInfos.find(
      e => e.address === address
    );

    this.addressService.addressFilterChanged$.next(new AddressFilterModel(
      city,
      showSurroundings,
      showAddressMarkers,
      latLngArray,
      filteredAddressInfo?.lat ?? 0,
      filteredAddressInfo?.lng ?? 0,
      address,
      timeframe,
      walkScore,
      transitScore,
      bikeScore
    ));

    const displayScores = AddressDataHelper.getDisplayScores(filteredAddressInfo);
    this.addressService.displayScoresChanged$.next(displayScores);

    this.setUpAddressFilter(city, new Scores(walkScore, transitScore, bikeScore));
  }
  
  /**
   * Set up the data for the address autocomplete.
   * @param city 
   */
  private async setUpAddressFilter(
      city: CityEnum, scores: Scores = new Scores()): Promise<void> {
    this.addressData = await this.dbService.getAddressData(city);

    if (scores.bikeScore === -1 && scores.transitScore === -1 && scores.walkScore === -1) {
      this.addressInfos = AddressDataHelper.getAddressInfoArray(this.addressData);
      this.isAddressListFiltered = false;
    } else {
      this.addressInfos = AddressDataHelper.getAddressInfoArray(this.addressData).filter(
        e => e.bikeScore > this.addressFilterGroup.get('bikeScore')?.value
          && e.transitScore > this.addressFilterGroup.get('transitScore')?.value
          && e.walkScore > this.addressFilterGroup.get('walkScore')?.value 
      );
      
      if (this.addressInfos.length !== 0) {
        this.isAddressListFiltered = true
        this.noAddressFound = false;
      } else {
        this.isAddressListFiltered = false;
        this.noAddressFound = true;
        this.addressFilterGroup.controls['address'].setValue('');
      };
    }

    this.filteredAddresses$ = this.addressFilterGroup.get('address')!.valueChanges.pipe(
      startWith(''),
      map(e => this.filterAddress(e))
    );
  }

  /**
   * Filter address for the autocomplete.
   * @param address 
   * @returns An array of type AddressInfo.
   */
  private filterAddress(address: string): AddressInfo[] {
    const addressLower = address.toLowerCase();

    return this.addressInfos.filter(e => e.address.toLowerCase()
      .includes(addressLower));
  }

  /**
   * Show surrounding facilities.
   * @param showSurroundings is the checkbox input type and represents the toggle.
   */
  public showSurroundings(showSurroundings: any) {
    this.addressFilterGroup.controls['showSurroundings']
      .setValue(showSurroundings.target.checked);
    
    this.onAddressFilterChanged();
  }

  /**
   * Show address clusters.
   * @param showAddressMarkers is the checkbox input type and represents the toggle.
   */
  public showAddressMarkers(showAddressMarkers: any) {
    let latLngArray: google.maps.LatLng[] = [];

    this.addressFilterGroup.controls['showAddressMarkers']
      .setValue(showAddressMarkers.target.checked);
    
    if (this.addressInfos.length) {
      latLngArray = MapHelper.getLatLngArrayFromaddressInfos(
        this.addressInfos)
    }

    this.onAddressFilterChanged(latLngArray);
  }

  public clearFilter() {
    this.isAddressListFiltered = false;
    this.noAddressFound = false;
    this.addressFilterGroup.controls['city'].setValue(null);
    this.addressFilterGroup.controls['showSurroundings'].setValue(null);
    this.addressFilterGroup.controls['showAddressMarkers'].setValue(null);
    this.addressFilterGroup.controls['address'].setValue(null);
    this.addressFilterGroup.controls['timeframe'].setValue(null);
    this.addressFilterGroup.controls['walkScore'].setValue(null);
    this.addressFilterGroup.controls['transitScore'].setValue(null);
    this.addressFilterGroup.controls['bikeScore'].setValue(null);
  }
}
