import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignorLoginComponent } from './consignor-login.component';

describe('ConsignorLoginComponent', () => {
  let component: ConsignorLoginComponent;
  let fixture: ComponentFixture<ConsignorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignorLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
