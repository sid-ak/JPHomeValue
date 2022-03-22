import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressDashboardComponent } from './address-dashboard/address-dashboard.component';
import { NeighborhoodDashboardComponent } from './neighborhood-dashboard/neighborhood-dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: NeighborhoodDashboardComponent
  },
  {
    path: "neighborhood-dashboard",
    pathMatch: "full",
    component: NeighborhoodDashboardComponent
  },
  {
    path: "address-dashboard",
    pathMatch: "full",
    component: AddressDashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
