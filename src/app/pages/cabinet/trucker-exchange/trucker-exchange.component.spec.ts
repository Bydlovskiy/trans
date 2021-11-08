import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckerExchangeComponent } from './trucker-exchange.component';

describe('TruckerExchangeComponent', () => {
  let component: TruckerExchangeComponent;
  let fixture: ComponentFixture<TruckerExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckerExchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckerExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
