import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckerComponent } from './trucker.component';

describe('TruckerComponent', () => {
  let component: TruckerComponent;
  let fixture: ComponentFixture<TruckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
