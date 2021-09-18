import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadtripCardComponent } from './roadtrip-card.component';

describe('RoadtripCardComponent', () => {
  let component: RoadtripCardComponent;
  let fixture: ComponentFixture<RoadtripCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadtripCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadtripCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
