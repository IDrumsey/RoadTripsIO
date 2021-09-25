import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopCardComponent } from './stop-card.component';

describe('StopCardComponent', () => {
  let component: StopCardComponent;
  let fixture: ComponentFixture<StopCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
