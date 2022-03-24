import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, DatabaseReference, getDatabase, ref, get, child } from 'firebase/database';
import { map } from 'rxjs';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shiller } from '../common/shiller';
import { Constants } from '../constants';

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
        map(e => new Shiller(e as any)));
   }

   async getTampaThreeMonthsAsync(): Promise<Shiller> {
     return firstValueFrom(this.getTampaThreeMonths());
  }

  getTampaSixMonths(): Observable<Shiller> {
    return this.http.get(
      Constants.getTampaSixMonthsUrl).pipe(
        map(e => new Shiller(e as any)));
   }

   async getTampaSixMonthsAsync(): Promise<Shiller> {
     return firstValueFrom(this.getTampaSixMonths());
  }

  getTampaTwelveMonths(): Observable<Shiller> {
    return this.http.get(
      Constants.getTampaTwelveMonthsUrl).pipe(
        map(e => new Shiller(e as any)));
   }

   async getTampaTwelveMonthsAsync(): Promise<Shiller> {
     return firstValueFrom(this.getTampaTwelveMonths());
  }
}
