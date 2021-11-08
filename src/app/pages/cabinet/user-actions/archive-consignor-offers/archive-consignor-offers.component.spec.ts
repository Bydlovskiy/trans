import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveConsignorOffersComponent } from './archive-consignor-offers.component';

describe('ArchiveConsignorOffersComponent', () => {
  let component: ArchiveConsignorOffersComponent;
  let fixture: ComponentFixture<ArchiveConsignorOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveConsignorOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveConsignorOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
