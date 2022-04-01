import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, DatabaseReference, getDatabase, ref } from 'firebase/database';
import { map } from 'rxjs';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SeasonalityModel } from '../common/seasonality-model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDbService {
  app: FirebaseApp;
  database: Database;
  databaseReference: DatabaseReference;

  constructor(private http: HttpClient) {
    this.app = initializeApp(environment.firebaseConfig);
    this.database = getDatabase(this.app);
    this.databaseReference = ref(getDatabase(this.app));
  }
  
  // Model
  getModel(url: string): Observable<SeasonalityModel> {
    return this.http.get(url).pipe(
        map(e => new SeasonalityModel(e as any)));
  }
  getModelAsync(url: string): Promise<SeasonalityModel> {
    return firstValueFrom(this.getModel(url));
  }
}
