import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksManagementComponent } from './drinks-management.component';

describe('DrinksManagementComponent', () => {
  let component: DrinksManagementComponent;
  let fixture: ComponentFixture<DrinksManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinksManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinksManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
