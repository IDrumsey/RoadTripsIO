import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareIconButtonComponent } from './square-icon-button.component';

describe('SquareIconButtonComponent', () => {
  let component: SquareIconButtonComponent;
  let fixture: ComponentFixture<SquareIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquareIconButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
