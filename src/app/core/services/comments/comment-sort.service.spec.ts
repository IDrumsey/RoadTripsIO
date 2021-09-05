import { TestBed } from '@angular/core/testing';

import { CommentSortService } from './comment-sort.service';

describe('CommentSortService', () => {
  let service: CommentSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
