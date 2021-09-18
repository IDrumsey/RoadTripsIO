import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUsersFormComponent } from './select-users-form.component';

describe('SelectUsersFormComponent', () => {
  let component: SelectUsersFormComponent;
  let fixture: ComponentFixture<SelectUsersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUsersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
