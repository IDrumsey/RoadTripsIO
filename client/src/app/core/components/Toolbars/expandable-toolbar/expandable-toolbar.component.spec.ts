import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableToolbarComponent } from './expandable-toolbar.component';

describe('ExpandableToolbarComponent', () => {
  let component: ExpandableToolbarComponent;
  let fixture: ComponentFixture<ExpandableToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandableToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
