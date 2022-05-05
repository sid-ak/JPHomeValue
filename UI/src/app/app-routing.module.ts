import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapResolver } from './resolvers/map-resolver';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/city-dashboard",
    pathMatch: "full"
  },
  {
    path: "city-dashboard",
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
  {
    path: "**",
    redirectTo: "/city-dashboard",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
