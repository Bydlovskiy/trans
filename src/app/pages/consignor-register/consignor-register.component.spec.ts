import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignorRegisterComponent } from './consignor-register.component';

describe('ConsignorRegisterComponent', () => {
  let component: ConsignorRegisterComponent;
  let fixture: ComponentFixture<ConsignorRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignorRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
