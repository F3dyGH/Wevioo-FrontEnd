import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwichesManagementComponent } from './sandwiches-management.component';

describe('SandwichesManagementComponent', () => {
  let component: SandwichesManagementComponent;
  let fixture: ComponentFixture<SandwichesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandwichesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandwichesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
