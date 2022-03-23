import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForecastModelComponent } from './forecast-model/forecast-model.component';
import { NeighborhoodFilterComponent } from './neighborhood-filter/neighborhood-filter.component';
import { AddressFilterComponent } from './address-filter/address-filter.component';
import { FirebaseDbService } from './services/firebase-db.service';
import { NgChartsModule } from 'ng2-charts';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ForecastModelComponent,
    NeighborhoodFilterComponent,
    AddressFilterComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgChartsModule
  ],
  providers: [FirebaseDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
