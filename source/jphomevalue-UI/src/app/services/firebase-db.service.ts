import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, DatabaseReference, getDatabase, ref, get, child } from 'firebase/database';
import { map } from 'rxjs';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shiller } from '../common/shiller';
import { Constants } from '../constants';
import { NeighborhoodEnum } from '../enums/neighborhood-enum';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDbService {
  test$ = new BehaviorSubject<boolean>(false);
  app: FirebaseApp;
  database: Database;
  databaseReference: DatabaseReference;

  /**
   * WARNING: Authorization has not been implemented.
   */
  constructor(private http: HttpClient) {
    this.app = initializeApp(environment.firebaseConfig);
    this.database = getDatabase(this.app);
    this.databaseReference = ref(getDatabase(this.app));
   }
  
  // Tampa
  getTampaThreeMonths(): Observable<Shiller> {
    return this.http.get(
      Constants.getTampaThreeMonthsUrl).pipe(
        map(e => new Shiller(e as any, NeighborhoodEnum.Tampa)));
   }
   async getTampaThreeMonthsAsync(): Promise<Shiller> {
     return firstValueFrom(this.getTampaThreeMonths());
  }

  getTampaSixMonths(): Observable<Shiller> {
    return this.http.get(
      Constants.getTampaSixMonthsUrl).pipe(
        map(e => new Shiller(e as any, NeighborhoodEnum.Tampa)));
   }
   async getTampaSixMonthsAsync(): Promise<Shiller> {
     return firstValueFrom(this.getTampaSixMonths());
  }

  getTampaTwelveMonths(): Observable<Shiller> {
    return this.http.get(
      Constants.getTampaTwelveMonthsUrl).pipe(
        map(e => new Shiller(e as any, NeighborhoodEnum.Tampa)));
   }
   async getTampaTwelveMonthsAsync(): Promise<Shiller> {
     return firstValueFrom(this.getTampaTwelveMonths());
  }

    // StPete
    getStPeteThreeMonths(): Observable<Shiller> {
      return this.http.get(
        Constants.getStPeteThreeMonthsUrl).pipe(
          map(e => new Shiller(e as any, NeighborhoodEnum.StPetersburg)));
     }
     async getStPeteThreeMonthsAsync(): Promise<Shiller> {
       return firstValueFrom(this.getStPeteThreeMonths());
    }
  
    getStPeteSixMonths(): Observable<Shiller> {
      return this.http.get(
        Constants.getStPeteSixMonthsUrl).pipe(
          map(e => new Shiller(e as any, NeighborhoodEnum.StPetersburg)));
     }
     async getStPeteSixMonthsAsync(): Promise<Shiller> {
       return firstValueFrom(this.getStPeteSixMonths());
    }
  
    getStPeteTwelveMonths(): Observable<Shiller> {
      return this.http.get(
        Constants.getStPeteTwelveMonthsUrl).pipe(
          map(e => new Shiller(e as any, NeighborhoodEnum.StPetersburg)));
     }
     async getStPeteTwelveMonthsAsync(): Promise<Shiller> {
       return firstValueFrom(this.getStPeteTwelveMonths());
    }
}
