import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSelectorFormComponent } from './image-selector-form.component';

describe('ImageSelectorFormComponent', () => {
  let component: ImageSelectorFormComponent;
  let fixture: ComponentFixture<ImageSelectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSelectorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSelectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
