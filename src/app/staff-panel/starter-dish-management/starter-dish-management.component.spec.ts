import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterDishManagementComponent } from './starter-dish-management.component';

describe('DishesManagementComponent', () => {
  let component: StarterDishManagementComponent;
  let fixture: ComponentFixture<StarterDishManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarterDishManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarterDishManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
