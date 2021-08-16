import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadtripLocationCardDetailsComponent } from './roadtrip-location-card-details.component';

describe('RoadtripLocationCardDetailsComponent', () => {
  let component: RoadtripLocationCardDetailsComponent;
  let fixture: ComponentFixture<RoadtripLocationCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadtripLocationCardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadtripLocationCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
