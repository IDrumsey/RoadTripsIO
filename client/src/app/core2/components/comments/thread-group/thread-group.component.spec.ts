import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadGroupComponent } from './thread-group.component';

describe('ThreadGroupComponent', () => {
  let component: ThreadGroupComponent;
  let fixture: ComponentFixture<ThreadGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
