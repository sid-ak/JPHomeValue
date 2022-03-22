import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NeighborhoodDashboardComponent } from './neighborhood-dashboard/neighborhood-dashboard.component';
import { AddressDashboardComponent } from './address-dashboard/address-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NeighborhoodDashboardComponent,
    AddressDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
