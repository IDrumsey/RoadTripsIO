import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMapComponent } from './i-map.component';

describe('IMapComponent', () => {
  let component: IMapComponent;
  let fixture: ComponentFixture<IMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
