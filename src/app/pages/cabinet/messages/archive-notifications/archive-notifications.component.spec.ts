import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveNotificationsComponent } from './archive-notifications.component';

describe('ArchiveNotificationsComponent', () => {
  let component: ArchiveNotificationsComponent;
  let fixture: ComponentFixture<ArchiveNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
