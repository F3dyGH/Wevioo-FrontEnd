import {Component, OnInit} from '@angular/core';
import {DishesManagementService} from "../services/dishes/dishes-management.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dishes-management',
  templateUrl: './dishes-management.component.html',
  styleUrls: ['./dishes-management.component.css']
})
export class DishesManagementComponent implements OnInit {

  file: File[] =[];
  fileData!:string;
  DishForm!:FormGroup;
  dishes!: any[];
  dish!: any;
  selectedDish!: any;
  imageData!:string;

  ngOnInit(): void {
    this.AllDishes();
  }

  constructor(private dishService: DishesManagementService, private http: HttpClient,private formBuilder: FormBuilder) {
    this.DishForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }
  onFileSelected(event: any) {
    this.file = event.target.files;
    const reader = new FileReader();
    if (this.file && this.file.length > 0) {
      const fileType = this.file[0].type;
      if (fileType && fileType.match('image.*')) {
        reader.readAsDataURL(this.file[0]);
        console.log(this.file[0].name);
      }
      reader.onload = () => {
        this.fileData = reader.result as string;
      };
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.DishForm.get('name')!.value);
    formData.append('price', this.DishForm.get('price')!.value);
    formData.append('description', this.DishForm.get('description')!.value);
    if (this.file.length > 0) {
      formData.append('photo',this.file[0], this.file[0].name);
    }
    console.log(formData.get('photo'))
    this.dishService.addDish(formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

  /*editDish(dish: any) {
    this.selectedDish = dish;
    //this.DishForm = dish
    this.DishForm = {};
    console.log(this.selectedDish.id);

  }
*/


  /*Update() {
    const {name, price, description, photo} = this.DishForm;
    console.log(this.selectedDish.id);
    this.dishService.updateDish(this.selectedDish.id, name, price, description, photo).subscribe(res => {
      this.dishService.getAllDishes().subscribe((data: any[]) => {
        this.dishes = data;
      });
      this.selectedDish = null;
    });
  }*/

  Delete(id: any) {
    this.dishService.deleteDish(id).subscribe(res => {
     this.AllDishes();
    });
  }
AllDishes() {
  this.dishService.getAllDishes().subscribe((response: any) => {
    this.dishes = response;
    this.dishes.forEach((dish: any) => {
      if (dish.image && dish.image.data) {

        dish.imageData = 'data:image/jpeg;base64,' + this.arrayBufferToBase64(dish.photo.data);
      }
    });
  })

}
  arrayBufferToBase64(buffer:ArrayBuffer){
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for(let i = 0 ; i<len; i++){
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}
