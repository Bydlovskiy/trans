import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersOffersComponent } from './others-notifications.component';

describe('OthersConsignorOffersComponent', () => {
  let component: OthersOffersComponent;
  let fixture: ComponentFixture<OthersOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
