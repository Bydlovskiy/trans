import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckerRegisterComponent } from './trucker-register.component';

describe('TruckerRegisterComponent', () => {
  let component: TruckerRegisterComponent;
  let fixture: ComponentFixture<TruckerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckerRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
