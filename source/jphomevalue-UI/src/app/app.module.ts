import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NeighborhoodDashboardComponent } from './neighborhood-dashboard/neighborhood-dashboard.component';
import { AddressDashboardComponent } from './address-dashboard/address-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NeighborhoodFilterComponent } from './neighborhood-dashboard/neighborhood-filter/neighborhood-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'

@NgModule({
  declarations: [
    AppComponent,
    NeighborhoodDashboardComponent,
    AddressDashboardComponent,
    NeighborhoodFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
