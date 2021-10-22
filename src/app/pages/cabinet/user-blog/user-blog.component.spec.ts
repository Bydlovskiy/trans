import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlogComponent } from './user-blog.component';

describe('UserBlogComponent', () => {
  let component: UserBlogComponent;
  let fixture: ComponentFixture<UserBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
