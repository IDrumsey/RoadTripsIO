import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRoadtripPageComponent } from './individual-roadtrip-page.component';

describe('IndividualRoadtripPageComponent', () => {
  let component: IndividualRoadtripPageComponent;
  let fixture: ComponentFixture<IndividualRoadtripPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualRoadtripPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualRoadtripPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
