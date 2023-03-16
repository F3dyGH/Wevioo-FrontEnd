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
  photoUrl!:any;
  ngOnInit(): void {
    this.dishService.getAllDishes()
      .subscribe((data: any[]) => {
        this.dishes = data;
      });
  }

  constructor(private fb: FormBuilder, private dishService: DishesManagementService) {
  }

  editDish(dish: any) {
   this.selectedDish = dish;
   this.DishForm = dish
   console.log(this.DishForm);

  }

  Update() {
    const {name, price, description, photo} = this.DishForm;
    console.log(this.selectedDish.id);
    this.dishService.updateDish(this.selectedDish.id, name, price, description, photo).subscribe(res => {
      this.dishService.getAllDishes().subscribe((data: any[]) => {
        this.dishes = data;
      });
      this.selectedDish = null;
      this.DishForm = {};

    });
  }

  Add() {
    const {name, price, photo, description} = this.DishForm;
      this.dishService.addDish(name, price, photo, description).subscribe(res => {
        this.dishService.getAllDishes().subscribe((data: any[]) => {
          this.dishes = data;        this.DishForm = {};

        });
      });
  }
  Delete(id : any){
    this.dishService.deleteDish(id).subscribe(res => {
      this.dishService.getAllDishes().subscribe((data: any[]) => {
        this.dishes = data;
      });

    });
  }
 /* getPhotoUrl(photoName: any){
    this.dishService.getPhoto(photoName).subscribe(data => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        this.photoUrl = reader.result;
      };
    });
  }*/ //to review
}
