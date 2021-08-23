import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCoordinatesComponent } from './selected-coordinates.component';

describe('SelectedCoordinatesComponent', () => {
  let component: SelectedCoordinatesComponent;
  let fixture: ComponentFixture<SelectedCoordinatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCoordinatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
