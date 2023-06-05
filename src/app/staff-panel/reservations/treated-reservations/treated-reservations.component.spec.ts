import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatedReservationsComponent } from './treated-reservations.component';

describe('TreatedReservationsComponent', () => {
  let component: TreatedReservationsComponent;
  let fixture: ComponentFixture<TreatedReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatedReservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatedReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
