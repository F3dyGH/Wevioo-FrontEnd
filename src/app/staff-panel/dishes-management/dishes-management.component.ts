import {Component, OnInit} from '@angular/core';
import {DishesManagementService} from "../services/dishes-management.service";

@Component({
  selector: 'app-dishes-management',
  templateUrl: './dishes-management.component.html',
  styleUrls: ['./dishes-management.component.css']
})
export class DishesManagementComponent implements OnInit{
  dishes!: any[];
  ngOnInit(): void {
  this.dishServiece.getAllDishes()
    .subscribe((data: any[]) => {
      this.dishes = data;
    });
  }

  constructor(private dishServiece: DishesManagementService) {
  }

}
