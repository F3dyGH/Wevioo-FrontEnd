import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasManagementComponent } from './pizzas-management.component';

describe('PizzasManagementComponent', () => {
  let component: PizzasManagementComponent;
  let fixture: ComponentFixture<PizzasManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzasManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzasManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
