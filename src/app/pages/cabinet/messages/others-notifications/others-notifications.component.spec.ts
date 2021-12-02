import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersNotificationsComponent } from './others-notifications.component';

describe('OthersConsignorOffersComponent', () => {
  let component: OthersNotificationsComponent;
  let fixture: ComponentFixture<OthersNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
