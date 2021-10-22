import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsignorAccountsComponent } from './admin-consignor-accounts.component';

describe('AdminConsignorAccountsComponent', () => {
  let component: AdminConsignorAccountsComponent;
  let fixture: ComponentFixture<AdminConsignorAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminConsignorAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsignorAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
