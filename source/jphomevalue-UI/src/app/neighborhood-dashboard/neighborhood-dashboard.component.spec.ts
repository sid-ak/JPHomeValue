import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodDashboardComponent } from './neighborhood-dashboard.component';

describe('NeighborhoodDashboardComponent', () => {
  let component: NeighborhoodDashboardComponent;
  let fixture: ComponentFixture<NeighborhoodDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighborhoodDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeighborhoodDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
