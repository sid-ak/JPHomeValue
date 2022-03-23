import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapResolver } from './resolvers/map-resolver';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    resolve: {
      map: MapResolver
    }
  },
  {
    path: "neighborhood-dashboard",
    component: DashboardComponent,
    resolve: {
      map: MapResolver
    }
  },
  {
    path: "address-dashboard",
    component: DashboardComponent,
    resolve: {
      map: MapResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
