import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLocationFormComponent } from './new-location-form.component';

describe('NewLocationFormComponent', () => {
  let component: NewLocationFormComponent;
  let fixture: ComponentFixture<NewLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLocationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
