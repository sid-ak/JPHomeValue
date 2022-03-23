import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, DatabaseReference, getDatabase, ref, get, child } from 'firebase/database';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
    this.database = getDatabase(this.app);
    this.databaseReference = ref(getDatabase(this.app));
   }

   /**
    * This method only logs data in the console and performs no other action currently.
    * This is only to test the read access to the firebase real time DB.
    * @param shillerId 
    */
   public getShillerIndex(shillerId: number): void {
    get(child(this.databaseReference, `/tampaShiller/${shillerId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}
