import {Component, OnInit} from '@angular/core';
import {ReservationsService} from "../../services/reservations/reservations.service";

@Component({
  selector: 'app-cancelled-reservations',
  templateUrl: './cancelled-reservations.component.html',
  styleUrls: ['./cancelled-reservations.component.css']
})
export class CancelledReservationsComponent implements OnInit {

  reservations: any[] = [];
  page : number = 1;

  constructor(private reservationService: ReservationsService) {
  }

  ngOnInit(): void {
    this.getCancelledReservations();
  }

  getCancelledReservations() {
    this.reservationService.getCancelledReservations().subscribe((data: any) => {
      this.reservations = data;
    })
  }

}
