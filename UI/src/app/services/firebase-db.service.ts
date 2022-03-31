import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, DatabaseReference, getDatabase, ref, get, child } from 'firebase/database';
import { map } from 'rxjs';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shiller } from '../common/shiller';
import { Constants } from '../constants';
import { CityEnum } from '../enums/city-enum';

@Injectable({
  providedIn: 'root'
})
// TODO: Must refactor this class once data is more structured.
export class FirebaseDbService {
  test$ = new BehaviorSubject<boolean>(false);
  app: FirebaseApp;
  database: Database;
  databaseReference: DatabaseReference;

  constructor(private http: HttpClient) {
    this.app = initializeApp(environment.firebaseConfig);
    this.database = getDatabase(this.app);
    this.databaseReference = ref(getDatabase(this.app));
   }
  
  // Tampa
  getTampaThreeMonths(): Observable<Shiller> {
    return this.http.get(
      Constants.getTampaThreeMonthsUrl).pipe(
        map(e => new Shiller(e as any, CityEnum.Tampa)));
   }
   async getTampaThreeMonthsAsync(): Promise<Shiller> {
     return firstValueFrom(this.getTampaThreeMonths());
  }

  getTampaSixMonths(): Observable<Shiller> {
    return this.http.get(
      Constants.getTampaSixMonthsUrl).pipe(
        map(e => new Shiller(e as any, CityEnum.Tampa)));
   }
   async getTampaSixMonthsAsync(): Promise<Shiller> {
     return firstValueFrom(this.getTampaSixMonths());
  }

  getTampaTwelveMonths(): Observable<Shiller> {
    return this.http.get(
      Constants.getTampaTwelveMonthsUrl).pipe(
        map(e => new Shiller(e as any, CityEnum.Tampa)));
   }
   async getTampaTwelveMonthsAsync(): Promise<Shiller> {
     return firstValueFrom(this.getTampaTwelveMonths());
  }

    // StPete
    getStPeteThreeMonths(): Observable<Shiller> {
      return this.http.get(
        Constants.getStPeteThreeMonthsUrl).pipe(
          map(e => new Shiller(e as any, CityEnum.StPetersburg)));
     }
     async getStPeteThreeMonthsAsync(): Promise<Shiller> {
       return firstValueFrom(this.getStPeteThreeMonths());
    }
  
    getStPeteSixMonths(): Observable<Shiller> {
      return this.http.get(
        Constants.getStPeteSixMonthsUrl).pipe(
          map(e => new Shiller(e as any, CityEnum.StPetersburg)));
     }
     async getStPeteSixMonthsAsync(): Promise<Shiller> {
       return firstValueFrom(this.getStPeteSixMonths());
    }
  
    getStPeteTwelveMonths(): Observable<Shiller> {
      return this.http.get(
        Constants.getStPeteTwelveMonthsUrl).pipe(
          map(e => new Shiller(e as any, CityEnum.StPetersburg)));
     }
     async getStPeteTwelveMonthsAsync(): Promise<Shiller> {
       return firstValueFrom(this.getStPeteTwelveMonths());
    }

    // Clearwater
    getClearwaterThreeMonths(): Observable<Shiller> {
      return this.http.get(
        Constants.getClearwaterThreeMonthsUrl).pipe(
          map(e => new Shiller(e as any, CityEnum.Clearwater)));
      }
      async getClearwaterThreeMonthsAsync(): Promise<Shiller> {
        return firstValueFrom(this.getClearwaterThreeMonths());
    }
  
    getClearwaterSixMonths(): Observable<Shiller> {
      return this.http.get(
        Constants.getClearwaterSixMonthsUrl).pipe(
          map(e => new Shiller(e as any, CityEnum.Clearwater)));
      }
      async getClearwaterSixMonthsAsync(): Promise<Shiller> {
        return firstValueFrom(this.getClearwaterSixMonths());
    }
  
    getClearwaterTwelveMonths(): Observable<Shiller> {
      return this.http.get(
        Constants.getClearwaterTwelveMonthsUrl).pipe(
          map(e => new Shiller(e as any, CityEnum.Clearwater)));
      }
      async getClearwaterTwelveMonthsAsync(): Promise<Shiller> {
        return firstValueFrom(this.getClearwaterTwelveMonths());
    }
}
