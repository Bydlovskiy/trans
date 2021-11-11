import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTruckerOffersComponent } from './you-trucker-offers.component';

describe('YouTruckerOffersComponent', () => {
  let component: YouTruckerOffersComponent;
  let fixture: ComponentFixture<YouTruckerOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouTruckerOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouTruckerOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
