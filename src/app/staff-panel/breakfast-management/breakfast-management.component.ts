import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Food_by_categoriesService} from "../services/sandwiches/food_by_categories.service";

@Component({
  selector: 'app-breakfast-management',
  templateUrl: './breakfast-management.component.html',
  styleUrls: ['./breakfast-management.component.css']
})
export class BreakfastManagementComponent implements OnInit {

  category: any;
  breakfast: any[] = []
  breakfastForm!: FormGroup;
  breakfastFormUpdate!: FormGroup;
  file: File[] = [];
  fileData!: string;
  fileUpdate: File[] = [];
  fileDataUpdate!: string;
  errorMessage: string | null = null;
  showErrorMessage: boolean = false;
  selectedBreakfast!: any;
  page: number = 1;
  search?: any;


  constructor(private route: ActivatedRoute, private breakfastService: Food_by_categoriesService, private formBuilder: FormBuilder) {
    this.breakfastForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      categories: ['', Validators.required],
      photo: ['', Validators.required]
    });
    this.breakfastFormUpdate = this.formBuilder.group({
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

    this.applySearchFilter(this.category);
  }


  getByCategory(category: any) {
    this.breakfastService.getByCategory(category).subscribe((data: any) => {
      this.breakfast = data;
    })
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('name', this.breakfastForm.value.name);
    formData.append('price', this.breakfastForm.value.price);
    formData.append('quantity', this.breakfastForm.value.quantity);
    formData.append('categories', this.category);
    if (this.file.length > 0) {
      formData.append('photo', this.file[0], this.file[0].name);
    }
    console.log(this.breakfastForm.value);
    this.breakfastService.add(formData).subscribe(res => {
        this.breakfastForm.reset();
        this.breakfastService.getByCategory(this.category).subscribe((data: any[]) => {
          this.breakfast = data;
        });
      },
      (error) => {
        if (error.status === 409) {
          this.errorMessage = "This breakfast already exists, change the name to add a new one";
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

  editBreakfast(breakfast: any) {
    this.selectedBreakfast = breakfast;
    const breakfastData = {
      name: breakfast.name,
      price: breakfast.price,
      quantity: breakfast.quantity,
      photo: breakfast.image,
      categories: breakfast.categories
    }
    this.breakfastFormUpdate.setValue(breakfastData)
    console.log(this.selectedBreakfast.id);
  }

  Update() {
    const formData = new FormData();
    formData.append('name', this.breakfastFormUpdate.get('name')!.value);
    formData.append('price', this.breakfastFormUpdate.get('price')!.value);
    formData.append('quantity', this.breakfastFormUpdate.get('quantity')!.value);
    formData.append('categories', this.category);
    if (this.fileUpdate.length > 0) {
      formData.append('photo', this.fileUpdate[0], this.fileUpdate[0].name);
    } else {
      formData.append('photo', this.selectedBreakfast.photo);
    }
    console.log(formData.get('photo'))
    console.log(this.selectedBreakfast.id);
    this.breakfastService.update(this.selectedBreakfast.id, formData).subscribe(res => {
      this.breakfastFormUpdate.reset();
      this.fileUpdate = [];
      console.log(formData)
      this.breakfastService.getByCategory(this.category).subscribe((data: any[]) => {
        this.breakfast = data;
      });
      this.selectedBreakfast = null;
    });
  }

  Delete(id: any) {
    this.breakfastService.delete(id).subscribe(res => {
      this.breakfastService.getByCategory(this.category).subscribe((data: any[]) => {
        this.breakfast = data;
      });
    });
  }

  clearAddForm() {
    this.breakfastForm.reset();
  }

  public applySearchFilter(category: string) {
    if (this.search && this.search.trim() !== '') {
      this.breakfast = this.breakfast.filter(b =>
        b.name.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      this.getByCategory(category);
    }
  }

}
