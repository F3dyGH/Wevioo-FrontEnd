import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertManagementComponent } from './dessert-management.component';

describe('DessertManagementComponent', () => {
  let component: DessertManagementComponent;
  let fixture: ComponentFixture<DessertManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DessertManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DessertManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
