import {Component, OnInit} from '@angular/core';
import {DailyMenuService} from "../services/daily-menu/daily-menu.service";

@Component({
  selector: 'app-daily-menu',
  templateUrl: './daily-menu.component.html',
  styleUrls: ['./daily-menu.component.css']
})
export class DailyMenuComponent implements OnInit {

  localDate: any;
  menus: any[] = []

  constructor(private dailyMenuService: DailyMenuService) {
  /*  const currentDate = new Date();
    this.localDate = currentDate.toISOString().substring(0,10)*/
  }

  ngOnInit(): void {
    this.getDailyMenu()
    //console.log(this.localDate)
  }

  getDailyMenu() {
    this.dailyMenuService.getDailyMenu().subscribe((data:any)=>{
      this.menus = data;
    })
  }
}
