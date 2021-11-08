import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveOffersComponent } from './archive-trucker-offers.component';

describe('ArchiveOffersComponent', () => {
  let component: ArchiveOffersComponent;
  let fixture: ComponentFixture<ArchiveOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
