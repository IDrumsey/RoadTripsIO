import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadtripLocationCardHeadComponent } from './roadtrip-location-card-head.component';

describe('RoadtripLocationCardHeadComponent', () => {
  let component: RoadtripLocationCardHeadComponent;
  let fixture: ComponentFixture<RoadtripLocationCardHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadtripLocationCardHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadtripLocationCardHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
