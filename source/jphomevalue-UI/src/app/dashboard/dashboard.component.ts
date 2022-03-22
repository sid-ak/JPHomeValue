import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, noop, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroyed$ = new EventEmitter<boolean>();

  public isNeighborhoodDashboard$ = new BehaviorSubject<boolean>(false)
  
  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.checkNavigation();
  }

  ngOnDestroy(): void {
      this.destroyed$.next(true);
  }

  private checkNavigation(): void {
    this.isNeighborhoodDashboard(this.router.url);
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(
      e => e instanceof NavigationEnd
        ? this.isNeighborhoodDashboard(e.url)
        : noop()
    )
  }

  public isNeighborhoodDashboard(url: string): void {
    if (url == '/neighborhood-dashboard') this.isNeighborhoodDashboard$.next(true);
    else this.isNeighborhoodDashboard$.next(false);
  }
}
