import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSettingsComponent } from './check-settings.component';

describe('CheckSettingsComponent', () => {
  let component: CheckSettingsComponent;
  let fixture: ComponentFixture<CheckSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
