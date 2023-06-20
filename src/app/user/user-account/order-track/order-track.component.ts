import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {StorageService} from "../../../auth/services/storage/storage.service";
import {ReservationsService} from "../../../staff-panel/services/reservations/reservations.service";

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.css']
})
export class OrderTrackComponent implements OnInit{
  orders: any[] = [];
  currentUser: any;
  constructor(private userService: UserService, private storageService: StorageService, private reservationService: ReservationsService) {
    this.currentUser = this.storageService.getUser();
  }
  ngOnInit(): void {
    this.getOrderTrack();
  }
  getOrderTrack(){
    this.userService.orderTrack(this.currentUser.id).subscribe((data:any[])=>{
      this.orders = data;
    })
}
CancelReservation(ResId:any, UserId:any ){
    this.reservationService.cancelReservation(ResId, UserId).subscribe((data:any[])=>{
      this.orders = data;
      this.getOrderTrack();
    })

}
}
