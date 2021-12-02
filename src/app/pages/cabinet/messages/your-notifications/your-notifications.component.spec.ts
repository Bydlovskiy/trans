import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourNotificationsComponent } from './your-notifications.component';

describe('YourConsignorOffersComponent', () => {
  let component: YourNotificationsComponent;
  let fixture: ComponentFixture<YourNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
