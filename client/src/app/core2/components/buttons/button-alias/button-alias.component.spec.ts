import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAliasComponent } from './button-alias.component';

describe('ButtonAliasComponent', () => {
  let component: ButtonAliasComponent;
  let fixture: ComponentFixture<ButtonAliasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAliasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
