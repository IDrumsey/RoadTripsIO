import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSelectToolbarComponent } from './single-select-toolbar.component';

describe('SingleSelectToolbarComponent', () => {
  let component: SingleSelectToolbarComponent;
  let fixture: ComponentFixture<SingleSelectToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSelectToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSelectToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
