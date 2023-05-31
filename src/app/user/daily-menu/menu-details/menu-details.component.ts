import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DailyMenuService} from "../../services/daily-menu/daily-menu.service";

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit{

  menuName: any;
  menu: any;

  constructor(private route: ActivatedRoute, private menuService: DailyMenuService){
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.menuName = params['name'];
      console.log(this.menuName);
    });

    this.menuService.getMenuByName(this.menuName).subscribe((data:any)=>{
      this.menu = data;
      console.log(this.menu)
    })
  }

}
