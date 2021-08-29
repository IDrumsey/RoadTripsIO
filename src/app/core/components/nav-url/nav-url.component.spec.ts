import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavURLComponent } from './nav-url.component';

describe('NavURLComponent', () => {
  let component: NavURLComponent;
  let fixture: ComponentFixture<NavURLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavURLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavURLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
