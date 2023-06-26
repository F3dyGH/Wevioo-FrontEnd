import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakfastManagementComponent } from './breakfast-management.component';

describe('BreakfastManagementComponent', () => {
  let component: BreakfastManagementComponent;
  let fixture: ComponentFixture<BreakfastManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakfastManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakfastManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
