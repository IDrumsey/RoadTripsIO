import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStopFormComponent } from './new-stop-form.component';

describe('NewStopFormComponent', () => {
  let component: NewStopFormComponent;
  let fixture: ComponentFixture<NewStopFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStopFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
