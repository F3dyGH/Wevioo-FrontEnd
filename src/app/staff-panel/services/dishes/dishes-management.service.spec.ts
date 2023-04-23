import { TestBed } from '@angular/core/testing';

import { DishesManagementService } from './dishes-management.service';

describe('DishesManagementService', () => {
  let service: DishesManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishesManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
