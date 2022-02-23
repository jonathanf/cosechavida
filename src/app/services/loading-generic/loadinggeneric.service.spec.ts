import { TestBed } from '@angular/core/testing';

import { LoadinggenericService } from './loadinggeneric.service';

describe('LoadinggenericService', () => {
  let service: LoadinggenericService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadinggenericService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
