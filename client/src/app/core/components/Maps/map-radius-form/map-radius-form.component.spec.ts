import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRadiusFormComponent } from './map-radius-form.component';

describe('MapRadiusFormComponent', () => {
  let component: MapRadiusFormComponent;
  let fixture: ComponentFixture<MapRadiusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapRadiusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRadiusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
