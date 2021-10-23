import { TestBed } from '@angular/core/testing';

import { ReportCenterService } from './report-center.service';

describe('ReportCenterService', () => {
  let service: ReportCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
