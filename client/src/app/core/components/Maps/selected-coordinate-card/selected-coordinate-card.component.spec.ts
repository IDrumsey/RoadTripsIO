import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCoordinateCardComponent } from './selected-coordinate-card.component';

describe('SelectedCoordinateCardComponent', () => {
  let component: SelectedCoordinateCardComponent;
  let fixture: ComponentFixture<SelectedCoordinateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCoordinateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCoordinateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
