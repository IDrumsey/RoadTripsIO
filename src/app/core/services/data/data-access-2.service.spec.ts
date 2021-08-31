import { TestBed } from '@angular/core/testing';

import { DataAccess2Service } from './data-access-2.service';

describe('DataAccess2Service', () => {
  let service: DataAccess2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAccess2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
