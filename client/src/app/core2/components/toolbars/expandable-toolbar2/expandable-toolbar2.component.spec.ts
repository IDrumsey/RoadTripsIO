import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableToolbar2Component } from './expandable-toolbar2.component';

describe('ExpandableToolbar2Component', () => {
  let component: ExpandableToolbar2Component;
  let fixture: ComponentFixture<ExpandableToolbar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandableToolbar2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableToolbar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
