import {Component, OnInit} from '@angular/core';
import {ReservationsService} from "../../services/reservations/reservations.service";
import {AuthService} from "../../../auth/services/auth/auth.service";

@Component({
  selector: 'app-pending-reservations',
  templateUrl: './pending-reservations.component.html',
  styleUrls: ['./pending-reservations.component.css']
})
export class PendingReservationsComponent implements OnInit {
  constructor(private reservationService: ReservationsService, private authService: AuthService) {
  }

  reservations: any[] = [];
  selectedReservation: any;
  staffId = this.authService.getUserId();

  ngOnInit(): void {
    this.getInProcessReservations();
  }

  getInProcessReservations() {
    this.reservationService.getInProcessReservations().subscribe((data: any) => {
      this.reservations = data;
    })
  }

  treatReservation(reservation: any) {
    this.selectedReservation = reservation
    this.reservationService.treatReservation(this.selectedReservation.id, this.staffId).subscribe(res =>{
      this.getInProcessReservations()
    })
  }

  cancelReservation(reservation: any) {
    this.selectedReservation = reservation
    this.reservationService.cancelReservation(this.selectedReservation.id, this.staffId).subscribe(res =>{
      this.getInProcessReservations()
    })
  }

}
