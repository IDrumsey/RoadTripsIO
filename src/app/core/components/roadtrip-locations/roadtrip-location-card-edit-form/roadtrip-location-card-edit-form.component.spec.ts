import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadtripLocationCardEditFormComponent } from './roadtrip-location-card-edit-form.component';

describe('RoadtripLocationCardEditFormComponent', () => {
  let component: RoadtripLocationCardEditFormComponent;
  let fixture: ComponentFixture<RoadtripLocationCardEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadtripLocationCardEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadtripLocationCardEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
