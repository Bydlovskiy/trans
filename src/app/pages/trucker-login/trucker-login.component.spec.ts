import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckerLoginComponent } from './trucker-login.component';

describe('TruckerLoginComponent', () => {
  let component: TruckerLoginComponent;
  let fixture: ComponentFixture<TruckerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckerLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
