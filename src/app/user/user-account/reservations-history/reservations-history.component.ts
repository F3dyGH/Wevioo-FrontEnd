import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthService} from "../../../auth/services/auth/auth.service";

@Component({
  selector: 'app-today-reservations',
  templateUrl: './reservations-history.component.html',
  styleUrls: ['./reservations-history.component.css']
})
export class ReservationsHistoryComponent implements OnInit {
  history: any[]=[];
  currentUser: any;

  constructor(private userService: UserService, private authService: AuthService) {
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
}
