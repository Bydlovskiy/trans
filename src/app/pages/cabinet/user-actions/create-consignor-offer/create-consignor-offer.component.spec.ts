import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsignorOfferComponent } from './create-consignor-offer.component';

describe('CreateConsignorOfferComponent', () => {
  let component: CreateConsignorOfferComponent;
  let fixture: ComponentFixture<CreateConsignorOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConsignorOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConsignorOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
