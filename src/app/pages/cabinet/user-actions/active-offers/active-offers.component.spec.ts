import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveOffersComponent } from './active-offers.component';

describe('ActiveOffersComponent', () => {
  let component: ActiveOffersComponent;
  let fixture: ComponentFixture<ActiveOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
