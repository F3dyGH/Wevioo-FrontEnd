import { TestBed } from '@angular/core/testing';

import { Food_by_categoriesService } from './food_by_categories.service';

describe('SandwichesService', () => {
  let service: Food_by_categoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Food_by_categoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
