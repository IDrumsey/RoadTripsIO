import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoCardComponent } from './personal-info-card.component';

describe('PersonalInfoCardComponent', () => {
  let component: PersonalInfoCardComponent;
  let fixture: ComponentFixture<PersonalInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
