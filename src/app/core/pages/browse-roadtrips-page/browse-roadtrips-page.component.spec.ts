import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRoadtripsPageComponent } from './browse-roadtrips-page.component';

describe('BrowseRoadtripsPageComponent', () => {
  let component: BrowseRoadtripsPageComponent;
  let fixture: ComponentFixture<BrowseRoadtripsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseRoadtripsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRoadtripsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
