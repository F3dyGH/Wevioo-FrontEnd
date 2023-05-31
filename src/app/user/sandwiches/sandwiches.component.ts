import {Component, OnInit} from '@angular/core';
import {OtherFoodComponent} from "../../staff-panel/other-food/other-food.component";
import {Food_by_categoriesService} from "../../staff-panel/services/sandwiches/food_by_categories.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sandwiches',
  templateUrl: './sandwiches.component.html',
  styleUrls: ['./sandwiches.component.css']
})
export class SandwichesComponent implements OnInit{
  category :any;
  sandwiches:any[] = [];

  constructor(private sandwichService: Food_by_categoriesService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.getByCategory(this.category);
    });
  }

  getByCategory(category:any){
    this.sandwichService.getByCategoryUser(category).subscribe((data:any) => {
      this.sandwiches=data;
    })
  }

}
