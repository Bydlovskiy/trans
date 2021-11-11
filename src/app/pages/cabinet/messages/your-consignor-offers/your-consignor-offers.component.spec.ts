import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourConsignorOffersComponent } from './your-consignor-offers.component';

describe('YourConsignorOffersComponent', () => {
  let component: YourConsignorOffersComponent;
  let fixture: ComponentFixture<YourConsignorOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourConsignorOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourConsignorOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
