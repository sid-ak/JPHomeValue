import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, DatabaseReference, getDatabase, ref } from 'firebase/database';
import { map } from 'rxjs';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressData } from '../common/address-data';
import { SeasonalityModel } from '../common/seasonality-model';
import { CityEnum } from '../enums/city-enum';
import { UrlHelper } from '../helpers/url-helper';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDbService {
  readonly app: FirebaseApp;
  readonly database: Database;
  readonly databaseReference: DatabaseReference;

  constructor(private http: HttpClient) {
    this.app = initializeApp(environment.firebaseConfig);
    this.database = getDatabase(this.app);
    this.databaseReference = ref(getDatabase(this.app));
  }
  
  /**
   * Gets the seasonality forecast model if provided the city and timeframe.
   * @param city is the CityEnum for the desired model.
   * @param timeframe can be 3, 6 or 12 for the desired model.
   * @returns an Promise of type SeasonalityModel.
   */
  getModel(city: CityEnum, timeframe: number): Promise<SeasonalityModel> {
    return firstValueFrom(this.http.get(
      UrlHelper.getModelUrl(city, timeframe)).pipe(
        map(e => new SeasonalityModel(e as Array<any>))));
  }

  /**
   * Gets the address data based on the city.
   * @param city is the CityEnum for the desired address data.
   * @returns an Promise of type AddressData.
   */
  getAddressData(city: CityEnum): Promise<AddressData> {
    return firstValueFrom(this.http.get(
      UrlHelper.getAddressDataUrl(city)).pipe(
        map(e => new AddressData(e as Array<any>))));
  }
}
