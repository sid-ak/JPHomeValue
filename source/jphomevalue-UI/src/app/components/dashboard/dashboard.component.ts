import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, noop, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroyed$ = new EventEmitter<boolean>();

  public isCityDashboard$ = new BehaviorSubject<boolean>(false)
  
  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.checkNavigation();
  }

  ngOnDestroy(): void {
      this.destroyed$.next(true);
  }

  private checkNavigation(): void {
    this.isCityDashboard(this.router.url);
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(
      e => e instanceof NavigationEnd
        ? this.isCityDashboard(e.url)
        : noop()
    )
  }

  public isCityDashboard(url: string): void {
    if (url == '/city-dashboard') this.isCityDashboard$.next(true);
    else this.isCityDashboard$.next(false);
  }
}
