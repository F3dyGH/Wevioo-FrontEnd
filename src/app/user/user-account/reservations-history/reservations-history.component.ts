import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {ReservationsService} from "../../../staff-panel/services/reservations/reservations.service";

@Component({
  selector: 'app-today-reservations',
  templateUrl: './reservations-history.component.html',
  styleUrls: ['./reservations-history.component.css']
})
export class ReservationsHistoryComponent implements OnInit {
  history: any[]=[];
  currentUser: any;
  selectedStatus: string = ''; // Variable to store the selected status

  constructor(private userService: UserService, private authService: AuthService, private reservationService: ReservationsService) {
    this.currentUser = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.getReservationsHistory()
    console.log(this.history)
  }

  getReservationsHistory() {
    this.userService.getReservationsHistory(this.currentUser).subscribe((data: any[]) => {
      this.history = data;
    })
  }

  filterReservationsByStatus(status: string) {
    this.selectedStatus = status;
    if (this.selectedStatus === '') {
      this.getReservationsHistory();
    } else {
      this.reservationService.userReservationsFilter(this.currentUser, this.selectedStatus).subscribe((data: any[]) => {
        this.history = data;
      })
    }
  }
}
