import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Food_by_categoriesService} from "../services/sandwiches/food_by_categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pizzas-management',
  templateUrl: './pizzas-management.component.html',
  styleUrls: ['./pizzas-management.component.css']
})
export class PizzasManagementComponent implements OnInit {

  category: any;
  pizzas: any[] = []
  PizzaForm!: FormGroup;
  PizzaFormUpdate!: FormGroup;
  file: File[] = [];
  fileData!: string;
  fileUpdate: File[] = [];
  fileDataUpdate!: string;
  errorMessage?: string;
  pizza!: any;
  selectedPizza!: any;
  page: number = 1;

  constructor(private route: ActivatedRoute, private pizzaService: Food_by_categoriesService, private formBuilder: FormBuilder) {
    this.PizzaForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required],
      photo: ['', Validators.required]
    });
    this.PizzaFormUpdate = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
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
    this.pizzaService.getByCategory(category).subscribe((data: any) => {
      this.pizzas = data;
    })
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('name', this.PizzaForm.value.name);
    formData.append('price', this.PizzaForm.value.price);
    formData.append('description', this.PizzaForm.value.description);
    formData.append('categories', this.category);
    if (this.file.length > 0) {
      formData.append('photo', this.file[0], this.file[0].name);
    }
    console.log(this.PizzaForm.value);
    this.pizzaService.add(formData).subscribe(res => {
        this.PizzaForm.reset();
        this.pizzaService.getByCategory(this.category).subscribe((data: any[]) => {
          this.pizzas = data;
        });
      },
      (error) => {
        if (error.status = 409) {
          this.errorMessage = "This Pizza already exists"
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

  editPizza(pizza: any) {
    this.selectedPizza = pizza;
    const pizzaData = {
      name: pizza.name,
      price: pizza.price,
      description: pizza.description,
      photo: pizza.image,
      categories: pizza.categories
    }
    this.PizzaFormUpdate.setValue(pizzaData)
    console.log(this.selectedPizza.id);
  }

  Update() {
    const formData = new FormData();
    formData.append('name', this.PizzaFormUpdate.get('name')!.value);
    formData.append('price', this.PizzaFormUpdate.get('price')!.value);
    formData.append('description', this.PizzaFormUpdate.get('description')!.value);
    formData.append('categories', this.category);
    if (this.fileUpdate.length > 0) {
      formData.append('photo', this.fileUpdate[0], this.fileUpdate[0].name);
    } else {
      formData.append('photo', this.selectedPizza.photo);
    }
    console.log(formData.get('photo'))
    console.log(this.selectedPizza.id);
    this.pizzaService.update(this.selectedPizza.id, formData).subscribe(res => {
      this.PizzaFormUpdate.reset();
      this.fileUpdate = [];
      console.log(formData)
      this.pizzaService.getByCategory(this.category).subscribe((data: any[]) => {
        this.pizzas = data;
      });
      this.selectedPizza = null;
    });
  }

  Delete(id: any) {
    this.pizzaService.delete(id).subscribe(res => {
      this.pizzaService.getByCategory(this.category).subscribe((data: any[]) => {
        this.pizzas = data;
      });
    });
  }

  clearAddForm(){
    this.PizzaForm.reset();
  }

}
