import {Component, OnInit} from '@angular/core';
import {ReservationsService} from "../../services/reservations/reservations.service";
import {AuthService} from "../../../auth/services/auth/auth.service";

@Component({
  selector: 'app-reservations',
  templateUrl: './today-reservations.component.html',
  styleUrls: ['./today-reservations.component.css']
})
export class TodayReservationsComponent implements OnInit {

  reservations: any[] = [];
  selectedReservation: any;
  staffId: any;

  constructor(private reservationService: ReservationsService, private authService:AuthService) {
    this.staffId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.getTodayReservations();
  }

  getTodayReservations() {
    this.reservationService.getTodayReservations().subscribe((data: any) => {
      this.reservations = data;
    })
  }

  treatReservation(reservation: any) {
    this.selectedReservation = reservation
    this.reservationService.treatReservation(this.selectedReservation.id, this.staffId).subscribe(res =>{
      this.getTodayReservations()
    })
  }

  cancelReservation(reservation: any) {
    this.selectedReservation = reservation
    this.reservationService.cancelReservation(this.selectedReservation.id, this.staffId).subscribe(res =>{
      this.getTodayReservations()
    })
  }

}
