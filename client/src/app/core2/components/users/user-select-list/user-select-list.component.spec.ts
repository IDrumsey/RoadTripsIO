import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectListComponent } from './user-select-list.component';

describe('UserSelectListComponent', () => {
  let component: UserSelectListComponent;
  let fixture: ComponentFixture<UserSelectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSelectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
