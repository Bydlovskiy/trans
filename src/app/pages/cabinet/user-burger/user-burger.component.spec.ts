import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBurgerComponent } from './user-burger.component';

describe('UserBurgerComponent', () => {
  let component: UserBurgerComponent;
  let fixture: ComponentFixture<UserBurgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBurgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
