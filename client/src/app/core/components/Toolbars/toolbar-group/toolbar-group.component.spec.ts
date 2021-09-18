import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarGroupComponent } from './toolbar-group.component';

describe('ToolbarGroupComponent', () => {
  let component: ToolbarGroupComponent;
  let fixture: ComponentFixture<ToolbarGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
