import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveConsignorOffersComponent } from './active-consignor-offers.component';

describe('ActiveConsignorOffersComponent', () => {
  let component: ActiveConsignorOffersComponent;
  let fixture: ComponentFixture<ActiveConsignorOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveConsignorOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveConsignorOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
