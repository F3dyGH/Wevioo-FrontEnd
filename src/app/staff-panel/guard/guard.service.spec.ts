import { TestBed } from '@angular/core/testing';

import { StaffGuardService } from './guard.service';

describe('GuardService', () => {
  let service: StaffGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
