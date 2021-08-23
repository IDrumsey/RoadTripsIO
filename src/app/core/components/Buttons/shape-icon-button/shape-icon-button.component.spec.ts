import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeIconButtonComponent } from './shape-icon-button.component';

describe('ShapeIconButtonComponent', () => {
  let component: ShapeIconButtonComponent;
  let fixture: ComponentFixture<ShapeIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeIconButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
