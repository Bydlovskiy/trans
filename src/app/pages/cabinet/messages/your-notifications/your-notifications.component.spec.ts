import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourOffersComponent } from './your-notifications.component';

describe('YourConsignorOffersComponent', () => {
  let component: YourOffersComponent;
  let fixture: ComponentFixture<YourOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
