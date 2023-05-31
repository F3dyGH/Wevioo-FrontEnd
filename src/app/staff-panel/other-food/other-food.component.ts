import {Component, OnInit} from '@angular/core';
import {SandwichesManagementComponent} from "../sandwiches-management/sandwiches-management.component";
import {PizzasManagementComponent} from "../pizzas-management/pizzas-management.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-other-food',
  templateUrl: './other-food.component.html',
  styleUrls: ['./other-food.component.css']
})
export class OtherFoodComponent implements OnInit {
  selectedComponent: any;
  category?: string;


  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
    });
  }

  /*loadComponent(category: string) {
    switch (category) {
      case 'sandwiches':
        this.selectedComponent = SandwichesManagementComponent;
        break;
      case 'pizzas':
        this.selectedComponent = PizzasManagementComponent;
        break;
      default:
        this.selectedComponent = null;
        break;
    }
  }*/

}
