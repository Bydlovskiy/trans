import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTruckerAccountsComponent } from './admin-trucker-accounts.component';

describe('AdminTruckerAccountsComponent', () => {
  let component: AdminTruckerAccountsComponent;
  let fixture: ComponentFixture<AdminTruckerAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTruckerAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTruckerAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
