import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DailyMenuService} from "../../services/daily-menu/daily-menu.service";
import {ReservationsService} from "../../../staff-panel/services/reservations/reservations.service";
import {AuthService} from "../../../auth/services/auth/auth.service";

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private menuService: DailyMenuService, private reservationService: ReservationsService, private authService: AuthService) {
  }

  menuName: any;
  menu: any;
  starters: any[] = [];
  selectedStarter: any;
  userId = this.authService.getUserId();
  successMsg!: string;
  showMsg!:boolean;
  showErrorMsg!:boolean;
  errorMsg!: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.menuName = params['name'];
      console.log(this.menuName);
    });

    this.menuService.getMenuByName(this.menuName).subscribe((data: any) => {
      this.menu = data;
      console.log(this.menu)
    })

    this.menuService.getAllStarters().subscribe((d: any) => {
      this.starters = d;
      console.log(this.starters)
    })
  }

  selectStarter(starter: any) {
    this.selectedStarter = starter;
    console.log(this.selectedStarter)
  }

  createReservation() {
    if(this.selectedStarter == null){
      this.errorMsg = "Please select a starter dish"
      this.successMsg = ""
      this.showErrorMsg = true;
      this.showMsg = false;
      setTimeout(() => {
        this.showErrorMsg = false;
      }, 3000);

    }else {
      this.reservationService.addReservation(this.userId, this.menu.id, this.selectedStarter.id).subscribe({
        next: (data: any) => {
          this.successMsg = data.menu.name + " has been booked successfully"
          this.errorMsg = ""
          this.showMsg = true;
          this.showErrorMsg = false;
          setTimeout(() => {
            this.showMsg = false;
          }, 3000);        },
        error: err => {
          if (err.status == 409) {
            this.errorMsg = "Reservation creation is only allowed between 6 pm and 10 am of the next day"
            this.successMsg = ""
            this.showErrorMsg = true;
            this.showMsg = false;
            setTimeout(() => {
              this.showErrorMsg = false;
            }, 3000);
          }
          if (err.status == 400) {
            this.errorMsg = "You have only one reservation a day"
            this.successMsg = ""
            this.showErrorMsg = true;
            this.showMsg = false;
            setTimeout(() => {
              this.showErrorMsg = false;
            }, 3000);
          }
          if (err.status == 403) {
            this.errorMsg = "This user is not allowed to make this action"
            this.successMsg = ""
            this.showErrorMsg = true;
            this.showMsg = false;
            setTimeout(() => {
              this.showErrorMsg = false;
            }, 3000);
          }
        }
      })
    }
  }

  arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }
}
