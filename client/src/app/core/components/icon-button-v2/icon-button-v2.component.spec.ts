import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonV2Component } from './icon-button-v2.component';

describe('IconButtonV2Component', () => {
  let component: IconButtonV2Component;
  let fixture: ComponentFixture<IconButtonV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconButtonV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconButtonV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
