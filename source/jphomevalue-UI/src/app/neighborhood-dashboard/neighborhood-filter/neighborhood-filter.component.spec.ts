import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodFilterComponent } from './neighborhood-filter.component';

describe('NeighborhoodFilterComponent', () => {
  let component: NeighborhoodFilterComponent;
  let fixture: ComponentFixture<NeighborhoodFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighborhoodFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeighborhoodFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
