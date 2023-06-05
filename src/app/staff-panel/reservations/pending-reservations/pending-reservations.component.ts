import {Component, OnInit} from '@angular/core';
import {ReservationsService} from "../../services/reservations/reservations.service";

@Component({
  selector: 'app-pending-reservations',
  templateUrl: './pending-reservations.component.html',
  styleUrls: ['./pending-reservations.component.css']
})
export class PendingReservationsComponent implements OnInit {

  reservations: any[] = [];

  constructor(private reservationService: ReservationsService) {
  }

  ngOnInit(): void {
    this.getInProcessReservations();
  }

  getInProcessReservations() {
    this.reservationService.getInProcessReservations().subscribe((data: any) => {
      this.reservations = data;
    })
  }

}
