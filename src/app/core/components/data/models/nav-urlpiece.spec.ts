import { NavURLPiece } from './nav-urlpiece';
import {Router} from '@angular/router'
import { TestBed } from '@angular/core/testing';

class deps{
  constructor(private router: Router){}

  getRouter(): Router {
    return this.router;
  }
}

describe('NavURLPiece', () => {
  it('should create an instance', () => {
    expect(new NavURLPiece()).toBeTruthy();
  });
});
