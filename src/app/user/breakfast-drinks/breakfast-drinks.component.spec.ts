import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakfastDrinksComponent } from './breakfast-drinks.component';

describe('BreakfastDrinksComponent', () => {
  let component: BreakfastDrinksComponent;
  let fixture: ComponentFixture<BreakfastDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakfastDrinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakfastDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
