import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledReservationsComponent } from './cancelled-reservations.component';

describe('CancelledReservationsComponent', () => {
  let component: CancelledReservationsComponent;
  let fixture: ComponentFixture<CancelledReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledReservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelledReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
