import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadtripSummaryCardComponent } from './roadtrip-summary-card.component';

describe('RoadtripSummaryCardComponent', () => {
  let component: RoadtripSummaryCardComponent;
  let fixture: ComponentFixture<RoadtripSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadtripSummaryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadtripSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
