import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCheckboxComponent } from './content-checkbox.component';

describe('ContentCheckboxComponent', () => {
  let component: ContentCheckboxComponent;
  let fixture: ComponentFixture<ContentCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
