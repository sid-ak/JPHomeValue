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
  
  // TODO: Wrap database calls in try catches.

  // Seasonality Forecast Model
  getModel(city: CityEnum, timeframe: number): Observable<SeasonalityModel> {
    return this.http.get(
      UrlHelper.getModelUrl(city, timeframe)).pipe(map(e => new SeasonalityModel(e as any)));
  }
  async getModelAsync(city: CityEnum, timeframe: number): Promise<SeasonalityModel> {
    return await firstValueFrom(this.getModel(city, timeframe));
  }

  // AddressData
  getAddressData(city: CityEnum): Observable<AddressData> {
    return this.http.get(
      UrlHelper.getAddressDataUrl(city)).pipe(map(e => new AddressData(e as any)));
  }
  async getAddressDataAsync(city: CityEnum): Promise<AddressData> {
    return await firstValueFrom(this.getAddressData(city));
  }
}
