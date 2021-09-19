import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMapUIComponent } from './i-map-ui.component';

describe('IMapUIComponent', () => {
  let component: IMapUIComponent;
  let fixture: ComponentFixture<IMapUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IMapUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IMapUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
