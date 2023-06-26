import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Food_by_categoriesService} from "../services/sandwiches/food_by_categories.service";

@Component({
  selector: 'app-drinks-management',
  templateUrl: './drinks-management.component.html',
  styleUrls: ['./drinks-management.component.css']
})
export class DrinksManagementComponent implements OnInit {

  category: any;
  drinks: any[] = []
  drinksForm!: FormGroup;
  drinksFormUpdate!: FormGroup;
  file: File[] = [];
  fileData!: string;
  fileUpdate: File[] = [];
  fileDataUpdate!: string;
  errorMessage: string | null = null;
  showErrorMessage: boolean = false;
  selectedDrink!: any;
  page: number = 1;

  constructor(private route: ActivatedRoute, private drinksService: Food_by_categoriesService, private formBuilder: FormBuilder) {
    this.drinksForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      categories: ['', Validators.required],
      photo: ['', Validators.required]
    });
    this.drinksFormUpdate = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      categories: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.getByCategory(this.category);
    });
  }


  getByCategory(category: any) {
    this.drinksService.getByCategory(category).subscribe((data: any) => {
      this.drinks = data;
    })
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('name', this.drinksForm.value.name);
    formData.append('price', this.drinksForm.value.price);
    formData.append('quantity', this.drinksForm.value.quantity);
    formData.append('categories', this.category);
    if (this.file.length > 0) {
      formData.append('photo', this.file[0], this.file[0].name);
    }
    console.log(this.drinksForm.value);
    this.drinksService.add(formData).subscribe(res => {
        this.drinksForm.reset();
        this.drinksService.getByCategory(this.category).subscribe((data: any[]) => {
          this.drinks = data;
        });
      },
      (error) => {
        if (error.status === 409) {
          this.errorMessage = "This drink already exists, change the name to add a new one";
          this.showErrorMessage = true;

          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      })
  }

  onFileSelected(event: any) {
    this.file = event.target.files;
    const reader = new FileReader();
    if (this.file && this.file.length > 0) {
      const fileType = this.file[0].type;
      if (fileType && fileType.match('image.*')) {
        reader.readAsDataURL(this.file[0]);
        console.log(this.file[0].name);
        console.log(this.file[0]);
      }
      reader.onload = () => {
        this.fileData = reader.result as string;
      };
    }
  }

  onFileUpdate(event: any) {
    this.fileUpdate = event.target.files;
    const reader = new FileReader();
    if (this.fileUpdate && this.fileUpdate.length > 0) {
      const fileType = this.fileUpdate[0].type;
      if (fileType && fileType.match('image.*')) {
        reader.readAsDataURL(this.fileUpdate[0]);
        console.log(this.fileUpdate[0].name);
      }
      reader.onload = () => {
        this.fileDataUpdate = reader.result as string;
      };
    }
  }

  editDrinks(drinks: any) {
    this.selectedDrink = drinks;
    const drinksData = {
      name: drinks.name,
      price: drinks.price,
      quantity: drinks.quantity,
      photo: drinks.image,
      categories: drinks.categories
    }
    this.drinksFormUpdate.setValue(drinksData)
    console.log(this.selectedDrink.id);
  }

  Update() {
    const formData = new FormData();
    formData.append('name', this.drinksFormUpdate.get('name')!.value);
    formData.append('price', this.drinksFormUpdate.get('price')!.value);
    formData.append('quantity', this.drinksFormUpdate.get('quantity')!.value);
    formData.append('categories', this.category);
    if (this.fileUpdate.length > 0) {
      formData.append('photo', this.fileUpdate[0], this.fileUpdate[0].name);
    } else {
      formData.append('photo', this.selectedDrink.photo);
    }
    console.log(formData.get('photo'))
    console.log(this.selectedDrink.id);
    this.drinksService.update(this.selectedDrink.id, formData).subscribe(res => {
      this.drinksFormUpdate.reset();
      this.fileUpdate = [];
      console.log(formData)
      this.drinksService.getByCategory(this.category).subscribe((data: any[]) => {
        this.drinks = data;
      });
      this.selectedDrink = null;
    });
  }

  Delete(id: any) {
    this.drinksService.delete(id).subscribe(res => {
      this.drinksService.getByCategory(this.category).subscribe((data: any[]) => {
        this.drinks = data;
      });
    });
  }

  clearAddForm() {
    this.drinksForm.reset();
  }

}

