import {Component, OnInit} from '@angular/core';
import {DishesManagementService} from "../services/dishes-management.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dishes-management',
  templateUrl: './dishes-management.component.html',
  styleUrls: ['./dishes-management.component.css']
})
export class DishesManagementComponent implements OnInit {

  DishForm: any = {
    name: null,
    price: null,
    description: null,
    photo: null
  };

  dishes!: any[];
  selectedDish!: any;
  photoUrl!: any;

  ngOnInit(): void {
    this.dishService.getAllDishes()
      .subscribe((data: any[]) => {
        this.dishes = data;
        this.photoUrl = [];
        this.dishes.forEach(dish => {
          this.dishService.getPhoto(dish.photo).subscribe(response => {

            const reader = new FileReader();
            reader.onload = () => {
              dish.photoUrl = reader.result as string;
              this.photoUrl.push(reader.result as string);
            };
            reader.readAsDataURL(response);
            console.log(this.photoUrl)
          });
        });
      });
  }

  constructor(private dishService: DishesManagementService) {
  }

  editDish(dish: any) {
    this.selectedDish = dish;
    //this.DishForm = dish
    this.DishForm = {};
    console.log(this.selectedDish);

  }

  Update() {
    const {name, price, description, photo} = this.DishForm;
    console.log(this.selectedDish.id);
    this.dishService.updateDish(this.selectedDish.id, name, price, description, photo).subscribe(res => {
      this.dishService.getAllDishes().subscribe((data: any[]) => {
        this.dishes = data;
      });
      this.selectedDish = null;
    });
  }

  Add() {
    const {name, price, photo, description} = this.DishForm;
    this.dishService.addDish(name, price, photo, description).subscribe(res => {
      this.dishService.getAllDishes().subscribe((data: any[]) => {
        this.dishes = data;
      });
    });
  }

  Delete(id: any) {
    this.dishService.deleteDish(id).subscribe(res => {
      this.dishService.getAllDishes().subscribe((data: any[]) => {
        this.dishes = data;
      });
    });
  }
}
