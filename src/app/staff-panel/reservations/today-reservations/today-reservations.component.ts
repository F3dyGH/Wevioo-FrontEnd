import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {ReservationsService} from "../../services/reservations/reservations.service";

@Component({
  selector: 'app-reservations',
  templateUrl: './today-reservations.component.html',
  styleUrls: ['./today-reservations.component.css']
})
export class TodayReservationsComponent implements OnInit {

  reservations: any[] = [];

  constructor(private reservationService: ReservationsService) {
  }

  ngOnInit(): void {
    this.getTodayReservations();
  }

  getTodayReservations() {
    this.reservationService.getTodayReservations().subscribe((data: any) => {
      this.reservations = data;
    })
  }

}
