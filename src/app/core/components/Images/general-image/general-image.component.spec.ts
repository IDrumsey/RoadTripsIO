import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralImageComponent } from './general-image.component';

describe('GeneralImageComponent', () => {
  let component: GeneralImageComponent;
  let fixture: ComponentFixture<GeneralImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
