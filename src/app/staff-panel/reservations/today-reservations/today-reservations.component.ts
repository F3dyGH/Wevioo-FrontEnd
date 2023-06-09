import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {ReservationsService} from "../../services/reservations/reservations.service";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {WebSocketService} from "../../../websocket/web-socket.service";

@Component({
  selector: 'app-reservations',
  templateUrl: './today-reservations.component.html',
  styleUrls: ['./today-reservations.component.css']
})
export class TodayReservationsComponent implements OnInit {

  reservations: any[] = [];
  selectedReservation: any;
  staffId = this.authService.getUserId();

  constructor(private reservationService: ReservationsService, private authService:AuthService, private webSocketService: WebSocketService) {
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
      this.webSocketService.connect().subscribe((message: any) => {
        // Handle incoming WebSocket message
        message = "tozz"
        console.log('Received WebSocket message:', message);
        // Perform actions based on the received message
      });
    })
  }

  cancelReservation(reservation: any) {
    this.selectedReservation = reservation
    this.reservationService.cancelReservation(this.selectedReservation.id, this.staffId).subscribe(res =>{
      this.getTodayReservations()
    })
  }

}
