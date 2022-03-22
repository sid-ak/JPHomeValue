import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastModelComponent } from './forecast-model.component';

describe('ForecastModelComponent', () => {
  let component: ForecastModelComponent;
  let fixture: ComponentFixture<ForecastModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
