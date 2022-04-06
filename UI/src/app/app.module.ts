import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import { CityFilterComponent } from './components/city-filter/city-filter.component';
import { AddressFilterComponent } from './components/address-filter/address-filter.component';
import { FirebaseDbService } from './services/firebase-db.service';
import { MapComponent } from './components/map/map.component';
import { AdditionalDetailsComponent } from './components/additional-details/additional-details.component';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { FilterEventService } from './services/filter-event.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartComponent,
    CityFilterComponent,
    AddressFilterComponent,
    MapComponent,
    AdditionalDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    HighchartsChartModule,
    MatAutocompleteModule
  ],
  providers: [FirebaseDbService, FilterEventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
