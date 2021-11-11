import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersTruckerOffersComponent } from './others-trucker-offers.component';

describe('OthersTruckerOffersComponent', () => {
  let component: OthersTruckerOffersComponent;
  let fixture: ComponentFixture<OthersTruckerOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersTruckerOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersTruckerOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
