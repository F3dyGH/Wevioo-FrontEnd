import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsHistoryComponent } from './reservations-history.component';

describe('TodayReservationsComponent', () => {
  let component: ReservationsHistoryComponent;
  let fixture: ComponentFixture<ReservationsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
