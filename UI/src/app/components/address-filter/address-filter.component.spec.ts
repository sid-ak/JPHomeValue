import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFilterComponent } from './address-filter.component';

describe('AddressFilterComponent', () => {
  let component: AddressFilterComponent;
  let fixture: ComponentFixture<AddressFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
