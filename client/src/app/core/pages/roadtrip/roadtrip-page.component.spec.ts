import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadtripPageComponent } from './roadtrip-page.component';

describe('RoadtripPageComponent', () => {
  let component: RoadtripPageComponent;
  let fixture: ComponentFixture<RoadtripPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadtripPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadtripPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
