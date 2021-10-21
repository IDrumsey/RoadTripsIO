import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyFieldComponent } from './reply-field.component';

describe('ReplyFieldComponent', () => {
  let component: ReplyFieldComponent;
  let fixture: ComponentFixture<ReplyFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
