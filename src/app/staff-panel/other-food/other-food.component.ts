import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-other-food',
  templateUrl: './other-food.component.html',
  styleUrls: ['./other-food.component.css']
})
export class OtherFoodComponent implements OnInit {
  category?: string;


  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
    });
  }

}
