import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, noop, takeUntil } from 'rxjs';
import { FilterEventService } from 'src/app/services/filter-event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroyed$ = new EventEmitter<void>();

  public isCityDashboard = true;

  constructor(
    private readonly router: Router,
    private readonly filterService: FilterEventService) { }

  ngOnInit(): void {
    this.checkNavigation();
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
  }

  private checkNavigation(): void {
    this.onCityDashboard(this.router.url);
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(
      e => e instanceof NavigationEnd
        ? this.onCityDashboard(e.url)
        : noop()
    )
  }

  public onCityDashboard(url: string): void {
    if (url == '/city-dashboard') { 
      this.filterService.isCityDashboard$.next(true);
      this.isCityDashboard = true;
    }
    else { 
      this.filterService.isCityDashboard$.next(false);
      this.isCityDashboard = false;
    }
  }
}
