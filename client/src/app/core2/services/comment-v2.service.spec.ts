import { TestBed } from '@angular/core/testing';

import { CommentV2Service } from './comment-v2.service';

describe('CommentV2Service', () => {
  let service: CommentV2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
