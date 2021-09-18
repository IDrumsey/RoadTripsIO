import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoadtripFormComponent } from './new-roadtrip-form.component';

describe('NewRoadtripFormComponent', () => {
  let component: NewRoadtripFormComponent;
  let fixture: ComponentFixture<NewRoadtripFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRoadtripFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoadtripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
