import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignorComponent } from './consignor.component';

describe('ConsignorComponent', () => {
  let component: ConsignorComponent;
  let fixture: ComponentFixture<ConsignorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsignorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
