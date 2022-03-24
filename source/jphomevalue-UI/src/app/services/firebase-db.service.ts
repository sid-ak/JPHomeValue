import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, DatabaseReference, getDatabase, ref, get, child } from 'firebase/database';
import { map } from 'rxjs';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TampaShillerIndex } from '../collections/tampa-shiller-index';

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

   getTampaShillerIndex(): Observable<TampaShillerIndex> {
    return this.http.get(
      'https://jphomevalue-default-rtdb.firebaseio.com/tampaShiller.json?print=pretty').pipe(
        map(e => new TampaShillerIndex(e as any)));
   }

   /**
    * This method only logs data in the console and performs no other action currently.
    * This is only to test the read access to the firebase real time DB.
    * @param shillerId 
    */
   async getTampaShillerIndexAsync(): Promise<TampaShillerIndex> {
     return firstValueFrom(this.getTampaShillerIndex());
  }
}
