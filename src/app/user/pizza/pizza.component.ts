import {Component, OnInit} from '@angular/core';
import {Food_by_categoriesService} from "../../staff-panel/services/sandwiches/food_by_categories.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit{
  category :any;
  pizzas:any[] = [];

  constructor(private pizzaService: Food_by_categoriesService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.getByCategory(this.category);
    });
  }

  getByCategory(category:any){
    this.pizzaService.getByCategoryUser(category).subscribe((data:any) => {
      this.pizzas=data;
    })
  }

}
