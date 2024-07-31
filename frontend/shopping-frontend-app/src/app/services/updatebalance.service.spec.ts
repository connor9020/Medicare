import { TestBed } from '@angular/core/testing';

import { UpdatebalanceService } from './updatebalance.service';

describe('UpdatebalanceService', () => {
  let service: UpdatebalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatebalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
