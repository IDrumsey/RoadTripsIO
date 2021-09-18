import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleButtonComponent } from './rectangle-button.component';

describe('RectangleButtonComponent', () => {
  let component: RectangleButtonComponent;
  let fixture: ComponentFixture<RectangleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
