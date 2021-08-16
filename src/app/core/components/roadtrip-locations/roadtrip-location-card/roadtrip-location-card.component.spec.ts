import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadtripLocationCardComponent } from './roadtrip-location-card.component';

describe('RoadtripLocationCardComponent', () => {
  let component: RoadtripLocationCardComponent;
  let fixture: ComponentFixture<RoadtripLocationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadtripLocationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadtripLocationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
