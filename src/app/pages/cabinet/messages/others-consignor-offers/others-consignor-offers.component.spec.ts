import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersConsignorOffersComponent } from './others-consignor-offers.component';

describe('OthersConsignorOffersComponent', () => {
  let component: OthersConsignorOffersComponent;
  let fixture: ComponentFixture<OthersConsignorOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersConsignorOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersConsignorOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
