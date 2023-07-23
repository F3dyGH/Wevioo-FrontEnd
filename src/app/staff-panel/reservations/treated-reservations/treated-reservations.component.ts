import {Component, OnInit} from '@angular/core';
import {ReservationsService} from "../../services/reservations/reservations.service";

@Component({
  selector: 'app-treated-reservations',
  templateUrl: './treated-reservations.component.html',
  styleUrls: ['./treated-reservations.component.css']
})
export class TreatedReservationsComponent implements OnInit {

  reservations: any[] = [];
  page : number = 1;

  constructor(private reservationService: ReservationsService) {
  }

  ngOnInit(): void {
    this.getTreatedReservations();
  }

  getTreatedReservations() {
    this.reservationService.getTreatedReservations().subscribe((data: any) => {
      this.reservations = data;
    })
  }

}
