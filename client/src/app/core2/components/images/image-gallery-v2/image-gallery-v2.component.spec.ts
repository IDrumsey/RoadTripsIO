import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGalleryV2Component } from './image-gallery-v2.component';

describe('ImageGalleryV2Component', () => {
  let component: ImageGalleryV2Component;
  let fixture: ComponentFixture<ImageGalleryV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageGalleryV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGalleryV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
