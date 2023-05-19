import { TestBed } from '@angular/core/testing';

import { StarterDishManagementService } from './starter-dish-management.service';

describe('DishesManagementService', () => {
  let service: StarterDishManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarterDishManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
